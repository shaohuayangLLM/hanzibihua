import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LETTER_SOUNDS, VOWELS, CONSONANTS } from "@/data/english/letterSounds";
import LetterSoundCard from "@/components/english/LetterSoundCard";
import LetterSoundDialog from "@/components/english/LetterSoundDialog";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";

type ViewMode = 'all' | 'vowels' | 'consonants';

const LetterSounds = () => {
  const navigate = useNavigate();
  const [selectedLetter, setSelectedLetter] = useState<(typeof LETTER_SOUNDS)[0] | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('all');

  const getDisplayLetters = () => {
    switch (viewMode) {
      case 'vowels':
        return VOWELS;
      case 'consonants':
        return CONSONANTS;
      default:
        return LETTER_SOUNDS;
    }
  };

  const handleSpeak = (letter: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(letter);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-4 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">字母发音</h1>
              <p className="text-sm text-muted-foreground">Letter Sounds</p>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('all')}
            >
              全部
            </Button>
            <Button
              variant={viewMode === 'vowels' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('vowels')}
            >
              元音
            </Button>
            <Button
              variant={viewMode === 'consonants' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('consonants')}
            >
              辅音
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Info Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
            🔊 点击字母听发音
          </div>
          <p className="text-muted-foreground">
            学习26个字母在单词中的发音，这是自然拼读的基础
          </p>
        </div>

        {/* Letters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {getDisplayLetters().map((letterData) => (
            <LetterSoundCard
              key={letterData.letter}
              letterData={letterData}
              onClick={() => setSelectedLetter(letterData)}
              onSpeak={() => handleSpeak(letterData.lowercase)}
            />
          ))}
        </div>

        {/* Learning Tips */}
        <div className="mt-12 p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3">
            💡 学习小贴士
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li>• <strong>元音字母</strong>：A、E、I、O、U，发音时气流不受阻碍</li>
            <li>• <strong>辅音字母</strong>：其他21个字母，发音时气流受到阻碍</li>
            <li>• <strong>短元音</strong>：a cat, e bed, i pig, o dog, u duck</li>
            <li>• 点击卡片可查看更多示例单词和发音</li>
          </ul>
        </div>
      </main>

      {/* Detail Dialog */}
      {selectedLetter && (
        <LetterSoundDialog
          letterData={selectedLetter}
          onClose={() => setSelectedLetter(null)}
        />
      )}
    </div>
  );
};

export default LetterSounds;
