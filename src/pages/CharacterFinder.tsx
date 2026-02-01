/**
 * 汉字查找页面
 * 支持按拼音和部首两种查找模式
 */

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  groupCharactersByPinyin,
  getPinyinInitials,
  getCharactersByPinyinInitial,
} from "@/data/characterFinder";
import { radicalDatabase, getRadicalInfo } from "@/data/radicalData";
import { CharacterDetails } from "@/components/CharacterDetails";
import { getCharacterInfo } from "@/data/characterInfo";
import type { CharacterInfo } from "@/data/types";

export default function CharacterFinder() {
  const navigate = useNavigate();

  // 状态管理
  const [activeTab, setActiveTab] = useState<'pinyin' | 'radical'>('pinyin');
  const [selectedInitial, setSelectedInitial] = useState<string>('');
  const [selectedRadical, setSelectedRadical] = useState<string>('');
  const [radicalSearch, setRadicalSearch] = useState<string>('');
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  // 获取按拼音分组的数据
  const pinyinGroups = useMemo(() => groupCharactersByPinyin(), []);
  const pinyinInitials = useMemo(() => getPinyinInitials(), []);

  // 获取按部首分组的数据（使用预定义的 radicalDatabase）
  const radicalGroups = useMemo(() => {
    return radicalDatabase.map(r => ({
      radical: r.radical,
      name: r.name,
      examples: r.examples,
    }));
  }, []);

  // 根据搜索过滤部首
  const filteredRadicals = useMemo(() => {
    if (!radicalSearch.trim()) {
      return radicalGroups;
    }
    const searchLower = radicalSearch.toLowerCase();
    return radicalGroups.filter(r =>
      r.name.toLowerCase().includes(searchLower) ||
      r.radical.includes(searchLower)
    );
  }, [radicalGroups, radicalSearch]);

  // 获取当前选中的汉字列表
  const currentCharacters = useMemo(() => {
    if (activeTab === 'pinyin' && selectedInitial) {
      return getCharactersByPinyinInitial(selectedInitial);
    }
    if (activeTab === 'radical' && selectedRadical) {
      // 使用 radicalDatabase 中预定义的例字
      const radicalInfo = radicalDatabase.find(r => r.radical === selectedRadical);
      if (radicalInfo) {
        // 解析例字字符串（用顿号分隔）
        // 对于缺失的字，创建基本信息对象，不要过滤掉
        return radicalInfo.examples
          .split('、')
          .map(char => getCharacterInfo(char) || {
            character: char,
            pinyin: '暂无',
            meaning: '此字暂未收录',
            strokeCount: 0,
            radicalInfo: `部首：${selectedRadical}`,
            words: [],
            sentences: []
          });
      }
    }
    return [];
  }, [activeTab, selectedInitial, selectedRadical]);

  // 选中的汉字详情
  const selectedCharacterInfo = useMemo(() => {
    if (!selectedCharacter) return null;
    return getCharacterInfo(selectedCharacter);
  }, [selectedCharacter]);

  // 获取当前选中的拼音列表（用于显示）
  const currentPinyinList = useMemo(() => {
    if (!selectedInitial) return [];
    const chars = getCharactersByPinyinInitial(selectedInitial);
    // 按拼音分组显示
    const grouped: Record<string, string[]> = {};
    chars.forEach(char => {
      if (char.pinyin !== '暂无') {
        if (!grouped[char.pinyin]) {
          grouped[char.pinyin] = [];
        }
        grouped[char.pinyin].push(char.character);
      }
    });
    return Object.entries(grouped).sort();
  }, [selectedInitial]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">汉字查找</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={(v) => {
          setActiveTab(v as 'pinyin' | 'radical');
          setSelectedInitial('');
          setSelectedRadical('');
        }}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="pinyin">按拼音查找</TabsTrigger>
            <TabsTrigger value="radical">按部首查找</TabsTrigger>
          </TabsList>

          {/* 按拼音查找 Tab */}
          <TabsContent value="pinyin" className="space-y-6">
            {/* 首字母选择器 */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">选择拼音首字母</h3>
              <div className="flex flex-wrap gap-2">
                {pinyinInitials.map(initial => (
                  <Button
                    key={initial}
                    variant={selectedInitial === initial ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedInitial(initial)}
                    className="min-w-[2.5rem]"
                  >
                    {initial}
                    <span className="ml-1 text-xs opacity-70">
                      ({pinyinGroups[initial].length})
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* 汉字网格 */}
            {selectedInitial && currentCharacters.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  拼音以 "{selectedInitial}" 开头的汉字
                </h3>

                {/* 按拼音分组显示 */}
                <div className="space-y-4">
                  {currentPinyinList.map(([pinyin, chars]) => (
                    <div key={pinyin} className="space-y-2">
                      <p className="text-sm text-muted-foreground px-1">{pinyin}</p>
                      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                        {chars.map(char => (
                          <button
                            key={char}
                            onClick={() => setSelectedCharacter(char)}
                            className="aspect-square rounded-lg bg-card border border-border hover:border-primary hover:shadow-md transition-all text-2xl font-medium hover:scale-105"
                          >
                            {char}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedInitial && currentCharacters.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>暂无拼音以 "{selectedInitial}" 开头的汉字</p>
              </div>
            )}

            {!selectedInitial && (
              <div className="text-center py-12 text-muted-foreground">
                <p>请选择一个拼音首字母开始查找</p>
              </div>
            )}
          </TabsContent>

          {/* 按部首查找 Tab */}
          <TabsContent value="radical" className="space-y-6">
            {/* 搜索框 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索部首名称（如：单人旁、提手旁）"
                value={radicalSearch}
                onChange={(e) => setRadicalSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* 部首网格 */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">
                选择部首 {filteredRadicals.length > 0 && `(${filteredRadicals.length}个)`}
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                {filteredRadicals.map(({ radical, name }) => (
                  <Card
                    key={radical}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedRadical === radical
                        ? 'border-primary shadow-md bg-primary/5'
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedRadical(radical)}
                  >
                    <CardContent className="p-3 text-center">
                      <div className="text-3xl font-bold text-foreground mb-1">{radical}</div>
                      <div className="text-xs text-muted-foreground truncate">{name}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 汉字网格 */}
            {selectedRadical && currentCharacters.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  部首 "{selectedRadical}" 的汉字
                </h3>
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                  {currentCharacters.map(char => (
                    <button
                      key={char.character}
                      onClick={() => setSelectedCharacter(char.character)}
                      className="aspect-square rounded-lg bg-card border border-border hover:border-primary hover:shadow-md transition-all text-2xl font-medium hover:scale-105"
                    >
                      {char.character}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedRadical && currentCharacters.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>暂无部首 "{selectedRadical}" 的汉字</p>
              </div>
            )}

            {!selectedRadical && filteredRadicals.length === 0 && radicalSearch && (
              <div className="text-center py-12 text-muted-foreground">
                <p>没有找到匹配的部首</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* 汉字详情弹窗 */}
      <Dialog open={!!selectedCharacter} onOpenChange={(open) => !open && setSelectedCharacter(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-brush">
              {selectedCharacter}
            </DialogTitle>
          </DialogHeader>
          {selectedCharacterInfo && (
            <CharacterDetails info={selectedCharacterInfo} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
