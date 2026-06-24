import type { PatternQuestion } from './types';

export const PATTERN_QUESTIONS: PatternQuestion[] = [
  {
    id: 'pat-1',
    sequence: [{ type: 'circle', color: '#ef4444' }, { type: 'square', color: '#3b82f6' }, { type: 'circle', color: '#ef4444' }, { type: 'square', color: '#3b82f6' }, { type: 'circle', color: '#ef4444' }, { type: 'square', color: '#3b82f6' }],
    missingIndex: 5, answer: { type: 'square', color: '#3b82f6' },
    options: [{ type: 'square', color: '#3b82f6' }, { type: 'circle', color: '#ef4444' }, { type: 'triangle', color: '#22c55e' }, { type: 'rectangle', color: '#f97316' }],
    patternRule: '圆和正方形交替出现',
  },
  {
    id: 'pat-2',
    sequence: [{ type: 'triangle', color: '#22c55e' }, { type: 'triangle', color: '#22c55e' }, { type: 'circle', color: '#ef4444' }, { type: 'triangle', color: '#22c55e' }, { type: 'triangle', color: '#22c55e' }, { type: 'circle', color: '#ef4444' }],
    missingIndex: 5, answer: { type: 'circle', color: '#ef4444' },
    options: [{ type: 'circle', color: '#ef4444' }, { type: 'triangle', color: '#22c55e' }, { type: 'square', color: '#3b82f6' }, { type: 'rectangle', color: '#f97316' }],
    patternRule: '每 3 个一组：三角 → 三角 → 圆',
  },
  {
    id: 'pat-3',
    sequence: [{ type: 'square', color: '#ef4444', size: 'small' }, { type: 'square', color: '#3b82f6', size: 'medium' }, { type: 'square', color: '#22c55e', size: 'large' }, { type: 'square', color: '#ef4444', size: 'small' }, { type: 'square', color: '#3b82f6', size: 'medium' }, { type: 'square', color: '#22c55e', size: 'large' }],
    missingIndex: 5, answer: { type: 'square', color: '#22c55e', size: 'large' },
    options: [{ type: 'square', color: '#22c55e', size: 'large' }, { type: 'square', color: '#ef4444', size: 'small' }, { type: 'square', color: '#3b82f6', size: 'medium' }, { type: 'circle', color: '#22c55e', size: 'large' }],
    patternRule: '颜色和大小一起变化：红小 → 蓝中 → 绿大',
  },
  {
    id: 'pat-4',
    sequence: [{ type: 'circle', color: '#ef4444' }, { type: 'triangle', color: '#22c55e' }, { type: 'square', color: '#3b82f6' }, { type: 'circle', color: '#ef4444' }, { type: 'triangle', color: '#22c55e' }, { type: 'square', color: '#3b82f6' }],
    missingIndex: 5, answer: { type: 'square', color: '#3b82f6' },
    options: [{ type: 'square', color: '#3b82f6' }, { type: 'circle', color: '#ef4444' }, { type: 'triangle', color: '#22c55e' }, { type: 'rectangle', color: '#8b5cf6' }],
    patternRule: '三种图形轮流：圆 → 三角 → 正方',
  },
  {
    id: 'pat-5',
    sequence: [{ type: 'square', color: '#3b82f6' }, { type: 'rectangle', color: '#3b82f6' }, { type: 'square', color: '#22c55e' }, { type: 'rectangle', color: '#22c55e' }, { type: 'square', color: '#ef4444' }, { type: 'rectangle', color: '#ef4444' }],
    missingIndex: 5, answer: { type: 'rectangle', color: '#ef4444' },
    options: [{ type: 'rectangle', color: '#ef4444' }, { type: 'square', color: '#ef4444' }, { type: 'rectangle', color: '#22c55e' }, { type: 'triangle', color: '#ef4444' }],
    patternRule: '正方形和长方形成对，每对换颜色',
  },
  {
    id: 'pat-6',
    sequence: [{ type: 'triangle', color: '#ef4444' }, { type: 'circle', color: '#ef4444' }, { type: 'triangle', color: '#3b82f6' }, { type: 'circle', color: '#3b82f6' }, { type: 'triangle', color: '#22c55e' }, { type: 'circle', color: '#22c55e' }],
    missingIndex: 5, answer: { type: 'circle', color: '#22c55e' },
    options: [{ type: 'circle', color: '#22c55e' }, { type: 'triangle', color: '#22c55e' }, { type: 'circle', color: '#3b82f6' }, { type: 'square', color: '#22c55e' }],
    patternRule: '三角和圆成对同色，颜色依次变化',
  },
  {
    id: 'pat-7',
    sequence: [{ type: 'square', color: '#3b82f6', size: 'small' }, { type: 'square', color: '#3b82f6', size: 'medium' }, { type: 'square', color: '#3b82f6', size: 'large' }, { type: 'triangle', color: '#ef4444', size: 'small' }, { type: 'triangle', color: '#ef4444', size: 'medium' }, { type: 'triangle', color: '#ef4444', size: 'large' }],
    missingIndex: 5, answer: { type: 'triangle', color: '#ef4444', size: 'large' },
    options: [{ type: 'triangle', color: '#ef4444', size: 'large' }, { type: 'triangle', color: '#ef4444', size: 'small' }, { type: 'square', color: '#3b82f6', size: 'large' }, { type: 'circle', color: '#ef4444', size: 'large' }],
    patternRule: '先蓝正方形从小到大，再红三角形从小到大',
  },
  {
    id: 'pat-8',
    sequence: [{ type: 'circle', color: '#ef4444' }, { type: 'circle', color: '#3b82f6' }, { type: 'square', color: '#ef4444' }, { type: 'square', color: '#3b82f6' }, { type: 'triangle', color: '#ef4444' }, { type: 'triangle', color: '#3b82f6' }],
    missingIndex: 5, answer: { type: 'triangle', color: '#3b82f6' },
    options: [{ type: 'triangle', color: '#3b82f6' }, { type: 'triangle', color: '#ef4444' }, { type: 'circle', color: '#3b82f6' }, { type: 'square', color: '#3b82f6' }],
    patternRule: '每种图形红蓝成对，图形依次变化',
  },
];
