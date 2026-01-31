/**
 * 声韵组合拼读练习页面
 * 声母 × 韵母 组合网格学习
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";
import { CombinationGrid } from "@/components/pinyin/combination";
import {
  getGroupData,
  getGroupInitials,
  INITIAL_GROUPS,
  INITIAL_GROUP_LABELS,
  type InitialGroup,
} from "@/data/pinyin/combinations";

// 所有韵母（按开口类型分组）
const ALL_FINALS = [
  "a", "o", "e", "i", "u", "ü",
  "ai", "ei", "ui", "ao", "ou", "iu", "ie", "üe", "er",
  "an", "en", "in", "un", "ün",
  "ang", "eng", "ing", "ong"
];

const PinyinCombination = () => {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState<InitialGroup>("group1");

  // 获取当前分组的声母和数据
  const currentInitials = getGroupInitials(selectedGroup);
  const currentData = getGroupData(selectedGroup);

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
                声韵组合练习
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
            点击卡片听朗读
          </div>
        </section>

        {/* 组合网格 */}
        <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CombinationGrid
            data={currentData}
            initials={currentInitials}
            finals={ALL_FINALS}
          />
        </section>
      </main>
    </div>
  );
};

export default PinyinCombination;
