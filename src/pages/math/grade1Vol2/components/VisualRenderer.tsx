import React from 'react';
import type { KnowledgeCard } from '@/data/math/grade1Vol2/types';
import { ShapeIcon, SHAPE_LABELS } from './ShapeIcon';

// 小棒图（用于凑十/破十/平十演示）
const StickGroup: React.FC<{ filled: number; total?: number; color?: string }> = ({
  filled,
  total = 10,
  color = 'bg-rose-400',
}) => (
  <div className="flex gap-0.5 flex-wrap">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`w-2 h-7 rounded-sm border ${i < filled ? color + ' border-current' : 'bg-white border-muted-foreground/30'}`}
      />
    ))}
  </div>
);

const NumberBubble: React.FC<{ n: number; highlighted?: boolean; color?: string }> = ({
  n,
  highlighted,
  color = 'bg-rose-100 text-rose-700 border-rose-300',
}) => (
  <span
    className={`inline-flex items-center justify-center min-w-[2.25rem] h-9 px-2 rounded-lg border-2 font-bold text-base ${
      highlighted ? color + ' shadow-sm' : 'bg-muted border-muted-foreground/20 text-foreground'
    }`}
  >
    {n}
  </span>
);

export const VisualRenderer: React.FC<{ visual: KnowledgeCard['visual'] }> = ({ visual }) => {
  if (!visual) return null;

  // 接着数 / 倒着数
  if (visual.kind === 'count-on') {
    const reversed = visual.from > visual.to;
    const start = Math.min(visual.from, visual.to);
    const end = Math.max(visual.from, visual.to);
    const nums = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    return (
      <div className="bg-muted/40 p-4 rounded-xl">
        <div className="flex flex-wrap gap-1.5 items-center justify-center">
          {nums.map((n) => (
            <NumberBubble
              key={n}
              n={n}
              highlighted={n === visual.from || n === visual.to}
              color={n === visual.from ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-emerald-100 text-emerald-700 border-emerald-300'}
            />
          ))}
        </div>
        <p className="text-xs text-center text-muted-foreground mt-2">
          {reversed ? '◀ 倒着数' : '▶ 接着数'}
        </p>
      </div>
    );
  }

  // 凑十法
  if (visual.kind === 'make-ten') {
    return (
      <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 space-y-3">
        <div className="flex items-center gap-3 justify-center">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">{visual.base}</div>
            <StickGroup filled={visual.base} total={10} color="bg-rose-400" />
          </div>
          <div className="text-2xl font-bold text-rose-500">+</div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">{visual.addend}</div>
            <StickGroup filled={visual.addend} total={10} color="bg-amber-400" />
          </div>
        </div>
        <div className="text-center text-sm space-y-1">
          <div>把 <NumberBubble n={visual.addend} highlighted color="bg-amber-100 text-amber-700 border-amber-300" /> 拆成 <NumberBubble n={visual.splitToTen} highlighted color="bg-amber-100 text-amber-700 border-amber-300" /> 和 <NumberBubble n={visual.splitRest} highlighted color="bg-amber-100 text-amber-700 border-amber-300" /></div>
          <div className="text-rose-700 font-bold">
            {visual.base} + {visual.splitToTen} = 10，10 + {visual.splitRest} = {visual.base + visual.addend}
          </div>
        </div>
      </div>
    );
  }

  // 平十法
  if (visual.kind === 'level-ten') {
    return (
      <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 space-y-2">
        <div className="text-center text-sm">
          <span className="font-bold">{visual.minuend} - {visual.subtrahend}</span>
        </div>
        <div className="text-center text-sm space-y-1">
          <div>把 <NumberBubble n={visual.subtrahend} highlighted color="bg-emerald-100 text-emerald-700 border-emerald-300" /> 拆成 <NumberBubble n={visual.samePart} highlighted color="bg-emerald-100 text-emerald-700 border-emerald-300" /> 和 <NumberBubble n={visual.rest} highlighted color="bg-emerald-100 text-emerald-700 border-emerald-300" /></div>
          <div className="text-emerald-700 font-bold">
            {visual.minuend} - {visual.samePart} = 10，10 - {visual.rest} = {visual.minuend - visual.subtrahend}
          </div>
          <div className="text-xs text-emerald-600 mt-2">⚠️ 平十法：两步都用减法</div>
        </div>
      </div>
    );
  }

  // 破十法
  if (visual.kind === 'break-ten') {
    return (
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 space-y-2">
        <div className="flex items-center gap-3 justify-center">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">10</div>
            <StickGroup filled={10} total={10} color="bg-blue-400" />
          </div>
          <div className="text-xl font-bold text-blue-500">+</div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">{visual.onesPart}</div>
            <StickGroup filled={visual.onesPart} total={10} color="bg-amber-400" />
          </div>
        </div>
        <div className="text-center text-sm space-y-1">
          <div>把 <NumberBubble n={visual.minuend} highlighted color="bg-blue-100 text-blue-700 border-blue-300" /> 拆成 <NumberBubble n={10} highlighted color="bg-blue-100 text-blue-700 border-blue-300" /> 和 <NumberBubble n={visual.onesPart} highlighted color="bg-amber-100 text-amber-700 border-amber-300" /></div>
          <div className="text-blue-700 font-bold">
            10 - {visual.subtrahend} = {visual.bridge}，{visual.bridge} + {visual.onesPart} = {visual.bridge + visual.onesPart}
          </div>
          <div className="text-xs text-blue-600 mt-2">💡 破十法：先减后加</div>
        </div>
      </div>
    );
  }

  // 想加算减
  if (visual.kind === 'add-think-sub') {
    return (
      <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 space-y-2 text-center">
        <div className="text-base">
          <NumberBubble n={visual.a} highlighted color="bg-purple-100 text-purple-700 border-purple-300" />
          <span className="mx-2 font-bold text-purple-600">+</span>
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg border-2 border-dashed border-purple-400 text-purple-600 font-bold">?</span>
          <span className="mx-2 font-bold">=</span>
          <NumberBubble n={visual.sum} highlighted color="bg-purple-100 text-purple-700 border-purple-300" />
        </div>
        <div className="text-sm text-purple-700">
          所以 {visual.sum} - {visual.a} = <span className="font-bold">{visual.b}</span>
        </div>
      </div>
    );
  }

  // 单个图形展示
  if (visual.kind === 'shape-gallery') {
    return (
      <div className="bg-muted/40 p-4 rounded-xl flex justify-center">
        <ShapeIcon shape={visual.shape} size={88} stroke="#475569" />
      </div>
    );
  }

  // 立体画平面
  if (visual.kind === 'shape-from-solid') {
    return (
      <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-center">
        <div className="text-4xl mb-2">⚠️</div>
        <div className="text-amber-800 font-bold">球体表面是弯的，不能画出圆！</div>
      </div>
    );
  }

  // 长方形分法
  if (visual.kind === 'shape-split') {
    return (
      <div className="bg-muted/40 p-4 rounded-xl flex justify-center gap-4 flex-wrap">
        {visual.ways.map((way) => (
          <svg key={way} width="72" height="56" viewBox="0 0 72 56">
            <rect x="2" y="2" width="68" height="52" fill="none" stroke="#475569" strokeWidth="2" />
            {way === 'horizontal' && <line x1="2" y1="28" x2="70" y2="28" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 3" />}
            {way === 'vertical' && <line x1="36" y1="2" x2="36" y2="54" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 3" />}
            {way === 'diagonal' && <line x1="2" y1="2" x2="70" y2="54" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 3" />}
          </svg>
        ))}
      </div>
    );
  }

  // 三角形拼组
  if (visual.kind === 'shape-combine') {
    return (
      <div className="bg-muted/40 p-4 rounded-xl flex justify-center gap-3 flex-wrap">
        {visual.results.map((s) => (
          <div key={s} className="text-center">
            <ShapeIcon shape={s} size={56} stroke="#475569" />
            <div className="text-xs text-muted-foreground mt-1">{SHAPE_LABELS[s]}</div>
          </div>
        ))}
      </div>
    );
  }

  // 数图形（多行长方形）
  if (visual.kind === 'count-shapes') {
    return (
      <div className="bg-muted/40 p-4 rounded-xl space-y-3">
        <svg viewBox={`0 0 200 ${visual.rows * 30}`} className="w-full max-w-[280px] mx-auto">
          <rect x="2" y="2" width="196" height={visual.rows * 30 - 4} fill="white" stroke="#475569" strokeWidth="2" />
          {Array.from({ length: visual.rows - 1 }).map((_, i) => (
            <line
              key={i}
              x1="2"
              y1={(i + 1) * 30}
              x2="198"
              y2={(i + 1) * 30}
              stroke="#475569"
              strokeWidth="1.5"
            />
          ))}
        </svg>
        <div className="text-sm text-center space-y-1">
          {visual.layers.map((l) => (
            <div key={l.label}>
              {l.label}：<span className="font-bold text-rose-600">{l.count}</span> 个
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 分类表格
  if (visual.kind === 'classify-table') {
    return (
      <div className="bg-white border-2 border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              {visual.headers.map((h) => (
                <th key={h} className="px-4 py-2 text-left font-bold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visual.rows.map((row, ri) => (
              <tr key={ri} className="border-t border-border">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-2">{cell.label}：<span className="font-bold">{cell.value}</span></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
};
