/**
 * 声韵组合网格布局组件
 * 经典表格布局：固定表头 + 可滚动内容区
 */

import { useState } from "react";
import { Volume2, X, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePinyinSpeech } from "@/hooks/usePinyinSpeech";
import type { CombinationData } from "@/types/pinyin";

interface CombinationGridProps {
  data: CombinationData;
  initials: string[];
  finals: string[];
}

// 声调颜色映射
const TONE_COLORS: Record<number, string> = {
  1: "text-red-600",
  2: "text-orange-600",
  3: "text-yellow-600",
  4: "text-green-600",
  5: "text-gray-600",
};

export function CombinationGrid({ data, initials, finals }: CombinationGridProps) {
  const { speak, isLoading } = usePinyinSpeech({ rate: 0.7, pitch: 1.1 });
  const [selectedCell, setSelectedCell] = useState<{ final: string; initial: string } | null>(null);

  // 构建查找映射：final -> initial -> item
  const combinationMap = new Map<string, Map<string, typeof data.a[0]>>();
  for (const [final, items] of Object.entries(data)) {
    const initialMap = new Map<string, typeof data.a[0]>();
    for (const item of items) {
      initialMap.set(item.initial, item);
    }
    combinationMap.set(final, initialMap);
  }

  // 只保留有至少一个有效组合的韵母
  const validFinals = finals.filter(final => {
    const items = data[final as keyof CombinationData];
    return items && items.length > 0 && items.some(item => item.tones.length > 0);
  });

  const handleSpeak = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    speak(text);
  };

  const handleCellClick = (final: string, initial: string) => {
    const item = combinationMap.get(final)?.get(initial);
    if (item && item.tones.length > 0) {
      setSelectedCell({ final, initial });
    }
  };

  const selectedItem = selectedCell
    ? combinationMap.get(selectedCell.final)?.get(selectedCell.initial)
    : null;

  return (
    <div className="space-y-4">
      {/* 表格容器 */}
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
        {/* 固定表头 */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <div className="flex">
            {/* 左上角空单元格 */}
            <div className="w-20 shrink-0 p-3 text-center border-r border-gray-200">
              <span className="text-xs font-bold text-gray-500">韵母\声母</span>
            </div>
            {/* 声母表头 */}
            {initials.map((initial) => (
              <div
                key={`header-${initial}`}
                className="flex-1 min-w-[70px] p-3 text-center border-r border-gray-200 last:border-r-0"
              >
                <span className="text-lg font-bold text-blue-600">{initial}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 可滚动内容区 */}
        <div className="overflow-auto max-h-[600px]">
          {validFinals.map((final, rowIndex) => (
            <div
              key={`row-${final}`}
              className={`flex border-b border-gray-100 last:border-b-0 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
            >
              {/* 韵母表头（固定列） */}
              <div className="w-20 shrink-0 p-3 text-center border-r border-gray-200 bg-green-50 sticky left-0 z-10">
                <span className="text-lg font-bold text-green-700">{final}</span>
              </div>

              {/* 声母组合单元格 */}
              {initials.map((initial) => {
                const item = combinationMap.get(final)?.get(initial);
                const isSelected = selectedCell?.final === final && selectedCell?.initial === initial;

                if (!item || item.tones.length === 0) {
                  return (
                    <div
                      key={`${final}-${initial}`}
                      className="flex-1 min-w-[70px] p-2 text-center border-r border-gray-100 last:border-r-0"
                    >
                      <span className="text-gray-300 text-xl">—</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={`${final}-${initial}`}
                    className={`flex-1 min-w-[70px] p-2 text-center border-r border-gray-100 last:border-r-0 cursor-pointer hover:bg-emerald-50 transition-colors ${
                      isSelected ? 'bg-emerald-100 ring-2 ring-emerald-400' : ''
                    }`}
                    onClick={() => handleCellClick(final, initial)}
                  >
                    {/* 显示所有声调 */}
                    <div className="space-y-1">
                      {item.tones.slice(0, 4).map((tone, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-1">
                          <span className={`text-sm font-bold ${TONE_COLORS[tone.tone]}`}>
                            {tone.combination}
                          </span>
                          <span className="text-xs text-gray-600">{tone.examples[0]?.char}</span>
                        </div>
                      ))}
                      {item.tones.length > 4 && (
                        <div className="text-xs text-gray-400">
                          +{item.tones.length - 4}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* 详情弹窗 */}
      {selectedItem && selectedCell && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-auto">
            {/* 头部 */}
            <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-green-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">
                    {selectedCell.initial} + {selectedCell.final} 组合
                  </h3>
                  <p className="text-emerald-100 mt-1">
                    点击汉字或词语听朗读
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => setSelectedCell(null)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* 内容 */}
            <div className="p-6 space-y-4">
              {selectedItem.tones.map((tone, toneIndex) => (
                <div
                  key={toneIndex}
                  className="border border-gray-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  {/* 声调标题 */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-2xl font-bold ${TONE_COLORS[tone.tone]}`}>
                        {tone.combination}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => handleSpeak(tone.examples[0]?.word || tone.examples[0]?.char || tone.combination, e)}
                        disabled={isLoading}
                      >
                        {isLoading ? <RotateCw className="h-4 w-4 animate-spin" /> : <Volume2 className="h-4 w-4 text-emerald-600" />}
                      </Button>
                    </div>
                  </div>

                  {/* 汉字和词语 */}
                  <div className="grid grid-cols-2 gap-3">
                    {tone.examples.map((example, exIndex) => (
                      <div
                        key={exIndex}
                        className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-emerald-50 transition-colors"
                        onClick={(e) => handleSpeak(example.word || example.char, e)}
                      >
                        <div className="w-12 h-12 mizige rounded flex items-center justify-center bg-white shrink-0">
                          <span className="text-xl font-bold text-gray-800">{example.char}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-800 truncate">
                            {example.word || example.char}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {example.fullPinyin}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
