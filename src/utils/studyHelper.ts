export type StudyResponseStyle = 'concise' | 'balanced' | 'detailed';

export interface FlashcardItem {
  front: string;
  back: string;
}

export interface TextSummaryResult {
  wordCount: number;
  charCount: number;
  readingTimeMinutes: number;
  sentences: string[];
  bullets: string[];
  keywords: string[];
}

export interface MathSolveResult {
  matched: boolean;
  kind?: 'arithmetic' | 'percentage' | 'equation' | 'conversion';
  expression?: string;
  answer?: string;
  steps: string[];
}

export type StudyAssistantReply =
  | {
      kind: 'math';
      title: string;
      text: string;
      math: MathSolveResult;
    }
  | {
      kind: 'flashcards';
      title: string;
      text: string;
      cards: FlashcardItem[];
    }
  | {
      kind: 'summary';
      title: string;
      text: string;
      summary: TextSummaryResult;
    }
  | {
      kind: 'help';
      title: string;
      text: string;
    };

const STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'also', 'am', 'an', 'and', 'any',
  'are', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both',
  'but', 'by', 'can', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few',
  'for', 'from', 'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers',
  'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its',
  'itself', 'just', 'like', 'make', 'many', 'may', 'me', 'more', 'most', 'my', 'myself',
  'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'our', 'ours',
  'ourselves', 'out', 'over', 'own', 'same', 'she', 'should', 'so', 'some', 'such', 'than',
  'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they',
  'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'use', 'very', 'was',
  'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will',
  'with', 'would', 'you', 'your', 'yours', 'yourself', 'yourselves', 'using', 'used'
]);

function roundClean(num: number): number {
  if (!Number.isFinite(num)) return NaN;
  const rounded = Math.round(num * 1e10) / 1e10;
  return Object.is(rounded, -0) ? 0 : rounded;
}

export function formatNumberClean(num: number): string {
  if (!Number.isFinite(num)) return 'Undefined';
  const r = roundClean(num);
  return String(r);
}

export function extractKeywords(text: string, limit = 6): string[] {
  const words = (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOPWORDS.has(w) && !/^\d+$/.test(w));

  const counts = new Map<string, number>();
  for (const w of words) {
    counts.set(w, (counts.get(w) || 0) + 1);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([word]) => word);
}

export function summarizeStudyText(
  rawText: string,
  style: StudyResponseStyle = 'balanced'
): TextSummaryResult {
  const cleaned = String(rawText || '').trim();
  const wordTokens = cleaned ? cleaned.split(/\s+/).filter(Boolean) : [];
  const wordCount = wordTokens.length;
  const charCount = cleaned.length;
  const readingTimeMinutes = wordCount === 0 ? 0 : Math.max(1, Math.ceil(wordCount / 200));
  const keywords = extractKeywords(cleaned, style === 'concise' ? 4 : style === 'detailed' ? 8 : 6);

  if (!cleaned) {
    return {
      wordCount: 0,
      charCount: 0,
      readingTimeMinutes: 0,
      sentences: [],
      bullets: [],
      keywords: []
    };
  }

  // Split into sentence candidates by punctuation or newlines
  const rawSegments = cleaned
    .replace(/\r\n/g, '\n')
    .split(/(?<=[.!?])\s+|\n+/g)
    .map((s) => s.replace(/^[-*\u2022\d.)\s]+/, '').trim())
    .filter((s) => s.length >= 8);

  const uniqueSegments: string[] = [];
  const seenSeg = new Set<string>();
  for (const seg of rawSegments) {
    const key = seg.toLowerCase();
    if (!seenSeg.has(key)) {
      seenSeg.add(key);
      uniqueSegments.push(seg);
    }
  }

  const keywordWeights = new Map<string, number>();
  keywords.forEach((kw, idx) => keywordWeights.set(kw, keywords.length - idx));

  const scored = uniqueSegments.map((sentence, idx) => {
    const tokens = sentence.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/);
    let score = 0;
    for (const tok of tokens) {
      if (keywordWeights.has(tok)) {
        score += keywordWeights.get(tok) || 0;
      }
    }
    // Slight preference for early thesis sentences & definitions with colons
    if (idx === 0) score += 2.5;
    if (/:/.test(sentence)) score += 1.5;
    // Penalize overly short fragments slightly
    if (tokens.length < 4) score -= 1;
    return { sentence, idx, score };
  });

  const targetCount = style === 'concise' ? 3 : style === 'detailed' ? 5 : 4;
  const topScored = scored
    .slice()
    .sort((a, b) => b.score - a.score || a.idx - b.idx)
    .slice(0, Math.min(targetCount, scored.length))
    .sort((a, b) => a.idx - b.idx);

  const sentences = topScored.map((s) => {
    const t = s.sentence.trim();
    return /[.!?]$/.test(t) ? t : `${t}.`;
  });

  const bullets = topScored.map((s) => {
    const body = s.sentence.trim().replace(/[.!?]+$/, '');
    return body.length > 140 ? `${body.slice(0, 137).trim()}...` : body;
  });

  return {
    wordCount,
    charCount,
    readingTimeMinutes,
    sentences,
    bullets,
    keywords
  };
}

