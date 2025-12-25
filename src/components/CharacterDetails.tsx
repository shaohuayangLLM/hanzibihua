import { CharacterInfo } from "@/data/characterInfo";
import { BookOpen, MessageCircle, Layers, Info } from "lucide-react";

interface CharacterDetailsProps {
  info: CharacterInfo;
}

export const CharacterDetails = ({ info }: CharacterDetailsProps) => {
  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* Pinyin and basic info */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground">
          <span className="text-xl font-semibold">{info.pinyin}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-sm">{info.strokeCount > 0 ? `${info.strokeCount}笔` : ""}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-sm">{info.radicalInfo}</span>
        </div>
      </div>

      {/* Meaning */}
      <div className="card-warm rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          字义
        </h3>
        <p className="text-foreground/80 leading-relaxed">{info.meaning}</p>
      </div>

      {/* Words */}
      {info.words.length > 0 && (
        <div className="card-warm rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-accent" />
            组词
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {info.words.map((word, index) => (
              <div
                key={index}
                className="bg-background/50 rounded-xl p-3 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-brush text-foreground">{word.word}</span>
                  <span className="text-sm text-muted-foreground">{word.pinyin}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{word.meaning}</p>
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
            例句
          </h3>
          <div className="space-y-3">
            {info.sentences.map((sentence, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-background/50 rounded-xl border border-border/50"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
                  {index + 1}
                </span>
                <p className="text-foreground/90">{sentence}</p>
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
            跟着笔画顺序多写几遍，记住每一笔的顺序哦！
          </p>
        </div>
      </div>
    </div>
  );
};
