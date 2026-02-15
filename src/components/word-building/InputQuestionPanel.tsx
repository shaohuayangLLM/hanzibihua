import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { InputQuestion } from "@/data/wordBuildingTypes";

interface InputQuestionPanelProps {
  question: InputQuestion;
  selected: string;
  checked: boolean;
  onSubmit: (answer: string) => void;
}

export const InputQuestionPanel = ({
  question,
  selected,
  checked,
  onSubmit,
}: InputQuestionPanelProps) => {
  const [value, setValue] = useState(selected);

  useEffect(() => {
    setValue(selected);
  }, [question.id, selected]);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-secondary/40 p-4 text-left space-y-2">
        <p className="text-sm text-muted-foreground">根据提示输入正确词语（精确匹配）</p>
        <p className="text-lg font-semibold leading-relaxed">{question.prompt}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={value}
          disabled={checked}
          onChange={event => setValue(event.target.value)}
          placeholder="请输入词语"
          className="h-11 flex-1 rounded-md border border-input bg-background px-3 text-base"
        />
        <Button onClick={() => onSubmit(value)} disabled={checked || value.trim().length === 0}>
          提交答案
        </Button>
      </div>
    </div>
  );
};
