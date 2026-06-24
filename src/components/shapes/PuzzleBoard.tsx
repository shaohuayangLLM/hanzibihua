import { useState, useCallback } from 'react';
import type { PuzzleLevel, PlacedPiece } from '@/data/math/shapes/types';
import { GridCanvas } from './GridCanvas';
import { DraggablePiece } from './DraggablePiece';
import { PieceToolbar } from './PieceToolbar';
import { Button } from '@/components/ui/button';

interface PuzzleBoardProps {
  levels: PuzzleLevel[];
}

export const PuzzleBoard = ({ levels }: PuzzleBoardProps) => {
  const [levelIndex, setLevelIndex] = useState(0);
  const [pieces, setPieces] = useState<PlacedPiece[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activePieceIndex, setActivePieceIndex] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const level = levels[levelIndex];
  const cellSize = 60;
  const usedIndices = new Set(pieces.map(p => (p as any).sourceIndex as number));

  const handleSelectPiece = (index: number) => {
    if (usedIndices.has(index)) return;
    setActivePieceIndex(index);
    setSelectedId(null);
  };

  const handleCellClick = useCallback((gridX: number, gridY: number) => {
    if (activePieceIndex === null) return;
    const shape = level.availablePieces[activePieceIndex];
    if (gridX + shape.gridW > level.gridSize.cols || gridY + shape.gridH > level.gridSize.rows) return;

    const newPiece: PlacedPiece & { sourceIndex: number } = {
      id: `piece-${Date.now()}`, shape, gridX, gridY,
      rotation: 0, flipH: false, flipV: false, sourceIndex: activePieceIndex,
    };
    const next = [...pieces, newPiece];
    setPieces(next);
    setActivePieceIndex(null);
    if (next.length === level.availablePieces.length) setCompleted(true);
  }, [activePieceIndex, level, pieces]);

  const handleRotate = () => {
    if (!selectedId) return;
    setPieces(prev => prev.map(p => p.id === selectedId ? { ...p, rotation: ((p.rotation + 90) % 360) as 0 | 90 | 180 | 270 } : p));
  };

  const handleFlipH = () => {
    if (!selectedId) return;
    setPieces(prev => prev.map(p => p.id === selectedId ? { ...p, flipH: !p.flipH } : p));
  };

  const handleFlipV = () => {
    if (!selectedId) return;
    setPieces(prev => prev.map(p => p.id === selectedId ? { ...p, flipV: !p.flipV } : p));
  };

  const handleDelete = () => {
    if (!selectedId) return;
    setPieces(prev => prev.filter(p => p.id !== selectedId));
    setSelectedId(null);
    setCompleted(false);
  };

  const handleNextLevel = () => {
    setLevelIndex(i => Math.min(i + 1, levels.length - 1));
    setPieces([]); setSelectedId(null); setActivePieceIndex(null); setCompleted(false);
  };

  const handleReset = () => {
    setPieces([]); setSelectedId(null); setActivePieceIndex(null); setCompleted(false);
  };

  const difficultyLabel = { beginner: '入门', intermediate: '进阶', challenge: '挑战' };

  return (
    <div className="space-y-4">
      {/* Level selector */}
      <div className="flex gap-2 flex-wrap justify-center">
        {levels.map((l, i) => (
          <button key={l.id} onClick={() => { setLevelIndex(i); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${i === levelIndex ? 'bg-teal-500 text-white shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
            {difficultyLabel[l.difficulty]} · {l.title}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        {/* Active piece indicator */}
        {activePieceIndex !== null && (
          <p className="text-sm text-primary font-medium animate-pulse">
            👆 点击网格放置图形
          </p>
        )}

        {/* Canvas */}
        <GridCanvas cols={level.gridSize.cols} rows={level.gridSize.rows} cellSize={cellSize}
          pieces={pieces} targetOutline={level.targetOutline || undefined}
          selectedPieceId={selectedId}
          onCellClick={handleCellClick}
          onPieceClick={(id) => { setSelectedId(id === selectedId ? null : id); setActivePieceIndex(null); }} />

        {/* Toolbar */}
        <PieceToolbar visible={selectedId !== null} onRotate={handleRotate} onFlipH={handleFlipH} onFlipV={handleFlipV} onDelete={handleDelete} />

        {/* Available pieces */}
        <div>
          <p className="text-sm text-muted-foreground mb-2 text-center">可用图形（点击选择，再点画布放置）</p>
          <div className="flex gap-3 flex-wrap justify-center">
            {level.availablePieces.map((shape, i) => (
              <div key={i} className={activePieceIndex === i ? 'ring-2 ring-primary rounded-xl' : ''}>
                <DraggablePiece shape={shape} used={usedIndices.has(i)} onClick={() => handleSelectPiece(i)} />
              </div>
            ))}
          </div>
        </div>

        {/* Completed */}
        {completed && (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center space-y-2 animate-fade-in">
            <p className="text-lg font-bold text-green-700 dark:text-green-300">🎉 拼好了！</p>
            <p className="text-sm text-green-600 dark:text-green-400">{level.transformHint}</p>
            {levelIndex < levels.length - 1 && <Button size="sm" onClick={handleNextLevel}>下一关 →</Button>}
          </div>
        )}

        {/* Reset */}
        {pieces.length > 0 && !completed && (
          <Button variant="outline" size="sm" onClick={handleReset}>清空重来</Button>
        )}
      </div>
    </div>
  );
};
