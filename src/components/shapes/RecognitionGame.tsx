import { useState, useMemo } from 'react';
import type { RecognitionQuestion } from '@/data/math/shapes/types';
import { SHAPE_INFO_LIST } from '@/data/math/shapes/shapeRecognition';
import { SVGShape } from './SVGShape';
import { Button } from '@/components/ui/button';

interface RecognitionGameProps {
  questions: RecognitionQuestion[];
}

export const RecognitionGame = ({ questions }: RecognitionGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const q = questions[currentIndex];
  const correctIds = useMemo(() => new Set(q.shapes.filter(s => s.type === q.answer).map(s => s.id)), [q]);
  const targetName = SHAPE_INFO_LIST.find(s => s.type === q.answer)?.name ?? '';
  const allCorrect = submitted && [...correctIds].every(id => selected.has(id)) && [...selected].every(id => correctIds.has(id));

  const toggle = (id: string) => {
    if (submitted) return;
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleNext = () => {
    setCurrentIndex(i => Math.min(i + 1, questions.length - 1));
    setSelected(new Set());
    setSubmitted(false);
  };

  const shapeInfo = (type: string) => SHAPE_INFO_LIST.find(s => s.type === type);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-1">第 {currentIndex + 1} / {questions.length} 题</p>
        <h3 className="text-xl font-bold">{q.question}</h3>
        <p className="text-sm text-muted-foreground mt-1">点击选出所有 <strong>{targetName}</strong></p>
      </div>
      <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
        {q.shapes.map(s => {
          const info = shapeInfo(s.type);
          const isSelected = selected.has(s.id);
          const isCorrectShape = correctIds.has(s.id);
          let borderClass = 'border-border';
          if (submitted) {
            borderClass = isCorrectShape
              ? (isSelected ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-300 bg-red-50 dark:bg-red-900/20')
              : (isSelected ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-border');
          } else if (isSelected) {
            borderClass = 'border-primary bg-primary/10';
          }
          return (
            <button key={s.id} onClick={() => toggle(s.id)} className={`aspect-square rounded-xl border-2 flex items-center justify-center transition-all ${borderClass}`}>
              <SVGShape type={s.type} color={info?.color ?? '#9ca3af'} width={52} height={52} />
            </button>
          );
        })}
      </div>
      <div className="flex flex-col items-center gap-3">
        {!submitted ? (
          <Button onClick={() => setSubmitted(true)} disabled={selected.size === 0}>确认答案</Button>
        ) : (
          <>
            <p className={`text-lg font-bold ${allCorrect ? 'text-green-600' : 'text-red-500'}`}>
              {allCorrect ? '✅ 全部正确！' : '❌ 再想想哦'}
            </p>
            {currentIndex < questions.length - 1 && <Button onClick={handleNext}>下一题 →</Button>}
          </>
        )}
      </div>
    </div>
  );
};
