import { Button } from "@/components/ui/button";
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import Home from 'lucide-react/dist/esm/icons/home';
import RotateCcw from 'lucide-react/dist/esm/icons/rotate-ccw';
import { Card, CardContent } from "@/components/ui/card";

interface QuizControlsProps {
  phase: 'idle' | 'playing' | 'finished';
  onStart: () => void;
  onNext: () => void;
  onRestart: () => void;
  onExit: () => void;
  canGoNext?: boolean;
}

export const QuizControls = ({
  phase,
  onStart,
  onNext,
  onRestart,
  onExit,
  canGoNext = false,
}: QuizControlsProps) => {
  if (phase === 'idle') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">拼音测试</h2>
            <p className="text-muted-foreground">
              看汉字，选拼音。准备好了吗？
            </p>
            <Button onClick={onStart} size="lg" className="w-full">
              开始测试
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (phase === 'playing') {
    return (
      <div className="flex justify-center gap-4 mt-6">
        <Button onClick={onExit} variant="outline">
          退出
        </Button>
        {canGoNext && (
          <Button onClick={onNext}>
            下一题
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        )}
      </div>
    );
  }

  if (phase === 'finished') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">测试完成！</h2>
            <p className="text-muted-foreground">
              想再试一次吗？
            </p>
            <div className="flex gap-3">
              <Button onClick={onExit} variant="outline" className="flex-1">
                <Home className="mr-2 w-4 h-4" />
                返回主页
              </Button>
              <Button onClick={onRestart} className="flex-1">
                <RotateCcw className="mr-2 w-4 h-4" />
                重新开始
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};
