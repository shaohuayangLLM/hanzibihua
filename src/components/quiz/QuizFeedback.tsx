import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2';
import XCircle from 'lucide-react/dist/esm/icons/x-circle';

interface QuizFeedbackProps {
  isCorrect: boolean | null;
  correctAnswer?: string;
}

export const QuizFeedback = ({ isCorrect, correctAnswer }: QuizFeedbackProps) => {
  if (isCorrect === null) return null;

  if (isCorrect) {
    return (
      <div className="flex items-center justify-center gap-2 py-4 text-green-600 animate-correct-pulse">
        <CheckCircle2 className="w-8 h-8" />
        <span className="text-xl font-bold">太棒了！</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 py-4 text-red-500 animate-wrong-shake">
      <div className="flex items-center gap-2">
        <XCircle className="w-8 h-8" />
        <span className="text-xl font-bold">再加油！</span>
      </div>
      {correctAnswer && (
        <div className="text-base">
          正确答案：<span className="font-bold">{correctAnswer}</span>
        </div>
      )}
    </div>
  );
};
