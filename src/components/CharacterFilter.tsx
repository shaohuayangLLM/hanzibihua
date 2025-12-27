import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

// 常用部首列表
const commonRadicals = [
  "亻", "口", "女", "土", "日", "月", "木", "氵", "火", "艹",
  "辶", "阝", "彳", "扌", "犭", "纟", "钅", "足", "心", "忄",
  "宀", "冫", "讠", "戈", "八", "乙", "丿", "人", "又", "巾",
];

interface CharacterFilterProps {
  onFilter: (filters: { pinyin: string; radical: string }) => void;
  filters: { pinyin: string; radical: string };
}

export function CharacterFilter({ onFilter, filters }: CharacterFilterProps) {
  const [showRadicals, setShowRadicals] = useState(false);

  const handlePinyinChange = (value: string) => {
    onFilter({ ...filters, pinyin: value.toLowerCase() });
  };

  const handleRadicalSelect = (radical: string) => {
    // Toggle radical selection
    const newRadical = filters.radical === radical ? "" : radical;
    onFilter({ ...filters, radical: newRadical });
  };

  const clearFilters = () => {
    onFilter({ pinyin: "", radical: "" });
    setShowRadicals(false);
  };

  const hasFilters = filters.pinyin || filters.radical;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {/* Pinyin search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="输入拼音筛选（如：ni、ma）"
            value={filters.pinyin}
            onChange={(e) => handlePinyinChange(e.target.value)}
            className="pl-9"
          />
        </div>
        
        {/* Radical filter toggle */}
        <Button
          variant={showRadicals ? "default" : "outline"}
          size="sm"
          onClick={() => setShowRadicals(!showRadicals)}
          className="shrink-0"
        >
          部首
        </Button>

        {/* Clear filters */}
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Selected radical indicator */}
      {filters.radical && !showRadicals && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">部首：</span>
          <span className="px-2 py-0.5 bg-primary text-primary-foreground rounded text-base">
            {filters.radical}
          </span>
        </div>
      )}

      {/* Radical grid */}
      {showRadicals && (
        <div className="p-3 bg-secondary/50 rounded-lg space-y-2 animate-fade-in">
          <p className="text-sm text-muted-foreground">选择部首筛选：</p>
          <div className="flex flex-wrap gap-1.5">
            {commonRadicals.map((radical) => (
              <button
                key={radical}
                onClick={() => handleRadicalSelect(radical)}
                className={`
                  w-8 h-8 rounded text-lg font-medium
                  transition-all duration-150 hover:scale-110
                  ${filters.radical === radical
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground hover:bg-accent"
                  }
                `}
              >
                {radical}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
