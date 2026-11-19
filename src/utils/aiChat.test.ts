import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildSystemInstruction,
  classifyGeminiError,
  normalizeMessages,
  normalizeStyle,
} from './aiChat.ts';

test('normalizeMessages filters invalid entries and caps history', () => {
  const input = [
    null,
    { role: 'system', text: 'ignored role' },
    { role: 'user', text: '   ' },
    { role: 'user', text: '  Hello  ' },
    { role: 'model', text: 'Hi there' },
  ];
  assert.deepEqual(normalizeMessages(input), [
    { role: 'user', text: 'Hello' },
    { role: 'model', text: 'Hi there' },
  ]);

  const longList = Array.from({ length: 25 }, (_, i) => ({
    role: i % 2 === 0 ? 'user' : 'model',
    text: `msg-${i}`,
  }));
  const normalized = normalizeMessages(longList);
  assert.equal(normalized.length, 20);
  assert.equal(normalized[0].text, 'msg-5');
  assert.equal(normalized[19].text, 'msg-24');
});

test('normalizeStyle defaults cleanly to balanced', () => {
  assert.equal(normalizeStyle('concise'), 'concise');
  assert.equal(normalizeStyle('detailed'), 'detailed');
  assert.equal(normalizeStyle('unknown'), 'balanced');
  assert.equal(normalizeStyle(undefined), 'balanced');
});

test('buildSystemInstruction includes style and optional active note context', () => {
  const withoutNote = buildSystemInstruction('concise', null);
  assert.match(withoutNote, /brief and direct/i);
  assert.doesNotMatch(withoutNote, /attached their active workspace note/i);

  const withNote = buildSystemInstruction('detailed', {
    title: 'Biology Notes',
    body: 'Chlorophyll absorbs red and blue wavelengths.',
  });
  assert.match(withNote, /step-by-step/i);
  assert.match(withNote, /Biology Notes/);
  assert.match(withNote, /Chlorophyll absorbs red and blue wavelengths/);
});

test('classifyGeminiError maps API key, rate limit, and transient errors accurately', () => {
  const keyErr = classifyGeminiError(new Error('403 PERMISSION_DENIED: API_KEY_INVALID'));
  assert.equal(keyErr.status, 403);
  assert.equal(keyErr.retryable, false);
  assert.match(keyErr.message, /Settings > Secrets/);

  const quotaErr = classifyGeminiError(new Error('429 RESOURCE_EXHAUSTED'));
  assert.equal(quotaErr.status, 429);
  assert.equal(quotaErr.retryable, false);

  const busyErr = classifyGeminiError(new Error('503 Service Unavailable'));
  assert.equal(busyErr.status, 503);
  assert.equal(busyErr.retryable, true);
});
