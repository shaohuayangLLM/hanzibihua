import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { BASIC_STROKES, STROKE_CATEGORIES, type Stroke } from "@/data/strokeNames";

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

  // 返回主页
  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={goHome}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">笔画名称表</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* 分类选择 */}
        <Card className="p-4">
          <div className="flex flex-wrap gap-2">
            {STROKE_CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </Card>

        {/* 笔画列表 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredStrokes.map((stroke, idx) => (
            <Card
              key={idx}
              className="p-6 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setSelectedStroke(stroke)}
            >
              <div className="text-center space-y-4">
                {/* 用例字展示笔画 */}
                <div className="relative mx-auto w-24 h-24 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-6xl font-kaiti text-primary">{stroke.character}</span>
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    第{stroke.strokePosition}笔
                  </div>
                </div>

                {/* 笔画名称 */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    {stroke.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{stroke.pinyin}</p>
                </div>

                {/* 分类标签 */}
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {stroke.category}
                </div>

                {/* 说明 */}
                {stroke.description && (
                  <p className="text-sm text-muted-foreground">
                    {stroke.description}
                  </p>
                )}

                {/* 更多例字 */}
                <div className="pt-2 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">更多例字：</p>
                  <div className="flex justify-center gap-2 flex-wrap">
                    {stroke.examples.slice(0, 4).map((char, i) => (
                      <span key={i} className="text-xl font-kaiti text-foreground">
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* 笔画详情弹窗 */}
        {selectedStroke && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedStroke(null)}
          >
            <Card
              className="max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-4">
                {/* 用例字展示笔画 */}
                <div className="relative mx-auto w-40 h-40 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-8xl font-kaiti text-primary">{selectedStroke.character}</span>
                  <div className="absolute -top-3 -right-3 bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    第{selectedStroke.strokePosition}笔
                  </div>
                </div>

                {/* 笔画名称 */}
                <div>
                  <h2 className="text-5xl font-bold text-foreground mb-2">
                    {selectedStroke.name}
                  </h2>
                  <p className="text-2xl text-muted-foreground">{selectedStroke.pinyin}</p>
                </div>

                {/* 分类 */}
                <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {selectedStroke.category}
                </div>

                {/* 说明 */}
                {selectedStroke.description && (
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">说明：</p>
                    <p className="text-lg">{selectedStroke.description}</p>
                  </div>
                )}

                {/* 例字 */}
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-3">包含此笔画的例字：</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {selectedStroke.examples.map((char, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <span className="inline-flex items-center justify-center w-14 h-14 bg-background rounded-lg text-4xl font-bold font-kaiti text-foreground shadow-sm">
                          {char}
                        </span>
                        <span className="text-xs text-muted-foreground">{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 笔画提示 */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    💡 在"{selectedStroke.character}"字中，"{selectedStroke.name}"是第{selectedStroke.strokePosition}笔
                  </p>
                </div>

                {/* 关闭按钮 */}
                <Button
                  onClick={() => setSelectedStroke(null)}
                  className="w-full"
                >
                  关闭
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* 学习提示 */}
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div className="flex-1">
              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">学习提示</p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                汉字是由笔画组成的，认识基本笔画是学习汉字的第一步。
                多看多练，记住每个笔画的名称和写法。
              </p>
            </div>
          </div>
        </Card>
      </main>

      <footer className="w-full py-4 px-4 border-t border-border/50 mt-auto">
        <p className="text-center text-xs text-muted-foreground font-kaiti">
          💡 笔画是汉字的基本组成部分，一笔一画认真学
        </p>
      </footer>
    </div>
  );
};

export default StrokeNames;
