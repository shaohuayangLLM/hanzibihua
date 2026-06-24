import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Practice } from '@/data/math/grade1Vol2/types';
import { ShapeIcon, SHAPE_LABELS } from './ShapeIcon';
import Check from 'lucide-react/dist/esm/icons/check';
import X from 'lucide-react/dist/esm/icons/x';
import Lightbulb from 'lucide-react/dist/esm/icons/lightbulb';

interface Props {
  practice: Practice;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
  isLast: boolean;
}

type Status = 'unanswered' | 'correct' | 'wrong';

export const PracticeRunner: React.FC<Props> = ({ practice, onAnswer, onNext, isLast }) => {
  const [status, setStatus] = useState<Status>('unanswered');
  const [showHint, setShowHint] = useState(false);

  const reset = () => {
    setStatus('unanswered');
    setShowHint(false);
  };

  const handleResult = (correct: boolean) => {
    setStatus(correct ? 'correct' : 'wrong');
    onAnswer(correct);
  };

  const handleNext = () => {
    reset();
    onNext();
  };

  return (
    <div className="space-y-5">
      {/* 题干 */}
      <div className="bg-card p-5 rounded-2xl border-2 border-border">
        <p className="text-lg font-bold text-foreground leading-relaxed">{practice.prompt}</p>
      </div>

      {/* 答题区 */}
      {practice.kind === 'choice' && (
        <ChoiceAnswer practice={practice} status={status} onResult={handleResult} />
      )}
      {practice.kind === 'fill' && (
        <FillAnswer practice={practice} status={status} onResult={handleResult} />
      )}
      {practice.kind === 'shape-pick' && (
        <ShapePickAnswer practice={practice} status={status} onResult={handleResult} />
      )}
      {practice.kind === 'classify' && (
        <ClassifyAnswer practice={practice} status={status} onResult={handleResult} />
      )}
      {practice.kind === 'count-shapes' && (
        <CountShapesAnswer practice={practice} status={status} onResult={handleResult} />
      )}

      {/* 提示按钮 */}
      {practice.hint && status === 'unanswered' && (
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-2 text-sm text-amber-700 hover:text-amber-900 transition-colors"
        >
          <Lightbulb className="w-4 h-4" />
          {showHint ? '收起提示' : '看一下提示'}
        </button>
      )}
      {showHint && practice.hint && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-900">
          💡 {practice.hint}
        </div>
      )}

      {/* 反馈区 */}
      {status === 'correct' && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
            <Check className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-emerald-900">答对了！👏</div>
            {practice.explanation && (
              <div className="text-sm text-emerald-800 mt-1">{practice.explanation}</div>
            )}
          </div>
        </div>
      )}
      {status === 'wrong' && (
        <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white flex-shrink-0">
            <X className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-rose-900">再想想看 🤔</div>
            {practice.explanation && (
              <div className="text-sm text-rose-800 mt-1">{practice.explanation}</div>
            )}
            <button
              onClick={reset}
              className="mt-2 text-sm text-rose-700 underline hover:text-rose-900"
            >
              再试一次
            </button>
          </div>
        </div>
      )}

      {/* 下一题 */}
      {(status === 'correct' || status === 'wrong') && (
        <Button onClick={handleNext} className="w-full h-12 text-base font-bold">
          {isLast ? '🎉 完成本节' : '下一题 →'}
        </Button>
      )}
    </div>
  );
};

