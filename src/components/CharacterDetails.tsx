import { CharacterInfo, PinyinReading } from "@/data/characterInfo";
import { BookOpen, MessageCircle, Layers, Info, Hash, Grid3X3, Type, Volume2, Music, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePinyinSpeech } from "@/hooks/usePinyinSpeech";
import { toast } from "sonner";

interface CharacterDetailsProps {
  info: CharacterInfo;
}

export const CharacterDetails = ({ info }: CharacterDetailsProps) => {
  const { speak, isLoading } = usePinyinSpeech({ rate: 0.7 });

  // Load voices when component mounts (needed for some browsers)
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
  }

  const hasAdditionalReadings = info.additionalReadings && info.additionalReadings.length > 0;

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
          {hasAdditionalReadings && (
            <p className="text-xs text-primary mt-1">多音字</p>
          )}
          {info.pinyin && info.pinyin !== "暂无" && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => speak(info.character)}
              disabled={isLoading}
              title="朗读"
            >
              {isLoading ? <RotateCw className="h-4 w-4 animate-spin" /> : <Volume2 className="h-4 w-4" />}
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
            onClick={() => speak(info.meaning)}
            disabled={isLoading}
            title="朗读释义"
          >
            {isLoading ? <RotateCw className="h-4 w-4 animate-spin" /> : <Volume2 className="h-4 w-4" />}
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
            <span className="text-sm font-normal text-muted-foreground">（{info.pinyin}）</span>
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
                  onClick={() => speak(word.word)}
                  disabled={isLoading}
                  title="朗读"
                >
                  {isLoading ? <RotateCw className="h-3.5 w-3.5 animate-spin" /> : <Volume2 className="h-3.5 w-3.5" />}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Readings (多音字) */}
      {hasAdditionalReadings && (
        <div className="card-warm rounded-2xl p-5 border-2 border-primary/20">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            多音字读音
          </h3>
          <div className="space-y-4">
            {info.additionalReadings!.map((reading, idx) => (
              <div key={idx} className="bg-background/50 rounded-xl p-4 border border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-brush text-foreground">{info.character}</span>
                  <span className="text-xl font-semibold text-primary">{reading.pinyin}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => speak(info.character)}
                    disabled={isLoading}
                    title="朗读"
                  >
                    {isLoading ? <RotateCw className="h-4 w-4 animate-spin" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{reading.meaning}</p>
                {reading.words && reading.words.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {reading.words.map((word, wordIdx) => (
                      <div
                        key={wordIdx}
                        className="bg-secondary/50 rounded-lg p-2 group relative"
                      >
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-brush">{word.word}</span>
                          <span className="text-xs text-muted-foreground">{word.pinyin}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{word.meaning}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => speak(word.word)}
                          disabled={isLoading}
                          title="朗读"
                        >
                          {isLoading ? <RotateCw className="h-3 w-3 animate-spin" /> : <Volume2 className="h-3 w-3" />}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
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
                  onClick={() => speak(sentence)}
                  disabled={isLoading}
                  title="朗读例句"
                >
                  {isLoading ? <RotateCw className="h-3.5 w-3.5 animate-spin" /> : <Volume2 className="h-3.5 w-3.5" />}
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
            点击 <Volume2 className="h-3.5 w-3.5 inline" /> 按钮可以听到正确的读音哦！
            {hasAdditionalReadings && "这是一个多音字，记得学习不同读音的用法！"}
            跟着笔画顺序多写几遍，记住每一笔的顺序吧！
          </p>
        </div>
      </div>
    </div>
  );
};