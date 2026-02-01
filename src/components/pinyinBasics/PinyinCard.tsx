import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Volume2 from 'lucide-react/dist/esm/icons/volume-2';
import { RotateCw } from 'lucide-react';
import { type PinyinBasicType } from "@/data/pinyinBasics";
import { getPinyinTypeColor } from "@/data/pinyinBasics";
import { usePinyinSpeech } from "@/hooks/usePinyinSpeech";

interface PinyinCardProps {
  pinyin: string;
  type: PinyinBasicType;
  onClick: () => void;
}

export const PinyinCard = ({ pinyin, type, onClick }: PinyinCardProps) => {
  const colors = getPinyinTypeColor(type);
  const { speak, isLoading } = usePinyinSpeech({ rate: 0.8 });

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speak(pinyin);
  };

  return (
    <Card
      className={`
        ${colors.bg} ${colors.hover}
        pinyin-card cursor-pointer
        transition-all duration-200
        hover:-translate-y-1
        relative overflow-visible group
      `}
      onClick={onClick}
    >
      <Button
        variant="ghost"
        size="icon"
        className={`
          absolute top-1 right-1 h-8 w-8 z-10
          opacity-0 group-hover:opacity-100
          transition-opacity bg-background/80 backdrop-blur-sm
          hover:bg-background
        `}
        onClick={handleSpeak}
        disabled={isLoading}
        title="朗读拼音"
      >
        {isLoading ? (
          <RotateCw className="h-4 w-4 animate-spin" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>
      <div className={`min-h-24 flex items-center justify-center ${colors.text} pointer-events-none`}>
        <span className="text-3xl md:text-4xl font-medium">
          {pinyin}
        </span>
      </div>
    </Card>
  );
};
