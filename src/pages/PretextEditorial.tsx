import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prepare, layout } from "@chenglou/pretext";
import { HOMOPHONE_VISUAL_LESSONS } from "@/data/homophoneMeaningV2Bank";
import { CONNECTIVE_LESSONS } from "@/data/connectiveWordsData";

// 从真实 K12 数据生成文章内容
function buildArticleFromK12Data() {
  const blocks: Array<{ type: "headline" | "body" | "pullquote" | "char-showcase"; text: string }> = [];

  // 标题
  blocks.push({ type: "headline", text: "同音字的世界" });

  // 同音字导语
  blocks.push({ type: "body", text: "汉语中有大量读音相同但意义完全不同的字——同音字。它们是一年级语文学习中最容易混淆的知识点，也是最能体现汉字造字智慧的地方。" });

  // 从真实数据取前 4 组同音字
  const sampleLessons = HOMOPHONE_VISUAL_LESSONS.slice(0, 4);
  for (const lesson of sampleLessons) {
    const words = lesson.items.map(i => i.word).join("、");
    blocks.push({ type: "char-showcase", text: `「${lesson.pinyinTone}」→ ${words}` });

    // 取每组的第一个字的意思和示例作为正文
    const first = lesson.items[0];
    const second = lesson.items[1];
    if (first && second) {
      blocks.push({
        type: "body",
        text: `"${first.word}"${first.meaning}，如：${first.example}。而"${second.word}"${second.meaning}，如：${second.example}。读音一样，意思天差地别。`,
      });
    }
  }

  // 拉引语
  blocks.push({ type: "pullquote", text: "同一个读音，不同的灵魂。理解字义，才能用对每一个字。" });

  // 连接词篇
  blocks.push({ type: "headline", text: "连接词的力量" });
  blocks.push({ type: "body", text: "连接词像是句子之间的桥梁，让前后文产生因果、转折、递进等逻辑关系。一年级的孩子学会使用连接词，就开始具备「连贯表达」的能力。" });

  // 从连接词数据取样
  const sampleConnectives = CONNECTIVE_LESSONS.slice(0, 6);
  for (const conn of sampleConnectives) {
    blocks.push({
      type: "char-showcase",
      text: `「${conn.category}」${conn.pairLeft}……${conn.pairRight}……`,
    });
    blocks.push({
      type: "body",
      text: `${conn.meaning} ${conn.examples[0]}`,
    });
  }

  blocks.push({ type: "pullquote", text: "语言的逻辑，从第一对「因为……所以……」开始。" });

  // 更多同音字展示
  blocks.push({ type: "headline", text: "易混淆字辨析" });
  const moreLessons = HOMOPHONE_VISUAL_LESSONS.slice(4, 8);
  for (const lesson of moreLessons) {
    const items = lesson.items;
    if (items.length >= 2) {
      blocks.push({
        type: "body",
        text: `读音"${lesson.pinyinTone}"：${items.map(i => `"${i.word}"${i.meaning}`).join("；")}。`,
      });
    }
  }

  blocks.push({ type: "body", text: "每一组同音字，都是一次思维的锻炼。分辨它们的过程，就是在建立更精确的语言感知力。这种能力，将伴随孩子从一年级走向更广阔的语文世界。" });

  return blocks;
}

interface LayoutLine {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontWeight: string;
  fontStyle: string;
  type: string;
  borderLeft?: string;
  paddingLeft?: number;
}

interface Orb {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  char: string; // 显示一个汉字在球体上
}

