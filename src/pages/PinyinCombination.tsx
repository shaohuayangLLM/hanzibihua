/**
 * 声韵组合拼读练习页面
 * 声母 × 韵母 组合网格学习
 */

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";
import { CombinationCardNew } from "@/components/pinyin/combination";
import {
  getGroupData,
  getGroupInitials,
  INITIAL_GROUPS,
  INITIAL_GROUP_LABELS,
  type InitialGroup,
} from "@/data/pinyin/combinations";
import type { CombinationItem, CombinationData } from "@/types/pinyin";

// 所有韵母（按开口类型分组）
const ALL_FINALS = [
  "a", "o", "e", "i", "u", "ü",
  "ai", "ei", "ui", "ao", "ou", "iu", "ie", "üe", "er",
  "an", "en", "in", "un", "ün",
  "ang", "eng", "ing", "ong"
];

// 将数据扁平化为卡片列表
const flattenCombinations = (data: CombinationData): CombinationItem[] => {
  const result: CombinationItem[] = [];

  // 按韵母顺序遍历
  for (const final of ALL_FINALS) {
    const items = data[final];
    if (items && items.length > 0) {
      // 添加该韵母下的所有声母组合
      for (const item of items) {
        if (item.tones.length > 0) {
          result.push(item);
        }
      }
    }
  }

  return result;
};

const PinyinCombination = () => {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState<InitialGroup | "all">("group1");

  // 获取当前分组的声母和数据
  const currentInitials = selectedGroup === "all"
    ? INITIAL_GROUPS.flatMap(group => getGroupInitials(group))
    : getGroupInitials(selectedGroup);

  const currentData = selectedGroup === "all"
    ? INITIAL_GROUPS.reduce((acc, group) => {
        const groupData = getGroupData(group);
        for (const [final, items] of Object.entries(groupData)) {
          if (!acc[final]) {
            acc[final] = [];
          }
          acc[final].push(...items);
        }
        return acc;
      }, {} as CombinationData)
    : getGroupData(selectedGroup);

  // 扁平化数据为卡片列表
  const combinationList = useMemo(
    () => flattenCombinations(currentData),
    [currentData]
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                拼
              </span>
              <h1 className="text-2xl font-bold text-foreground">
                拼音组合学习
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* 声母分组 Tab 切换 */}
        <section className="animate-fade-in">
          <div className="bg-white rounded-xl p-1.5 border border-border shadow-sm">
            <div className="flex flex-wrap gap-1.5">
              {/* "所有"按钮 */}
              <button
                onClick={() => setSelectedGroup("all")}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${selectedGroup === "all"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                所有声母
              </button>

              {/* 6个声母组 */}
              {INITIAL_GROUPS.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${selectedGroup === group
                      ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-sm"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }
                  `}
                >
                  {INITIAL_GROUP_LABELS[group]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 简洁信息栏 */}
        <section className="animate-fade-in flex items-center justify-between text-sm" style={{ animationDelay: "0.05s" }}>
          <div className="text-gray-600">
            声母：<span className="font-bold text-emerald-600">{currentInitials.join("、")}</span>
            <span className="mx-3 text-gray-300">|</span>
            共 <span className="font-bold text-emerald-600">{combinationList.length}</span> 个组合
          </div>
          <div className="text-gray-500">
            点击卡片或例词听朗读
          </div>
        </section>

        {/* 卡片网格 */}
        <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {combinationList.map((item) => (
              <div
                key={`${item.initial}-${item.final}`}
                className="animate-fade-in"
                style={{
                  animationDelay: `${Math.min(combinationList.indexOf(item) * 0.02, 1)}s`
                }}
              >
                <CombinationCardNew item={item} />
              </div>
            ))}
          </div>

          {/* 空状态 */}
          {combinationList.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">该声母组暂无有效组合</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default PinyinCombination;
