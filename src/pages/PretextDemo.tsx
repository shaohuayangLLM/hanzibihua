import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prepare, layout } from "@chenglou/pretext";

// 示例文本 - 用教育场景的内容
const HEADLINES = [
  "汉字之美，始于笔画",
  "The Art of Characters",
];

const ARTICLE_TEXT = `每一个汉字都是一幅画。从甲骨文到楷书，五千年的演变凝结成横竖撇捺的韵律。一年级的孩子拿起笔，在田字格中写下人生第一个字——那不只是笔画的组合，更是文明的传承。

拼音是声音的桥梁，让无声的文字有了温度。声母与韵母的拼合，如同音符的交响，构成了语言最基本的旋律。

偏旁部首是汉字的密码。认识了"氵"就打开了与水相关的字族——江、河、湖、海。每一个偏旁都是一把钥匙，解锁一个意义的家族。`;

const CREDITS = [
  "Layout computed by @chenglou/pretext",
  "Zero DOM reflow · Pure arithmetic",
];

interface LayoutLine {
  text: string;
  y: number;
  fontSize: number;
  type: "headline" | "credit" | "body";
}

function computeLayout(width: number, height: number): LayoutLine[] {
  const lines: LayoutLine[] = [];
  let y = 0;
  const padding = Math.max(24, width * 0.05);
  const contentWidth = width - padding * 2;

  if (contentWidth < 50) return lines;

  try {
    // 标题
    const headlineFontSize = Math.min(Math.max(24, width * 0.055), 56);
    const headlineFont = `bold ${headlineFontSize}px "Noto Serif SC", "Songti SC", serif`;
    const headlineLineHeight = headlineFontSize * 1.2;

    for (const headline of HEADLINES) {
      const prepared = prepare(headline, headlineFont);
      const result = layout(prepared, contentWidth, headlineLineHeight);
      // 简单按行数推算文本分行
      const charsPerLine = Math.max(1, Math.floor(headline.length / result.lineCount));
      for (let i = 0; i < result.lineCount; i++) {
        const start = i * charsPerLine;
        const end = i === result.lineCount - 1 ? headline.length : start + charsPerLine;
        lines.push({
          text: headline.slice(start, end),
          y: y + padding,
          fontSize: headlineFontSize,
          type: "headline",
        });
        y += headlineLineHeight;
      }
    }

    y += headlineFontSize * 0.6;

    // Credit
    const creditFontSize = Math.min(Math.max(11, width * 0.022), 14);
    for (const credit of CREDITS) {
      lines.push({
        text: credit,
        y: y + padding,
        fontSize: creditFontSize,
        type: "credit",
      });
      y += creditFontSize * 1.8;
    }

    y += 16;

    // 正文段落
    const bodyFontSize = Math.min(Math.max(14, width * 0.028), 20);
    const bodyFont = `${bodyFontSize}px "Noto Serif SC", "Songti SC", "STSongti", serif`;
    const bodyLineHeight = bodyFontSize * 1.85;

    const paragraphs = ARTICLE_TEXT.split("\n\n");
    for (const para of paragraphs) {
      const trimmed = para.trim();
      if (!trimmed) continue;

      const prepared = prepare(trimmed, bodyFont);
      const result = layout(prepared, contentWidth, bodyLineHeight);

      // 按行计算文本分布
      const avgCharsPerLine = Math.max(1, Math.floor(trimmed.length / Math.max(1, result.lineCount)));
      for (let i = 0; i < result.lineCount; i++) {
        if (y + padding > height - 40) break; // 超出视口就停
        const start = i * avgCharsPerLine;
        const end = i === result.lineCount - 1 ? trimmed.length : Math.min(start + avgCharsPerLine, trimmed.length);
        lines.push({
          text: trimmed.slice(start, end),
          y: y + padding,
          fontSize: bodyFontSize,
          type: "body",
        });
        y += bodyLineHeight;
      }
      y += bodyLineHeight * 0.4; // 段间距
    }
  } catch (e) {
    // fallback
    lines.push({ text: "pretext 初始化中...", y: 40, fontSize: 16, type: "credit" });
  }

  return lines;
}

