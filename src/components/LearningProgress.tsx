import { LearningRecord } from "@/hooks/useLearningProgress";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Trophy, BookOpen, Star, Trash2, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface LearningProgressProps {
  stats: {
    totalLearned: number;
    totalMastered: number;
    totalReviews: number;
  };
  learnedCharacters: LearningRecord[];
  onSelectCharacter: (char: string) => void;
  onToggleMastered: (char: string) => void;
  onRemoveCharacter: (char: string) => void;
  onClearAll: () => void;
}

export const LearningProgress = ({
  stats,
  learnedCharacters,
  onSelectCharacter,
  onToggleMastered,
  onRemoveCharacter,
  onClearAll,
}: LearningProgressProps) => {
  return (
    <div className="space-y-4">
      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card-warm rounded-2xl p-4 text-center">
          <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.totalLearned}</p>
          <p className="text-xs text-muted-foreground">已学习</p>
        </div>
        <div className="card-warm rounded-2xl p-4 text-center">
          <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-accent/10 flex items-center justify-center">
            <Trophy className="h-5 w-5 text-accent" />
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.totalMastered}</p>
          <p className="text-xs text-muted-foreground">已掌握</p>
        </div>
        <div className="card-warm rounded-2xl p-4 text-center">
          <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-secondary flex items-center justify-center">
            <RotateCcw className="h-5 w-5 text-secondary-foreground" />
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.totalReviews}</p>
          <p className="text-xs text-muted-foreground">复习次数</p>
        </div>
      </div>

      {/* Learned characters list */}
      {learnedCharacters.length > 0 ? (
        <div className="card-warm rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">学习记录</h3>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4 mr-1" />
                  清空
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>确定要清空所有学习记录吗？</AlertDialogTitle>
                  <AlertDialogDescription>
                    这将删除所有已学习的汉字记录，此操作无法撤销。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction onClick={onClearAll}>确定清空</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <ScrollArea className="h-[300px]">
            <div className="space-y-2 pr-4">
              {learnedCharacters.map((record) => (
                <div
                  key={record.character}
                  className="flex items-center gap-3 p-3 bg-background/50 rounded-xl border border-border/50 group"
                >
                  <button
                    onClick={() => onSelectCharacter(record.character)}
                    className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl font-brush hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {record.character}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        学习于 {format(new Date(record.learnedAt), "M月d日", { locale: zhCN })}
                      </span>
                      <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                        复习 {record.reviewCount} 次
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${record.mastered ? "text-yellow-500" : "text-muted-foreground"}`}
                    onClick={() => onToggleMastered(record.character)}
                    title={record.mastered ? "取消掌握标记" : "标记为已掌握"}
                  >
                    <Star className={`h-4 w-4 ${record.mastered ? "fill-current" : ""}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
                    onClick={() => onRemoveCharacter(record.character)}
                    title="移除"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <ScrollBar />
          </ScrollArea>
        </div>
      ) : (
        <div className="card-warm rounded-2xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">还没有学习记录</p>
          <p className="text-sm text-muted-foreground mt-1">开始学习汉字吧！</p>
        </div>
      )}
    </div>
  );
};
