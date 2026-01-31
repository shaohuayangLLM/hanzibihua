/**
 * 声韵组合卡片组件
 * 显示单个声母-韵母组合的拼音、汉字和词语
 * 支持多声调切换
 */

import { useState } from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePinyinSpeech } from "@/hooks/usePinyinSpeech";
import type { CombinationItem } from "@/types/pinyin";

// 声调符号映射
const TONE_MARKS: Record<number, string> = {
  1: "ˉ",
  2: "ˊ",
  3: "ˇ",
  4: "ˋ",
};

// 声调颜色映射
const TONE_COLORS: Record<number, string> = {
  1: "bg-red-100 text-red-600 border-red-200",
  2: "bg-orange-100 text-orange-600 border-orange-200",
  3: "bg-yellow-100 text-yellow-600 border-yellow-200",
  4: "bg-green-100 text-green-600 border-green-200",
};

interface CombinationCardProps {
  item: CombinationItem;
}

export function CombinationCard({ item }: CombinationCardProps) {
  const { speak } = usePinyinSpeech({ rate: 0.7, pitch: 1.1 });

  // 默认选择第一个声调
  const [selectedToneIndex, setSelectedToneIndex] = useState(0);
  const selectedTone = item.tones[selectedToneIndex];

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speak(selectedTone.combination);
  };

  const handleSpeakWord = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    speak(word);
  };

  return (
    <div className="group relative bg-white rounded-lg border border-emerald-200 p-2 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer animate-fade-in">
      {/* 顶部：声母+韵母 + 声调标签页 */}
      <div className="space-y-1.5">
        {/* 声母韵母标题 */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">
            {item.initial} + {item.final}
          </span>
          {/* 当前拼音朗读按钮 */}
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
            onClick={handleSpeak}
          >
            <Volume2 className="h-3 w-3 text-emerald-600" />
          </Button>
        </div>

        {/* 声调标签页 */}
        <div className="flex flex-wrap gap-1">
          {item.tones.map((tone, index) => (
            <button
              key={`${tone.combination}-${tone.tone}`}
              onClick={() => setSelectedToneIndex(index)}
              className={`
                flex items-center gap-1 px-1.5 py-0.5 rounded border text-xs font-bold transition-all
                ${index === selectedToneIndex
                  ? `${TONE_COLORS[tone.tone]} ring-1 ring-offset-0.5 ring-${tone.tone === 1 ? 'red' : tone.tone === 2 ? 'orange' : tone.tone === 3 ? 'yellow' : 'green'}-400`
                  : 'bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100'
                }
              `}
            >
              <span>{tone.combination}</span>
              <span className="text-[10px] opacity-60">{TONE_MARKS[tone.tone]}</span>
            </button>
          ))}
        </div>

        {/* 当前声调的拼音大字 */}
        <div className="text-center py-1 bg-gradient-to-r from-emerald-50 to-green-50 rounded">
          <span className="text-xl font-bold text-emerald-600">
            {selectedTone.combination}
          </span>
        </div>
      </div>

      {/* 汉字示例 - 田字格 */}
      <div className="flex gap-1.5 my-2 justify-center">
        {selectedTone.examples.slice(0, 2).map((example) => (
          <div
            key={example.char}
            className="w-10 h-10 mizige rounded flex items-center justify-center bg-white cursor-pointer hover:scale-105 transition-transform"
            onClick={(e) => handleSpeakWord(example.char, e)}
            title="点击朗读"
          >
            <span className="text-lg relative z-10">{example.char}</span>
          </div>
        ))}
      </div>

      {/* 词语示例 */}
      <div className="space-y-0.5">
        {selectedTone.examples.slice(0, 2).map((example) => (
          <div
            key={`${example.char}-${example.word}`}
            className="flex items-center justify-between text-[10px] group/item hover:bg-gray-50 rounded px-1 py-0.5 -mx-1"
          >
            <span className="text-gray-700 truncate">
              <span className="font-medium">{example.char}</span>
              {example.word && (
                <>
                  <span className="text-gray-400 mx-0.5">·</span>
                  <span className="text-gray-600">{example.word}</span>
                </>
              )}
            </span>
            <span className="text-[9px] text-gray-400 shrink-0 ml-1">{example.fullPinyin}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
