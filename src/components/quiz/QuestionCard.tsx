import { Card } from "@/components/ui/card";
import { QuizOptions } from "./QuizOptions";
import { QuizFeedback } from "./QuizFeedback";

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
        <div className="py-8">
          <div className="text-9xl font-brush text-foreground">
            {character}
          </div>
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
