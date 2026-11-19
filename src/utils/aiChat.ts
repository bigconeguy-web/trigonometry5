export type AiRole = 'user' | 'model';
export type AiStyle = 'concise' | 'balanced' | 'detailed';

export interface ChatTurnInput {
  role?: unknown;
  text?: unknown;
}

export interface NormalizedChatTurn {
  role: AiRole;
  text: string;
}

export interface NoteContextInput {
  title?: unknown;
  body?: unknown;
}

const MAX_HISTORY_TURNS = 20;
const MAX_MESSAGE_CHARS = 8000;
const MAX_NOTE_CHARS = 6000;

export function normalizeMessages(raw: unknown): NormalizedChatTurn[] {
  if (!Array.isArray(raw)) return [];
  const cleaned: NormalizedChatTurn[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const turn = item as ChatTurnInput;
    const role: AiRole | null = turn.role === 'model' ? 'model' : turn.role === 'user' ? 'user' : null;
    if (!role) continue;
    if (typeof turn.text !== 'string') continue;
    const trimmed = turn.text.trim();
    if (!trimmed) continue;
    cleaned.push({
      role,
      text: trimmed.slice(0, MAX_MESSAGE_CHARS),
    });
  }
  if (cleaned.length > MAX_HISTORY_TURNS) {
    return cleaned.slice(cleaned.length - MAX_HISTORY_TURNS);
  }
  return cleaned;
}

export function normalizeStyle(raw: unknown): AiStyle {
  if (raw === 'concise' || raw === 'balanced' || raw === 'detailed') return raw;
  return 'balanced';
}

export function buildSystemInstruction(style: AiStyle, noteContext?: NoteContextInput | null): string {
  const base =
    'You are a helpful, accurate, and clear AI study and productivity assistant inside a personal workspace. Use plain text and clean Markdown lists or code blocks when useful.';

  const styleGuide =
    style === 'concise'
      ? 'Keep answers brief and direct (around 2-4 sentences or short bullet points unless the user asks for more).'
      : style === 'detailed'
        ? 'Provide thorough, step-by-step explanations with concrete examples where helpful.'
        : 'Give balanced, clear answers that are easy to scan without unnecessary filler.';

  let result = `${base} ${styleGuide}`;

  if (noteContext && typeof noteContext === 'object') {
    const title = typeof noteContext.title === 'string' ? noteContext.title.trim().slice(0, 200) : '';
    const body = typeof noteContext.body === 'string' ? noteContext.body.trim().slice(0, MAX_NOTE_CHARS) : '';
    if (title || body) {
      result += `\n\nThe user attached their active workspace note for reference:\nTitle: ${title || 'Untitled Note'}\nContent:\n${body || '(empty note)'}`;
    }
  }

  return result;
}

export interface ClassifiedApiError {
  status: number;
  message: string;
  retryable: boolean;
}

export function classifyGeminiError(err: unknown): ClassifiedApiError {
  const rawMessage = err instanceof Error ? err.message : String(err || 'Unknown AI error');
  const upper = rawMessage.toUpperCase();

  if (
    upper.includes('API_KEY_INVALID') ||
    upper.includes('PERMISSION_DENIED') ||
    upper.includes('UNAUTHENTICATED') ||
    upper.includes('403')
  ) {
    return {
      status: 403,
      message: 'API key rejected or missing permission. Check GEMINI_API_KEY in Settings > Secrets.',
      retryable: false,
    };
  }

  if (upper.includes('RESOURCE_EXHAUSTED') || upper.includes('429') || upper.includes('QUOTA')) {
    return {
      status: 429,
      message: 'Rate limit or quota reached. Please wait a moment and try again, or verify your key in Settings > Secrets.',
      retryable: false,
    };
  }

  if (upper.includes('NOT_FOUND') || upper.includes('404')) {
    return {
      status: 404,
      message: 'Requested Gemini model was not found or is unavailable.',
      retryable: false,
    };
  }

  if (upper.includes('503') || upper.includes('502') || upper.includes('500') || upper.includes('UNAVAILABLE') || upper.includes('TIMEOUT') || upper.includes('ECONNRESET')) {
    return {
      status: 503,
      message: 'Gemini service is temporarily busy. Please try again in a few seconds.',
      retryable: true,
    };
  }

  return {
    status: 500,
    message: rawMessage.slice(0, 300) || 'Failed to generate AI response.',
    retryable: false,
  };
}
