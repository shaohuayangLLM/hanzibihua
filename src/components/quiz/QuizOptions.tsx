import { Button } from "@/components/ui/button";

interface QuizOptionsProps {
  options: string[];
  selectedAnswer: string | null;
  disabled: boolean;
  onSelect: (answer: string) => void;
}

export const QuizOptions = ({ options, selectedAnswer, disabled, onSelect }: QuizOptionsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
      {options.map((option, index) => {
        const isSelected = selectedAnswer === option;
        const isCorrect = selectedAnswer !== null && option === selectedAnswer;

        let buttonClass = "h-16 text-lg font-medium transition-all";

        if (disabled) {
          if (isSelected) {
            // 已选择的选项 - 根据是否正确显示颜色
            buttonClass += " border-2 ";
            // 这里需要从父组件传入isCorrect信息，暂时简化处理
          }
        }

        return (
          <Button
            key={index}
            variant="outline"
            className={buttonClass}
            disabled={disabled}
            onClick={() => onSelect(option)}
          >
            {option}
          </Button>
        );
      })}
    </div>
  );
};
