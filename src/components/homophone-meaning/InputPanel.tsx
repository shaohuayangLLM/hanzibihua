import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { HomophoneInputQuestion, HomophoneInputQuestionV2 } from "@/data/homophoneMeaningTypes";

interface InputPanelProps {
  question: HomophoneInputQuestion | HomophoneInputQuestionV2;
  selected: string;
  checked: boolean;
  onSubmit: (answer: string) => void;
}

export const InputPanel = ({ question, selected, checked, onSubmit }: InputPanelProps) => {
  const [value, setValue] = useState(selected);

  useEffect(() => {
    setValue(selected);
  }, [question.id, selected]);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-secondary/40 p-4 text-left space-y-2">
        <p className="text-sm text-muted-foreground">输入练习（用于主动表达与迁移）</p>
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
