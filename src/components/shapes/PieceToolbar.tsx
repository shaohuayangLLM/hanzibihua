import { Button } from '@/components/ui/button';

interface PieceToolbarProps {
  visible: boolean;
  onRotate: () => void;
  onFlipH: () => void;
  onFlipV: () => void;
  onDelete: () => void;
}

export const PieceToolbar = ({ visible, onRotate, onFlipH, onFlipV, onDelete }: PieceToolbarProps) => {
  if (!visible) return null;
  return (
    <div className="flex items-center justify-center gap-2 py-2 animate-fade-in">
      <Button variant="outline" size="sm" onClick={onRotate}>↻ 旋转</Button>
      <Button variant="outline" size="sm" onClick={onFlipH}>↔ 翻转</Button>
      <Button variant="outline" size="sm" onClick={onFlipV}>↕ 上下</Button>
      <Button variant="destructive" size="sm" onClick={onDelete}>✕ 删除</Button>
    </div>
  );
};
