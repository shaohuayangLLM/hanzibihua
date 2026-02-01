import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterInput } from "@/components/CharacterInput";
import { StrokeDisplay } from "@/components/StrokeDisplay";
import { StrokeSteps } from "@/components/StrokeSteps";
import { CharacterDetails } from "@/components/CharacterDetails";
import { getCharacterInfo, type CharacterInfo } from "@/data/characterInfo";
import Pencil from 'lucide-react/dist/esm/icons/pencil';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const StrokeLearning = () => {
  const navigate = useNavigate();
  const [character, setCharacter] = useState<string>("");
  const [characterInfo, setCharacterInfo] = useState<CharacterInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCharacterSubmit = async (char: string) => {
    setCharacter(char);
    setCharacterInfo(null);

    // First check local database
    const dbInfo = getCharacterInfo(char);
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

  const handleReset = () => {
    setCharacter("");
    setCharacterInfo(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-4 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-button bg-rose-500">
              <Pencil className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">
              笔画学习
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Hero section */}
        <section className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
            <Sparkles className="h-4 w-4 text-rose-500" />
            汉字笔画学习
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            输入汉字查看笔画
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            输入一个汉字，查看它的笔画顺序、动画和详细信息
          </p>
        </section>

        {/* Input section */}
        <div className="flex justify-center animate-scale-in">
          <CharacterInput onSubmit={handleCharacterSubmit} />
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            <Loader2 className="h-12 w-12 text-rose-500 animate-spin mb-4" />
            <p className="text-muted-foreground">正在获取汉字信息...</p>
          </div>
        )}

        {/* Results section */}
        {character && !isLoading && (
          <section className="space-y-8 animate-fade-in">
            {/* Reset button */}
            <div className="flex justify-center">
              <Button
                onClick={handleReset}
                variant="outline"
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                重新输入
              </Button>
            </div>

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

        {/* Empty state hint */}
        {!character && !isLoading && (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4">✏️</div>
            <p className="text-muted-foreground">
              在上方输入框中输入一个汉字开始学习
            </p>
          </div>
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

export default StrokeLearning;
