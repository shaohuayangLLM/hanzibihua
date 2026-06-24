import type { GridShape } from '@/data/math/shapes/types';
import { SVGShape } from './SVGShape';

interface DraggablePieceProps {
  shape: GridShape;
  size?: number;
  used?: boolean;
  onClick?: () => void;
}

export const DraggablePiece = ({ shape, size = 48, used = false, onClick }: DraggablePieceProps) => {
  return (
    <button onClick={onClick} disabled={used}
      className={`p-2 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
        used ? 'border-muted bg-muted/30 opacity-40 cursor-not-allowed' : 'border-border bg-card hover:border-primary hover:shadow-md active:scale-95 cursor-pointer'
      }`}>
      <SVGShape type={shape.type} path={shape.path} color={shape.color} width={size} height={size} />
      <span className="text-xs text-muted-foreground">{shape.label}</span>
    </button>
  );
};
