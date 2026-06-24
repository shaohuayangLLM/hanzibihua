import type { FoldLesson } from './types';

export const FOLD_LESSONS: FoldLesson[] = [
  {
    id: 'fold-1', title: '长方形横着对折', sourceShape: 'rectangle', resultShapes: ['rectangle', 'rectangle'], method: '横着对折',
    steps: [
      { description: '这是一张长方形纸', svgElements: [{ type: 'shape', path: 'M10,20 L190,20 L190,100 L10,100 Z', color: '#86efac', opacity: 0.8 }] },
      { description: '沿中间横线对折', svgElements: [{ type: 'shape', path: 'M10,20 L190,20 L190,100 L10,100 Z', color: '#86efac', opacity: 0.8 }, { type: 'foldLine', path: 'M10,60 L190,60', color: '#ef4444', dashArray: '6,4' }, { type: 'arrow', path: 'M100,90 L100,65', color: '#ef4444' }] },
      { description: '变成了两个小长方形！', svgElements: [{ type: 'shape', path: 'M20,20 L95,20 L95,100 L20,100 Z', color: '#86efac', opacity: 0.8 }, { type: 'shape', path: 'M105,20 L180,20 L180,100 L105,100 Z', color: '#6ee7b7', opacity: 0.8 }] },
    ],
    summary: '1 个长方形 → 横着对折 → 2 个小长方形',
  },
  {
    id: 'fold-2', title: '长方形竖着对折', sourceShape: 'rectangle', resultShapes: ['square', 'square'], method: '竖着对折',
    steps: [
      { description: '这是一张长方形纸', svgElements: [{ type: 'shape', path: 'M10,10 L190,10 L190,100 L10,100 Z', color: '#93c5fd', opacity: 0.8 }] },
      { description: '沿中间竖线对折', svgElements: [{ type: 'shape', path: 'M10,10 L190,10 L190,100 L10,100 Z', color: '#93c5fd', opacity: 0.8 }, { type: 'foldLine', path: 'M100,10 L100,100', color: '#ef4444', dashArray: '6,4' }, { type: 'arrow', path: 'M150,55 L105,55', color: '#ef4444' }] },
      { description: '变成了两个正方形！', svgElements: [{ type: 'shape', path: 'M10,10 L90,10 L90,100 L10,100 Z', color: '#93c5fd', opacity: 0.8 }, { type: 'shape', path: 'M110,10 L190,10 L190,100 L110,100 Z', color: '#60a5fa', opacity: 0.8 }] },
    ],
    summary: '1 个长方形 → 竖着对折 → 2 个正方形',
  },
  {
    id: 'fold-3', title: '正方形斜着剪', sourceShape: 'square', resultShapes: ['triangle', 'triangle'], method: '对角线剪',
    steps: [
      { description: '这是一张正方形纸', svgElements: [{ type: 'shape', path: 'M55,10 L145,10 L145,100 L55,100 Z', color: '#fca5a5', opacity: 0.8 }] },
      { description: '沿对角线剪开', svgElements: [{ type: 'shape', path: 'M55,10 L145,10 L145,100 L55,100 Z', color: '#fca5a5', opacity: 0.8 }, { type: 'cutLine', path: 'M55,10 L145,100', color: '#ef4444', dashArray: '6,4' }] },
      { description: '变成了两个三角形！', svgElements: [{ type: 'shape', path: 'M15,10 L95,10 L15,100 Z', color: '#fca5a5', opacity: 0.8 }, { type: 'shape', path: 'M115,10 L195,100 L115,100 Z', color: '#f87171', opacity: 0.8 }] },
    ],
    summary: '1 个正方形 → 沿对角线剪 → 2 个三角形',
  },
  {
    id: 'fold-4', title: '两个三角形拼正方形', sourceShape: 'triangle', resultShapes: ['square'], method: '拼合',
    steps: [
      { description: '两个完全一样的三角形', svgElements: [{ type: 'shape', path: 'M15,10 L95,10 L15,100 Z', color: '#fdba74', opacity: 0.8 }, { type: 'shape', path: 'M115,10 L195,100 L115,100 Z', color: '#fb923c', opacity: 0.8 }] },
      { description: '把它们拼在一起', svgElements: [{ type: 'shape', path: 'M55,10 L145,10 L55,100 Z', color: '#fdba74', opacity: 0.8 }, { type: 'shape', path: 'M145,10 L145,100 L55,100 Z', color: '#fb923c', opacity: 0.8 }] },
      { description: '变成了一个正方形！', svgElements: [{ type: 'shape', path: 'M55,10 L145,10 L145,100 L55,100 Z', color: '#fdba74', opacity: 0.6 }, { type: 'foldLine', path: 'M55,100 L145,10', color: '#9ca3af', dashArray: '4,3' }] },
    ],
    summary: '2 个三角形 → 拼合 → 1 个正方形',
  },
  {
    id: 'fold-5', title: '四个正方形拼长方形', sourceShape: 'square', resultShapes: ['rectangle'], method: '拼合',
    steps: [
      { description: '四个完全一样的正方形', svgElements: [{ type: 'shape', path: 'M10,30 L45,30 L45,65 L10,65 Z', color: '#86efac', opacity: 0.8 }, { type: 'shape', path: 'M55,30 L90,30 L90,65 L55,65 Z', color: '#4ade80', opacity: 0.8 }, { type: 'shape', path: 'M100,30 L135,30 L135,65 L100,65 Z', color: '#34d399', opacity: 0.8 }, { type: 'shape', path: 'M145,30 L180,30 L180,65 L145,65 Z', color: '#22c55e', opacity: 0.8 }] },
      { description: '一个一个排成一排', svgElements: [{ type: 'shape', path: 'M10,30 L45,30 L45,65 L10,65 Z', color: '#86efac', opacity: 0.8 }, { type: 'shape', path: 'M45,30 L80,30 L80,65 L45,65 Z', color: '#4ade80', opacity: 0.8 }, { type: 'shape', path: 'M80,30 L115,30 L115,65 L80,65 Z', color: '#34d399', opacity: 0.8 }, { type: 'shape', path: 'M115,30 L150,30 L150,65 L115,65 Z', color: '#22c55e', opacity: 0.8 }] },
      { description: '变成了一个长方形！', svgElements: [{ type: 'shape', path: 'M10,30 L150,30 L150,65 L10,65 Z', color: '#86efac', opacity: 0.6 }, { type: 'foldLine', path: 'M45,30 L45,65', color: '#9ca3af', dashArray: '3,3' }, { type: 'foldLine', path: 'M80,30 L80,65', color: '#9ca3af', dashArray: '3,3' }, { type: 'foldLine', path: 'M115,30 L115,65', color: '#9ca3af', dashArray: '3,3' }] },
    ],
    summary: '4 个正方形 → 排成一排 → 1 个长方形',
  },
];
