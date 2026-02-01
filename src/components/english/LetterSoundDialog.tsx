import { useEffect } from "react";
import { LetterSound } from "@/data/english/types";
import { X, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LetterSoundDialogProps {
  letterData: LetterSound;
  onClose: () => void;
}

const LetterSoundDialog = ({ letterData, onClose }: LetterSoundDialogProps) => {
  // 禁用背景滚动
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-background rounded-3xl shadow-2xl border-2 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="text-7xl font-bold text-primary">
              {letterData.letter}
            </div>
            <div className="text-4xl font-medium text-muted-foreground">
              {letterData.lowercase}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Phonics Info */}
          <div className="flex items-center gap-4">
            <div className="flex-1 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
              <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">发音</div>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {letterData.phonics}
              </div>
            </div>
            <div className="flex-1 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
              <div className="text-sm text-purple-600 dark:text-purple-400 mb-1">类型</div>
              <div className="text-lg font-bold text-purple-900 dark:text-purple-100">
                {letterData.sound}
              </div>
            </div>
          </div>

          {/* Example Words */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span>示例单词</span>
              <button
                onClick={() => handleSpeak(letterData.examples.join(', '))}
                className="p-1 rounded-full hover:bg-accent"
              >
                <Volume2 className="h-5 w-5 text-primary" />
              </button>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {letterData.exampleWords.map((word, index) => (
                <button
                  key={index}
                  onClick={() => handleSpeak(word.word)}
                  className="group p-4 rounded-xl border-2 bg-card hover:border-primary hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-primary">
                      {word.word}
                    </span>
                    <Volume2 className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {word.phonetic}
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {word.translation}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* More Examples */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-3">更多单词</h3>
            <div className="flex flex-wrap gap-2">
              {letterData.examples.map((word) => (
                <button
                  key={word}
                  onClick={() => handleSpeak(word)}
                  className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterSoundDialog;
