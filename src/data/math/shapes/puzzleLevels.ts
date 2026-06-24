import type { PuzzleLevel, GridShape } from './types';

const UNIT_SQUARE: GridShape = { type: 'square', gridW: 1, gridH: 1, path: 'M0,0 L1,0 L1,1 L0,1 Z', color: '#60a5fa', label: '正方形' };
const UNIT_TRIANGLE_BR: GridShape = { type: 'triangle', gridW: 1, gridH: 1, path: 'M0,0 L1,0 L1,1 Z', color: '#fb923c', label: '三角形' };
const UNIT_TRIANGLE_BL: GridShape = { type: 'triangle', gridW: 1, gridH: 1, path: 'M0,0 L1,0 L0,1 Z', color: '#f472b6', label: '三角形' };
const RECT_2x1: GridShape = { type: 'rectangle', gridW: 2, gridH: 1, path: 'M0,0 L2,0 L2,1 L0,1 Z', color: '#4ade80', label: '长方形' };
const LARGE_TRIANGLE: GridShape = { type: 'triangle', gridW: 2, gridH: 2, path: 'M1,0 L2,2 L0,2 Z', color: '#a78bfa', label: '大三角形' };
const PARALLELOGRAM_2x1: GridShape = { type: 'parallelogram', gridW: 2, gridH: 1, path: 'M0.5,0 L2,0 L1.5,1 L0,1 Z', color: '#facc15', label: '平行四边形' };

