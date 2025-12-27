import { useState, useMemo } from "react";
import { getCharacterListByVolume, getCharacterInfo } from "@/data/characterInfo";
import { TextbookVolume } from "@/data/types";
import { CharacterFilter } from "./CharacterFilter";

interface CharacterGridProps {
  volume: TextbookVolume;
  onSelect: (char: string) => void;
  selectedChar?: string;
}

export function CharacterGrid({ volume, onSelect, selectedChar }: CharacterGridProps) {
  const [filters, setFilters] = useState({ pinyin: "", radical: "" });
  
  const characters = getCharacterListByVolume(volume);

  // Filter characters based on pinyin and radical
  const filteredCharacters = useMemo(() => {
    if (!filters.pinyin && !filters.radical) {
      return characters;
    }

    return characters.filter((char) => {
      const info = getCharacterInfo(char, volume);
      if (!info) return false;

      // Check pinyin filter (match start of pinyin without tones)
      if (filters.pinyin) {
        const pinyinBase = info.pinyin.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        if (!pinyinBase.startsWith(filters.pinyin)) {
          return false;
        }
      }

      // Check radical filter
      if (filters.radical) {
        if (!info.radicalInfo.includes(filters.radical)) {
          return false;
        }
      }

      return true;
    });
  }, [characters, filters, volume]);

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
          共 {filteredCharacters.length} / {characters.length} 个生字
        </span>
      </div>

      {/* Filter controls */}
      <CharacterFilter filters={filters} onFilter={setFilters} />

      {/* Character grid */}
      {filteredCharacters.length > 0 ? (
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {filteredCharacters.map((char) => (
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
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>没有找到匹配的生字</p>
        </div>
      )}
    </div>
  );
}
