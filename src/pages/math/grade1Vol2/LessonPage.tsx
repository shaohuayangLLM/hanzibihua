import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getLessonById } from '@/data/math/grade1Vol2';
import type { KnowledgeCard } from '@/data/math/grade1Vol2/types';
import { VisualRenderer } from './components/VisualRenderer';
import { PracticeRunner } from './components/PracticeRunner';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import RefreshCw from 'lucide-react/dist/esm/icons/refresh-cw';

type Phase = 'learn' | 'practice' | 'done';

const LessonPage: React.FC = () => {
  const navigate = useNavigate();
  const { lessonId = '' } = useParams<{ lessonId: string }>();
  const found = getLessonById(lessonId);

  const [phase, setPhase] = useState<Phase>('learn');
  const [cardIdx, setCardIdx] = useState(0);
  const [practiceIdx, setPracticeIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [seed, setSeed] = useState(0);

  const practices = useMemo(() => found?.lesson.practiceFactory() ?? [], [found, seed]);

  // 切换 lesson 时重置所有状态（不重新生成题目，保留首次的 useMemo 结果）
  useEffect(() => {
    setPhase('learn');
    setCardIdx(0);
    setPracticeIdx(0);
    setCorrectCount(0);
  }, [lessonId]);

  if (!found) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <p className="mb-4">没找到这节课 :(</p>
          <Button onClick={() => navigate('/math/g1v2')}>返回首页</Button>
        </div>
      </div>
    );
  }

  const { unit, lesson } = found;
  const card = lesson.cards[cardIdx];
  const totalCards = lesson.cards.length;
  const totalPractices = practices.length;

  const restart = () => {
    setPhase('learn');
    setCardIdx(0);
    setPracticeIdx(0);
    setCorrectCount(0);
    setSeed((s) => s + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-4 px-4 border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/math/g1v2/unit/${unit.id}`)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className={`w-10 h-10 rounded-xl ${unit.colorClass} flex items-center justify-center text-xl shadow-button`}>
            {lesson.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-foreground truncate">{lesson.title}</h1>
            <p className="text-xs text-muted-foreground truncate">{lesson.subtitle}</p>
          </div>
        </div>

        {/* 阶段进度 */}
        <div className="max-w-3xl mx-auto mt-3 flex items-center gap-2">
          <PhaseDot active={phase === 'learn'} done={phase !== 'learn'} label="讲解" />
          <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-300 ${phase === 'learn' ? 'bg-primary/50' : 'bg-primary'}`} style={{ width: phase === 'learn' ? '50%' : '100%' }} />
          </div>
          <PhaseDot active={phase === 'practice'} done={phase === 'done'} label="练习" />
          <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-300 ${phase === 'done' ? 'bg-emerald-500' : phase === 'practice' ? 'bg-primary/50' : 'bg-muted'}`} style={{ width: phase === 'done' ? '100%' : phase === 'practice' ? '50%' : '0%' }} />
          </div>
          <PhaseDot active={phase === 'done'} done={false} label="完成" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* 学习阶段 */}
        {phase === 'learn' && card && (
          <KnowledgeCardView
            card={card}
            current={cardIdx + 1}
            total={totalCards}
            onPrev={cardIdx > 0 ? () => setCardIdx((i) => i - 1) : undefined}
            onNext={() => {
              if (cardIdx + 1 < totalCards) {
                setCardIdx((i) => i + 1);
              } else {
                setPhase('practice');
              }
            }}
            nextLabel={cardIdx + 1 < totalCards ? '下一张 →' : '✏️ 开始练习'}
          />
        )}

        {/* 练习阶段 */}
        {phase === 'practice' && practices[practiceIdx] && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-muted-foreground">
                第 {practiceIdx + 1} / {totalPractices} 题
              </span>
              <span className="text-sm text-emerald-600">已答对 {correctCount}</span>
            </div>
            <PracticeRunner
              key={practices[practiceIdx].id}
              practice={practices[practiceIdx]}
              isLast={practiceIdx + 1 >= totalPractices}
              onAnswer={(c) => {
                if (c) setCorrectCount((n) => n + 1);
              }}
              onNext={() => {
                if (practiceIdx + 1 < totalPractices) {
                  setPracticeIdx((i) => i + 1);
                } else {
                  setPhase('done');
                }
              }}
            />
          </div>
        )}

        {/* 完成阶段 */}
        {phase === 'done' && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">完成本节啦！</h2>
            <p className="text-muted-foreground mb-6">
              答对 {correctCount} / {totalPractices} 题
              {correctCount === totalPractices && '，太厉害啦！'}
              {correctCount === totalPractices - 1 && '，几乎全对！'}
              {correctCount < totalPractices - 1 && '，再练一次会更熟练。'}
            </p>
            <div className="space-y-3 max-w-xs mx-auto">
              <Button onClick={restart} variant="outline" className="w-full h-12 text-base">
                <RefreshCw className="w-4 h-4 mr-2" />
                再练一次
              </Button>
              <Button onClick={() => navigate(`/math/g1v2/unit/${unit.id}`)} className="w-full h-12 text-base">
                返回单元目录
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const PhaseDot: React.FC<{ active: boolean; done: boolean; label: string }> = ({ active, done, label }) => (
  <div className="flex items-center gap-1.5 flex-shrink-0">
    <div
      className={`w-3 h-3 rounded-full transition-all ${
        done ? 'bg-emerald-500' : active ? 'bg-primary scale-125' : 'bg-muted'
      }`}
    />
    <span className={`text-xs font-medium ${active ? 'text-foreground' : 'text-muted-foreground'} hidden sm:inline`}>
      {label}
    </span>
  </div>
);

const KnowledgeCardView: React.FC<{
  card: KnowledgeCard;
  current: number;
  total: number;
  onPrev?: () => void;
  onNext: () => void;
  nextLabel: string;
}> = ({ card, current, total, onPrev, onNext, nextLabel }) => {
  // 处理关键词高亮
  const renderContent = (text: string) => {
    if (!card.keywords?.length) return text;
    let parts: Array<string | { kw: string }> = [text];
    for (const kw of card.keywords) {
      const next: typeof parts = [];
      for (const part of parts) {
        if (typeof part !== 'string') {
          next.push(part);
          continue;
        }
        const segs = part.split(kw);
        segs.forEach((seg, i) => {
          if (seg) next.push(seg);
          if (i < segs.length - 1) next.push({ kw });
        });
      }
      parts = next;
    }
    return parts.map((p, i) =>
      typeof p === 'string' ? (
        <React.Fragment key={i}>{p}</React.Fragment>
      ) : (
        <span key={i} className="text-rose-600 font-bold">{p.kw}</span>
      ),
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>📖 知识讲解</span>
        <span>{current} / {total}</span>
      </div>

      <div className="bg-card p-6 rounded-2xl border-2 border-border space-y-4">
        <h2 className="text-xl font-bold text-foreground">{card.title}</h2>

        <div className="space-y-2 text-base text-foreground/90 leading-relaxed">
          {card.content.map((p, i) => (
            <p key={i}>{renderContent(p)}</p>
          ))}
        </div>

        {card.visual && <VisualRenderer visual={card.visual} />}

        {card.tip && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-900 whitespace-pre-line">
            💡 {card.tip}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {onPrev && (
          <Button variant="outline" onClick={onPrev} className="flex-1 h-12 text-base">
            ← 上一张
          </Button>
        )}
        <Button onClick={onNext} className="flex-1 h-12 text-base font-bold">
          {nextLabel}
        </Button>
      </div>
    </div>
  );
};

export default LessonPage;
