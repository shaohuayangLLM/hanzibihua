import { getCharacterListByVolume } from "@/data/characterInfo";
import { TextbookVolume } from "@/data/types";

interface CharacterGridProps {
  volume: TextbookVolume;
  onSelect: (char: string) => void;
  selectedChar?: string;
}

export function CharacterGrid({ volume, onSelect, selectedChar }: CharacterGridProps) {
  const characters = getCharacterListByVolume(volume);

  if (volume === 'all') {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>请选择一个教材查看生字表</p>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>该教材暂无生字数据</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          生字表
        </h3>
        <span className="text-sm text-muted-foreground">
          共 {characters.length} 个生字
        </span>
      </div>
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
        {characters.map((char) => (
          <button
            key={char}
            onClick={() => onSelect(char)}
            className={`
              aspect-square rounded-lg text-xl font-medium
              transition-all duration-200 hover:scale-105
              ${selectedChar === char 
                ? 'bg-primary text-primary-foreground shadow-button' 
                : 'bg-secondary text-foreground hover:bg-secondary/80'
              }
            `}
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
}