export function parseFlashcardsFromText(rawText: string): FlashcardItem[] {
  const lines = String(rawText || '')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.replace(/^[-*\u2022]\s+/, '').trim())
    .filter(Boolean);

  const cards: FlashcardItem[] = [];
  const seenFronts = new Set<string>();

  for (const line of lines) {
    // Support "Term: Definition" or "Term - Definition" / em-dash / en-dash
    let front = '';
    let back = '';

    const colonIdx = line.indexOf(':');
    const dashMatch = line.match(/\s+[-–—]\s+|->|=>/);

    if (colonIdx > 0 && colonIdx < 80) {
      front = line.slice(0, colonIdx).trim();
      back = line.slice(colonIdx + 1).trim();
    } else if (dashMatch && typeof dashMatch.index === 'number' && dashMatch.index > 0) {
      front = line.slice(0, dashMatch.index).trim();
      back = line.slice(dashMatch.index + dashMatch[0].length).trim();
    }

    if (!front || !back || front.length > 90) continue;
    const key = front.toLowerCase();
    if (seenFronts.has(key)) continue;
    seenFronts.add(key);
    cards.push({ front, back });
  }

  return cards;
}

// Safe recursive-descent math expression evaluator (no eval / no Function)
type Token =
  | { type: 'num'; value: number }
  | { type: 'id'; value: string }
  | { type: 'op'; value: string }
  | { type: 'lparen' }
  | { type: 'rparen' };

function tokenizeMath(expr: string): Token[] | null {
  const tokens: Token[] = [];
  let i = 0;
  while (i < expr.length) {
    const ch = expr[i];
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    if (/[0-9.]/.test(ch)) {
      let numStr = '';
      let dots = 0;
      while (i < expr.length && /[0-9.]/.test(expr[i])) {
        if (expr[i] === '.') dots++;
        if (dots > 1) return null;
        numStr += expr[i++];
      }
      const val = Number(numStr);
      if (!Number.isFinite(val)) return null;
      tokens.push({ type: 'num', value: val });
      continue;
    }
    if (/[a-zA-Zπ]/.test(ch)) {
      if (ch === 'π') {
        tokens.push({ type: 'id', value: 'pi' });
        i++;
        continue;
      }
      let id = '';
      while (i < expr.length && /[a-zA-Z0-9_]/.test(expr[i])) {
        id += expr[i++];
      }
      tokens.push({ type: 'id', value: id.toLowerCase() });
      continue;
    }
    if (ch === '(') {
      tokens.push({ type: 'lparen' });
      i++;
      continue;
    }
    if (ch === ')') {
      tokens.push({ type: 'rparen' });
      i++;
      continue;
    }
    if ('+-*/^%'.includes(ch)) {
      tokens.push({ type: 'op', value: ch });
      i++;
      continue;
    }
    if (ch === '×') {
      tokens.push({ type: 'op', value: '*' });
      i++;
      continue;
    }
    if (ch === '÷') {
      tokens.push({ type: 'op', value: '/' });
      i++;
      continue;
    }
    if (ch === '−') {
      tokens.push({ type: 'op', value: '-' });
      i++;
      continue;
    }
    return null;
  }
  return tokens;
}

