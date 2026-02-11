/**
 * 拼音组合卡片组件 (新版)
 * 显示"声母 + 韵母 = 拼音"的组合过程
 * 4个声调 + 例词直接可见
 */

import { Volume2, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePinyinSpeech } from "@/hooks/usePinyinSpeech";
import type { CombinationItem } from "@/types/pinyin";

interface CombinationCardNewProps {
  item: CombinationItem;
}

// 声调颜色映射
const TONE_COLORS: Record<number, string> = {
  1: "text-red-600",
  2: "text-orange-600",
  3: "text-yellow-600",
  4: "text-green-600",
  5: "text-gray-600",
};

// 声调背景色（浅色）
const TONE_BG_COLORS: Record<number, string> = {
  1: "bg-red-50",
  2: "bg-orange-50",
  3: "bg-yellow-50",
  4: "bg-green-50",
  5: "bg-gray-50",
};

export function CombinationCardNew({ item }: CombinationCardNewProps) {
  const { speak, isLoading } = usePinyinSpeech({ rate: 0.7, pitch: 1.1 });

  // 播放所有声调（朗读汉字，而不是拼音音标）
  const handlePlayAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 收集所有声调的例字，用空格分隔
    const allChars = item.tones
      .filter(t => t.examples[0])
      .map(t => t.examples[0].char)
      .join(" ");
    speak(allChars);
  };

  // 播放单个声调（朗读汉字，而不是拼音音标）
  const handlePlayTone = (tone: typeof item.tones[0], e: React.MouseEvent) => {
    e.stopPropagation();
    if (tone.examples[0]) {
      // 朗读例词（如"八个"），而不是拼音（如"bā"）
      speak(tone.examples[0].word || tone.examples[0].char);
    }
  };

  // 播放例词
  const handlePlayWord = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    speak(word);
  };

  // 获取基础拼音（无声调）
  const basePinyin = `${item.initial}${item.final}`;

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 hover:border-emerald-400 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* 顶部：组合公式 */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-3 sm:p-4 border-b border-gray-200">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <span className="text-xl sm:text-2xl font-bold text-blue-600">{item.initial}</span>
          <span className="text-lg sm:text-xl text-gray-400">+</span>
          <span className="text-xl sm:text-2xl font-bold text-green-600">{item.final}</span>
          <span className="text-lg sm:text-xl text-gray-400">=</span>
          <span className="text-2xl sm:text-3xl font-bold text-emerald-600">{basePinyin}</span>
        </div>
        <div className="text-center mt-1 text-xs text-gray-500">
          声母 + 韵母 = 拼音
        </div>
      </div>

      {/* 主体：4个声调列表 */}
      <div className="p-3 sm:p-4 space-y-2">
        {item.tones.length > 0 ? (
          item.tones.slice(0, 4).map((tone) => {
            const example = tone.examples[0];
            return (
              <div
                key={tone.tone}
                className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg ${TONE_BG_COLORS[tone.tone]} hover:shadow-md transition-all cursor-pointer active:scale-95`}
                onClick={(e) => handlePlayTone(tone, e)}
              >
                {/* 声调标识 */}
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-[70px] sm:min-w-[80px]">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                    tone.tone === 1 ? 'bg-red-500' :
                    tone.tone === 2 ? 'bg-orange-500' :
                    tone.tone === 3 ? 'bg-yellow-500' :
                    tone.tone === 4 ? 'bg-green-500' : 'bg-gray-500'
                  }`}>
                    {tone.tone}
                  </div>
                  <span className={`text-lg sm:text-xl font-bold ${TONE_COLORS[tone.tone]}`}>
                    {tone.combination}
                  </span>
                </div>

                {/* 汉字 */}
                {example && (
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 mizige rounded flex items-center justify-center bg-white shrink-0">
                      <span className="text-base sm:text-lg font-bold text-gray-800">{example.char}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-xs sm:text-sm font-medium text-gray-800 truncate hover:text-emerald-600 transition-colors"
                        onClick={(e) => handlePlayWord(example.word || example.char, e)}
                      >
                        {example.word || example.char}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-500 truncate">
                        {example.fullPinyin}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-6 sm:py-8 text-gray-400">
            <p className="text-sm sm:text-base">该组合暂无示例</p>
          </div>
        )}

        {/* 底部：播放按钮 */}
        {item.tones.length > 0 && (
          <div className="pt-2 border-t border-gray-200 mt-2 sm:mt-3">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-emerald-600 hover:bg-emerald-50 active:scale-95 transition-all"
              onClick={handlePlayAll}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <RotateCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 animate-spin" />
                  <span className="text-xs sm:text-sm">播放中...</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                  <span className="text-xs sm:text-sm">播放所有声调</span>
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
