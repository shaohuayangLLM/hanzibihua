import type { ShapeInfo, RecognitionQuestion } from './types';

export const SHAPE_INFO_LIST: ShapeInfo[] = [
  {
    type: 'rectangle', name: '长方形',
    features: ['有 4 条边', '对边相等', '有 4 个直角'], sides: 4,
    realWorldExamples: [{ name: '书本', emoji: '📕' }, { name: '门', emoji: '🚪' }, { name: '电视', emoji: '📺' }],
    svgPath: 'M10,20 L90,20 L90,80 L10,80 Z', color: '#60a5fa',
  },
  {
    type: 'square', name: '正方形',
    features: ['有 4 条边', '4 条边一样长', '有 4 个直角'], sides: 4,
    realWorldExamples: [{ name: '魔方', emoji: '🧊' }, { name: '棋盘格', emoji: '♟️' }, { name: '窗户', emoji: '🪟' }],
    svgPath: 'M15,15 L85,15 L85,85 L15,85 Z', color: '#4ade80',
  },
  {
    type: 'triangle', name: '三角形',
    features: ['有 3 条边', '有 3 个角'], sides: 3,
    realWorldExamples: [{ name: '三角尺', emoji: '📐' }, { name: '山', emoji: '⛰️' }, { name: '三明治切角', emoji: '🥪' }],
    svgPath: 'M50,10 L90,90 L10,90 Z', color: '#fb923c',
  },
  {
    type: 'circle', name: '圆',
    features: ['没有直边', '到中心距离处处相等', '没有角'], sides: 0,
    realWorldExamples: [{ name: '钟表', emoji: '🕐' }, { name: '硬币', emoji: '🪙' }, { name: '车轮', emoji: '🛞' }],
    svgPath: 'M50,10 A40,40 0 1,1 49.99,10 Z', color: '#f472b6',
  },
  {
    type: 'parallelogram', name: '平行四边形',
    features: ['有 4 条边', '对边平行且相等', '没有直角'], sides: 4,
    realWorldExamples: [{ name: '橡皮擦侧面', emoji: '📦' }, { name: '梯子台阶', emoji: '🪜' }],
    svgPath: 'M30,20 L90,20 L70,80 L10,80 Z', color: '#a78bfa',
  },
];

export const RECOGNITION_QUESTIONS: RecognitionQuestion[] = [
  { id: 'rq-1', question: '下面哪些是三角形？', shapes: [{ type: 'triangle', id: 's1' }, { type: 'rectangle', id: 's2' }, { type: 'triangle', id: 's3' }, { type: 'circle', id: 's4' }, { type: 'square', id: 's5' }, { type: 'triangle', id: 's6' }], answer: 'triangle' },
  { id: 'rq-2', question: '下面哪些是正方形？', shapes: [{ type: 'square', id: 's1' }, { type: 'rectangle', id: 's2' }, { type: 'parallelogram', id: 's3' }, { type: 'square', id: 's4' }, { type: 'triangle', id: 's5' }, { type: 'square', id: 's6' }], answer: 'square' },
  { id: 'rq-3', question: '下面哪些是长方形？', shapes: [{ type: 'rectangle', id: 's1' }, { type: 'square', id: 's2' }, { type: 'rectangle', id: 's3' }, { type: 'parallelogram', id: 's4' }, { type: 'rectangle', id: 's5' }, { type: 'circle', id: 's6' }], answer: 'rectangle' },
  { id: 'rq-4', question: '下面哪些是圆？', shapes: [{ type: 'circle', id: 's1' }, { type: 'square', id: 's2' }, { type: 'circle', id: 's3' }, { type: 'triangle', id: 's4' }, { type: 'rectangle', id: 's5' }, { type: 'circle', id: 's6' }], answer: 'circle' },
  { id: 'rq-5', question: '下面哪些是平行四边形？', shapes: [{ type: 'parallelogram', id: 's1' }, { type: 'rectangle', id: 's2' }, { type: 'square', id: 's3' }, { type: 'parallelogram', id: 's4' }, { type: 'triangle', id: 's5' }, { type: 'parallelogram', id: 's6' }], answer: 'parallelogram' },
];
