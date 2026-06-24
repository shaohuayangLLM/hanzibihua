import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  cnNum, formula, kouJue, additionText,
  LEVELS, makeQuestion, QUESTIONS_PER_LEVEL,
  type Question,
} from '@/data/math/multiplicationTable';

const LS_LEARNED = 'mult_learned';
const LS_BEST = 'mult_quiz_best';

function loadJSON<T>(key: string, def: T): T {
  try {
    const v = localStorage.getItem(key);
    return v == null ? def : (JSON.parse(v) as T);
  } catch {
    return def;
  }
}
function saveJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* 隐私模式等不可用时静默降级 */
  }
}

type Sel = { a: number; b: number } | null;

/* ============ 撒花动画（纯 CSS，无依赖） ============ */
const CONFETTI_COLORS = [
  'hsl(25 95% 55%)', 'hsl(160 60% 45%)', 'hsl(142 76% 45%)',
  'hsl(280 60% 60%)', 'hsl(45 95% 55%)',
];
function Confetti({ fireKey }: { fireKey: number }) {
  const pieces = useMemo(
    () => Array.from({ length: 24 }).map((_, i) => ({
      left: Math.random() * 100,
      size: 6 + Math.random() * 8,
      dur: 1 + Math.random() * 0.4,
      delay: Math.random() * 0.2,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    })),
    [fireKey],
  );
  if (!fireKey) return null;
  return (
    <div key={fireKey} className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          style={{
            position: 'absolute', top: '-5vh', left: `${p.left}vw`,
            width: `${p.size}px`, height: `${p.size}px`, background: p.color,
            borderRadius: '2px',
            animation: `mult-fall ${p.dur}s ease-in forwards`, animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{'@keyframes mult-fall{to{transform:translateY(115vh) rotate(540deg);opacity:0}}'}</style>
    </div>
  );
}

/* ============ ① 看表 ============ */
function LowerGrid({ sel, onSelect }: { sel: Sel; onSelect: (a: number, b: number) => void }) {
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(9, minmax(0,1fr))' }}>
      {Array.from({ length: 9 }, (_, ri) => ri + 1).flatMap((i) =>
        Array.from({ length: 9 }, (_, ci) => ci + 1).map((j) => {
          if (j > i) return <span key={`${i}-${j}`} />;
          const isSel = sel?.a === j && sel?.b === i;
          return (
            <button
              key={`${i}-${j}`}
              onClick={() => onSelect(j, i)}
              className={`flex flex-col items-center justify-center rounded-md py-1 min-h-[42px] overflow-hidden transition-transform active:scale-95 ${isSel ? 'ring-2 ring-primary' : ''}`}
              style={{ background: `hsl(${(j - 1) * 40} 70% 93%)` }}
            >
              <span className="font-bold leading-none text-foreground" style={{ fontSize: 'clamp(8px,2.2vw,15px)' }}>{formula(j, i)}</span>
              <span className="font-semibold leading-none text-muted-foreground mt-0.5" style={{ fontSize: 'clamp(7px,1.85vw,13px)' }}>{kouJue(j, i)}</span>
            </button>
          );
        }),
      )}
    </div>
  );
}

function FullGrid({ sel, onSelect }: { sel: Sel; onSelect: (a: number, b: number) => void }) {
  const head = ['×', 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: '1.4rem repeat(9, minmax(0,1fr))' }}>
      {head.map((h, i) => (
        <div key={`h${i}`} className="flex items-center justify-center text-xs font-bold text-primary h-7">{h}</div>
      ))}
      {Array.from({ length: 9 }, (_, ri) => ri + 1).flatMap((r) => [
        <div key={`r${r}`} className="flex items-center justify-center text-xs font-bold text-primary">{r}</div>,
        ...Array.from({ length: 9 }, (_, ci) => ci + 1).map((c) => {
          const a = Math.min(r, c);
          const b = Math.max(r, c);
          const isSel = sel?.a === a && sel?.b === b;
          return (
            <button
              key={`${r}-${c}`}
              onClick={() => onSelect(a, b)}
              className={`flex items-center justify-center rounded-md h-9 text-sm font-bold border transition-transform active:scale-90 ${isSel ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-foreground border-border'}`}
            >
              {r * c}
            </button>
          );
        }),
      ])}
    </div>
  );
}

