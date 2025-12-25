import { characterCategories, CharacterCategory } from "@/data/characterCategories";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronRight, Check } from "lucide-react";
import { useState } from "react";

interface CategoryBrowserProps {
  onSelectCharacter: (char: string) => void;
  learnedCharacters?: Set<string>;
}

export const CategoryBrowser = ({
  onSelectCharacter,
  learnedCharacters = new Set(),
}: CategoryBrowserProps) => {
  const [selectedCategory, setSelectedCategory] = useState<CharacterCategory | null>(null);

  return (
    <div className="space-y-4">
      {/* Category tabs */}
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 pb-2">
          {characterCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory?.id === category.id ? "default" : "outline"}
              className="flex-shrink-0 gap-2"
              onClick={() =>
                setSelectedCategory(
                  selectedCategory?.id === category.id ? null : category
                )
              }
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
              <span className="text-xs opacity-70">({category.characters.length})</span>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Characters grid */}
      {selectedCategory && (
        <div className="card-warm rounded-2xl p-4 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <span>{selectedCategory.icon}</span>
              {selectedCategory.name}
            </h3>
            <span className="text-sm text-muted-foreground">
              已学 {selectedCategory.characters.filter(c => learnedCharacters.has(c)).length} / {selectedCategory.characters.length}
            </span>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {selectedCategory.characters.map((char) => {
              const isLearned = learnedCharacters.has(char);
              return (
                <button
                  key={char}
                  onClick={() => onSelectCharacter(char)}
                  className={`
                    relative aspect-square rounded-xl text-2xl font-brush
                    flex items-center justify-center transition-all
                    hover:scale-110 hover:shadow-md
                    ${isLearned
                      ? "bg-primary/10 border-2 border-primary/30 text-primary"
                      : "bg-secondary hover:bg-secondary/80 text-foreground"
                    }
                  `}
                >
                  {char}
                  {isLearned && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick access hint when no category selected */}
      {!selectedCategory && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <ChevronRight className="w-4 h-4" />
            点击上方分类，浏览更多汉字
          </p>
        </div>
      )}
    </div>
  );
};
