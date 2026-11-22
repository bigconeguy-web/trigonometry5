import 'dotenv/config';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import express from 'express';
import type { Request, Response } from 'express';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { scramjetPath } from '@mercuryworkshop/scramjet/path';
import { baremuxPath } from '@mercuryworkshop/bare-mux/node';
import wisp from 'wisp-server-node';
import {
  buildSystemInstruction,
  classifyGeminiError,
  normalizeMessages,
  normalizeStyle,
} from './src/utils/aiChat.ts';

const PORT = Number(process.env.PORT) || 3000;
const MODEL_NAME = 'gemini-4-hydrogen';

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = (process.env.GEMINI_API_KEY || '').trim();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function createStreamWithRetry(
  ai: GoogleGenAI,
  params: Parameters<GoogleGenAI['models']['generateContentStream']>[0],
  maxAttempts = 2
) {
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await ai.models.generateContentStream(params);
    } catch (err) {
      lastError = err;
      const classified = classifyGeminiError(err);
      if (!classified.retryable || attempt === maxAttempts) {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, 600 * attempt));
    }
  }
  throw lastError;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.use('/api', (req: Request, res: Response, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }
    next();
  });

  const epoxyPath = path.resolve(
    process.cwd(),
    'node_modules/@mercuryworkshop/epoxy-transport/dist'
  );

  app.get('/sw.js', (_req: Request, res: Response) => {
    const publicSw = path.resolve(process.cwd(), 'public', 'sw.js');
    const distSw = path.resolve(process.cwd(), 'dist', 'sw.js');
    const targetSw = fs.existsSync(publicSw) ? publicSw : distSw;
    if (fs.existsSync(targetSw)) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      res.setHeader('Service-Worker-Allowed', '/');
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(targetSw);
    } else {
      res.status(404).end();
    }
  });

  app.use('/scram', express.static(scramjetPath));
  app.use('/baremux', express.static(baremuxPath));
  app.use('/epoxy', express.static(epoxyPath));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true, model: MODEL_NAME });
  });

  app.post('/api/ai/chat', async (req: Request, res: Response) => {
    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        error: 'Gemini API key is not configured. Add GEMINI_API_KEY in Settings > Secrets.',
      });
      return;
    }

    const body = (req.body || {}) as {
      messages?: unknown;
      style?: unknown;
      noteContext?: { title?: unknown; body?: unknown } | null;
    };

    const messages = normalizeMessages(body.messages);
    if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
      res.status(400).json({ error: 'Please enter a non-empty prompt.' });
      return;
    }

    const style = normalizeStyle(body.style);
    const systemInstruction = buildSystemInstruction(style, body.noteContext);
    const contents = messages.map((turn) => ({
      role: turn.role,
      parts: [{ text: turn.text }],
    }));

    const config: Record<string, unknown> = {
      systemInstruction,
    };
    if (style !== 'detailed') {
      config.thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };
    }

    let sseStarted = false;
    try {
      const stream = await createStreamWithRetry(ai, {
        model: MODEL_NAME,
        contents,
        config,
      });

      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders?.();
      sseStarted = true;

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        if (chunkText) {
          res.write(`data: ${JSON.stringify({ chunk: chunkText })}\n\n`);
        }
      }

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (err) {
      const classified = classifyGeminiError(err);
      if (sseStarted) {
        res.write(`data: ${JSON.stringify({ error: classified.message })}\n\n`);
        res.end();
      } else {
        res.status(classified.status).json({ error: classified.message });
      }
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found. Run npm run build first.');
      }
    });
  }

  const server = http.createServer(app);
  const routeWispRequest =
    (
      wisp as {
        routeRequest?: (req: http.IncomingMessage, socket: unknown, head: Buffer) => void;
        default?: { routeRequest: (req: http.IncomingMessage, socket: unknown, head: Buffer) => void };
      }
    ).routeRequest ||
    (
      wisp as {
        default?: { routeRequest: (req: http.IncomingMessage, socket: unknown, head: Buffer) => void };
      }
    ).default?.routeRequest;

  server.on('upgrade', (req, socket, head) => {
    if (req.url && req.url.startsWith('/wisp/') && typeof routeWispRequest === 'function') {
      routeWispRequest(req, socket, head);
    }
  });

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
