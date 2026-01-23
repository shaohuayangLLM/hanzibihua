import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpen, PenTool, LayoutGrid } from "lucide-react";
import { BASIC_STROKES, STROKE_CATEGORIES, type Stroke } from "@/data/strokeNames";
import { StrokeAnimation } from "@/components/strokes/StrokeAnimation";
import { StrokeCardDisplay } from "@/components/strokes/StrokeCardDisplay";

const StrokeNames = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedStroke, setSelectedStroke] = useState<Stroke | null>(null);

  // 根据分类筛选笔画
  const filteredStrokes = useMemo(() => {
    if (selectedCategory === "全部") {
      return BASIC_STROKES;
    }
    return BASIC_STROKES.filter(stroke => stroke.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center h-16 px-4 gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <PenTool className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              笔画名称表
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* 学习提示卡片 */}
        <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-blue-200 dark:border-blue-900">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-foreground">为什么学习笔画很重要？</h2>
              <p className="text-muted-foreground leading-relaxed">
                汉字是由笔画组成的，认识基本笔画是学习汉字的第一步。
                就像搭积木一样，掌握了各种形状的积木（笔画），才能搭出漂亮的房子（汉字）。
              </p>
            </div>
          </div>
        </Card>

        {/* 分类筛选 */}
        <div className="flex flex-wrap gap-2 justify-center">
          {STROKE_CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`rounded-full px-6 transition-all duration-300 ${selectedCategory === category
                ? "shadow-lg scale-105"
                : "hover:bg-primary/5 border-primary/20"
                }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === "全部" && <LayoutGrid className="w-4 h-4 mr-2" />}
              {category}
            </Button>
          ))}
        </div>

        {/* 笔画列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStrokes.map((stroke, idx) => (
            <Card
              key={idx}
              className="group relative overflow-hidden bg-white/80 dark:bg-slate-900/80 border-border/50 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedStroke(stroke)}
            >
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity">
                <PenTool className="w-12 h-12 text-primary rotate-12" />
              </div>

              <div className="p-6 flex items-start gap-6">
                {/* 左侧：笔画展示 */}
                <div className="flex-shrink-0 relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 flex items-center justify-center border-2 border-red-100 dark:border-red-900/30 shadow-inner group-hover:scale-105 transition-transform duration-500">
                    {/* Static Display for Grid Item */}
                    <StrokeCardDisplay
                      character={stroke.character}
                      strokeIndex={stroke.strokePosition - 1}
                      size={80}
                      showOutline={true}
                    />
                  </div>
                </div>

                {/* 右侧：信息 */}
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {stroke.name}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground">{stroke.pinyin}</p>
                  </div>

                  <p className="text-sm text-foreground/70 line-clamp-2 min-h-[2.5em]">
                    {stroke.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1">
                    {stroke.examples.slice(0, 3).map(char => (
                      <span key={char} className="inline-block px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs font-kaiti">
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 底部装饰条 */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Card>
          ))}
        </div>
      </main>

      {/* 详情弹窗 */}
      {selectedStroke && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedStroke(null)}
        >
          <Card
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-border shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid lg:grid-cols-2 gap-0 overflow-hidden">
              {/* 左侧：动画演示区 */}
              <div className="bg-secondary/30 p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-border/50">
                <div className="relative mb-8">
                  <StrokeAnimation
                    character={selectedStroke.character}
                    strokeIndex={selectedStroke.strokePosition - 1}
                    size={280}
                    highlightColor="#ef4444" // red-500
                  />
                  <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur px-3 py-1.5 rounded-full text-xs font-medium border border-border/50 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    正在演示: {selectedStroke.name}
                  </div>
                </div>

                <div className="text-center space-y-2 max-w-xs">
                  <h2 className="text-3xl font-bold font-kaiti">{selectedStroke.character}</h2>
                  <p className="text-muted-foreground">
                    例字：在该字中，红色高亮部分为
                    <span className="text-primary font-bold">{selectedStroke.name}</span>
                  </p>
                </div>
              </div>

              {/* 右侧：详细讲解区 */}
              <div className="p-8 space-y-8 bg-background">
                {/* Header */}
                <div className="space-y-2 pb-6 border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {selectedStroke.category}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedStroke(null)}>
                      关闭
                    </Button>
                  </div>
                  <h1 className="text-4xl font-bold text-foreground">{selectedStroke.name}</h1>
                  <p className="text-2xl text-muted-foreground font-serif italic">{selectedStroke.pinyin}</p>
                </div>

                {/* 书写要点 */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <PenTool className="w-5 h-5 text-primary" />
                    书写要点
                  </h3>
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-900/30">
                    <p className="text-lg leading-relaxed text-amber-900 dark:text-amber-100">
                      {selectedStroke.description}
                    </p>
                  </div>
                </div>

                {/* 更多例字 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <LayoutGrid className="w-5 h-5 text-primary" />
                    包含此笔画的例字
                  </h3>
                  <div className="grid grid-cols-4 gap-4">
                    {selectedStroke.examples.map((char, index) => (
                      <div key={index} className="space-y-2 group cursor-pointer" title="点击查看详情" onClick={(e) => {
                        e.stopPropagation();
                        // To implement: Navigate to character detail or just show toast
                        // For now we just animate it slightly
                      }}>
                        <div className="aspect-square rounded-xl bg-card border-2 border-border/50 flex items-center justify-center text-3xl font-kaiti hover:border-primary hover:shadow-md transition-all group-hover:-translate-y-1">
                          {char}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StrokeNames;