function computeEditorialLayout(
  blocks: Array<{ type: string; text: string }>,
  width: number,
  height: number,
  orbs: Orb[],
  colCount: number
): LayoutLine[] {
  const lines: LayoutLine[] = [];
  const padding = Math.max(32, width * 0.06);
  const colGap = 32;
  const totalContentW = width - padding * 2;
  const colWidth = (totalContentW - colGap * (colCount - 1)) / colCount;

  if (colWidth < 60) return lines;

  let col = 0;
  const colTops = new Array(colCount).fill(padding + 8);

  for (const block of blocks) {
    const curCol = col % colCount;
    const colX = padding + curCol * (colWidth + colGap);
    let curY = colTops[curCol];

    if (block.type === "headline") {
      if (colCount > 1) curY = Math.max(...colTops) + 24;

      const fontSize = Math.min(Math.max(24, width * 0.042), 42);
      const font = `bold ${fontSize}px system-ui, sans-serif`;
      const lineHeight = fontSize * 1.3;

      try {
        const fullW = colCount > 1 ? totalContentW : colWidth;
        const result = layout(prepare(block.text, font), fullW, lineHeight);
        const cpl = Math.max(1, Math.ceil(block.text.length / result.lineCount));
        for (let i = 0; i < result.lineCount; i++) {
          const s = i * cpl;
          const e = Math.min(s + cpl, block.text.length);
          lines.push({ text: block.text.slice(s, e), x: padding, y: curY, fontSize, color: "#ffffff", fontWeight: "bold", fontStyle: "normal", type: "headline" });
          curY += lineHeight;
        }
      } catch {
        lines.push({ text: block.text, x: padding, y: curY, fontSize, color: "#ffffff", fontWeight: "bold", fontStyle: "normal", type: "headline" });
        curY += fontSize * 1.3;
      }
      curY += 16;
      for (let c = 0; c < colCount; c++) colTops[c] = curY;
      col = 0;
      continue;
    }

    if (block.type === "pullquote") {
      curY += 14;
      const fontSize = Math.min(Math.max(15, width * 0.026), 20);
      lines.push({
        text: `"${block.text}"`, x: colX + 18, y: curY, fontSize,
        color: "#c4a35a", fontWeight: "normal", fontStyle: "italic",
        type: "pullquote", borderLeft: "3px solid #6b5a3d", paddingLeft: 14,
      });
      try {
        const result = layout(prepare(block.text, `italic ${fontSize}px system-ui`), colWidth - 36, fontSize * 1.6);
        curY += result.height + 28;
      } catch { curY += fontSize * 4; }
      colTops[curCol] = curY;
      col++;
      continue;
    }

    if (block.type === "char-showcase") {
      curY += 6;
      const fontSize = Math.min(Math.max(16, width * 0.03), 22);
      lines.push({
        text: block.text, x: colX, y: curY, fontSize,
        color: "#d97757", fontWeight: "bold", fontStyle: "normal", type: "char-showcase",
      });
      curY += fontSize * 1.6 + 4;
      colTops[curCol] = curY;
      continue; // 不换列
    }

    // body
    const fontSize = Math.min(Math.max(13, width * 0.022), 17);
    const font = `${fontSize}px system-ui, sans-serif`;
    const lineHeight = fontSize * 1.85;

    try {
      // 球体遮挡检测
      let effectiveWidth = colWidth;
      for (const orb of orbs) {
        const orbL = orb.x - orb.radius, orbR = orb.x + orb.radius;
        if (orbR > colX && orbL < colX + colWidth && Math.abs(orb.y - curY) < orb.radius * 2.5) {
          effectiveWidth = Math.max(60, colWidth - orb.radius * 1.4);
        }
      }

      const result = layout(prepare(block.text, font), effectiveWidth, lineHeight);
      const cpl = Math.max(1, Math.ceil(block.text.length / result.lineCount));

      for (let i = 0; i < result.lineCount; i++) {
        if (curY > height * 2) break; // 允许更长的滚动
        const s = i * cpl;
        const e = Math.min(s + cpl, block.text.length);

        let lineX = colX;
        for (const orb of orbs) {
          const dy = Math.abs(orb.y - curY);
          if (dy < orb.radius) {
            const dx = Math.sqrt(orb.radius * orb.radius - dy * dy);
            if (orb.x - dx < colX + colWidth / 2) {
              lineX = Math.max(lineX, orb.x + dx + 10);
            }
          }
        }

        lines.push({
          text: block.text.slice(s, e), x: lineX, y: curY, fontSize,
          color: "#d5d0c8", fontWeight: "normal", fontStyle: "normal", type: "body",
        });
        curY += lineHeight;
      }
      curY += lineHeight * 0.3;
    } catch {
      lines.push({ text: block.text, x: colX, y: curY, fontSize, color: "#d5d0c8", fontWeight: "normal", fontStyle: "normal", type: "body" });
      curY += lineHeight * 3;
    }

    colTops[curCol] = curY;
    col++;
  }

  return lines;
}