export const PUZZLE_LEVELS: PuzzleLevel[] = [
  {
    id: 'p-b1', title: '2 个三角形 → 正方形', difficulty: 'beginner',
    gridSize: { cols: 2, rows: 2 }, targetOutline: 'M0,0 L2,0 L2,2 L0,2 Z',
    availablePieces: [{ ...UNIT_TRIANGLE_BR, color: '#fdba74' }, { ...UNIT_TRIANGLE_BL, color: '#fb923c' }],
    solutionPlacements: [{ shapeIndex: 0, gridX: 0, gridY: 0, rotation: 0, flipH: false }, { shapeIndex: 1, gridX: 0, gridY: 0, rotation: 180, flipH: false }],
    transformHint: '发现：2 个三角形可以拼成 1 个正方形！',
  },
  {
    id: 'p-b2', title: '2 个正方形 → 长方形', difficulty: 'beginner',
    gridSize: { cols: 2, rows: 1 }, targetOutline: 'M0,0 L2,0 L2,1 L0,1 Z',
    availablePieces: [{ ...UNIT_SQUARE, color: '#86efac' }, { ...UNIT_SQUARE, color: '#4ade80' }],
    solutionPlacements: [{ shapeIndex: 0, gridX: 0, gridY: 0, rotation: 0, flipH: false }, { shapeIndex: 1, gridX: 1, gridY: 0, rotation: 0, flipH: false }],
    transformHint: '发现：2 个正方形排一排就变成了长方形！',
  },
  {
    id: 'p-b3', title: '2 个三角形 → 长方形', difficulty: 'beginner',
    gridSize: { cols: 2, rows: 1 }, targetOutline: 'M0,0 L2,0 L2,1 L0,1 Z',
    availablePieces: [{ ...UNIT_TRIANGLE_BR, color: '#93c5fd' }, { ...UNIT_TRIANGLE_BL, color: '#60a5fa' }],
    solutionPlacements: [{ shapeIndex: 0, gridX: 0, gridY: 0, rotation: 0, flipH: false }, { shapeIndex: 1, gridX: 1, gridY: 0, rotation: 0, flipH: false }],
    transformHint: '发现：2 个三角形也能拼成长方形！',
  },
  {
    id: 'p-i1', title: '4 个正方形 → 大正方形', difficulty: 'intermediate',
    gridSize: { cols: 2, rows: 2 }, targetOutline: 'M0,0 L2,0 L2,2 L0,2 Z',
    availablePieces: [{ ...UNIT_SQUARE, color: '#86efac' }, { ...UNIT_SQUARE, color: '#4ade80' }, { ...UNIT_SQUARE, color: '#34d399' }, { ...UNIT_SQUARE, color: '#22c55e' }],
    solutionPlacements: [{ shapeIndex: 0, gridX: 0, gridY: 0, rotation: 0, flipH: false }, { shapeIndex: 1, gridX: 1, gridY: 0, rotation: 0, flipH: false }, { shapeIndex: 2, gridX: 0, gridY: 1, rotation: 0, flipH: false }, { shapeIndex: 3, gridX: 1, gridY: 1, rotation: 0, flipH: false }],
    transformHint: '发现：4 个小正方形可以拼成 1 个大正方形！',
  },
  {
    id: 'p-i2', title: '4 个三角形 → 大三角形', difficulty: 'intermediate',
    gridSize: { cols: 4, rows: 2 }, targetOutline: 'M2,0 L4,2 L0,2 Z',
    availablePieces: [{ ...UNIT_TRIANGLE_BR, color: '#fdba74' }, { ...UNIT_TRIANGLE_BL, color: '#fb923c' }, { ...UNIT_TRIANGLE_BR, color: '#f97316' }, { ...UNIT_TRIANGLE_BL, color: '#ea580c' }],
    solutionPlacements: [{ shapeIndex: 0, gridX: 1, gridY: 0, rotation: 0, flipH: false }, { shapeIndex: 1, gridX: 2, gridY: 0, rotation: 0, flipH: false }, { shapeIndex: 2, gridX: 0, gridY: 1, rotation: 0, flipH: false }, { shapeIndex: 3, gridX: 3, gridY: 1, rotation: 0, flipH: false }],
    transformHint: '发现：4 个小三角形可以拼成 1 个大三角形！',
  },
  {
    id: 'p-i3', title: '2 个三角形 → 平行四边形', difficulty: 'intermediate',
    gridSize: { cols: 3, rows: 2 }, targetOutline: 'M1,0 L3,0 L2,2 L0,2 Z',
    availablePieces: [{ ...LARGE_TRIANGLE, color: '#c4b5fd' }, { ...LARGE_TRIANGLE, color: '#a78bfa' }],
    solutionPlacements: [{ shapeIndex: 0, gridX: 0, gridY: 0, rotation: 0, flipH: false }, { shapeIndex: 1, gridX: 1, gridY: 0, rotation: 180, flipH: false }],
    transformHint: '发现：2 个三角形还能拼成平行四边形！',
  },
  {
    id: 'p-c1', title: '拼一个小房子', difficulty: 'challenge',
    gridSize: { cols: 4, rows: 4 }, targetOutline: '',
    availablePieces: [
      { ...UNIT_SQUARE, color: '#fca5a5' }, { ...UNIT_SQUARE, color: '#f87171' }, { ...UNIT_SQUARE, color: '#ef4444' },
      { ...RECT_2x1, color: '#93c5fd' }, { ...RECT_2x1, color: '#60a5fa' },
      { ...UNIT_TRIANGLE_BR, color: '#fdba74' }, { ...UNIT_TRIANGLE_BL, color: '#fb923c' },
    ],
    solutionPlacements: [], transformHint: '厉害！你用不同的图形拼出了一栋小房子！',
  },
  {
    id: 'p-c2', title: '自由拼图案', difficulty: 'challenge',
    gridSize: { cols: 4, rows: 4 }, targetOutline: '',
    availablePieces: [
      { ...LARGE_TRIANGLE, color: '#86efac' }, { ...LARGE_TRIANGLE, color: '#4ade80' },
      { ...UNIT_SQUARE, color: '#93c5fd' }, { ...UNIT_SQUARE, color: '#60a5fa' },
      { ...PARALLELOGRAM_2x1, color: '#facc15' }, { ...UNIT_TRIANGLE_BR, color: '#f472b6' }, { ...UNIT_TRIANGLE_BL, color: '#c084fc' },
    ],
    solutionPlacements: [], transformHint: '太棒了！你创作了一个有趣的图案！',
  },
];

export const FREE_MODE_SHAPES: GridShape[] = [
  UNIT_SQUARE,
  { ...UNIT_SQUARE, gridW: 2, gridH: 2, path: 'M0,0 L2,0 L2,2 L0,2 Z', color: '#60a5fa', label: '大正方形' },
  RECT_2x1,
  { ...RECT_2x1, gridW: 1, gridH: 2, path: 'M0,0 L1,0 L1,2 L0,2 Z', color: '#4ade80', label: '竖长方形' },
  UNIT_TRIANGLE_BR,
  UNIT_TRIANGLE_BL,
  LARGE_TRIANGLE,
  PARALLELOGRAM_2x1,
];

export const FREE_MODE_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'];
