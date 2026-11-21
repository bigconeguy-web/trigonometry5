import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateSafeArithmetic,
  extractKeywords,
  parseFlashcardsFromText,
  respondOfflineStudyQuery,
  solveMathOrUnit,
  summarizeStudyText
} from './studyHelper';

test('evaluateSafeArithmetic solves arithmetic, powers, roots, percentages cleanly', () => {
  assert.equal(evaluateSafeArithmetic('24 * 18'), 432);
  assert.equal(evaluateSafeArithmetic('sqrt(144)'), 12);
  assert.equal(evaluateSafeArithmetic('2^5 + 8'), 40);
  assert.equal(evaluateSafeArithmetic('(3 + 7) * 4 - 2'), 38);
  assert.equal(evaluateSafeArithmetic('sin(30)'), 0.5);
  assert.equal(evaluateSafeArithmetic('invalid script()'), null);
});

test('solveMathOrUnit handles percentage, linear equations, and unit conversions', () => {
  const pct = solveMathOrUnit('15% of 80');
  assert.equal(pct.matched, true);
  assert.equal(pct.kind, 'percentage');
  assert.equal(pct.answer, '12');

  const off = solveMathOrUnit('20% off 150');
  assert.equal(off.matched, true);
  assert.equal(off.answer, '120');

  const eq = solveMathOrUnit('solve 2x + 4 = 12');
  assert.equal(eq.matched, true);
  assert.equal(eq.kind, 'equation');
  assert.equal(eq.answer, 'x = 4');

  const conv = solveMathOrUnit('10 km to miles');
  assert.equal(conv.matched, true);
  assert.equal(conv.kind, 'conversion');
  assert.ok(conv.answer?.startsWith('6.213'));

  const temp = solveMathOrUnit('212 F to C');
  assert.equal(temp.matched, true);
  assert.equal(temp.answer, '100 °C');
});

test('summarizeStudyText extracts 3-5 key sentences, bullets, reading time, word count, and keywords', () => {
  const sample = `
    Photosynthesis is the process used by plants and algae to convert sunlight into chemical energy.
    Chloroplasts inside leaf cells absorb light energy using green chlorophyll pigments.
    Water absorbed by roots combines with carbon dioxide from the atmosphere during light reactions.
    The Calvin cycle builds glucose molecules that feed cellular growth and plant structure.
    Oxygen is released into the air as an essential byproduct supporting life on Earth.
    Farmers monitor sunlight, water, and nutrients carefully to maximize healthy crop yields.
  `;
  const summary = summarizeStudyText(sample, 'balanced');
  assert.ok(summary.wordCount > 60);
  assert.equal(summary.readingTimeMinutes, 1);
  assert.ok(summary.sentences.length >= 3 && summary.sentences.length <= 5);
  assert.equal(summary.bullets.length, summary.sentences.length);
  const kws = extractKeywords(sample, 6);
  assert.ok(kws.includes('sunlight') || kws.includes('plants') || kws.includes('photosynthesis'));
});

test('parseFlashcardsFromText splits colon and dash delimited note lines', () => {
  const notes = [
    'Photosynthesis: how plants make food using sunlight',
    '- Mitochondria - organelle that generates ATP energy',
    'Osmosis -> movement of water across a semipermeable membrane',
    'Regular note line without separator'
  ].join('\n');

  const cards = parseFlashcardsFromText(notes);
  assert.equal(cards.length, 3);
  assert.deepEqual(cards[0], {
    front: 'Photosynthesis',
    back: 'how plants make food using sunlight'
  });
  assert.deepEqual(cards[1], {
    front: 'Mitochondria',
    back: 'organelle that generates ATP energy'
  });
  assert.deepEqual(cards[2], {
    front: 'Osmosis',
    back: 'movement of water across a semipermeable membrane'
  });
});

test('respondOfflineStudyQuery routes math, flashcard generation, and active-note summary', () => {
  const mathReply = respondOfflineStudyQuery('What is 24 * 18?');
  assert.equal(mathReply.kind, 'math');
  assert.ok(mathReply.text.includes('432'));

  const fcReply = respondOfflineStudyQuery(
    'Make flashcards',
    { title: 'Bio', body: 'Photosynthesis: how plants make food\nMitosis - cell division into two identical nuclei' },
    'balanced',
    true
  );
  assert.equal(fcReply.kind, 'flashcards');
  assert.equal(fcReply.cards.length, 2);

  const sumReply = respondOfflineStudyQuery(
    'Summarize my active note',
    {
      title: 'Civics',
      body: 'The Constitution establishes three branches of government. Checks and balances prevent any branch from gaining total power. Congress writes laws while courts interpret constitutionality.'
    },
    'balanced',
    false
  );
  assert.equal(sumReply.kind, 'summary');
  assert.ok(sumReply.summary.wordCount > 20);
  assert.ok(sumReply.summary.sentences.length >= 2);
});
