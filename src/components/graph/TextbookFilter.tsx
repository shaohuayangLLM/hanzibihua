/**
 * 教材筛选器组件
 * 
 * 用于筛选显示的汉字范围（一年级上/下册、二年级上/下册）
 */

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TextbookVolume, textbookOptions } from '@/data/types';

interface TextbookFilterProps {
  value: TextbookVolume;
  onChange: (value: TextbookVolume) => void;
}

export const TextbookFilter = ({ value, onChange }: TextbookFilterProps) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">
        教材:
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
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
};
