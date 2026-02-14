import { useNavigate } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const WordCollocationOffline = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">词语搭配</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <Card className="p-8 text-center space-y-4">
          <div className="flex justify-center">
            <Construction className="h-12 w-12 text-amber-500" />
          </div>
          <h2 className="text-2xl font-semibold">功能重构中，暂时下线</h2>
          <p className="text-muted-foreground">
            词语搭配模块已暂停使用，正在按“唯一正确答案”标准进行整体重设计。
          </p>
          <div className="pt-2">
            <Button onClick={() => navigate("/")}>返回首页</Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default WordCollocationOffline;
