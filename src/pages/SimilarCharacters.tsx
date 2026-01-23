import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { SIMILAR_CHAR_GROUPS } from "@/data/similarCharacters";

const SimilarCharacters = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentGroup = SIMILAR_CHAR_GROUPS[currentIndex];
  const totalGroups = SIMILAR_CHAR_GROUPS.length;

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < totalGroups - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">形近字学习</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            {currentIndex + 1} / {totalGroups}
          </div>
        </div>
      </header>

      {/* 进度条 */}
      <div className="w-full bg-secondary">
        <div
          className="bg-primary h-1 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / totalGroups) * 100}%` }}
        />
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* 形近字展示 */}
        <Card className="p-8">
          {/* 汉字对比区域 */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {currentGroup.characters.map((charData, idx) => (
              <div
                key={idx}
                className="text-center space-y-4 p-6 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                {/* 大字显示 */}
                <div
                  className="font-kaiti text-9xl text-primary mb-4"
                  style={{ fontSize: "8rem" }}
                >
                  {charData.char}
                </div>

                {/* 拼音 */}
                <div className="text-3xl font-bold text-foreground mb-2">
                  {charData.pinyin}
                </div>

                {/* 释义 */}
                <div className="text-xl text-muted-foreground mb-2">
                  {charData.meaning}
                </div>

                {/* 例词 */}
                <div className="inline-block px-4 py-2 rounded-lg bg-background border-2 border-border">
                  <span className="text-lg">{charData.example}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 区分提示 */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="text-3xl">💡</div>
              <div className="flex-1">
                <div className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">
                  怎么区分：
                </div>
                <div className="text-2xl font-kaiti text-blue-900 dark:text-blue-100 leading-relaxed">
                  {currentGroup.hint}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* 导航按钮 */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={goToPrevious}
            variant="outline"
            size="lg"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            上一组
          </Button>
          <Button
            onClick={goToNext}
            variant={currentIndex === totalGroups - 1 ? "default" : "outline"}
            size="lg"
          >
            下一组
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* 全部形近字概览 */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">全部形近字</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {SIMILAR_CHAR_GROUPS.map((group, idx) => (
              <button
                key={group.id}
                onClick={() => setCurrentIndex(idx)}
                className={`
                  p-3 rounded-lg border-2 transition-all
                  ${
                    idx === currentIndex
                      ? 'border-primary bg-primary/10 scale-105'
                      : 'border-border hover:border-primary/50'
                  }
                `}
              >
                <div className="font-kaiti text-2xl mb-1">
                  {group.characters.map(c => c.char).join("·")}
                </div>
                <div className="text-xs text-muted-foreground">
                  {idx + 1}
                </div>
              </button>
            ))}
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 border-t border-border/50">
        <p className="text-center text-sm text-muted-foreground font-kaiti">
          💡 仔细观察字形的细微差别
        </p>
      </footer>
    </div>
  );
};

export default SimilarCharacters;
