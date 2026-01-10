import { type PinyinBasicItem, type PinyinBasicType } from "@/data/pinyinBasics";
import { PinyinCard } from "./PinyinCard";

interface PinyinGridProps {
  items: PinyinBasicItem[];
  type: PinyinBasicType;
  onItemClick: (item: PinyinBasicItem) => void;
}

export const PinyinGrid = ({ items, type, onItemClick }: PinyinGridProps) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
      {items.map((item) => (
        <PinyinCard
          key={item.pinyin}
          pinyin={item.pinyin}
          type={type}
          onClick={() => onItemClick(item)}
        />
      ))}
    </div>
  );
};
