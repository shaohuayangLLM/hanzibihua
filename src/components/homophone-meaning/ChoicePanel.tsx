import { Button } from "@/components/ui/button";
import type { HomophoneChoiceQuestion, HomophoneChoiceQuestionV2 } from "@/data/homophoneMeaningTypes";

interface ChoicePanelProps {
  question: HomophoneChoiceQuestion | HomophoneChoiceQuestionV2;
  selected: string;
  checked: boolean;
  onSubmit: (answer: string) => void;
}

export const ChoicePanel = ({ question, selected, checked, onSubmit }: ChoicePanelProps) => {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-secondary/40 p-4 text-left space-y-2">
        <p className="text-sm text-muted-foreground">词义建构：同音词语义区分</p>
        <p className="text-lg font-semibold">读音：{question.targetPinyin}</p>
        <p className="text-xl font-bold leading-relaxed">{question.promptMeaning}</p>
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
