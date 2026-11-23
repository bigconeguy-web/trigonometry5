import test from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzeEquation,
  checkPracticeAnswer,
  evaluateEquationAt,
  FORMULA_SHEET_ITEMS,
  generatePracticeProblem,
} from './mathPortalLogic.js';

test('evaluateEquationAt and analyzeEquation compute linear y = 1.5x + 1 accurately', () => {
  const analysis = analyzeEquation({ mode: 'linear', m: 1.5, b: 1, c: 0 });
  assert.equal(analysis.equationText, 'y = 1.5x + 1');
  assert.equal(analysis.yIntercept, '(0, 1)');
  assert.equal(analysis.xIntercepts, '(-0.67, 0)');
  assert.equal(analysis.derivativeText, 'dy/dx = 1.5');
  assert.equal(evaluateEquationAt({ mode: 'linear', m: 1.5, b: 1, c: 0 }, 4), 7);
});

test('analyzeEquation detects quadratic roots and discriminant states', () => {
  const twoRoots = analyzeEquation({ mode: 'quadratic', m: 1, b: -5, c: 6 });
  assert.equal(twoRoots.xIntercepts, '(2, 0), (3, 0)');
  const noRoots = analyzeEquation({ mode: 'quadratic', m: 1, b: 0, c: 4 });
  assert.equal(noRoots.xIntercepts, 'No real roots (Δ < 0)');
});

test('generatePracticeProblem and checkPracticeAnswer validate numeric inputs cleanly', () => {
  const prob = generatePracticeProblem(0);
  assert.equal(prob.expectedValue, 7);
  assert.deepEqual(checkPracticeAnswer(prob, '7'), {
    isValidNumber: true,
    isCorrect: true,
    parsedValue: 7,
  });
  assert.deepEqual(checkPracticeAnswer(prob, '5'), {
    isValidNumber: true,
    isCorrect: false,
    parsedValue: 5,
  });
  assert.deepEqual(checkPracticeAnswer(prob, 'abc'), {
    isValidNumber: false,
    isCorrect: false,
    parsedValue: null,
  });
});

test('FORMULA_SHEET_ITEMS covers all four mathematics categories', () => {
  const cats = new Set(FORMULA_SHEET_ITEMS.map((f) => f.category));
  assert.equal(cats.size, 4);
  assert.ok(FORMULA_SHEET_ITEMS.length >= 8);
});