const MATH_FUNCS: Record<string, (v: number) => number> = {
  sqrt: Math.sqrt,
  abs: Math.abs,
  sin: (degOrRad: number) => Math.sin((degOrRad * Math.PI) / 180),
  cos: (degOrRad: number) => Math.cos((degOrRad * Math.PI) / 180),
  tan: (degOrRad: number) => Math.tan((degOrRad * Math.PI) / 180),
  sinrad: Math.sin,
  cosrad: Math.cos,
  tanrad: Math.tan,
  log: Math.log10,
  ln: Math.log,
  floor: Math.floor,
  ceil: Math.ceil,
  round: Math.round
};

export function evaluateSafeArithmetic(rawExpr: string): number | null {
  const cleaned = String(rawExpr || '')
    .replace(/,/g, '')
    .replace(/√\s*\(/g, 'sqrt(')
    .replace(/√\s*([0-9.]+)/g, 'sqrt($1)')
    .trim();
  if (!cleaned) return null;

  const tokens = tokenizeMath(cleaned);
  if (!tokens || tokens.length === 0) return null;
  const tokenList: Token[] = tokens;

  let pos = 0;
  const peek = (): Token | undefined => tokenList[pos];
  const peekOp = (): string | null => {
    const t = tokenList[pos];
    return t && t.type === 'op' ? t.value : null;
  };
  const consume = (): Token | undefined => tokenList[pos++];

  function parseExpression(): number {
    let left = parseTerm();
    while (peekOp() === '+' || peekOp() === '-') {
      const op = (consume() as { type: 'op'; value: string }).value;
      const right = parseTerm();
      left = op === '+' ? left + right : left - right;
    }
    return left;
  }

  function parseTerm(): number {
    let left = parsePower();
    while (peekOp() === '*' || peekOp() === '/' || peekOp() === '%') {
      const op = (consume() as { type: 'op'; value: string }).value;
      const right = parsePower();
      if (op === '*') left *= right;
      else if (op === '/') {
        if (right === 0) throw new Error('Division by zero');
        left /= right;
      } else {
        if (right === 0) throw new Error('Modulo by zero');
        left %= right;
      }
    }
    return left;
  }

  function parsePower(): number {
    const base = parseUnary();
    if (peekOp() === '^') {
      consume();
      const exp = parsePower();
      return Math.pow(base, exp);
    }
    return base;
  }

  function parseUnary(): number {
    if (peekOp() === '+' || peekOp() === '-') {
      const op = (consume() as { type: 'op'; value: string }).value;
      const val = parseUnary();
      return op === '-' ? -val : val;
    }
    return parsePrimary();
  }

  function parsePrimary(): number {
    const tok = peek();
    if (!tok) throw new Error('Unexpected end of expression');

    if (tok.type === 'num') {
      consume();
      // Support percentage suffix like "15%"
      if (peekOp() === '%') {
        const nextAfterPct = tokenList[pos + 1];
        if (!nextAfterPct || nextAfterPct.type === 'op' || nextAfterPct.type === 'rparen') {
          consume();
          return tok.value / 100;
        }
      }
      // Implicit multiplication e.g. 2(3+4)
      if (peek()?.type === 'lparen') {
        return tok.value * parsePrimary();
      }
      return tok.value;
    }

    if (tok.type === 'id') {
      consume();
      if (tok.value === 'pi') return Math.PI;
      if (tok.value === 'e') return Math.E;
      const fn = MATH_FUNCS[tok.value];
      if (!fn) throw new Error('Unknown identifier');
      if (peek()?.type !== 'lparen') throw new Error('Expected (');
      consume();
      const arg = parseExpression();
      if (peek()?.type !== 'rparen') throw new Error('Expected )');
      consume();
      return fn(arg);
    }

    if (tok.type === 'lparen') {
      consume();
      const inner = parseExpression();
      if (peek()?.type !== 'rparen') throw new Error('Expected )');
      consume();
      if (peek()?.type === 'lparen') {
        return inner * parsePrimary();
      }
      return inner;
    }

    throw new Error('Unexpected token');
  }

  try {
    const value = parseExpression();
    if (pos !== tokens.length || !Number.isFinite(value)) return null;
    return roundClean(value);
  } catch {
    return null;
  }
}

const UNIT_FACTORS: Record<string, { category: string; baseFactor: number; label: string }> = {
  m: { category: 'length', baseFactor: 1, label: 'm' },
  meter: { category: 'length', baseFactor: 1, label: 'm' },
  meters: { category: 'length', baseFactor: 1, label: 'm' },
  km: { category: 'length', baseFactor: 1000, label: 'km' },
  kilometer: { category: 'length', baseFactor: 1000, label: 'km' },
  kilometers: { category: 'length', baseFactor: 1000, label: 'km' },
  cm: { category: 'length', baseFactor: 0.01, label: 'cm' },
  mm: { category: 'length', baseFactor: 0.001, label: 'mm' },
  mi: { category: 'length', baseFactor: 1609.344, label: 'mi' },
  mile: { category: 'length', baseFactor: 1609.344, label: 'mi' },
  miles: { category: 'length', baseFactor: 1609.344, label: 'mi' },
  ft: { category: 'length', baseFactor: 0.3048, label: 'ft' },
  foot: { category: 'length', baseFactor: 0.3048, label: 'ft' },
  feet: { category: 'length', baseFactor: 0.3048, label: 'ft' },
  in: { category: 'length', baseFactor: 0.0254, label: 'in' },
  inch: { category: 'length', baseFactor: 0.0254, label: 'in' },
  inches: { category: 'length', baseFactor: 0.0254, label: 'in' },
  yd: { category: 'length', baseFactor: 0.9144, label: 'yd' },
  yards: { category: 'length', baseFactor: 0.9144, label: 'yd' },

  kg: { category: 'mass', baseFactor: 1000, label: 'kg' },
  g: { category: 'mass', baseFactor: 1, label: 'g' },
  gram: { category: 'mass', baseFactor: 1, label: 'g' },
  grams: { category: 'mass', baseFactor: 1, label: 'g' },
  lb: { category: 'mass', baseFactor: 453.59237, label: 'lb' },
  lbs: { category: 'mass', baseFactor: 453.59237, label: 'lb' },
  pound: { category: 'mass', baseFactor: 453.59237, label: 'lb' },
  pounds: { category: 'mass', baseFactor: 453.59237, label: 'lb' },
  oz: { category: 'mass', baseFactor: 28.349523125, label: 'oz' },

  s: { category: 'time', baseFactor: 1, label: 's' },
  sec: { category: 'time', baseFactor: 1, label: 's' },
  min: { category: 'time', baseFactor: 60, label: 'min' },
  mins: { category: 'time', baseFactor: 60, label: 'min' },
  minute: { category: 'time', baseFactor: 60, label: 'min' },
  minutes: { category: 'time', baseFactor: 60, label: 'min' },
  hr: { category: 'time', baseFactor: 3600, label: 'hr' },
  hrs: { category: 'time', baseFactor: 3600, label: 'hr' },
  hour: { category: 'time', baseFactor: 3600, label: 'hr' },
  hours: { category: 'time', baseFactor: 3600, label: 'hr' },
  day: { category: 'time', baseFactor: 86400, label: 'day' },
  days: { category: 'time', baseFactor: 86400, label: 'days' },

  c: { category: 'temp', baseFactor: 1, label: '°C' },
  celsius: { category: 'temp', baseFactor: 1, label: '°C' },
  f: { category: 'temp', baseFactor: 1, label: '°F' },
  fahrenheit: { category: 'temp', baseFactor: 1, label: '°F' },
  k: { category: 'temp', baseFactor: 1, label: 'K' },
  kelvin: { category: 'temp', baseFactor: 1, label: 'K' }
};

function solveLinearEquation(raw: string): MathSolveResult | null {
  const cleaned = raw
    .replace(/^(?:solve|find\s+x\s*(?:for|in)?)\s*/i, '')
    .replace(/\s+/g, '');
  const eqParts = cleaned.split('=');
  if (eqParts.length !== 2 || !/[a-z]/i.test(cleaned)) return null;

  const varMatch = cleaned.match(/[a-z]/i);
  const variable = varMatch ? varMatch[0] : 'x';
  const sideToLinear = (side: string): { a: number; b: number } | null => {
    const terms = side.match(/[+-]?[^+-]+/g);
    if (!terms) return null;
    let a = 0;
    let b = 0;
    for (const term of terms) {
      if (term.toLowerCase().endsWith(variable.toLowerCase())) {
        const coeffStr = term.slice(0, -1);
        if (coeffStr === '' || coeffStr === '+') a += 1;
        else if (coeffStr === '-') a -= 1;
        else {
          const v = Number(coeffStr);
          if (!Number.isFinite(v)) return null;
          a += v;
        }
      } else {
        const v = Number(term);
        if (!Number.isFinite(v)) return null;
        b += v;
      }
    }
    return { a, b };
  };

  const lhs = sideToLinear(eqParts[0]);
  const rhs = sideToLinear(eqParts[1]);
  if (!lhs || !rhs) return null;

  const netA = lhs.a - rhs.a;
  const netB = rhs.b - lhs.b;
  if (Math.abs(netA) < 1e-12) return null;

  const sol = roundClean(netB / netA);
  return {
    matched: true,
    kind: 'equation',
    expression: `${eqParts[0]} = ${eqParts[1]}`,
    answer: `${variable} = ${formatNumberClean(sol)}`,
    steps: [
      `Combine ${variable}-terms on the left: ${formatNumberClean(netA)}${variable} = ${formatNumberClean(netB)}`,
      `Divide both sides by ${formatNumberClean(netA)}`,
      `${variable} = ${formatNumberClean(sol)}`
    ]
  };
}

export function solveMathOrUnit(rawQuery: string): MathSolveResult {
  const q = String(rawQuery || '').trim();
  if (!q) return { matched: false, steps: [] };

  // 1. Percentage phrase: "15% of 80" or "what is 20% off 150"
  const pctOfMatch = q.match(
    /(?:what\s+is\s+|calculate\s+)?(-?\d+(?:\.\d+)?)\s*%\s*(of|off|on)\s*(-?\d+(?:\.\d+)?)/i
  );
  if (pctOfMatch) {
    const pct = parseFloat(pctOfMatch[1]);
    const prep = pctOfMatch[2].toLowerCase();
    const base = parseFloat(pctOfMatch[3]);
    const part = roundClean((pct / 100) * base);
    if (prep === 'off') {
      const finalVal = roundClean(base - part);
      return {
        matched: true,
        kind: 'percentage',
        expression: `${pct}% off ${base}`,
        answer: formatNumberClean(finalVal),
        steps: [
          `${pct}% of ${base} = (${pct} / 100) × ${base} = ${formatNumberClean(part)}`,
          `${base} − ${formatNumberClean(part)} = ${formatNumberClean(finalVal)}`
        ]
      };
    }
    return {
      matched: true,
      kind: 'percentage',
      expression: `${pct}% of ${base}`,
      answer: formatNumberClean(part),
      steps: [
        `Convert ${pct}% to decimal: ${roundClean(pct / 100)}`,
        `${roundClean(pct / 100)} × ${base} = ${formatNumberClean(part)}`
      ]
    };
  }

  // 2. Unit conversion: "convert 10 km to miles" or "72 F to C"
  const unitMatch = q.match(
    /(?:convert\s+)?(-?\d+(?:\.\d+)?)\s*°?\s*([a-z]+)\s+(?:to|in|into)\s+°?\s*([a-z]+)/i
  );
  if (unitMatch) {
    const val = parseFloat(unitMatch[1]);
    const fromKey = unitMatch[2].toLowerCase();
    const toKey = unitMatch[3].toLowerCase();
    const fromU = UNIT_FACTORS[fromKey];
    const toU = UNIT_FACTORS[toKey];
    if (fromU && toU && fromU.category === toU.category) {
      let resultVal: number;
      if (fromU.category === 'temp') {
        let celsius = val;
        if (fromU.label === '°F') celsius = ((val - 32) * 5) / 9;
        else if (fromU.label === 'K') celsius = val - 273.15;
        if (toU.label === '°C') resultVal = celsius;
        else if (toU.label === '°F') resultVal = (celsius * 9) / 5 + 32;
        else resultVal = celsius + 273.15;
      } else {
        resultVal = (val * fromU.baseFactor) / toU.baseFactor;
      }
      const cleanRes = roundClean(resultVal);
      return {
        matched: true,
        kind: 'conversion',
        expression: `${val} ${fromU.label} → ${toU.label}`,
        answer: `${formatNumberClean(cleanRes)} ${toU.label}`,
        steps: [
          `Converting ${val} ${fromU.label} (${fromU.category}) to ${toU.label}`,
          `Result: ${formatNumberClean(cleanRes)} ${toU.label}`
        ]
      };
    }
  }

  // 3. Linear equation with "="
  if (q.includes('=')) {
    const eqRes = solveLinearEquation(q);
    if (eqRes) return eqRes;
  }

  // 4. Direct arithmetic / scientific expression (with optional "what is" / "calculate" / "solve")
  const stripped = q
    .replace(/^(?:what\s+is|calculate|compute|evaluate|solve)\s+/i, '')
    .replace(/\?+$/, '')
    .trim();

  if (/[0-9π]|sqrt|sin|cos|tan|log|ln|abs|pow|floor|ceil|round/i.test(stripped)) {
    const arithVal = evaluateSafeArithmetic(stripped);
    if (arithVal !== null) {
      return {
        matched: true,
        kind: 'arithmetic',
        expression: stripped,
        answer: formatNumberClean(arithVal),
        steps: [`${stripped} = ${formatNumberClean(arithVal)}`]
      };
    }
  }

  return { matched: false, steps: [] };
}

export function respondOfflineStudyQuery(
  prompt: string,
  noteContext?: { title?: string; body?: string } | null,
  style: StudyResponseStyle = 'balanced',
  forceFlashcards = false
): StudyAssistantReply {
  const cleanPrompt = String(prompt || '').trim();
  const noteBody = String(noteContext?.body || '').trim();
  const noteTitle = String(noteContext?.title || '').trim() || 'Active Note';

  // Flashcard generation mode (button or natural request)
  if (
    forceFlashcards ||
    /\b(?:flashcard|flashcards|flip\s*card|quiz\s*cards?)\b/i.test(cleanPrompt)
  ) {
    const sourceText = noteBody || cleanPrompt;
    const cards = parseFlashcardsFromText(sourceText);
    if (cards.length > 0) {
      return {
        kind: 'flashcards',
        title: `Generated ${cards.length} Flashcard${cards.length === 1 ? '' : 's'}`,
        text: `Built ${cards.length} interactive flip-card${cards.length === 1 ? '' : 's'} locally. Click any card below to reveal its definition.`,
        cards
      };
    }
    return {
      kind: 'help',
      title: 'No Flashcard Pairs Detected',
      text: 'To generate flashcards, write lines containing a colon or dash (for example:\n`Photosynthesis: how plants make food`\n`Mitochondria - powerhouse of the cell`)\nin your Notepad (and toggle Attach Active Note) or paste them directly here.'
    };
  }

  // Check Math / Unit Solver first when user isn't explicitly asking to summarize a long note
  const mathRes = solveMathOrUnit(cleanPrompt);
  if (mathRes.matched) {
    return {
      kind: 'math',
      title:
        mathRes.kind === 'equation'
          ? 'Equation Solution'
          : mathRes.kind === 'conversion'
            ? 'Unit Conversion'
            : mathRes.kind === 'percentage'
              ? 'Percentage Calculation'
              : 'Math Result',
      text: `${mathRes.expression} = ${mathRes.answer}`,
      math: mathRes
    };
  }

  // Determine source text for local note summarization & keyword extraction
  const wantsSummary =
    /\b(?:summarize|summary|keywords?|key\s*points?|bullets?|analyze|read\s*time|word\s*count)\b/i.test(
      cleanPrompt
    );
  const candidateText =
    noteBody && (wantsSummary || cleanPrompt.length < 40)
      ? noteBody
      : cleanPrompt.length >= 40
        ? cleanPrompt
        : noteBody || cleanPrompt;

  const summary = summarizeStudyText(candidateText, style);

  if (summary.wordCount >= 6 || noteBody) {
    const titleLabel =
      candidateText === noteBody ? `Summary · ${noteTitle}` : 'Instant Summary & Keywords';
    const bulletLines = summary.bullets.map((b) => `• ${b}`).join('\n');
    const keywordLine = summary.keywords.length
      ? `Keywords: ${summary.keywords.join(', ')}`
      : 'Keywords: none extracted';
    const text = `${summary.wordCount} words · ~${summary.readingTimeMinutes} min read\n\n${bulletLines}\n\n${keywordLine}`;
    return {
      kind: 'summary',
      title: titleLabel,
      text,
      summary
    };
  }

  return {
    kind: 'help',
    title: 'Offline Study & Math Helper',
    text: 'Try:\n• Math & units: `24 * 18`, `sqrt(144)`, `15% of 80`, `solve 2x + 4 = 12`, or `10 km to miles`\n• Note analyzer: toggle **Attach Active Note** or paste a paragraph to extract key sentences, bullets, keywords, and reading time\n• Flashcards: click **Turn Note Into Flashcards** with lines like `Term: Definition`'
  };
}
