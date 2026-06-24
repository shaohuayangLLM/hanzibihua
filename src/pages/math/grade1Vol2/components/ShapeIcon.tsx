import React from 'react';

type ShapeKind = 'rectangle' | 'square' | 'triangle' | 'circle' | 'parallelogram';

interface Props {
  shape: ShapeKind;
  size?: number;
  className?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

// 纯 SVG 图形（避免 AI slop）
export const ShapeIcon: React.FC<Props> = ({
  shape,
  size = 64,
  className = '',
  fill = 'transparent',
  stroke = 'currentColor',
  strokeWidth = 2.5,
}) => {
  const s = size;
  const pad = strokeWidth + 2;
  const inner = s - pad * 2;
  const props = { fill, stroke, strokeWidth };

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className={className}>
      {shape === 'rectangle' && (
        <rect x={pad} y={pad + inner * 0.18} width={inner} height={inner * 0.64} rx={3} {...props} />
      )}
      {shape === 'square' && (
        <rect x={pad} y={pad} width={inner} height={inner} rx={3} {...props} />
      )}
      {shape === 'triangle' && (
        <polygon
          points={`${s / 2},${pad} ${pad},${s - pad} ${s - pad},${s - pad}`}
          {...props}
        />
      )}
      {shape === 'circle' && (
        <circle cx={s / 2} cy={s / 2} r={inner / 2} {...props} />
      )}
      {shape === 'parallelogram' && (
        <polygon
          points={`${pad + inner * 0.25},${pad} ${s - pad},${pad} ${s - pad - inner * 0.25},${s - pad} ${pad},${s - pad}`}
          {...props}
        />
      )}
    </svg>
  );
};

export const SHAPE_LABELS: Record<ShapeKind, string> = {
  rectangle: '长方形',
  square: '正方形',
  triangle: '三角形',
  circle: '圆',
  parallelogram: '平行四边形',
};
