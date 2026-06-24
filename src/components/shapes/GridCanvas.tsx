import type { PlacedPiece } from '@/data/math/shapes/types';

interface GridCanvasProps {
  cols: number;
  rows: number;
  cellSize: number;
  pieces: PlacedPiece[];
  targetOutline?: string;
  selectedPieceId?: string | null;
  onCellClick?: (gridX: number, gridY: number) => void;
  onPieceClick?: (pieceId: string) => void;
}

export const GridCanvas = ({ cols, rows, cellSize, pieces, targetOutline, selectedPieceId, onCellClick, onPieceClick }: GridCanvasProps) => {
  const svgW = cols * cellSize;
  const svgH = rows * cellSize;

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!onCellClick) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const gridX = Math.floor((x / rect.width) * cols);
    const gridY = Math.floor((y / rect.height) * rows);
    if (gridX >= 0 && gridX < cols && gridY >= 0 && gridY < rows) onCellClick(gridX, gridY);
  };

  return (
    <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`}
      className="bg-white dark:bg-zinc-900 rounded-xl border-2 border-border"
      onClick={handleClick} style={{ maxWidth: svgW, touchAction: 'none' }}>
      {Array.from({ length: cols + 1 }).map((_, i) => (
        <line key={`v-${i}`} x1={i * cellSize} y1={0} x2={i * cellSize} y2={svgH} stroke="#e5e7eb" strokeWidth="1" />
      ))}
      {Array.from({ length: rows + 1 }).map((_, i) => (
        <line key={`h-${i}`} x1={0} y1={i * cellSize} x2={svgW} y2={i * cellSize} stroke="#e5e7eb" strokeWidth="1" />
      ))}
      {targetOutline && (
        <path d={targetOutline} fill="rgba(139,92,246,0.08)" stroke="#a78bfa" strokeWidth="2" strokeDasharray="6,4" transform={`scale(${cellSize})`} />
      )}
      {pieces.map(piece => {
        const px = piece.gridX * cellSize;
        const py = piece.gridY * cellSize;
        const pw = piece.shape.gridW * cellSize;
        const ph = piece.shape.gridH * cellSize;
        const cx = pw / 2;
        const cy = ph / 2;
        const transforms: string[] = [`translate(${px}, ${py})`];
        if (piece.rotation) transforms.push(`rotate(${piece.rotation} ${cx} ${cy})`);
        if (piece.flipH) transforms.push(`translate(${pw}, 0) scale(-1, 1)`);
        if (piece.flipV) transforms.push(`translate(0, ${ph}) scale(1, -1)`);
        const isSelected = selectedPieceId === piece.id;
        return (
          <g key={piece.id} transform={transforms.join(' ')} onClick={(e) => { e.stopPropagation(); onPieceClick?.(piece.id); }} style={{ cursor: 'pointer' }}>
            <path d={piece.shape.path} fill={piece.shape.color} stroke={isSelected ? '#7c3aed' : 'rgba(0,0,0,0.15)'} strokeWidth={isSelected ? 3 : 1.5} strokeLinejoin="round" transform={`scale(${cellSize})`} />
            {isSelected && <rect x={-2} y={-2} width={pw + 4} height={ph + 4} fill="none" stroke="#7c3aed" strokeWidth="2" strokeDasharray="4,3" rx="4" />}
          </g>
        );
      })}
    </svg>
  );
};
