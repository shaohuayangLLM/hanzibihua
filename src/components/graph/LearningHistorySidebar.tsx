/**
 * 学习足迹侧边栏组件
 *
 * 显示学习时间线、路径回溯、统计信息、智能推荐
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LearningRecord, LearningPath } from '@/types/graph';
import { Clock, TrendingUp, RotateCcw, Trash2, Eye, EyeOff } from 'lucide-react';
import { RecommendationCard } from './RecommendationCard';
import { PathBreadcrumb, PathStats } from './PathVisualization';
import { getRecentBasedRecommendations } from '@/utils/recommendationEngine';

interface LearningHistorySidebarProps {
  records: LearningRecord[];
  currentPath: string[];
  currentChar: string;
  onResetPath: () => void;
  onClearAll: () => void;
  onSelectCharacter: (char: string) => void;
  isPathMode: boolean;
  onTogglePathMode: () => void;
}

export const LearningHistorySidebar = ({
  records,
  currentPath,
  currentChar,
  onResetPath,
  onClearAll,
  onSelectCharacter,
  isPathMode,
  onTogglePathMode,
}: LearningHistorySidebarProps) => {
  // 获取最近10条记录
  const recentRecords = records.slice(-10).reverse();

  // 格式化时间
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // 统计信息
  const stats = {
    totalRecords: records.length,
    uniqueCharacters: new Set(records.map(r => r.character)).size,
    masteredCount: records.filter(r => r.mastered).length,
    currentPathLength: currentPath.length,
  };

  // 智能推荐
  const recommendations = getRecentBasedRecommendations(records, {
    maxRecommendations: 3,
  });

  return (
    <div className="space-y-4">
      {/* 智能推荐 */}
      <RecommendationCard
        recommendations={recommendations}
        onSelectCharacter={onSelectCharacter}
      />

      {/* 路径可视化 */}
      {currentPath.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4" />
                学习路径
              </CardTitle>
              <Button
                variant={isPathMode ? "default" : "outline"}
                size="sm"
                onClick={onTogglePathMode}
                className="h-7"
              >
                {isPathMode ? (
                  <>
                    <EyeOff className="h-3 w-3 mr-1" />
                    退出可视化
                  </>
                ) : (
                  <>
                    <Eye className="h-3 w-3 mr-1" />
                    查看完整路径
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <PathStats currentPath={currentPath} records={records} />
            <PathBreadcrumb currentPath={currentPath} />
            {isPathMode && (
              <p className="text-xs text-muted-foreground text-center pt-2 border-t">
                💡 路径上的汉字和连线已高亮显示
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* 学习足迹 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4" />
            学习足迹
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentRecords.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              暂无学习记录
            </p>
          ) : (
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {recentRecords.map((record, index) => (
                  <div
                    key={record.id}
                    className="flex items-start gap-2 text-sm p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <span className="text-muted-foreground text-xs mt-0.5 min-w-[45px]">
                      {formatTime(record.learnedAt)}
                    </span>
                    <div className="flex-1">
                      <span className="font-kaiti font-semibold">
                        {record.character}
                      </span>
                      {record.fromCharacter && (
                        <span className="text-muted-foreground text-xs ml-2">
                          ← {record.fromCharacter}
                        </span>
                      )}
                      {record.mastered && (
                        <span className="ml-2 text-xs text-green-600">✓已掌握</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* 统计信息 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            学习统计
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">总记录数</span>
            <span className="font-semibold">{stats.totalRecords}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">不同汉字</span>
            <span className="font-semibold">{stats.uniqueCharacters}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">已掌握</span>
            <span className="font-semibold text-green-600">{stats.masteredCount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">当前路径长度</span>
            <span className="font-semibold">{stats.currentPathLength}</span>
          </div>

          {records.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onResetPath}
                className="w-full"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                重置路径
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onClearAll}
                className="w-full"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                清空所有记录
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
