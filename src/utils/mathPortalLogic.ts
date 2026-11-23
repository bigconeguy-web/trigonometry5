export type EquationMode = 'linear' | 'quadratic' | 'sine';

export interface EquationParams {
  mode: EquationMode;
  m: number; // slope or leading coefficient a
  b: number; // intercept or linear term
  c: number; // constant offset for quadratic
}

export interface GraphAnalysis {
  equationText: string;
  points: Array<{ x: number; y: number }>;
  yIntercept: string;
  xIntercepts: string;
  derivativeText: string;
}

export interface PracticeProblem {
  id: string;
  unit: string;
  prompt: string;
  hint: string;
  expectedValue: number;
  tolerance: number;
  unitSuffix?: string;
  steps: string[];
}

export interface FormulaItem {
  id: string;
  category: 'Linear & Coordinate' | 'Quadratics' | 'Trigonometry' | 'Calculus';
  name: string;
  expression: string;
  notes: string;
}

function roundNum(val: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(val * factor) / factor;
}

export function formatSigned(val: number): string {
  const r = roundNum(val, 2);
  if (r >= 0) return `+ ${r}`;
  return `- ${Math.abs(r)}`;
}

export function evaluateEquationAt(params: EquationParams, x: number): number {
  if (params.mode === 'linear') {
    return params.m * x + params.b;
  }
  if (params.mode === 'quadratic') {
    return params.m * x * x + params.b * x + params.c;
  }
  return params.m * Math.sin(params.b * x) + params.c;
}

export function analyzeEquation(params: EquationParams): GraphAnalysis {
  const m = roundNum(params.m, 2);
  const b = roundNum(params.b, 2);
  const c = roundNum(params.c, 2);

  let equationText = '';
  let yInterceptVal = 0;
  let xIntercepts = 'None in domain';
  let derivativeText = '';

  if (params.mode === 'linear') {
    equationText = b === 0 ? `y = ${m}x` : `y = ${m}x ${formatSigned(b)}`;
    yInterceptVal = b;
    if (Math.abs(m) < 1e-6) {
      xIntercepts = Math.abs(b) < 1e-6 ? 'All real x' : 'None (horizontal)';
    } else {
      xIntercepts = `(${roundNum(-b / m, 2)}, 0)`;
    }
    derivativeText = `dy/dx = ${m}`;
  } else if (params.mode === 'quadratic') {
    equationText = `y = ${m}x² ${formatSigned(b)}x ${formatSigned(c)}`;
    yInterceptVal = c;
    if (Math.abs(m) < 1e-6) {
      xIntercepts = Math.abs(b) < 1e-6 ? 'None' : `(${roundNum(-c / b, 2)}, 0)`;
    } else {
      const disc = b * b - 4 * m * c;
      if (disc < -1e-6) {
        xIntercepts = 'No real roots (Δ < 0)';
      } else if (Math.abs(disc) <= 1e-6) {
        xIntercepts = `(${roundNum(-b / (2 * m), 2)}, 0)`;
      } else {
        const r1 = roundNum((-b - Math.sqrt(disc)) / (2 * m), 2);
        const r2 = roundNum((-b + Math.sqrt(disc)) / (2 * m), 2);
        xIntercepts = `(${r1}, 0), (${r2}, 0)`;
      }
    }
    derivativeText = `dy/dx = ${roundNum(2 * m, 2)}x ${formatSigned(b)}`;
  } else {
    equationText = c === 0 ? `y = ${m}·sin(${b}x)` : `y = ${m}·sin(${b}x) ${formatSigned(c)}`;
    yInterceptVal = c;
    xIntercepts = Math.abs(m) >= Math.abs(c) ? 'Periodic intersections' : 'None';
    derivativeText = `dy/dx = ${roundNum(m * b, 2)}·cos(${b}x)`;
  }

  const points: Array<{ x: number; y: number }> = [];
  for (let i = -100; i <= 100; i++) {
    const x = i / 10;
    points.push({ x, y: evaluateEquationAt(params, x) });
  }

  return {
    equationText,
    points,
    yIntercept: `(0, ${roundNum(yInterceptVal, 2)})`,
    xIntercepts,
    derivativeText,
  };
}

