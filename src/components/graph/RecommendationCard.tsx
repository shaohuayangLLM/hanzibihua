/**
 * 推荐卡片组件
 * 
 * 显示推荐的汉字，点击后切换为中心节点
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RecommendationScore } from '@/types/graph';
import { getCharacterInfo } from '@/data/characterInfo';
import { Sparkles, ArrowRight } from 'lucide-react';

interface RecommendationCardProps {
  recommendations: RecommendationScore[];
  onSelectCharacter: (char: string) => void;
}

export const RecommendationCard = ({
  recommendations,
  onSelectCharacter,
}: RecommendationCardProps) => {
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          智能推荐
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {recommendations.map((rec, index) => {
          const charInfo = getCharacterInfo(rec.character);
          if (!charInfo) return null;

          return (
            <Button
              key={rec.character}
              variant="outline"
              className="w-full h-auto p-3 flex items-center justify-between hover:bg-primary/5 hover:border-primary transition-colors"
              onClick={() => onSelectCharacter(rec.character)}
            >
              <div className="flex items-center gap-3">
                {/* 排名徽章 */}
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                  ${index === 0 ? 'bg-yellow-500 text-white' : ''}
                  ${index === 1 ? 'bg-gray-400 text-white' : ''}
                  ${index === 2 ? 'bg-orange-400 text-white' : ''}
                `}>
                  {index + 1}
                </div>

                {/* 汉字和拼音 */}
                <div className="text-left">
                  <div className="font-kaiti text-xl font-bold">
                    {rec.character}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {charInfo.pinyin}
                  </div>
                </div>
              </div>

              {/* 推荐理由 */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                  {rec.reason}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Button>
          );
        })}

        {/* 推荐说明 */}
        <p className="text-xs text-muted-foreground text-center pt-2 border-t">
          💡 点击推荐的字开始学习
        </p>
      </CardContent>
    </Card>
  );
};
