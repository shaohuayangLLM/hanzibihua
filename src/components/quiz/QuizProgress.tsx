import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
  current: number;
  total: number;
}

export const QuizProgress = ({ current, total }: QuizProgressProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
        <span>进度</span>
        <span>第 {current} 题 / 共 {total} 题</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};