// ========== 选择题 ==========
const ChoiceAnswer: React.FC<{
  practice: Extract<Practice, { kind: 'choice' }>;
  status: Status;
  onResult: (c: boolean) => void;
}> = ({ practice, status, onResult }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const handle = (opt: string) => {
    if (status !== 'unanswered') return;
    setSelected(opt);
    onResult(opt === practice.answer);
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {practice.options.map((opt) => {
        const isSelected = selected === opt;
        const isCorrect = opt === practice.answer;
        let cls = 'border-border bg-card hover:border-primary/50 hover:bg-muted/30';
        if (status !== 'unanswered' && isCorrect) cls = 'border-emerald-400 bg-emerald-50';
        else if (status === 'wrong' && isSelected) cls = 'border-rose-400 bg-rose-50';
        return (
          <button
            key={opt}
            onClick={() => handle(opt)}
            disabled={status !== 'unanswered'}
            className={`p-4 rounded-xl border-2 text-base font-medium transition-all active:scale-95 ${cls} ${status !== 'unanswered' ? 'cursor-default' : ''}`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
};

// ========== 填空题（带分步） ==========
const FillAnswer: React.FC<{
  practice: Extract<Practice, { kind: 'fill' }>;
  status: Status;
  onResult: (c: boolean) => void;
}> = ({ practice, status, onResult }) => {
  const [value, setValue] = useState('');
  const handle = () => {
    if (!value.trim()) return;
    onResult(Number(value) === practice.answer);
  };
  return (
    <div className="space-y-3">
      {practice.steps && (
        <div className="p-4 bg-muted/40 rounded-xl space-y-2 text-sm">
          {practice.steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-muted-foreground">第 {i + 1} 步：</span>
              <span className="flex-1">{step.label}</span>
              {step.value !== undefined && !step.blank && (
                <span className="font-bold text-primary">= {step.value}</span>
              )}
              {step.blank && <span className="font-bold text-rose-500">= ?</span>}
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <Input
          type="number"
          inputMode="numeric"
          placeholder="输入答案"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={status !== 'unanswered'}
          className="text-2xl font-bold text-center h-14"
          onKeyDown={(e) => e.key === 'Enter' && handle()}
        />
        {status === 'unanswered' && (
          <Button onClick={handle} className="h-14 px-6 text-base font-bold">
            提交
          </Button>
        )}
      </div>
    </div>
  );
};

// ========== 选图形 ==========
const ShapePickAnswer: React.FC<{
  practice: Extract<Practice, { kind: 'shape-pick' }>;
  status: Status;
  onResult: (c: boolean) => void;
}> = ({ practice, status, onResult }) => {
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const toggle = (id: string) => {
    if (status !== 'unanswered') return;
    const next = new Set(picked);
    next.has(id) ? next.delete(id) : next.add(id);
    setPicked(next);
  };
  const submit = () => {
    if (picked.size === 0) return;
    const correctSet = new Set(practice.answer);
    const equal = picked.size === correctSet.size && [...picked].every((p) => correctSet.has(p));
    onResult(equal);
  };
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {practice.candidates.map((c) => {
          const isPicked = picked.has(c.id);
          const isCorrect = practice.answer.includes(c.id);
          let cls = 'border-border bg-card';
          if (status !== 'unanswered') {
            if (isCorrect) cls = 'border-emerald-400 bg-emerald-50';
            else if (isPicked) cls = 'border-rose-400 bg-rose-50';
          } else {
            cls = isPicked ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/50';
          }
          return (
            <button
              key={c.id}
              onClick={() => toggle(c.id)}
              disabled={status !== 'unanswered'}
              className={`p-3 rounded-xl border-2 transition-all active:scale-95 flex flex-col items-center gap-1 ${cls}`}
            >
              <ShapeIcon shape={c.shape} size={56} stroke="#475569" />
              <span className="text-xs text-muted-foreground">{SHAPE_LABELS[c.shape]}</span>
            </button>
          );
        })}
      </div>
      {status === 'unanswered' && (
        <Button onClick={submit} disabled={picked.size === 0} className="w-full h-12 text-base font-bold">
          提交（已选 {picked.size}）
        </Button>
      )}
    </div>
  );
};

// ========== 分类拖拽 ==========
const ClassifyAnswer: React.FC<{
  practice: Extract<Practice, { kind: 'classify' }>;
  status: Status;
  onResult: (c: boolean) => void;
}> = ({ practice, status, onResult }) => {
  // assignments[itemId] = bucketId
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const assign = (itemId: string, bucketId: string) => {
    if (status !== 'unanswered') return;
    setAssignments((prev) => ({ ...prev, [itemId]: bucketId }));
  };
  const unassigned = practice.items.filter((it) => !assignments[it.id]);
  const allAssigned = unassigned.length === 0;

  const submit = () => {
    const allCorrect = practice.items.every((it) => assignments[it.id] === it.category);
    onResult(allCorrect);
  };

  return (
    <div className="space-y-4">
      {/* 待分类区 */}
      {unassigned.length > 0 && (
        <div>
          <div className="text-sm font-bold text-muted-foreground mb-2">点击选择 → 选桶</div>
          <div className="flex flex-wrap gap-2 p-3 bg-muted/30 rounded-xl min-h-[60px]">
            {unassigned.map((it) => (
              <ItemChip key={it.id} item={it} onPick={(bid) => assign(it.id, bid)} buckets={practice.buckets} />
            ))}
          </div>
        </div>
      )}

      {/* 桶 */}
      <div className="grid grid-cols-2 gap-3">
        {practice.buckets.map((b) => {
          const items = practice.items.filter((it) => assignments[it.id] === b.id);
          return (
            <div key={b.id} className="p-3 rounded-xl border-2 border-dashed border-muted-foreground/30 bg-card min-h-[120px]">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border">
                <span className="text-2xl">{b.emoji}</span>
                <span className="font-bold text-foreground">{b.label}</span>
                <span className="ml-auto text-xs text-muted-foreground">{items.length} 个</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((it) => {
                  const isCorrect = it.category === b.id;
                  let cls = 'bg-muted';
                  if (status !== 'unanswered') {
                    cls = isCorrect ? 'bg-emerald-100 border border-emerald-300' : 'bg-rose-100 border border-rose-300';
                  }
                  return (
                    <button
                      key={it.id}
                      onClick={() => status === 'unanswered' && setAssignments((prev) => {
                        const next = { ...prev };
                        delete next[it.id];
                        return next;
                      })}
                      disabled={status !== 'unanswered'}
                      className={`px-2 py-1 rounded-md text-sm flex items-center gap-1 ${cls}`}
                    >
                      <span>{it.emoji}</span>
                      <span className="text-xs">{it.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {status === 'unanswered' && (
        <Button onClick={submit} disabled={!allAssigned} className="w-full h-12 text-base font-bold">
          {allAssigned ? '检查答案' : `还剩 ${unassigned.length} 个未分类`}
        </Button>
      )}
    </div>
  );
};

const ItemChip: React.FC<{
  item: { id: string; label: string; emoji: string };
  buckets: Array<{ id: string; label: string; emoji: string }>;
  onPick: (bucketId: string) => void;
}> = ({ item, buckets, onPick }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-2 rounded-lg bg-card border border-border hover:border-primary flex items-center gap-1.5 text-sm shadow-sm active:scale-95 transition-transform"
      >
        <span className="text-lg">{item.emoji}</span>
        <span>{item.label}</span>
      </button>
      {open && (
        <div className="absolute z-10 top-full left-0 mt-1 bg-card border-2 border-primary rounded-lg shadow-lg p-1 flex gap-1">
          {buckets.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                setOpen(false);
                onPick(b.id);
              }}
              className="px-2 py-1.5 rounded-md hover:bg-primary/10 text-xs flex items-center gap-1 whitespace-nowrap"
            >
              <span>{b.emoji}</span>
              <span>{b.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ========== 数图形 ==========
const CountShapesAnswer: React.FC<{
  practice: Extract<Practice, { kind: 'count-shapes' }>;
  status: Status;
  onResult: (c: boolean) => void;
}> = ({ practice, status, onResult }) => {
  const [value, setValue] = useState('');
  const handle = () => {
    if (!value.trim()) return;
    onResult(Number(value) === practice.answer);
  };
  return (
    <div className="space-y-3">
      <div className="bg-muted/40 p-4 rounded-xl flex justify-center">
        <svg viewBox={`0 0 200 ${practice.rows * 30}`} className="w-full max-w-[280px]">
          <rect x="2" y="2" width="196" height={practice.rows * 30 - 4} fill="white" stroke="#475569" strokeWidth="2" />
          {Array.from({ length: practice.rows - 1 }).map((_, i) => (
            <line key={i} x1="2" y1={(i + 1) * 30} x2="198" y2={(i + 1) * 30} stroke="#475569" strokeWidth="1.5" />
          ))}
        </svg>
      </div>
      <div className="flex gap-2">
        <Input
          type="number"
          inputMode="numeric"
          placeholder="一共几个长方形？"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={status !== 'unanswered'}
          className="text-2xl font-bold text-center h-14"
          onKeyDown={(e) => e.key === 'Enter' && handle()}
        />
        {status === 'unanswered' && (
          <Button onClick={handle} className="h-14 px-6 text-base font-bold">
            提交
          </Button>
        )}
      </div>
    </div>
  );
};
