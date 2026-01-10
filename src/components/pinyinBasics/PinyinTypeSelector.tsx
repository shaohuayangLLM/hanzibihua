import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type PinyinBasicType } from "@/data/pinyinBasics";

interface PinyinTypeSelectorProps {
  value: PinyinBasicType;
  onChange: (value: PinyinBasicType) => void;
}

export const PinyinTypeSelector = ({ value, onChange }: PinyinTypeSelectorProps) => {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as PinyinBasicType)} className="w-full">
      <TabsList className="grid w-full grid-cols-3 h-12">
        <TabsTrigger value="initial" className="text-base">
          声母
        </TabsTrigger>
        <TabsTrigger value="final" className="text-base">
          韵母
        </TabsTrigger>
        <TabsTrigger value="whole" className="text-base">
          整体认读
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
