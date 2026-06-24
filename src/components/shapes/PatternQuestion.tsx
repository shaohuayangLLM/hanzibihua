import { useState, useMemo } from 'react';
import type { PatternQuestion as PatternQuestionType } from '@/data/math/shapes/types';
import { SVGShape } from './SVGShape';
import { Button } from '@/components/ui/button';

interface PatternQuestionProps {
  questions: PatternQuestionType[];
}

const sizeMap = { small: 32, medium: 44, large: 56 };

export const PatternQuestion = ({ questions }: PatternQuestionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const q = questions[currentIndex];
  const shuffledOptions = useMemo(() => {
    const opts = q.options.map((o, i) => ({ ...o, origIndex: i }));
    for (let i = opts.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [opts[i], opts[j]] = [opts[j], opts[i]]; }
    return opts;
  }, [q]);

  const isCorrect = submitted && selectedOption !== null && shuffledOptions[selectedOption].type === q.answer.type && shuffledOptions[selectedOption].color === q.answer.color && (shuffledOptions[selectedOption].size ?? undefined) === (q.answer.size ?? undefined);

  const handleSubmit = () => {
    setSubmitted(true);
    if (selectedOption !== null) {
      const opt = shuffledOptions[selectedOption];
      if (opt.type === q.answer.type && opt.color === q.answer.color && (opt.size ?? undefined) === (q.answer.size ?? undefined)) {
        setCorrectCount(c => c + 1);
      }
    }
  };

  const handleNext = () => {
    setCurrentIndex(i => i + 1); setSelectedOption(null); setSubmitted(false);
  };

  const isFinished = currentIndex >= questions.length;

  if (isFinished) {
    return (
      <div className="text-center space-y-4 py-8">
        <p className="text-4xl">🎉</p>
        <p className="text-xl font-bold">全部完成！</p>
        <p className="text-muted-foreground">答对 {correctCount} / {questions.length} 题</p>
        <Button onClick={() => { setCurrentIndex(0); setCorrectCount(0); setSelectedOption(null); setSubmitted(false); }}>再来一次</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-1">第 {currentIndex + 1} / {questions.length} 题</p>
        <h3 className="text-lg font-bold">找出规律，选出下一个图形</h3>
      </div>

      {/* Sequence */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {q.sequence.map((item, i) => {
          const isMissing = i === q.missingIndex;
          const sz = sizeMap[item.size ?? 'medium'];
          if (isMissing && !submitted) {
            return <div key={i} className="w-14 h-14 rounded-xl border-2 border-dashed border-primary flex items-center justify-center text-2xl text-primary">?</div>;
          }
          const displayItem = isMissing && submitted ? q.answer : item;
          return (
            <div key={i} className={`flex items-center justify-center w-14 h-14 ${isMissing && submitted ? 'ring-2 ring-green-500 rounded-xl' : ''}`}>
              <SVGShape type={displayItem.type} color={displayItem.color} width={sz} height={sz} />
            </div>
          );
        })}
      </div>

      {/* Options */}
      <div className="flex gap-4 justify-center">
        {shuffledOptions.map((opt, i) => {
          const sz = sizeMap[opt.size ?? 'medium'];
          let borderClass = 'border-border';
          if (submitted) {
            const isAnswer = opt.type === q.answer.type && opt.color === q.answer.color && (opt.size ?? undefined) === (q.answer.size ?? undefined);
            borderClass = isAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : (selectedOption === i ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-border');
          } else if (selectedOption === i) {
            borderClass = 'border-primary bg-primary/10';
          }
          return (
            <button key={i} onClick={() => !submitted && setSelectedOption(i)}
              className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-all ${borderClass}`}>
              <SVGShape type={opt.type} color={opt.color} width={sz} height={sz} />
            </button>
          );
        })}
      </div>

      {/* Submit / feedback */}
      <div className="flex flex-col items-center gap-3">
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={selectedOption === null}>确认答案</Button>
        ) : (
          <>
            <p className={`text-lg font-bold ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
              {isCorrect ? '✅ 正确！' : '❌ 不对哦'}
            </p>
            <p className="text-sm text-muted-foreground text-center">规律：{q.patternRule}</p>
            {currentIndex < questions.length - 1 ? (
              <Button onClick={handleNext}>下一题 →</Button>
            ) : (
              <Button onClick={handleNext}>查看结果</Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