export function generatePracticeProblem(seedIndex: number = 0): PracticeProblem {
  const presets: PracticeProblem[] = [
    {
      id: 'lin-intercept-1',
      unit: 'Unit 3 · Linear Functions',
      prompt: 'For the line y = 1.5x + 1, what is the value of y when x = 4?',
      hint: 'Substitute x = 4 directly into y = 1.5(4) + 1.',
      expectedValue: 7,
      tolerance: 0.01,
      steps: ['Start with y = 1.5x + 1', 'Substitute x = 4 -> y = 1.5(4) + 1', 'Multiply: 6 + 1 = 7'],
    },
    {
      id: 'lin-slope-2',
      unit: 'Unit 3 · Slope & Rate of Change',
      prompt: 'Find the slope m of the line passing through points (2, 3) and (6, 11).',
      hint: 'Use m = (y₂ - y₁) / (x₂ - x₁).',
      expectedValue: 2,
      tolerance: 0.01,
      steps: ['m = (11 - 3) / (6 - 2)', 'm = 8 / 4', 'm = 2'],
    },
    {
      id: 'quad-vertex-3',
      unit: 'Unit 4 · Quadratic Vertex',
      prompt: 'What is the x-coordinate of the vertex of y = x² - 6x + 5?',
      hint: 'Use the axis of symmetry formula x = -b / (2a).',
      expectedValue: 3,
      tolerance: 0.01,
      steps: ['Here a = 1 and b = -6', 'x = -(-6) / (2 · 1)', 'x = 6 / 2 = 3'],
    },
    {
      id: 'calc-deriv-4',
      unit: 'Unit 6 · Differential Calculus',
      prompt: 'Evaluate the derivative f′(2) for f(x) = 3x² - 4x + 7.',
      hint: 'Apply the power rule first: f′(x) = 6x - 4.',
      expectedValue: 8,
      tolerance: 0.01,
      steps: ['Differentiate: f′(x) = 6x - 4', 'Plug in x = 2: 6(2) - 4', '12 - 4 = 8'],
    },
    {
      id: 'geom-hyp-5',
      unit: 'Unit 2 · Right Triangle Geometry',
      prompt: 'A right triangle has legs of length 6 and 8. What is the length of its hypotenuse?',
      hint: 'Apply the Pythagorean theorem: c = √(a² + b²).',
      expectedValue: 10,
      tolerance: 0.01,
      steps: ['a² + b² = 6² + 8² = 36 + 64 = 100', 'c = √100 = 10'],
    },
    {
      id: 'alg-solve-6',
      unit: 'Unit 1 · Linear Equations',
      prompt: 'Solve for x: 4x - 9 = 19.',
      hint: 'Add 9 to both sides, then divide by 4.',
      expectedValue: 7,
      tolerance: 0.01,
      steps: ['4x - 9 = 19', '4x = 28', 'x = 7'],
    },
  ];

  const idx = Math.abs(Math.floor(seedIndex)) % presets.length;
  return presets[idx];
}

export function checkPracticeAnswer(problem: PracticeProblem, rawInput: string): {
  isValidNumber: boolean;
  isCorrect: boolean;
  parsedValue: number | null;
} {
  const cleaned = String(rawInput || '').trim();
  if (!cleaned) {
    return { isValidNumber: false, isCorrect: false, parsedValue: null };
  }
  const num = Number(cleaned);
  if (!Number.isFinite(num)) {
    return { isValidNumber: false, isCorrect: false, parsedValue: null };
  }
  return {
    isValidNumber: true,
    isCorrect: Math.abs(num - problem.expectedValue) <= problem.tolerance,
    parsedValue: num,
  };
}

export const FORMULA_SHEET_ITEMS: FormulaItem[] = [
  {
    id: 'f-slope',
    category: 'Linear & Coordinate',
    name: 'Slope-Intercept Form',
    expression: 'y = mx + b',
    notes: 'm = (y₂ - y₁) / (x₂ - x₁) represents constant rate of change; b is the y-intercept.',
  },
  {
    id: 'f-distance',
    category: 'Linear & Coordinate',
    name: 'Euclidean Distance Formula',
    expression: 'd = √((x₂ - x₁)² + (y₂ - y₁)²)',
    notes: 'Measures straight-line separation between any two points on the Cartesian plane.',
  },
  {
    id: 'f-quad',
    category: 'Quadratics',
    name: 'Quadratic Formula',
    expression: 'x = (-b ± √(b² - 4ac)) / (2a)',
    notes: 'Solves ax² + bx + c = 0; discriminant Δ = b² - 4ac determines real root count.',
  },
  {
    id: 'f-vertex',
    category: 'Quadratics',
    name: 'Vertex & Axis of Symmetry',
    expression: 'h = -b / (2a), k = f(h)',
    notes: 'Locates the global extremum of a parabola f(x) = a(x - h)² + k.',
  },
  {
    id: 'f-pyth-trig',
    category: 'Trigonometry',
    name: 'Pythagorean Identity',
    expression: 'sin²(θ) + cos²(θ) = 1',
    notes: 'Derived directly from unit circle coordinates (cos θ, sin θ).',
  },
  {
    id: 'f-law-cos',
    category: 'Trigonometry',
    name: 'Law of Cosines',
    expression: 'c² = a² + b² - 2ab·cos(C)',
    notes: 'Generalizes the Pythagorean theorem to any triangle with included angle C.',
  },
  {
    id: 'f-power-rule',
    category: 'Calculus',
    name: 'Power Rule for Derivatives',
    expression: 'd/dx [xⁿ] = n·xⁿ⁻¹',
    notes: 'Computes instantaneous slope of polynomial terms for any real exponent n.',
  },
  {
    id: 'f-ftc',
    category: 'Calculus',
    name: 'Fundamental Theorem of Calculus',
    expression: '∫ₐᵇ f(x) dx = F(b) - F(a)',
    notes: 'Links definite area accumulation directly to any antiderivative F where F′ = f.',
  },
];
