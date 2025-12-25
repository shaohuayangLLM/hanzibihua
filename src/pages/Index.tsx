import { useState } from "react";
import { CharacterInput } from "@/components/CharacterInput";
import { StrokeDisplay } from "@/components/StrokeDisplay";
import { StrokeSteps } from "@/components/StrokeSteps";
import { CharacterDetails } from "@/components/CharacterDetails";
import { getCharacterInfo, CharacterInfo } from "@/data/characterInfo";
import { Pencil, Sparkles } from "lucide-react";

const Index = () => {
  const [character, setCharacter] = useState<string>("");
  const [characterInfo, setCharacterInfo] = useState<CharacterInfo | null>(null);

  const handleCharacterSubmit = (char: string) => {
    setCharacter(char);
    setCharacterInfo(getCharacterInfo(char));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-button">
            <Pencil className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            汉字笔顺学习
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        {/* Hero section */}
        <section className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
            <Sparkles className="h-4 w-4 text-primary" />
            一年级小朋友专属
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            一笔一画学汉字
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            输入一个汉字，看看它是怎么写的吧！
          </p>
        </section>

        {/* Input section */}
        <section className="animate-scale-in" style={{ animationDelay: "0.1s" }}>
          <CharacterInput onSubmit={handleCharacterSubmit} />
        </section>

        {/* Results section */}
        {character && (
          <section className="space-y-8 animate-fade-in">
            {/* Character display */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Left: Big character and animation */}
              <div className="w-full lg:w-auto flex flex-col items-center gap-6">
                {/* Large character display */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl bg-secondary flex items-center justify-center">
                    <span className="text-7xl font-brush text-foreground">
                      {character}
                    </span>
                  </div>
                </div>

                {/* Stroke animation */}
                <StrokeDisplay character={character} />
              </div>

              {/* Right: Steps and details */}
              <div className="flex-1 w-full space-y-6">
                {/* Stroke steps */}
                <StrokeSteps character={character} />

                {/* Character details */}
                {characterInfo && <CharacterDetails info={characterInfo} />}
              </div>
            </div>
          </section>
        )}

        {/* Empty state */}
        {!character && (
          <div className="text-center py-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-4xl">✏️</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              开始学习吧！
            </h3>
            <p className="text-muted-foreground">
              在上方输入一个汉字，或者点击推荐的字开始学习
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 border-t border-border/50 mt-auto">
        <p className="text-center text-sm text-muted-foreground">
          专为一年级小朋友设计 ❤️ 快乐学汉字
        </p>
      </footer>
    </div>
  );
};

export default Index;
