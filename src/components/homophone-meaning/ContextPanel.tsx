import { Button } from "@/components/ui/button";
import type { HomophoneContextQuestion, HomophoneContextQuestionV2 } from "@/data/homophoneMeaningTypes";

interface ContextPanelProps {
  question: HomophoneContextQuestion | HomophoneContextQuestionV2;
  selected: string;
  checked: boolean;
  onSubmit: (answer: string) => void;
}

export const ContextPanel = ({ question, selected, checked, onSubmit }: ContextPanelProps) => {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-secondary/40 p-4 text-left space-y-2">
        <p className="text-sm text-muted-foreground">语境应用：根据线索选择更恰当的词语</p>
        <p className="text-xl font-bold leading-relaxed">{question.stem}</p>
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
