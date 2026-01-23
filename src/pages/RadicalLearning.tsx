import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import { Button } from "@/components/ui/button";
import { RadicalSelector } from "@/components/radicals/RadicalSelector";
import { RadicalDisplay } from "@/components/radicals/RadicalDisplay";

const RadicalLearning = () => {
  const navigate = useNavigate();
  const [selectedRadical, setSelectedRadical] = useState<string | null>(null);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            偏旁部首学习
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* 偏旁选择器 */}
        <RadicalSelector
          selectedRadical={selectedRadical}
          onSelectRadical={setSelectedRadical}
        />

        {/* 偏旁详情展示 */}
        {selectedRadical && (
          <RadicalDisplay radical={selectedRadical} />
        )}

        {/* 空状态提示 */}
        {!selectedRadical && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              请选择一个偏旁开始学习
            </h2>
            <p className="text-muted-foreground">
              点击上方的偏旁卡片，查看偏旁的名称、含义和例字
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default RadicalLearning;
