import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Volume2 from 'lucide-react/dist/esm/icons/volume-2';
import { QuizOptions } from "./QuizOptions";
import { QuizFeedback } from "./QuizFeedback";
import { usePinyinSpeech } from "@/hooks/usePinyinSpeech";

interface QuestionCardProps {
  character: string;
  contextSentence?: string;
  options: string[];
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  showFeedback: boolean;
  isCorrect: boolean | null;
  onAnswer: (answer: string) => void;
}

export const QuestionCard = ({
  character,
  contextSentence,
  options,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  showFeedback,
  isCorrect,
  onAnswer,
}: QuestionCardProps) => {
  const { speak } = usePinyinSpeech({ rate: 0.7 });

  return (
    <Card className="w-full max-w-2xl mx-auto p-8">
      <div className="text-center space-y-6">
        {/* 语境提示（多音字用） */}
        {contextSentence && (
          <div className="bg-secondary/50 rounded-lg p-4 mb-4">
            <span className="text-sm text-muted-foreground">提示：{contextSentence}</span>
          </div>
        )}

        {/* 汉字显示 */}
        <div className="flex flex-col items-center gap-3 py-6">
          <div className="w-32 h-32 sm:w-40 sm:h-40 mizige rounded-2xl flex items-center justify-center">
            <span className="text-7xl sm:text-9xl font-medium text-foreground relative z-10">
              {character}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 hover:scale-105 transition-transform"
            onClick={() => speak(character)}
            title="朗读汉字"
          >
            <Volume2 className="h-4 w-4" />
            读音
          </Button>
        </div>

        {/* 题目 */}
        <div className="text-lg text-muted-foreground">
          选择正确的拼音
        </div>

        {/* 选项 */}
        <QuizOptions
          options={options}
          selectedAnswer={selectedAnswer}
          disabled={showFeedback}
          onSelect={onAnswer}
        />

        {/* 反馈 */}
        {showFeedback && (
          <QuizFeedback
            isCorrect={isCorrect}
            correctAnswer={options.find((opt) => {
              // 需要传入正确答案来判断
              return false; // 暂时占位
            })}
          />
        )}
      </div>
    </Card>
  );
};
