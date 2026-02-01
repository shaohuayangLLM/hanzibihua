import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Trophy, RotateCcw, Lightbulb, Target, ChevronLeft, ChevronRight, SkipForward } from "lucide-react";
import { FIND_DIFFERENT_LEVELS, getLevelsByDifficulty } from "@/data/findDifferentData";

type GameState = "menu" | "playing" | "result";

interface GridItem {
  char: string;
  isDifferent: boolean;
  isRevealed: boolean;
  index: number;
}

const FindDifferentGame = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>("menu");
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [levels, setLevels] = useState(FIND_DIFFERENT_LEVELS);
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isLevelCompleted, setIsLevelCompleted] = useState(false);

  // 洗牌算法 - Fisher-Yates
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 生成九宫格
  const generateGrid = useCallback((targetChar: string, differentChar: string) => {
    // 创建8个目标字 + 1个形近字
    const items: GridItem[] = [];
    for (let i = 0; i < 8; i++) {
      items.push({
        char: targetChar,
        isDifferent: false,
        isRevealed: false,
        index: i
      });
    }
    items.push({
      char: differentChar,
      isDifferent: true,
      isRevealed: false,
      index: 8
    });

    // 打乱顺序
    return shuffleArray(items).map((item, idx) => ({ ...item, index: idx }));
  }, []);

  // 加载关卡
  const loadLevel = useCallback((index: number) => {
    const level = levels[index];
    setGridItems(generateGrid(level.targetChar, level.differentChar));
    setShowHint(false);
    setCorrectAnswer("");
    setIsLevelCompleted(false);
  }, [levels, generateGrid]);

  // 开始游戏
  const startGame = (difficulty?: "easy" | "medium" | "hard") => {
    const selectedLevels = difficulty
      ? getLevelsByDifficulty(difficulty)
      : FIND_DIFFERENT_LEVELS;

    setLevels(selectedLevels);
    setCurrentLevelIndex(0);
    setScore(0);
    setMistakes(0);
    setShowHint(false);
    setCorrectAnswer("");
    setIsLevelCompleted(false);

    // 生成第一关
    loadLevel(0);
    setGameState("playing");
  };

  // 上一题
  const goToPreviousLevel = () => {
    if (currentLevelIndex > 0) {
      const newIndex = currentLevelIndex - 1;
      setCurrentLevelIndex(newIndex);
      loadLevel(newIndex);
    }
  };

  // 下一题
  const goToNextLevel = () => {
    if (currentLevelIndex < levels.length - 1) {
      const newIndex = currentLevelIndex + 1;
      setCurrentLevelIndex(newIndex);
      loadLevel(newIndex);
    } else {
      // 最后一关，进入结果页
      setGameState("result");
    }
  };

  // 处理点击
  const handleClick = (item: GridItem) => {
    if (item.isRevealed || isLevelCompleted) return;

    const newItems = gridItems.map(gridItem =>
      gridItem.index === item.index
        ? { ...gridItem, isRevealed: true }
        : gridItem
    );
    setGridItems(newItems);
    setIsLevelCompleted(true);

    if (item.isDifferent) {
      // 答对了
      setScore(prev => prev + 1);
      setCorrectAnswer(item.char);
    } else {
      // 答错了
      setMistakes(prev => prev + 1);
    }
  };

  // 重新开始当前关卡
  const restartLevel = () => {
    loadLevel(currentLevelIndex);
  };

  // 显示提示
  const toggleHint = () => {
    setShowHint(!showHint);
  };

  // 返回菜单
  const goToMenu = () => {
    setGameState("menu");
  };

  // 背景颜色
  const getGridBgColor = (item: GridItem) => {
    if (!item.isRevealed) return "bg-white dark:bg-slate-800";
    if (item.isDifferent) return "bg-green-100 dark:bg-green-900/30";
    return "bg-red-100 dark:bg-red-900/30";
  };

  const getGridBorderColor = (item: GridItem) => {
    if (!item.isRevealed) return "border-4 border-slate-200 dark:border-slate-600";
    if (item.isDifferent) return "border-4 border-green-500";
    return "border-4 border-red-500";
  };

  // 菜单界面
  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
        <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">🔍 找不同</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
          {/* 游戏说明 */}
          <Card className="p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur">
            <div className="text-center space-y-4">
              <div className="text-6xl">🎯</div>
              <h2 className="text-2xl font-bold">游戏规则</h2>
              <div className="text-lg space-y-2 text-muted-foreground">
                <p>九宫格中有 <span className="font-bold text-primary">8个一样的字</span> 和 <span className="font-bold text-primary">1个形近字</span></p>
                <p>找出那个 <span className="font-bold text-primary">不同的字</span> 就可以过关啦！</p>
                <p>看看你能找出多少个？</p>
              </div>
            </div>
          </Card>

          {/* 难度选择 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              className="p-8 cursor-pointer hover:scale-105 transition-all bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 hover:shadow-xl"
              onClick={() => startGame("easy")}
            >
              <div className="text-center space-y-4">
                <div className="text-6xl">😊</div>
                <h3 className="text-2xl font-bold">简单</h3>
                <p className="text-sm text-muted-foreground">差异明显，容易发现</p>
                <div className="text-sm font-medium">{getLevelsByDifficulty("easy").length} 关</div>
              </div>
            </Card>

            <Card
              className="p-8 cursor-pointer hover:scale-105 transition-all bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-yellow-900/30 dark:to-orange-800/30 hover:shadow-xl"
              onClick={() => startGame("medium")}
            >
              <div className="text-center space-y-4">
                <div className="text-6xl">🤔</div>
                <h3 className="text-2xl font-bold">中等</h3>
                <p className="text-sm text-muted-foreground">需要仔细观察</p>
                <div className="text-sm font-medium">{getLevelsByDifficulty("medium").length} 关</div>
              </div>
            </Card>

            <Card
              className="p-8 cursor-pointer hover:scale-105 transition-all bg-gradient-to-br from-red-100 to-purple-200 dark:from-red-900/30 dark:to-purple-800/30 hover:shadow-xl"
              onClick={() => startGame("hard")}
            >
              <div className="text-center space-y-4">
                <div className="text-6xl">😰</div>
                <h3 className="text-2xl font-bold">困难</h3>
                <p className="text-sm text-muted-foreground">非常相似，极具挑战</p>
                <div className="text-sm font-medium">{getLevelsByDifficulty("hard").length} 关</div>
              </div>
            </Card>
          </div>

          {/* 全部挑战 */}
          <Card
            className="p-8 cursor-pointer hover:scale-105 transition-all bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-800/30 hover:shadow-xl"
            onClick={() => startGame()}
          >
            <div className="text-center space-y-4">
              <div className="text-6xl">🏆</div>
              <h3 className="text-2xl font-bold">全部挑战</h3>
              <p className="text-sm text-muted-foreground">挑战所有 {FIND_DIFFERENT_LEVELS.length} 个关卡</p>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  // 游戏界面
  if (gameState === "playing") {
    const currentLevel = levels[currentLevelIndex];
    const progress = ((currentLevelIndex + 1) / levels.length) * 100;
    const canGoPrevious = currentLevelIndex > 0;
    const canGoNext = currentLevelIndex < levels.length - 1;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
        <header className="w-full py-4 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={goToMenu}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="text-lg font-bold">
                第 {currentLevelIndex + 1} / {levels.length} 关
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-bold">{score}</span>
              </div>
              {mistakes > 0 && (
                <div className="text-red-500">❌ {mistakes}</div>
              )}
            </div>
          </div>
          {/* 进度条 */}
          <div className="w-full h-2 bg-secondary mt-4">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          {/* 提示卡片 */}
          {showHint && (
            <Card className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-6 w-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <div className="font-bold text-yellow-800 dark:text-yellow-300 mb-1">
                    区分提示：
                  </div>
                  <div className="text-xl font-kaiti text-yellow-900 dark:text-yellow-200">
                    {currentLevel.hint}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* 答对了的提示 */}
          {correctAnswer && (
            <Card className="p-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-400 animate-bounce">
              <div className="flex items-center justify-center gap-3">
                <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                  太棒了！找对了！
                </div>
              </div>
            </Card>
          )}

          {/* 九宫格 */}
          <Card className="p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur">
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {gridItems.map((item) => (
                <button
                  key={item.index}
                  onClick={() => handleClick(item)}
                  disabled={item.isRevealed || isLevelCompleted}
                  className={`
                    aspect-square rounded-2xl flex items-center justify-center
                    font-kaiti transition-all duration-200
                    ${getGridBgColor(item)} ${getGridBorderColor(item)}
                    hover:scale-105 active:scale-95
                    ${(!item.isRevealed && !isLevelCompleted) ? 'hover:shadow-lg cursor-pointer' : 'cursor-not-allowed'}
                    shadow-md
                  `}
                  style={{ fontSize: "4rem" }}
                >
                  {item.char}
                </button>
              ))}
            </div>
          </Card>

          {/* 导航按钮 */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* 上一题 */}
            <Button
              onClick={goToPreviousLevel}
              variant="outline"
              size="lg"
              disabled={!canGoPrevious}
              className="gap-2"
            >
              <ChevronLeft className="h-5 w-5" />
              上一题
            </Button>

            {/* 重新开始 */}
            <Button
              onClick={restartLevel}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              重新开始
            </Button>

            {/* 提示 */}
            <Button
              onClick={toggleHint}
              variant={showHint ? "default" : "outline"}
              size="lg"
              className="gap-2"
            >
              <Lightbulb className="h-5 w-5" />
              {showHint ? "隐藏提示" : "显示提示"}
            </Button>

            {/* 下一题 */}
            <Button
              onClick={goToNextLevel}
              variant="default"
              size="lg"
              className="gap-2"
            >
              {canGoNext ? (
                <>
                  下一题
                  <ChevronRight className="h-5 w-5" />
                </>
              ) : (
                <>
                  查看结果
                  <Trophy className="h-5 w-5" />
                </>
              )}
            </Button>
          </div>

          {/* 难度指示 */}
          <div className="text-center">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              currentLevel.difficulty === "easy"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : currentLevel.difficulty === "medium"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            }`}>
              {currentLevel.difficulty === "easy" ? "😊 简单" :
               currentLevel.difficulty === "medium" ? "🤔 中等" : "😰 困难"}
            </span>
          </div>

          {/* 提示信息 */}
          <div className="text-center text-sm text-muted-foreground">
            💡 可以随时点击"上一题"或"下一题"切换关卡
          </div>
        </main>

        <footer className="w-full py-6 px-4 border-t border-border/50">
          <p className="text-center text-sm text-muted-foreground font-kaiti">
            💡 仔细观察每个字的细微差别
          </p>
        </footer>
      </div>
    );
  }

  // 结果界面
  if (gameState === "result") {
    const accuracy = levels.length > 0 ? Math.round((score / levels.length) * 100) : 0;

    let message = "";
    let emoji = "";
    if (accuracy === 100) {
      message = "太厉害了！全部正确！";
      emoji = "🏆";
    } else if (accuracy >= 80) {
      message = "很棒！继续保持！";
      emoji = "🌟";
    } else if (accuracy >= 60) {
      message = "不错哦，再接再厉！";
      emoji = "💪";
    } else {
      message = "加油，多练习会更好！";
      emoji = "🎯";
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
        <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goToMenu}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">游戏结束</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
          {/* 成绩卡片 */}
          <Card className="p-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur text-center">
            <div className="space-y-6">
              <div className="text-8xl">{emoji}</div>
              <h2 className="text-3xl font-bold">{message}</h2>

              <div className="grid grid-cols-3 gap-8 py-8">
                <div>
                  <div className="text-4xl font-bold text-primary">{score}</div>
                  <div className="text-sm text-muted-foreground">答对题数</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-600">{accuracy}%</div>
                  <div className="text-sm text-muted-foreground">正确率</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-red-600">{mistakes}</div>
                  <div className="text-sm text-muted-foreground">错误次数</div>
                </div>
              </div>

              <div className="text-lg text-muted-foreground">
                总共挑战了 <span className="font-bold">{levels.length}</span> 关
              </div>
            </div>
          </Card>

          {/* 按钮组 */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={goToMenu}
              size="lg"
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              返回菜单
            </Button>
            <Button
              onClick={() => startGame()}
              size="lg"
              className="gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              再玩一次
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return null;
};

export default FindDifferentGame;
