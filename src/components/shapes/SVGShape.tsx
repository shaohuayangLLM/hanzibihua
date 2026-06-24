import type { ShapeType } from '@/data/math/shapes/types';

interface SVGShapeProps {
  type: ShapeType;
  path?: string;
  color: string;
  width: number;
  height: number;
  rotation?: 0 | 90 | 180 | 270;
  flipH?: boolean;
  flipV?: boolean;
  opacity?: number;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
  onClick?: () => void;
}

const DEFAULT_PATHS: Record<ShapeType, string> = {
  rectangle: 'M10,25 L90,25 L90,75 L10,75 Z',
  square: 'M15,15 L85,15 L85,85 L15,85 Z',
  triangle: 'M50,10 L90,90 L10,90 Z',
  circle: 'M50,10 A40,40 0 1,1 49.99,10 Z',
  parallelogram: 'M30,20 L90,20 L70,80 L10,80 Z',
};

export const SVGShape = ({
  type, path, color, width, height,
  rotation = 0, flipH = false, flipV = false,
  opacity = 1, strokeColor = 'rgba(0,0,0,0.2)', strokeWidth = 1.5,
  className = '', onClick,
}: SVGShapeProps) => {
  const d = path || DEFAULT_PATHS[type];
  const cx = 50, cy = 50;
  const transforms: string[] = [];
  if (rotation) transforms.push(`rotate(${rotation} ${cx} ${cy})`);
  if (flipH) transforms.push(`translate(100, 0) scale(-1, 1)`);
  if (flipV) transforms.push(`translate(0, 100) scale(1, -1)`);

  return (
    <svg width={width} height={height} viewBox="0 0 100 100" className={className} onClick={onClick} style={{ cursor: onClick ? 'pointer' : undefined }}>
      <g transform={transforms.join(' ')} opacity={opacity}>
        <path d={d} fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
      </g>
    </svg>
  );
};
