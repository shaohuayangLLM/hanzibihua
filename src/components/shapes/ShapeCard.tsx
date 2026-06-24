import { useState } from 'react';
import type { ShapeInfo } from '@/data/math/shapes/types';
import { SVGShape } from './SVGShape';

interface ShapeCardProps {
  shape: ShapeInfo;
  isActive?: boolean;
  onClick?: () => void;
}

export const ShapeCard = ({ shape, isActive, onClick }: ShapeCardProps) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full aspect-square cursor-pointer [perspective:600px]"
      onClick={() => { setFlipped(!flipped); onClick?.(); }}
    >
      <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>
        <div className={`absolute inset-0 rounded-2xl border-2 p-3 flex flex-col items-center justify-center gap-1 [backface-visibility:hidden] ${isActive ? 'border-primary bg-primary/10' : 'border-border bg-card'}`}>
          <SVGShape type={shape.type} color={shape.color} width={64} height={64} />
          <span className="text-base font-bold">{shape.name}</span>
          <span className="text-xs text-muted-foreground">{shape.sides > 0 ? `${shape.sides} 条边` : '没有直边'}</span>
        </div>
        <div className="absolute inset-0 rounded-2xl border-2 border-border bg-card p-3 flex flex-col gap-1.5 [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden">
          <h4 className="font-bold text-sm">{shape.name}的特征</h4>
          <ul className="text-xs space-y-0.5">
            {shape.features.map((f, i) => <li key={i}>✅ {f}</li>)}
          </ul>
          <div className="mt-auto">
            <p className="text-[10px] text-muted-foreground mb-0.5">在生活中：</p>
            <div className="flex gap-1.5 flex-wrap">
              {shape.realWorldExamples.map((ex, i) => (
                <span key={i} className="text-xs">{ex.emoji} {ex.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
