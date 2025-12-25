import { CharacterInfo } from "@/data/characterInfo";
import { BookOpen, MessageCircle, Layers, Info, Hash, Grid3X3, Type, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CharacterDetailsProps {
  info: CharacterInfo;
}

// Web Speech API for TTS
const speak = (text: string, rate: number = 0.8) => {
  if (!('speechSynthesis' in window)) {
    toast.error('您的浏览器不支持语音朗读功能');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = rate;
  utterance.pitch = 1.1; // Slightly higher pitch for kid-friendly voice
  
  // Try to find a Chinese voice
  const voices = window.speechSynthesis.getVoices();
  const chineseVoice = voices.find(voice => 
    voice.lang.includes('zh') || voice.lang.includes('CN')
  );
  if (chineseVoice) {
    utterance.voice = chineseVoice;
  }

  window.speechSynthesis.speak(utterance);
};

export const CharacterDetails = ({ info }: CharacterDetailsProps) => {
  // Load voices when component mounts (needed for some browsers)
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
  }

  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* Basic Info Cards */}
      <div className="grid grid-cols-3 gap-3">
        {/* Pinyin */}
        <div className="card-warm rounded-2xl p-4 text-center relative group">
          <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center">
            <Type className="h-5 w-5 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">拼音</p>
          <p className="text-2xl font-semibold text-foreground">{info.pinyin}</p>
          {info.pinyin && info.pinyin !== "暂无" && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => speak(info.character, 0.6)}
              title="朗读"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Stroke count */}
        <div className="card-warm rounded-2xl p-4 text-center">
          <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-accent/10 flex items-center justify-center">
            <Hash className="h-5 w-5 text-accent" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">笔画</p>
          <p className="text-2xl font-semibold text-foreground">
            {info.strokeCount > 0 ? `${info.strokeCount}画` : "暂无"}
          </p>
        </div>

        {/* Radical */}
        <div className="card-warm rounded-2xl p-4 text-center">
          <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-secondary flex items-center justify-center">
            <Grid3X3 className="h-5 w-5 text-secondary-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">部首</p>
          <p className="text-2xl font-semibold text-foreground">
            {info.radicalInfo && info.radicalInfo !== "暂无" ? info.radicalInfo.replace("部首：", "") : "暂无"}
          </p>
        </div>
      </div>

      {/* Structure - if available */}
      {info.structure && (
        <div className="card-warm rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Grid3X3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">结构</p>
            <p className="text-lg font-semibold text-foreground">{info.structure}</p>
          </div>
        </div>
      )}

      {/* Meaning */}
      <div className="card-warm rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          字义解释
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 ml-auto"
            onClick={() => speak(info.meaning, 0.9)}
            title="朗读释义"
          >
            <Volume2 className="h-4 w-4" />
          </Button>
        </h3>
        <p className="text-foreground/80 leading-relaxed">{info.meaning}</p>
      </div>

      {/* Words */}
      {info.words.length > 0 && (
        <div className="card-warm rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-accent" />
            常用组词
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {info.words.map((word, index) => (
              <div
                key={index}
                className="bg-background/50 rounded-xl p-3 border border-border/50 hover:border-primary/30 transition-colors group relative"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-brush text-foreground">{word.word}</span>
                  <span className="text-sm text-muted-foreground">{word.pinyin}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{word.meaning}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => speak(word.word, 0.7)}
                  title="朗读"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Example sentences */}
      {info.sentences.length > 0 && (
        <div className="card-warm rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            例句造句
          </h3>
          <div className="space-y-3">
            {info.sentences.map((sentence, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-background/50 rounded-xl border border-border/50 group relative"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
                  {index + 1}
                </span>
                <p className="text-foreground/90 flex-1">{sentence}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => speak(sentence, 0.9)}
                  title="朗读例句"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tip for kids */}
      <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 flex items-start gap-3">
        <BookOpen className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-accent">学习小贴士</p>
          <p className="text-sm text-foreground/70 mt-1">
            点击 <Volume2 className="h-3.5 w-3.5 inline" /> 按钮可以听到正确的读音哦！跟着笔画顺序多写几遍，记住每一笔的顺序吧！
          </p>
        </div>
      </div>
    </div>
  );
};