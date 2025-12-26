import { Book } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TextbookVolume, textbookOptions } from "@/data/types";

interface TextbookSelectorProps {
  value: TextbookVolume;
  onChange: (value: TextbookVolume) => void;
}

export function TextbookSelector({ value, onChange }: TextbookSelectorProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 shadow-card">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Book className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium hidden sm:inline">选择教材：</span>
      </div>
      <Select value={value} onValueChange={(v) => onChange(v as TextbookVolume)}>
        <SelectTrigger className="w-[140px] sm:w-[160px] h-9 text-sm bg-secondary border-0">
          <SelectValue placeholder="选择教材" />
        </SelectTrigger>
        <SelectContent>
          {textbookOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
