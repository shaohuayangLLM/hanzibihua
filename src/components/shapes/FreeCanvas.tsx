import { useState } from 'react';
import type { PlacedPiece } from '@/data/math/shapes/types';
import { FREE_MODE_SHAPES, FREE_MODE_COLORS } from '@/data/math/shapes/puzzleLevels';
import { GridCanvas } from './GridCanvas';
import { DraggablePiece } from './DraggablePiece';
import { PieceToolbar } from './PieceToolbar';
import { Button } from '@/components/ui/button';

const GRID_COLS = 8;
const GRID_ROWS = 6;
const CELL_SIZE = 50;

export const FreeCanvas = () => {
  const [pieces, setPieces] = useState<PlacedPiece[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeShapeIndex, setActiveShapeIndex] = useState<number | null>(null);
  const [activeColor, setActiveColor] = useState(FREE_MODE_COLORS[4]);

  const handleCellClick = (gridX: number, gridY: number) => {
    if (activeShapeIndex === null) return;
    const baseShape = FREE_MODE_SHAPES[activeShapeIndex];
    if (gridX + baseShape.gridW > GRID_COLS || gridY + baseShape.gridH > GRID_ROWS) return;
    const shape = { ...baseShape, color: activeColor };
    const newPiece: PlacedPiece = { id: `free-${Date.now()}`, shape, gridX, gridY, rotation: 0, flipH: false, flipV: false };
    setPieces(prev => [...prev, newPiece]);
  };

  const handleRotate = () => { if (!selectedId) return; setPieces(prev => prev.map(p => p.id === selectedId ? { ...p, rotation: ((p.rotation + 90) % 360) as 0|90|180|270 } : p)); };
  const handleFlipH = () => { if (!selectedId) return; setPieces(prev => prev.map(p => p.id === selectedId ? { ...p, flipH: !p.flipH } : p)); };
  const handleFlipV = () => { if (!selectedId) return; setPieces(prev => prev.map(p => p.id === selectedId ? { ...p, flipV: !p.flipV } : p)); };
  const handleDelete = () => { if (!selectedId) return; setPieces(prev => prev.filter(p => p.id !== selectedId)); setSelectedId(null); };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-4">
        {activeShapeIndex !== null && <p className="text-sm text-primary font-medium animate-pulse">👆 点击网格放置图形</p>}

        <GridCanvas cols={GRID_COLS} rows={GRID_ROWS} cellSize={CELL_SIZE}
          pieces={pieces} selectedPieceId={selectedId}
          onCellClick={handleCellClick}
          onPieceClick={(id) => { setSelectedId(id === selectedId ? null : id); setActiveShapeIndex(null); }} />

        <PieceToolbar visible={selectedId !== null} onRotate={handleRotate} onFlipH={handleFlipH} onFlipV={handleFlipV} onDelete={handleDelete} />

        {/* Color picker */}
        <div>
          <p className="text-sm text-muted-foreground mb-2 text-center">选择颜色</p>
          <div className="flex gap-2 justify-center">
            {FREE_MODE_COLORS.map(c => (
              <button key={c} onClick={() => setActiveColor(c)}
                className={`w-7 h-7 rounded-full border-2 transition-all ${activeColor === c ? 'border-foreground scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>

        {/* Shape picker */}
        <div>
          <p className="text-sm text-muted-foreground mb-2 text-center">选择图形（可重复使用）</p>
          <div className="flex gap-3 flex-wrap justify-center">
            {FREE_MODE_SHAPES.map((shape, i) => (
              <div key={i} className={activeShapeIndex === i ? 'ring-2 ring-primary rounded-xl' : ''}>
                <DraggablePiece shape={{ ...shape, color: activeColor }} onClick={() => { setActiveShapeIndex(i); setSelectedId(null); }} />
              </div>
            ))}
          </div>
        </div>

        {pieces.length > 0 && (
          <Button variant="outline" size="sm" onClick={() => { setPieces([]); setSelectedId(null); }}>清空画布</Button>
        )}
      </div>
    </div>
  );
};
