import { Button } from "@/components/ui/button";
import type { ChoiceQuestion } from "@/data/wordBuildingTypes";

interface ChoiceQuestionPanelProps {
  question: ChoiceQuestion;
  selected: string;
  checked: boolean;
  onSubmit: (answer: string) => void;
}

export const ChoiceQuestionPanel = ({
  question,
  selected,
  checked,
  onSubmit,
}: ChoiceQuestionPanelProps) => {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-secondary/40 p-4 text-left">
        <p className="text-sm text-muted-foreground">请从下列词语中选出包含目标字的正确词语</p>
        <p className="mt-2 text-2xl font-bold">目标字：{question.promptChar}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {question.options.map(option => {
          const isSelected = selected === option.text;
          const isCorrect = checked && option.text === question.correct;
          const isWrongSelected = checked && isSelected && option.text !== question.correct;

          return (
            <Button
              key={option.text}
              variant={isCorrect ? "default" : "outline"}
              onClick={() => onSubmit(option.text)}
              disabled={checked}
              className={`h-20 text-lg font-semibold ${
                isCorrect
                  ? "bg-green-500 hover:bg-green-500 text-white"
                  : isWrongSelected
                  ? "bg-red-500 hover:bg-red-500 text-white"
                  : ""
              }`}
            >
              <span className="flex flex-col items-center">
                <span>{option.text}</span>
                <span className="text-xs text-muted-foreground font-normal">{option.pinyin}</span>
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
