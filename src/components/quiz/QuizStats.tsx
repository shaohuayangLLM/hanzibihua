import Trophy from 'lucide-react/dist/esm/icons/trophy';
import Target from 'lucide-react/dist/esm/icons/target';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import { Card, CardContent } from "@/components/ui/card";

interface QuizStatsProps {
  correct: number;
  total: number;
  streak: number;
  maxStreak: number;
}

export const QuizStats = ({ correct, total, streak, maxStreak }: QuizStatsProps) => {
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="flex justify-center mb-2">
            <Target className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-foreground">{accuracy}%</div>
          <div className="text-xs text-muted-foreground mt-1">正确率</div>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="flex justify-center mb-2">
            <TrendingUp className="w-6 h-6 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-foreground">{streak}</div>
          <div className="text-xs text-muted-foreground mt-1">连胜</div>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="flex justify-center mb-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-foreground">{maxStreak}</div>
          <div className="text-xs text-muted-foreground mt-1">最高连胜</div>
        </CardContent>
      </Card>
    </div>
  );
};
