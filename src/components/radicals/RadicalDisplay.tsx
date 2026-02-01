import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Volume2, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRadicalInfo } from "@/data/radicalData";
import { usePinyinSpeech } from "@/hooks/usePinyinSpeech";
import { getCharacterInfo } from "@/data/characterInfo";

interface RadicalDisplayProps {
  radical: string;
}

export const RadicalDisplay = ({ radical }: RadicalDisplayProps) => {
  const { speak, isLoading } = usePinyinSpeech({ rate: 0.7 });
  const info = getRadicalInfo(radical);

  if (!info) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 偏旁基本信息卡片 */}
      <Card className="p-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* 偏旁大字显示 + 读音按钮 */}
          <div className="flex items-center gap-6 mx-auto md:mx-0">
            <div className="w-36 h-36 mizige rounded-2xl flex items-center justify-center">
              <span className="text-8xl text-foreground relative z-10">
                {info.radical}
              </span>
            </div>
            <Button
              variant="outline"
              className="h-14 w-14 rounded-full shrink-0 hover:scale-110 transition-transform"
              onClick={() => speak(info.name)}
              disabled={isLoading}
              title="朗读偏旁名称"
            >
              {isLoading ? <RotateCw className="h-6 w-6 animate-spin" /> : <Volume2 className="h-6 w-6" />}
            </Button>
          </div>

          {/* 偏旁信息 */}
          <div className="flex-1 space-y-4 w-full">
            <div>
              <Badge className="mb-2 bg-primary/20 text-primary hover:bg-primary/30">
                偏旁名称
              </Badge>
              <h3 className="text-3xl font-medium text-foreground">
                {info.name}
              </h3>
            </div>
            <div>
              <Badge className="mb-2 bg-accent/20 text-accent hover:bg-accent/30">
                含义关联
              </Badge>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {info.relation}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* 例字展示 */}
      <Card className="p-8">
        <div className="mb-6">
          <Badge className="mb-2 bg-secondary/50 text-secondary-foreground">
            例字展示
          </Badge>
          <h3 className="text-xl font-semibold text-foreground">
            包含"{info.radical}"偏旁的汉字
          </h3>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {info.exampleList.map((char) => {
            const charInfo = getCharacterInfo(char);
            return (
              <div
                key={char}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-16 h-16 mizige rounded-lg flex items-center justify-center relative">
                  <span className="text-4xl text-foreground relative z-10">
                    {char}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 backdrop-blur-sm"
                    onClick={() => speak(char)}
                    disabled={isLoading}
                    title="朗读"
                  >
                    {isLoading ? <RotateCw className="h-3.5 w-3.5 animate-spin" /> : <Volume2 className="h-3.5 w-3.5" />}
                  </Button>
                </div>
                {charInfo && (
                  <span className="text-xs text-muted-foreground text-center">
                    {charInfo.pinyin}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* 学习提示 */}
      <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 flex items-start gap-4">
        <div className="text-4xl">💡</div>
        <div>
          <p className="font-medium text-accent mb-1">
            学习小贴士
          </p>
          <p className="text-sm text-foreground/70">
            认识偏旁部首可以帮助你更快地记住汉字！
            当你看到一个新汉字时，可以先看看它的偏旁，
            这样就能猜出这个字可能和什么相关了。
            比如"氵"的字通常都和水有关，"木"的字通常都和树木有关。
          </p>
        </div>
      </div>
    </div>
  );
};
