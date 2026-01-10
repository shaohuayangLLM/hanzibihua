import { useState } from "react";
import { Link } from "react-router-dom";
import { CharacterInput } from "@/components/CharacterInput";
import { StrokeDisplay } from "@/components/StrokeDisplay";
import { StrokeSteps } from "@/components/StrokeSteps";
import { CharacterDetails } from "@/components/CharacterDetails";
import { TextbookSelector } from "@/components/TextbookSelector";
import { CharacterGrid } from "@/components/CharacterGrid";
import { getCharacterInfo, type CharacterInfo } from "@/data/characterInfo";
import { type TextbookVolume } from "@/data/types";
import { Pencil, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [character, setCharacter] = useState<string>("");
  const [characterInfo, setCharacterInfo] = useState<CharacterInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVolume, setSelectedVolume] = useState<TextbookVolume>('all');

  const handleCharacterSubmit = async (char: string) => {
    setCharacter(char);
    setCharacterInfo(null);
    
    // First check local database with volume filter
    const dbInfo = getCharacterInfo(char, selectedVolume);
    if (dbInfo) {
      setCharacterInfo(dbInfo);
      return;
    }
    
    // If not in local database, fetch from AI
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('get-character-info', {
        body: { character: char }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || '获取汉字信息失败');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // Validate and set character info
      const info: CharacterInfo = {
        character: data.character || char,
        pinyin: data.pinyin || "暂无",
        meaning: data.meaning || "暂无释义",
        strokeCount: data.strokeCount || 0,
        radicalInfo: data.radicalInfo || "暂无",
        structure: data.structure,
        words: Array.isArray(data.words) ? data.words : [],
        sentences: Array.isArray(data.sentences) ? data.sentences : [],
        additionalReadings: Array.isArray(data.additionalReadings) ? data.additionalReadings : [],
      };

      setCharacterInfo(info);
    } catch (error) {
      console.error('Failed to fetch character info:', error);
      toast.error(error instanceof Error ? error.message : '获取汉字信息失败，请稍后再试');
      // Set basic info as fallback
      setCharacterInfo({
        character: char,
        pinyin: "暂无",
        meaning: "获取信息失败，请稍后再试",
        strokeCount: 0,
        radicalInfo: "暂无",
        words: [],
        sentences: [],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-button">
              <Pencil className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              汉字笔顺学习
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/pinyin-basics">
              <Button variant="outline" size="sm">
                拼音基础
              </Button>
            </Link>
            <Link to="/quiz">
              <Button variant="outline" size="sm">
                拼音测试
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
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

        {/* Textbook selector and Input section */}
        <section className="flex flex-col sm:flex-row gap-4 items-center justify-center animate-scale-in" style={{ animationDelay: "0.1s" }}>
          <TextbookSelector value={selectedVolume} onChange={setSelectedVolume} />
          <CharacterInput onSubmit={handleCharacterSubmit} />
        </section>

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">正在获取汉字信息...</p>
          </div>
        )}

        {/* Results section */}
        {character && !isLoading && (
          <section className="space-y-8 animate-fade-in">
            {/* Character display */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Left: Big character and animation */}
              <div className="w-full lg:w-auto flex flex-col items-center gap-6">
                {/* Large character display */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl mizige flex items-center justify-center shadow-md">
                    <span className="text-7xl font-kaiti text-foreground">
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

        {/* Character grid when textbook selected and no character being viewed */}
        {!character && !isLoading && (
          <section className="animate-fade-in">
            <CharacterGrid
              volume={selectedVolume}
              onSelect={handleCharacterSubmit}
              selectedChar={character}
            />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 border-t border-border/50 mt-auto">
        <p className="text-center text-sm text-muted-foreground font-kaiti">
          专为一年级小朋友设计 ❤️ 快乐学汉字
        </p>
      </footer>
    </div>
  );
};

export default Index;
