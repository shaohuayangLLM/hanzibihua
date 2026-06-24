import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { RECTANGLE_LESSONS, RECTANGLE_SCENE_MAP } from './scenes/RectangleScenes';
import { SQUARE_LESSONS, SQUARE_SCENE_MAP } from './scenes/SquareScenes';
import { TRIANGLE_COMBO_LESSONS, TRIANGLE_COMBO_SCENE_MAP } from './scenes/TriangleAndComboScenes';
import type { TransformLesson } from './scenes/RectangleScenes';

/*
 * 折一折：33 个图形变换动画的统一播放器
 * 从三个场景文件导入，按类别分组展示
 */

const ALL_LESSONS: TransformLesson[] = [
  ...RECTANGLE_LESSONS,
  ...SQUARE_LESSONS,
  ...TRIANGLE_COMBO_LESSONS,
];

const ALL_SCENE_MAP: Record<string, React.FC<{ step: number }>> = {
  ...RECTANGLE_SCENE_MAP,
  ...SQUARE_SCENE_MAP,
  ...TRIANGLE_COMBO_SCENE_MAP,
};

// 按 category 分组
const CATEGORIES = Array.from(new Set(ALL_LESSONS.map(l => l.category)));

export const FoldDemo = () => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const filteredLessons = useMemo(
    () => ALL_LESSONS.filter(l => l.category === activeCategory),
    [activeCategory],
  );

  const lesson = filteredLessons[lessonIndex] ?? filteredLessons[0];
  const step = lesson?.steps[stepIndex];
  const isLastStep = stepIndex === (lesson?.steps.length ?? 1) - 1;
  const Scene = lesson ? ALL_SCENE_MAP[lesson.id] : null;

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    setLessonIndex(0);
    setStepIndex(0);
  };

  const handleSelectLesson = (index: number) => {
    setLessonIndex(index);
    setStepIndex(0);
  };

  const handleNext = () => {
    if (isAnimating || isLastStep) return;
    setIsAnimating(true);
    setStepIndex(i => i + 1);
  };

  const handlePrev = () => {
    if (isAnimating || stepIndex === 0) return;
    setIsAnimating(true);
    setStepIndex(i => i - 1);
  };

  const handleReset = () => setStepIndex(0);

  useEffect(() => {
    if (isAnimating) {
      const t = setTimeout(() => setIsAnimating(false), 800);
      return () => clearTimeout(t);
    }
  }, [isAnimating]);

  if (!lesson || !step) return null;

  return (
    <div className="space-y-5">
      {/* 类别切换 */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => handleSelectCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-teal-500 text-white shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 课程选择卡片 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {filteredLessons.map((l, i) => (
          <button
            key={l.id}
            onClick={() => handleSelectLesson(i)}
            className={`p-2.5 rounded-xl border-2 text-left transition-all ${
              i === lessonIndex
                ? 'border-primary bg-primary/10 shadow-md'
                : 'border-border bg-card hover:border-primary/50 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-base">{l.emoji}</span>
              <span className="text-xs font-bold truncate">{l.title}</span>
            </div>
            <span className="text-[10px] text-muted-foreground line-clamp-1">{l.summaryIcon} {l.summary.split('→').pop()?.trim()}</span>
          </button>
        ))}
      </div>

      {/* 动画卡片 */}
      <div className="bg-card rounded-2xl border-2 border-border overflow-hidden max-w-lg mx-auto">
        {/* 标题栏 */}
        <div className="px-5 py-3 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{lesson.emoji}</span>
            <h3 className="font-bold text-sm sm:text-base">{lesson.title}</h3>
          </div>
          <div className="flex items-center gap-1.5">
            {lesson.steps.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                i <= stepIndex ? 'bg-primary' : 'bg-muted'
              }`} />
            ))}
          </div>
        </div>

        {/* SVG 动画区域 */}
        <div className="bg-gradient-to-b from-muted/20 to-muted/40 p-4" style={{ perspective: '600px' }}>
          {Scene && <Scene step={stepIndex} />}
        </div>

        {/* 步骤描述 */}
        <div className="px-5 py-3 space-y-1">
          <p className="text-base font-bold text-center">{step.description}</p>
          {step.subtext && <p className="text-sm text-muted-foreground text-center">{step.subtext}</p>}
        </div>

        {/* 总结 */}
        {isLastStep && (
          <div className="mx-4 mb-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-center animate-fade-in">
            <p className="text-base mb-0.5">{lesson.summaryIcon}</p>
            <p className="text-sm font-bold text-amber-800 dark:text-amber-200">{lesson.summary}</p>
          </div>
        )}

        {/* 控制按钮 */}
        <div className="px-5 pb-4 flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={handlePrev} disabled={stepIndex === 0 || isAnimating}>
            ← 上一步
          </Button>
          <span className="text-xs text-muted-foreground">
            {stepIndex + 1} / {lesson.steps.length}
          </span>
          {isLastStep ? (
            <Button variant="outline" size="sm" onClick={handleReset}>
              重新演示
            </Button>
          ) : (
            <Button size="sm" onClick={handleNext} disabled={isAnimating}>
              下一步 →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
