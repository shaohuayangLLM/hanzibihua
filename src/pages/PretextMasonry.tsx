import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prepare, layout } from "@chenglou/pretext";
import { HOMOPHONE_VISUAL_LESSONS, HOMOPHONE_WORD_VISUAL_LESSONS } from "@/data/homophoneMeaningV2Bank";

interface MasonryCard {
  word: string;
  pinyin: string;
  meaning: string;
  example: string;
  label: string;
  group: string;
}

interface PlacedCard extends MasonryCard {
  x: number;
  y: number;
  width: number;
  height: number;
}

const CARD_COLORS = [
  { bg: "#fffbeb", border: "#fde68a", accent: "#92400e" },
  { bg: "#fef3f2", border: "#fecaca", accent: "#991b1b" },
  { bg: "#f0fdf4", border: "#bbf7d0", accent: "#166534" },
  { bg: "#eff6ff", border: "#bfdbfe", accent: "#1e40af" },
  { bg: "#fdf4ff", border: "#e9d5ff", accent: "#7e22ce" },
  { bg: "#fefce8", border: "#fef08a", accent: "#854d0e" },
];

function getCards(): MasonryCard[] {
  const all = [...HOMOPHONE_VISUAL_LESSONS, ...HOMOPHONE_WORD_VISUAL_LESSONS];
  return all.flatMap(lesson =>
    lesson.items.map(item => ({
      word: item.word,
      pinyin: item.pinyinTone,
      meaning: item.meaning,
      example: item.example,
      label: item.illustrationLabel,
      group: lesson.pinyinTone,
    }))
  );
}

function computeMasonry(
  cards: MasonryCard[],
  containerWidth: number,
  colCount: number,
  gap: number
): PlacedCard[] {
  const colWidth = (containerWidth - gap * (colCount - 1)) / colCount;
  const colHeights = new Array(colCount).fill(0);
  const placed: PlacedCard[] = [];

  for (const card of cards) {
    // pretext 测量文本高度
    const textWidth = Math.max(80, colWidth - 32);
    let textH = 0;
    try {
      const h1 = layout(prepare(card.meaning, "500 14px system-ui"), textWidth, 20).height;
      const h2 = card.label ? layout(prepare(card.label, "12px system-ui"), textWidth, 17).height : 0;
      const h3 = layout(prepare(card.example, "12px system-ui"), textWidth, 17).height;
      textH = h1 + h2 + h3;
    } catch {
      textH = 60;
    }

    // 卡片总高 = 拼音(20) + 汉字(48) + 文本 + padding(32) + gaps(16)
    const cardH = 20 + 48 + textH + 32 + 16;

    // 找最短列
    const shortestCol = colHeights.indexOf(Math.min(...colHeights));
    const x = shortestCol * (colWidth + gap);
    const y = colHeights[shortestCol];

    placed.push({ ...card, x, y, width: colWidth, height: cardH });
    colHeights[shortestCol] += cardH + gap;
  }

  return placed;
}

const PretextMasonry = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [placed, setPlaced] = useState<PlacedCard[]>([]);
  const [containerW, setContainerW] = useState(900);
  const [hoveredIdx, setHoveredIdx] = useState(-1);
  const [computeMs, setComputeMs] = useState(0);

  const cards = useMemo(() => getCards().slice(0, 80), []); // 取前 80 张

  const recompute = useCallback(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.clientWidth;
    setContainerW(w);
    const cols = w > 900 ? 4 : w > 600 ? 3 : 2;
    const t0 = performance.now();
    const result = computeMasonry(cards, w, cols, 12);
    setComputeMs(performance.now() - t0);
    setPlaced(result);
  }, [cards]);

  useEffect(() => {
    recompute();
    const observer = new ResizeObserver(() => recompute());
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [recompute]);

  const totalHeight = placed.length > 0
    ? Math.max(...placed.map(c => c.y + c.height)) + 20
    : 400;

  return (
    <div className="min-h-screen" style={{ background: "#f0f0f0" }}>
      {/* Header */}
      <header className="sticky top-0 z-20 px-4 py-3 flex items-center gap-3" style={{ background: "rgba(240,240,240,0.9)", backdropFilter: "blur(8px)" }}>
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-bold" style={{ color: "#1a1a1a" }}>Masonry · 瀑布流卡片</h1>
          <p className="text-xs" style={{ color: "#888" }}>pretext 预测高度 → 零 DOM 瀑布流布局</p>
        </div>
        <div className="text-[11px] font-mono" style={{ color: "#d97757" }}>
          {cards.length} cards · {computeMs.toFixed(1)}ms · {containerW}px
        </div>
      </header>

      {/* Masonry container */}
      <div className="px-4 py-4">
        <div
          ref={containerRef}
          className="relative mx-auto"
          style={{ maxWidth: 1200, height: totalHeight }}
        >
          {placed.map((card, i) => {
            const color = CARD_COLORS[i % CARD_COLORS.length];
            const isHovered = hoveredIdx === i;
            return (
              <div
                key={`${card.word}-${i}`}
                className="absolute rounded-lg p-4 cursor-default"
                style={{
                  left: card.x,
                  top: card.y,
                  width: card.width,
                  height: card.height,
                  background: isHovered ? "white" : color.bg,
                  border: `1.5px solid ${isHovered ? "#d97757" : color.border}`,
                  boxShadow: isHovered
                    ? "0 12px 32px rgba(217,119,87,0.18)"
                    : "0 1px 3px rgba(0,0,0,0.06)",
                  transform: isHovered ? "scale(1.03)" : "scale(1)",
                  zIndex: isHovered ? 10 : 1,
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(-1)}
              >
                {/* 拼音 */}
                <div className="text-[11px] font-mono mb-1" style={{ color: isHovered ? "#d97757" : "#999" }}>
                  {card.pinyin} · {card.group}
                </div>

                {/* 汉字 */}
                <div
                  className="text-3xl font-bold mb-2"
                  style={{
                    color: isHovered ? "#d97757" : color.accent,
                    transition: "color 0.2s",
                  }}
                >
                  {card.word}
                </div>

                {/* 文本 */}
                <p className="text-[14px] font-medium mb-0.5" style={{ color: isHovered ? "#d97757" : "#333" }}>
                  {card.meaning}
                </p>
                {card.label && (
                  <p className="text-[12px] mb-0.5" style={{ color: isHovered ? "#c2703f" : "#888" }}>
                    {card.label}
                  </p>
                )}
                <p className="text-[12px]" style={{ color: isHovered ? "#c2703f" : "#888" }}>
                  {card.example}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-[11px] font-mono" style={{ color: "#bbb" }}>
        {cards.length} cards · heights predicted by @chenglou/pretext · zero DOM measurement
      </div>
    </div>
  );
};

export default PretextMasonry;