const PretextEditorial = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const article = useMemo(() => buildArticleFromK12Data(), []);

  const [lines, setLines] = useState<LayoutLine[]>([]);
  const [orbs, setOrbs] = useState<Orb[]>([
    { x: 280, y: 220, radius: 52, vx: 0.5, vy: 0.35, color: "radial-gradient(circle at 35% 35%, #f59e0b, #92400e)", char: "声" },
    { x: 550, y: 380, radius: 38, vx: -0.4, vy: 0.3, color: "radial-gradient(circle at 35% 35%, #d97757, #7c2d12)", char: "义" },
  ]);
  const [dims, setDims] = useState({ w: 900, h: 700 });
  const [hoveredLine, setHoveredLine] = useState(-1);
  const [draggingOrb, setDraggingOrb] = useState(-1);
  const [paused, setPaused] = useState(false);
  const [computeMs, setComputeMs] = useState(0);

  const reflow = useCallback((currentOrbs: Orb[], w: number, h: number) => {
    const cols = w > 800 ? 2 : 1;
    const t0 = performance.now();
    const result = computeEditorialLayout(article, w, h, currentOrbs, cols);
    setComputeMs(performance.now() - t0);
    setLines(result);
  }, [article]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const animate = () => {
      const rect = el.getBoundingClientRect();
      const w = rect.width, h = rect.height;
      setDims({ w, h });
      setOrbs(prev => {
        const next = prev.map(orb => {
          if (paused) return orb;
          let { x, y, vx, vy, radius } = orb;
          x += vx; y += vy;
          if (x - radius < 0 || x + radius > w) vx = -vx;
          if (y - radius < 40 || y + radius > h) vy = -vy;
          x = Math.max(radius, Math.min(w - radius, x));
          y = Math.max(radius + 40, Math.min(h - radius, y));
          return { ...orb, x, y, vx, vy };
        });
        reflow(next, w, h);
        return next;
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [paused, reflow]);

  const handlePointerDown = (i: number) => (e: React.PointerEvent) => {
    e.preventDefault();
    setDraggingOrb(i);
    setPaused(true);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (draggingOrb < 0 || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setOrbs(prev => {
      const next = [...prev];
      next[draggingOrb] = { ...next[draggingOrb], x: e.clientX - rect.left, y: e.clientY - rect.top, vx: 0, vy: 0 };
      reflow(next, rect.width, rect.height);
      return next;
    });
  };
  const handlePointerUp = () => {
    if (draggingOrb >= 0) {
      setOrbs(prev => {
        const next = [...prev];
        next[draggingOrb] = { ...next[draggingOrb], vx: (Math.random() - 0.5) * 1.2, vy: (Math.random() - 0.5) * 1.2 };
        return next;
      });
    }
    setDraggingOrb(-1);
    setPaused(false);
  };

  const totalHeight = lines.length > 0 ? Math.max(...lines.map(l => l.y + 40)) : 600;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a0a0c" }}>
      <header className="flex items-center gap-3 px-4 py-3 z-20 relative">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="text-white/70 hover:text-white hover:bg-white/10">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-sm font-semibold text-white/90">K12 Editorial Engine · 同音字 × 连接词</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono" style={{ color: "#d97757" }}>
            {computeMs.toFixed(1)}ms · {lines.length} lines
          </span>
          <button onClick={() => setPaused(!paused)} className="text-[11px] font-mono px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.1)", color: "#c4a35a" }}>
            {paused ? "▶ 播放" : "⏸ 暂停"}
          </button>
        </div>
      </header>

      <div className="flex justify-center py-1 z-20 relative">
        <div className="px-4 py-1.5 rounded-full text-[12px]" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
          拖动「声」「义」球体 · 缩放窗口 · 观察同音字和连接词内容实时重排
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 relative overflow-auto mx-4 mb-4 rounded-2xl cursor-default"
        style={{ background: "radial-gradient(ellipse at 50% 30%, #12120f, #0a0a0c)", minHeight: Math.max(600, totalHeight + 60) }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Ambient */}
        <div className="absolute pointer-events-none" style={{ top: "5%", left: "15%", width: "35%", height: "30%", background: "radial-gradient(ellipse, rgba(245,158,11,0.05) 0%, transparent 70%)" }} />
        <div className="absolute pointer-events-none" style={{ bottom: "10%", right: "10%", width: "30%", height: "25%", background: "radial-gradient(ellipse, rgba(217,119,87,0.04) 0%, transparent 70%)" }} />

        {/* Orbs */}
        {orbs.map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center"
            style={{
              left: orb.x - orb.radius, top: orb.y - orb.radius,
              width: orb.radius * 2, height: orb.radius * 2,
              background: orb.color,
              boxShadow: `0 0 ${orb.radius * 0.8}px rgba(245,158,11,0.25)`,
              zIndex: 10, touchAction: "none",
              transition: draggingOrb === i ? "none" : "box-shadow 0.3s",
            }}
            onPointerDown={handlePointerDown(i)}
          >
            <span className="text-white/90 font-bold select-none" style={{ fontSize: orb.radius * 0.7 }}>{orb.char}</span>
          </div>
        ))}

        {/* Lines */}
        {lines.map((line, i) => {
          const isHovered = hoveredLine === i;
          let color = line.color;
          if (isHovered && line.type !== "pullquote") color = "#d97757";

          return (
            <div
              key={i}
              className="absolute select-none"
              style={{
                left: line.x, top: line.y,
                fontSize: line.fontSize, fontWeight: line.fontWeight, fontStyle: line.fontStyle,
                color, lineHeight: 1,
                fontFamily: line.type === "headline" ? '"Noto Serif SC", "Songti SC", serif' : "system-ui, sans-serif",
                transition: "color 0.15s ease",
                zIndex: line.type === "headline" ? 2 : 1,
                borderLeft: line.borderLeft, paddingLeft: line.paddingLeft,
                letterSpacing: line.type === "headline" ? "-0.5px" : line.type === "char-showcase" ? "0.5px" : undefined,
              }}
              onMouseEnter={() => setHoveredLine(i)}
              onMouseLeave={() => setHoveredLine(-1)}
            >
              {line.text}
            </div>
          );
        })}

        <div className="absolute bottom-4 left-0 right-0 text-center" style={{ fontSize: 11, color: "rgba(255,255,255,0.12)", fontFamily: "monospace" }}>
          K12 同音字 × 连接词 · pretext editorial engine · {lines.length} lines · JS layout only
        </div>
      </div>
    </div>
  );
};

export default PretextEditorial;
