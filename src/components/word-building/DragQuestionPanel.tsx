import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { DragQuestion } from "@/data/wordBuildingTypes";

interface DragQuestionPanelProps {
  question: DragQuestion;
  selected: string;
  checked: boolean;
  onSubmit: (answer: string) => void;
}

export const DragQuestionPanel = ({
  question,
  selected,
  checked,
  onSubmit,
}: DragQuestionPanelProps) => {
  const [selectedTileIndexes, setSelectedTileIndexes] = useState<number[]>([]);

  useEffect(() => {
    if (selected) {
      const answerChars = Array.from(selected);
      const used = new Set<number>();
      const recovered: number[] = [];
      for (const char of answerChars) {
        const idx = question.tiles.findIndex((tile, i) => tile === char && !used.has(i));
        if (idx >= 0) {
          used.add(idx);
          recovered.push(idx);
        }
      }
      setSelectedTileIndexes(recovered);
      return;
    }
    setSelectedTileIndexes([]);
  }, [question.id, question.tiles, selected]);

  const composed = useMemo(() => {
    return selectedTileIndexes.map(idx => question.tiles[idx]).join("");
  }, [question.tiles, selectedTileIndexes]);

  const isComplete = selectedTileIndexes.length === question.correctOrder.length;

  const handleSelectTile = (idx: number) => {
    if (checked) return;
    if (selectedTileIndexes.includes(idx)) return;
    setSelectedTileIndexes(prev => [...prev, idx]);
  };

  const handleUndo = () => {
    if (checked) return;
    setSelectedTileIndexes(prev => prev.slice(0, -1));
  };

  const handleReset = () => {
    if (checked) return;
    setSelectedTileIndexes([]);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-secondary/40 p-4 text-left space-y-2">
        <p className="text-sm text-muted-foreground">拖拽字卡，按正确顺序组成词语</p>
        <p className="text-sm text-muted-foreground">目标读音：{question.targetPinyin}</p>
        <div className="min-h-12 rounded-md bg-background border px-3 py-2 text-2xl font-bold tracking-widest">
          {composed || "__"}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {question.tiles.map((tile, idx) => {
          const used = selectedTileIndexes.includes(idx);
          return (
            <Button
              key={`${question.id}-tile-${idx}`}
              variant={used ? "secondary" : "outline"}
              onClick={() => handleSelectTile(idx)}
              disabled={checked || used}
              className="h-14 text-xl font-bold"
            >
              {tile}
            </Button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={handleUndo} disabled={checked || selectedTileIndexes.length === 0}>
          撤销
        </Button>
        <Button variant="outline" onClick={handleReset} disabled={checked || selectedTileIndexes.length === 0}>
          清空
        </Button>
        <Button onClick={() => onSubmit(composed)} disabled={checked || !isComplete}>
          提交答案
        </Button>
      </div>
    </div>
  );
};