const PretextDemo = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<LayoutLine[]>([]);
  const [dims, setDims] = useState({ w: 800, h: 600 });
  const [computeMs, setComputeMs] = useState(0);
  const [hoveredLine, setHoveredLine] = useState(-1);

  const recompute = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    setDims({ w, h });

    const t0 = performance.now();
    const result = computeLayout(w, h);
    setComputeMs(performance.now() - t0);
    setLines(result);
  }, []);

  useEffect(() => {
    recompute();
    const observer = new ResizeObserver(() => recompute());
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [recompute]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f6f0e6" }}>
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 z-10" style={{ background: "rgba(246,240,230,0.9)", backdropFilter: "blur(8px)" }}>
        <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="hover:bg-black/5">
          <ArrowLeft className="h-5 w-5" style={{ color: "#11100d" }} />
        </Button>
        <div className="flex-1">
          <h1 className="text-sm font-semibold" style={{ color: "#11100d", letterSpacing: "-0.01em" }}>
            Pretext 动态排版体验
          </h1>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-mono" style={{ color: "#d97757" }}>
            {computeMs.toFixed(1)}ms · {lines.length} lines · {dims.w.toFixed(0)}×{dims.h.toFixed(0)}
          </span>
        </div>
      </header>

      {/* Hint pill */}
      <div className="flex justify-center py-2 z-10">
        <div
          className="px-4 py-1.5 rounded-full text-[12px] font-medium"
          style={{ background: "#11100d", color: "#f6f0e6" }}
        >
          调整浏览器窗口大小，观察文本实时重排
        </div>
      </div>

      {/* Main canvas */}
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden mx-4 mb-4 rounded-2xl"
        style={{
          background: "#faf6ef",
          boxShadow: "0 2px 40px rgba(17,16,13,0.08)",
          minHeight: 400,
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-20%", left: "-10%",
            width: "50%", height: "60%",
            background: "radial-gradient(ellipse, rgba(217,119,87,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-10%", right: "-5%",
            width: "40%", height: "50%",
            background: "radial-gradient(ellipse, rgba(217,119,87,0.05) 0%, transparent 70%)",
          }}
        />

        {/* Rendered lines */}
        {lines.map((line, i) => {
          const isHovered = hoveredLine === i;
          let color = "#11100d";
          let fontFamily = '"Noto Serif SC", "Songti SC", "STSongti", serif';
          let fontWeight = "normal";
          let opacity = 1;

          if (line.type === "headline") {
            fontWeight = "bold";
            color = isHovered ? "#d97757" : "#11100d";
          } else if (line.type === "credit") {
            fontFamily = '"SF Mono", "Menlo", monospace';
            color = "#999";
            opacity = 0.7;
          } else {
            color = isHovered ? "#d97757" : "#3a3530";
          }

          const padding = Math.max(24, dims.w * 0.05);

          return (
            <div
              key={i}
              className="absolute left-0 right-0 cursor-default select-none"
              style={{
                top: line.y,
                paddingLeft: padding,
                paddingRight: padding,
                fontSize: line.fontSize,
                fontFamily,
                fontWeight,
                color,
                opacity,
                lineHeight: 1,
                transition: "color 0.15s ease",
                willChange: "top",
              }}
              onMouseEnter={() => setHoveredLine(i)}
              onMouseLeave={() => setHoveredLine(-1)}
            >
              {line.text}
            </div>
          );
        })}

        {/* Bottom signature */}
        <div
          className="absolute bottom-4 right-0 left-0 text-center"
          style={{ fontSize: 11, color: "#c4b8a8", fontFamily: "monospace" }}
        >
          Everything laid out by @chenglou/pretext · JS only · no DOM measurement
        </div>
      </div>
    </div>
  );
};

export default PretextDemo;
