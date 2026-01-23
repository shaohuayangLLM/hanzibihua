import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CharacterInput } from "@/components/CharacterInput";
import { StrokeDisplay } from "@/components/StrokeDisplay";
import { StrokeSteps } from "@/components/StrokeSteps";
import { CharacterDetails } from "@/components/CharacterDetails";
import { getCharacterInfo, type CharacterInfo } from "@/data/characterInfo";
import Pencil from 'lucide-react/dist/esm/icons/pencil';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
import Calculator from 'lucide-react/dist/esm/icons/calculator';
import Menu from 'lucide-react/dist/esm/icons/menu';
import X from 'lucide-react/dist/esm/icons/x';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MATH_MODULES } from "@/data/math/modules";

type Subject = 'chinese' | 'math';

const Index = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState<Subject>('chinese');
  const [character, setCharacter] = useState<string>("");
  const [characterInfo, setCharacterInfo] = useState<CharacterInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-4 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          {/* 第一行：图标、标题和菜单按钮 */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-button ${subject === 'chinese' ? 'bg-primary' : 'bg-purple-500'}`}>
                {subject === 'chinese' ? (
                  <Pencil className="h-5 w-5 text-primary-foreground" />
                ) : (
                  <Calculator className="h-5 w-5 text-white" />
                )}
              </div>
              <h1 className="text-xl font-bold text-foreground">
                {subject === 'chinese' ? '一年级学习' : '一年级数学'}
              </h1>
            </div>

            {/* 移动端菜单按钮 */}
            {subject === 'chinese' && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            )}
          </div>

          {/* 第二行：学科切换和快速链接 */}
          <div className="flex items-center justify-between gap-2">
            {/* Subject Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSubject('chinese')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  subject === 'chinese'
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                📖 语文
              </button>
              <button
                onClick={() => setSubject('math')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  subject === 'math'
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                🔢 数学
              </button>
            </div>

            {/* Quick links - 桌面端显示 */}
            {subject === 'chinese' && (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/pinyin-basics" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm">
                    拼音基础
                  </Button>
                </Link>
                <Link to="/quiz" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm">
                    拼音测试
                  </Button>
                </Link>
                <Link to="/radicals" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm">
                    偏旁学习
                  </Button>
                </Link>
                <Link to="/polyphone" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm">
                    多音字练习
                  </Button>
                </Link>
                <Link to="/similar-characters" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm">
                    形近字
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* 移动端快速链接菜单 */}
          {subject === 'chinese' && mobileMenuOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-border/50 grid grid-cols-2 gap-2">
              <Link
                to="/pinyin-basics"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <span className="text-xl">🔤</span>
                <span className="text-sm font-medium">拼音基础</span>
              </Link>
              <Link
                to="/quiz"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <span className="text-xl">📝</span>
                <span className="text-sm font-medium">拼音测试</span>
              </Link>
              <Link
                to="/radicals"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <span className="text-xl">📖</span>
                <span className="text-sm font-medium">偏旁学习</span>
              </Link>
              <Link
                to="/polyphone"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <span className="text-xl">📚</span>
                <span className="text-sm font-medium">多音字练习</span>
              </Link>
              <Link
                to="/similar-characters"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <span className="text-xl">👀</span>
                <span className="text-sm font-medium">形近字</span>
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Chinese Subject Content */}
        {subject === 'chinese' && (
          <>
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
            <section className="flex justify-center animate-scale-in" style={{ animationDelay: "0.1s" }}>
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
          </>
        )}

        {/* Math Subject Content */}
        {subject === 'math' && (
          <>
            <section className="text-center space-y-4 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-purple-600" />
                苏教版一年级上册
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                选择学习模块
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                点击卡片开始练习或测试
              </p>
            </section>

            {/* Module Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {MATH_MODULES.map((module) => (
                <button
                  key={module.id}
                  onClick={() => !module.disabled && navigate(`/math/module/${module.id}`)}
                  disabled={module.disabled}
                  className={`
                    group relative p-6 rounded-2xl border-2
                    shadow-md transition-all duration-300 text-left
                    ${module.disabled
                      ? 'bg-muted/30 border-muted opacity-50 cursor-not-allowed'
                      : 'bg-card border-border hover:shadow-xl hover:scale-105 hover:border-purple-400 active:scale-95'
                    }
                  `}
                >
                  {/* Icon */}
                  <div className={`
                    w-16 h-16 rounded-2xl ${module.color} flex items-center justify-center
                    text-3xl mb-4 shadow-lg transition-transform pointer-events-none
                    ${module.disabled ? 'grayscale opacity-50' : 'group-hover:scale-110'}
                  `}>
                    {module.icon}
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-2 transition-colors pointer-events-none ${
                    module.disabled ? 'text-muted-foreground' : 'text-foreground group-hover:text-purple-600'
                  }`}>
                    {module.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 pointer-events-none">
                    {module.description}
                  </p>

                  {/* Status indicator */}
                  <div className={`flex items-center font-medium text-sm pointer-events-none ${
                    module.disabled ? 'text-muted-foreground' : 'text-purple-600'
                  }`}>
                    {module.disabled ? (
                      <>🚧 暂不可用</>
                    ) : (
                      <>
                        开始学习
                        <span className="ml-1 transform group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Bottom Info */}
            <div className="text-center animate-fade-in">
              <p className="text-sm text-muted-foreground">
                💡 提示：每个模块都包含练习模式和测试模式
              </p>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 border-t border-border/50 mt-auto">
        <p className="text-center text-sm text-muted-foreground font-kaiti">
          专为一年级小朋友设计 ❤️ {subject === 'chinese' ? '快乐学汉字' : '轻松学数学'}
        </p>
      </footer>
    </div>
  );
};

export default Index;
