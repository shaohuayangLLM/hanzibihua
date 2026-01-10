import { Card } from "@/components/ui/card";
import { type PinyinBasicType } from "@/data/pinyinBasics";
import { getPinyinTypeColor } from "@/data/pinyinBasics";

interface PinyinCardProps {
  pinyin: string;
  type: PinyinBasicType;
  onClick: () => void;
}

export const PinyinCard = ({ pinyin, type, onClick }: PinyinCardProps) => {
  const colors = getPinyinTypeColor(type);

  return (
    <Card
      className={`
        ${colors.bg} ${colors.hover}
        pinyin-card cursor-pointer
        transition-all duration-200
        hover:-translate-y-1
      `}
      onClick={onClick}
    >
      <div className={`min-h-24 flex items-center justify-center ${colors.text}`}>
        <span className="text-3xl md:text-4xl font-kaiti font-medium">
          {pinyin}
        </span>
      </div>
    </Card>
  );
};