function TableTab() {
  const [mode, setMode] = useState<'lower' | 'full'>('lower');
  const [sel, setSel] = useState<Sel>(null);

  return (
    <div>
      <div className="flex justify-end mb-3">
        <div className="inline-flex rounded-full bg-muted p-1">
          {(['lower', 'full'] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setSel(null); }}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${mode === m ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}
            >
              {m === 'lower' ? '下三角' : '完整表'}
            </button>
          ))}
        </div>
      </div>

      {sel ? (
        <div className="rounded-2xl bg-primary/10 p-4 mb-4 text-center">
          <div className="text-3xl sm:text-4xl font-extrabold text-primary">{formula(sel.a, sel.b)}</div>
          <div className="text-xl sm:text-2xl font-bold text-muted-foreground mt-1">{kouJue(sel.a, sel.b)}</div>
          <div className="flex flex-col items-center gap-2 mt-3">
            <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${sel.b}, auto)` }}>
              {Array.from({ length: sel.a * sel.b }).map((_, i) => (
                <span key={i} className="w-2.5 h-2.5 rounded-full bg-primary" />
              ))}
            </div>
            <div className="text-base sm:text-lg font-bold text-primary">{additionText(sel.a, sel.b)}</div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-primary/10 p-6 mb-4 text-center font-semibold text-muted-foreground">
          点一个格子，看看是哪两个数相乘
        </div>
      )}

      {mode === 'lower'
        ? <LowerGrid sel={sel} onSelect={(a, b) => setSel({ a, b })} />
        : <FullGrid sel={sel} onSelect={(a, b) => setSel({ a, b })} />}
    </div>
  );
}

/* ============ ② 分组学习 ============ */
function LearnTab() {
  const [n, setN] = useState(2);
  const [learned, setLearned] = useState<number[]>(() => loadJSON<number[]>(LS_LEARNED, []));

  const toggle = () => {
    const next = learned.includes(n) ? learned.filter((x) => x !== n) : [...learned, n];
    setLearned(next);
    saveJSON(LS_LEARNED, next);
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 mb-5">
        {Array.from({ length: 8 }, (_, i) => i + 2).map((x) => (
          <button
            key={x}
            onClick={() => setN(x)}
            className={`relative h-14 rounded-xl text-2xl font-extrabold transition-all ${n === x ? 'bg-primary text-primary-foreground shadow-md' : 'bg-card border border-border text-foreground'}`}
          >
            {x}
            {learned.includes(x) && <span className="absolute top-1 right-1.5 text-xs">⭐</span>}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-foreground">{n} 的乘法</h3>
        <Button variant={learned.includes(n) ? 'default' : 'outline'} size="sm" onClick={toggle}>
          {learned.includes(n) ? '已学会 ✓' : '标记为已学会'}
        </Button>
      </div>

      <div className="space-y-2">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((i) => (
          <div
            key={i}
            className="flex items-baseline justify-between rounded-xl px-4 py-3"
            style={{ background: `hsl(${(i * 40) % 360} 70% 95%)` }}
          >
            <span className="text-xl sm:text-2xl font-extrabold text-foreground">{formula(n, i)}</span>
            <span className="text-base sm:text-lg font-bold text-muted-foreground">{kouJue(n, i)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ ③ 闯关 ============ */
function QuizTab() {
  const [best, setBest] = useState<Record<number, number>>(() => loadJSON<Record<number, number>>(LS_BEST, {}));
  const [levelIdx, setLevelIdx] = useState<number | null>(null);
  const [qn, setQn] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [cur, setCur] = useState<Question | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [fireKey, setFireKey] = useState(0);

  const start = (i: number) => {
    setLevelIdx(i); setQn(1); setCorrect(0); setPicked(null); setDone(false);
    setCur(makeQuestion(LEVELS[i]));
  };

  const next = (finalCorrect: number) => {
    if (qn >= QUESTIONS_PER_LEVEL) {
      setBest((prev) => {
        const nb = { ...prev, [levelIdx as number]: Math.max(prev[levelIdx as number] ?? 0, finalCorrect) };
        saveJSON(LS_BEST, nb);
        return nb;
      });
      setDone(true);
      return;
    }
    setQn((q) => q + 1);
    setPicked(null);
    setCur(makeQuestion(LEVELS[levelIdx as number]));
  };

  const pick = (v: number) => {
    if (picked != null || !cur) return;
    setPicked(v);
    if (v === cur.answer) {
      const c = correct + 1;
      setCorrect(c);
      setFireKey((k) => k + 1);
      setTimeout(() => next(c), 850);
    }
  };

  // 关卡列表
  if (levelIdx === null) {
    return (
      <div className="space-y-3">
        {LEVELS.map((lv, i) => {
          const facs = lv.factors.length > 5 ? '2~9' : lv.factors.join('、');
          const b = best[i];
          return (
            <button
              key={i}
              onClick={() => start(i)}
              className="w-full text-left rounded-2xl bg-card border border-border shadow-md p-4 transition-all hover:shadow-xl hover:border-primary active:scale-[0.99]"
            >
              <div className="text-lg font-extrabold text-primary">{lv.name}</div>
              <div className="text-sm text-muted-foreground">{facs} 的乘法 · {lv.optionCount} 选 1</div>
              <div className="text-xs font-bold text-accent mt-1">
                {b != null ? `最好成绩 ${b}/${QUESTIONS_PER_LEVEL}` : '还没玩过'}
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  // 结算
  if (done) {
    const msg = correct === QUESTIONS_PER_LEVEL ? '太棒了，全部答对！'
      : correct >= Math.ceil(QUESTIONS_PER_LEVEL * 0.6) ? '很不错，继续加油！'
        : '多练几次就记住啦！';
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <div className="text-6xl font-extrabold text-primary">{correct}/{QUESTIONS_PER_LEVEL}</div>
        <div className="text-xl font-bold text-foreground">{msg}</div>
        <Button className="mt-3" onClick={() => setLevelIdx(null)}>回到关卡</Button>
      </div>
    );
  }

  // 答题
  if (!cur) return null;
  const isWrong = picked != null && picked !== cur.answer;
  return (
    <div>
      <Confetti fireKey={fireKey} />
      <div className="flex items-center justify-between mb-5">
        <Button variant="ghost" size="sm" onClick={() => setLevelIdx(null)}>← 关卡</Button>
        <span className="text-sm font-semibold text-muted-foreground">
          第 {qn}/{QUESTIONS_PER_LEVEL} 题 · 已答对 {correct}
        </span>
      </div>

      <div className="text-center text-5xl font-extrabold tracking-wide mb-7">
        {cur.a} × {cur.b} = <span className="text-primary">?</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {cur.options.map((o) => {
          let cls = 'bg-card border-border text-foreground';
          if (picked != null) {
            if (o === cur.answer) cls = 'bg-green-500 border-green-500 text-white';
            else if (o === picked) cls = 'bg-red-500 border-red-500 text-white';
          }
          return (
            <button
              key={o}
              onClick={() => pick(o)}
              disabled={picked != null}
              className={`min-h-[64px] rounded-2xl border-2 text-3xl font-extrabold transition-transform active:scale-95 ${cls}`}
            >
              {o}
            </button>
          );
        })}
      </div>

      {isWrong && (
        <div className="mt-5 rounded-2xl bg-secondary p-4 text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground">{formula(cur.a, cur.b)}</div>
          <div className="text-lg sm:text-xl font-bold text-muted-foreground mt-1">{kouJue(cur.a, cur.b)}</div>
          <Button className="mt-3" onClick={() => next(correct)}>记住啦，继续</Button>
        </div>
      )}
    </div>
  );
}

/* ============ 主页面 ============ */
const MultiplicationTable = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <header className="w-full py-4 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-button text-xl">
            ✖️
          </div>
          <h1 className="text-xl font-bold text-foreground">九九乘法表</h1>
          <span className="text-sm text-muted-foreground">看表 · 分组 · 闯关</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <Tabs defaultValue="table">
          <TabsList className="grid w-full grid-cols-3 h-12">
            <TabsTrigger value="table" className="text-base">看表</TabsTrigger>
            <TabsTrigger value="learn" className="text-base">分组学习</TabsTrigger>
            <TabsTrigger value="quiz" className="text-base">闯关</TabsTrigger>
          </TabsList>
          <TabsContent value="table" className="mt-5"><TableTab /></TabsContent>
          <TabsContent value="learn" className="mt-5"><LearnTab /></TabsContent>
          <TabsContent value="quiz" className="mt-5"><QuizTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MultiplicationTable;
