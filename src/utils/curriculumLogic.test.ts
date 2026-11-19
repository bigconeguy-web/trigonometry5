import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterModules,
  sortModules,
  sanitizeIframeInput,
  validateModuleInput,
  calculateAcademicStanding,
  resolveIframeSrc,
} from './curriculumLogic';
import { AcademicModule } from '../types/curriculum';

const sampleModules: AcademicModule[] = [
  {
    id: 'mod-1',
    courseCode: 'MATH-2048',
    title: 'Binary Matrix Reduction',
    department: 'Applied Mathematics',
    level: 'Undergraduate Practicum',
    estimatedDuration: '15 min session',
    description: 'An algebraic exercise in orthogonal vector combination.',
    academicObjective: 'Synthesize 2048.',
    instrumentDirectives: 'Arrow keys.',
    learningOutcomes: ['Packing heuristics'],
    defaultHonorsIndex: 2048,
    iframeSrc: '/modules/matrix_2048.html',
    tags: ['Applied Math', 'Exponents'],
  },
  {
    id: 'mod-2',
    courseCode: 'GEOM-101',
    title: 'Orthogonal Polyomino Tessellation',
    department: 'Spatial Geometry',
    level: 'Introductory Seminar',
    estimatedDuration: '10 min drill',
    description: 'Geometric spatial organization laboratory.',
    academicObjective: 'Eliminate horizontal strata.',
    instrumentDirectives: 'Left/Right/Space.',
    learningOutcomes: ['Space optimization'],
    defaultHonorsIndex: 12000,
    iframeSrc: '/modules/tessellation_tetris.html',
    tags: ['Geometry', 'Tessellation'],
  },
  {
    id: 'mod-3',
    courseCode: 'CS-102',
    title: 'Linear Vector Traversal',
    department: 'Algorithmic Logic',
    level: 'Foundational Drill',
    estimatedDuration: '10 min practicum',
    description: 'Simulation of dynamic memory nodes.',
    academicObjective: 'Absorb coordinate data.',
    instrumentDirectives: 'WASD.',
    learningOutcomes: ['Pathfinding'],
    defaultHonorsIndex: 50,
    iframeSrc: '/modules/snake_traversal.html',
    tags: ['Algorithms', 'Logic'],
  },
];

test('filterModules correctly filters by department', () => {
  const result = filterModules(sampleModules, '', 'Spatial Geometry');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'mod-2');
});

test('filterModules correctly filters by search keyword', () => {
  const result = filterModules(sampleModules, 'matrix', 'All Disciplines');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'mod-1');
});

test('filterModules filters by bookmarked ids', () => {
  const bookmarks = new Set(['mod-2', 'mod-3']);
  const result = filterModules(sampleModules, '', 'All Disciplines', true, bookmarks);
  assert.equal(result.length, 2);
  assert.deepEqual(
    result.map((m) => m.id),
    ['mod-2', 'mod-3']
  );
});

test('sortModules sorts by course code ascending and honors index', () => {
  const sortedCode = sortModules(sampleModules, 'code-asc');
  assert.equal(sortedCode[0].courseCode, 'CS-102');
  assert.equal(sortedCode[2].courseCode, 'MATH-2048');

  const sortedHonors = sortModules(sampleModules, 'honors-desc');
  assert.equal(sortedHonors[0].id, 'mod-2'); // 12000
  assert.equal(sortedHonors[1].id, 'mod-1'); // 2048
  assert.equal(sortedHonors[2].id, 'mod-3'); // 50
});

test('sanitizeIframeInput strips raw iframe tag to extract clean src', () => {
  const embedCode = '<iframe src="https://example.edu/lab/module" width="600" height="400"></iframe>';
  assert.equal(sanitizeIframeInput(embedCode), 'https://example.edu/lab/module');

  const directUrl = 'https://example.edu/sim';
  assert.equal(sanitizeIframeInput(directUrl), 'https://example.edu/sim');
});

test('validateModuleInput verifies valid and invalid input fields', () => {
  const valid = validateModuleInput({
    title: 'Calculus Grapher',
    courseCode: 'MATH-301',
    department: 'Applied Mathematics',
    iframeSrc: 'https://calculator.net/graph',
  });
  assert.equal(valid.isValid, true);
  assert.equal(valid.sanitizedSrc, 'https://calculator.net/graph');

  const missingTitle = validateModuleInput({
    title: '',
    courseCode: 'MATH-301',
    department: 'Applied Mathematics',
    iframeSrc: 'https://calculator.net/graph',
  });
  assert.equal(missingTitle.isValid, false);
  assert.match(missingTitle.error!, /title is required/i);
});

test('calculateAcademicStanding maps score ratios to scholastic honors', () => {
  assert.equal(calculateAcademicStanding(2500, 2048).grade, 'A (High Honors)');
  assert.equal(calculateAcademicStanding(4000, 2048).grade, 'Summa Cum Laude');
  assert.equal(calculateAcademicStanding(1100, 2048).grade, 'B (Competent)');
  assert.equal(calculateAcademicStanding(0, 2048).grade, 'Audit');
});

test('resolveIframeSrc resolves relative and absolute paths correctly for subpath hosting', () => {
  assert.equal(resolveIframeSrc('/modules/matrix_2048.html', './'), './modules/matrix_2048.html');
  assert.equal(resolveIframeSrc('modules/matrix_2048.html', './'), './modules/matrix_2048.html');
  assert.equal(resolveIframeSrc('/modules/matrix_2048.html', '/Curriculum-tasks/'), '/Curriculum-tasks/modules/matrix_2048.html');
  assert.equal(resolveIframeSrc('https://example.edu/sim'), 'https://example.edu/sim');
  assert.equal(resolveIframeSrc('data:text/html,test'), 'data:text/html,test');
});

