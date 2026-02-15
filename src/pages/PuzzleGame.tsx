import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Trophy,
  RotateCcw,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  BookOpen,
  Coins,
  Sparkles
} from "lucide-react";
import {
  VERIFIED_PUZZLE_QUESTIONS as PUZZLE_QUESTIONS,
  getPuzzleByDifficulty,
  getPuzzleByType,
  getRandomPuzzle,
  getPuzzleStats
} from "@/data/puzzleDataV2";
import { useWrongQuestions } from "@/hooks/useWrongQuestions";
import { useHintSystem } from "@/hooks/useHintSystem";
import { toast } from "sonner";

type GameState = "menu" | "playing" | "result" | "wrong-review";

interface QuestionResult {
  questionId: string;
  isCorrect: boolean;
  userAnswer: string;
  timeSpent: number;
  hintsUsed: number;
}

const PuzzleGame = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>("menu");
  const [questions, setQuestions] = useState(PUZZLE_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState(0);
  const [currentHint, setCurrentHint] = useState<string | null>(null);

  // 错题本系统
  const {
    wrongQuestions,
    addWrongQuestion,
    markAsMastered,
    clearAllWrongQuestions,
    getUnmasteredQuestions,
    stats: wrongStats,
  } = useWrongQuestions();

  // 提示系统
  const {
    thinkingCoins,
    useHint,
    rewardCoins,
    resetHintForQuestion,
    getHintLevelForQuestion,
  } = useHintSystem();

  // 开始游戏
  const startGame = (mode?: 'easy' | 'medium' | 'hard', type?: string) => {
    let selectedQuestions = PUZZLE_QUESTIONS;

    if (mode) {
      selectedQuestions = getPuzzleByDifficulty(mode);
    } else if (type === 'pattern') {
      selectedQuestions = getPuzzleByType('pattern');
    } else if (type === 'part-composition') {
      selectedQuestions = getPuzzleByType('part-composition');
    } else if (type === 'meaning') {
      selectedQuestions = getPuzzleByType('meaning');
    } else if (type === 'logic') {
      selectedQuestions = getPuzzleByType('logic');
    } else if (type === 'wrong-review') {
      // 错题复习模式
      const unmasteredWrong = getUnmasteredQuestions();
      if (unmasteredWrong.length === 0) {
        toast.info('暂无未掌握的错题！');
        return;
      }
      selectedQuestions = unmasteredWrong.map(wq => wq.question);
      toast.success(`开始复习 ${selectedQuestions.length} 道错题`);
    } else {
      // 随机10题
      selectedQuestions = getRandomPuzzle(10);
    }

    setQuestions(selectedQuestions);
    setCurrentIndex(0);
    setResults([]);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentHint(null);
    setGameState("playing");
  };

  // 开始错题复习
  const startWrongReview = useCallback(() => {
    startGame(undefined, 'wrong-review');
  }, [getUnmasteredQuestions]);

  // 加载题目
  const loadQuestion = useCallback((index: number) => {
    setCurrentIndex(index);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentHint(null);
  }, []);

  // 使用提示
  const handleUseHint = useCallback(() => {
    const currentQuestion = questions[currentIndex];
    const hint = useHint(currentQuestion.id, currentQuestion);

    if (hint) {
      setCurrentHint(hint.text);
      if (hint.cost > 0) {
        toast.info(`使用了 ${hint.cost} 个思考币`);
      }
    }
  }, [questions, currentIndex, useHint]);

  // 处理答案选择
  const handleAnswer = (answer: string) => {
    if (selectedAnswer !== null) return; // 已经回答过

    const currentQuestion = questions[currentIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    const timeSpent = Date.now() - startTime;
    const hintsUsed = getHintLevelForQuestion(currentQuestion.id) !== 'none' ? 1 : 0;

    setSelectedAnswer(answer);
    setShowExplanation(true);

    // 记录结果
    const result: QuestionResult = {
      questionId: currentQuestion.id,
      isCorrect,
      userAnswer: answer,
      timeSpent,
      hintsUsed,
    };

    setResults(prev => [...prev, result]);

    if (isCorrect) {
      toast.success("回答正确！");
      // 奖励思考币
      rewardCoins(hintsUsed === 0 ? 2 : 1); // 无提示答对奖励2个，使用提示奖励1个
    } else {
      toast.error("再想想看...");
      // 添加到错题本
      addWrongQuestion(currentQuestion, answer);
    }
  };

  // 上一题
  const goToPrevious = () => {
    if (currentIndex > 0) {
      loadQuestion(currentIndex - 1);
    }
  };

  // 下一题
  const goToNext = () => {
    if (currentIndex < questions.length - 1) {
      loadQuestion(currentIndex + 1);
    } else {
      // 最后一题，结束游戏
      setTotalTime(prev => prev + (Date.now() - startTime));
      setGameState("result");
    }
  };

  // 跳过当前题
  const skipQuestion = () => {
    // 记录跳过
    const currentQuestion = questions[currentIndex];
    const result: QuestionResult = {
      questionId: currentQuestion.id,
      isCorrect: false,
      userAnswer: "跳过",
      timeSpent: Date.now() - startTime
    };
    setResults(prev => [...prev, result]);

    goToNext();
  };

  // 返回菜单
  const goToMenu = () => {
    setGameState("menu");
  };

  // 菜单界面
  if (gameState === "menu") {
    const stats = getPuzzleStats();

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
        <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold">🤔 汉字推理题</h1>
            </div>
            {/* 思考币显示 */}
            <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-full">
              <Coins className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <span className="font-bold text-yellow-700 dark:text-yellow-300">{thinkingCoins}</span>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
          {/* 错题本卡片 */}
          {wrongStats.total > 0 && (
            <Card className="p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <BookOpen className="h-10 w-10 text-red-600 dark:text-red-400" />
                  <div>
                    <h3 className="text-xl font-bold">错题本</h3>
                    <p className="text-sm text-muted-foreground">
                      共 {wrongStats.total} 道错题，{wrongStats.unmastered} 道未掌握
                    </p>
                  </div>
                </div>
                <Button
                  onClick={startWrongReview}
                  variant="default"
                  size="lg"
                  className="gap-2"
                  disabled={wrongStats.unmastered === 0}
                >
                  <Sparkles className="h-5 w-5" />
                  开始复习
                </Button>
              </div>
            </Card>
          )}

          {/* 游戏说明 */}
          <Card className="p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur">
            <div className="text-center space-y-4">
              <div className="text-6xl">🧩</div>
              <h2 className="text-2xl font-bold">游戏规则</h2>
              <div className="text-lg space-y-2 text-muted-foreground">
                <p>观察汉字的规律和逻辑</p>
                <p>从四个选项中选择正确答案</p>
                <p>答对获得思考币，可用于提示</p>
                <p className="text-sm">💡 提示：答对无提示题奖励 2 币，使用提示奖励 1 币</p>
              </div>
              {/* 题库统计 */}
              <div className="text-sm text-muted-foreground pt-4 border-t">
                题库共 {stats.total} 题 | 简单 {stats.byDifficulty.easy} | 中等 {stats.byDifficulty.medium} | 困难 {stats.byDifficulty.hard}
              </div>
            </div>
          </Card>

          {/* 难度选择 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card
              className="p-8 cursor-pointer hover:scale-105 transition-all bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 hover:shadow-xl"
              onClick={() => startGame('easy')}
            >
              <div className="text-center space-y-4">
                <div className="text-6xl">😊</div>
                <h3 className="text-2xl font-bold">简单</h3>
                <p className="text-sm text-muted-foreground">简单规律，容易理解</p>
                <div className="text-sm font-medium">{getPuzzleByDifficulty('easy').length} 题</div>
              </div>
            </Card>

            <Card
              className="p-8 cursor-pointer hover:scale-105 transition-all bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-yellow-900/30 dark:to-orange-800/30 hover:shadow-xl"
              onClick={() => startGame('medium')}
            >
              <div className="text-center space-y-4">
                <div className="text-6xl">🤔</div>
                <h3 className="text-2xl font-bold">中等</h3>
                <p className="text-sm text-muted-foreground">部件组合，需要思考</p>
                <div className="text-sm font-medium">{getPuzzleByDifficulty('medium').length} 题</div>
              </div>
            </Card>

            <Card
              className="p-8 cursor-pointer hover:scale-105 transition-all bg-gradient-to-br from-red-100 to-purple-200 dark:from-red-900/30 dark:to-purple-800/30 hover:shadow-xl"
              onClick={() => startGame('hard')}
            >
              <div className="text-center space-y-4">
                <div className="text-6xl">😰</div>
                <h3 className="text-2xl font-bold">困难</h3>
                <p className="text-sm text-muted-foreground">逻辑推理，极具挑战</p>
                <div className="text-sm font-medium">{getPuzzleByDifficulty('hard').length} 题</div>
              </div>
            </Card>

            <Card
              className="p-8 cursor-pointer hover:scale-105 transition-all bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-800/30 hover:shadow-xl"
              onClick={() => startGame()}
            >
              <div className="text-center space-y-4">
                <div className="text-6xl">🎲</div>
                <h3 className="text-2xl font-bold">随机</h3>
                <p className="text-sm text-muted-foreground">随机10题混合测试</p>
              </div>
            </Card>
          </div>

          {/* 类型选择 */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">按类型挑战</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                onClick={() => startGame(undefined, 'pattern')}
                className="h-full py-4"
              >
                <div className="space-y-1">
                  <div className="text-lg">📊</div>
                  <div className="text-sm">规律题</div>
                </div>
              </Button>
              <Button
                variant="outline"
                onClick={() => startGame(undefined, 'part-composition')}
                className="h-full py-4"
              >
                <div className="space-y-1">
                  <div className="text-lg">🧩</div>
                  <div className="text-sm">组合题</div>
                </div>
              </Button>
              <Button
                variant="outline"
                onClick={() => startGame(undefined, 'meaning')}
                className="h-full py-4"
              >
                <div className="space-y-1">
                  <div className="text-lg">💭</div>
                  <div className="text-sm">语义题</div>
                </div>
              </Button>
              <Button
                variant="outline"
                onClick={() => startGame(undefined, 'logic')}
                className="h-full py-4"
              >
                <div className="space-y-1">
                  <div className="text-lg">🧠</div>
                  <div className="text-sm">逻辑题</div>
                </div>
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  // 游戏界面
  if (gameState === "playing") {
    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;
    const canGoPrevious = currentIndex > 0;
    const canGoNext = currentIndex < questions.length - 1;
    const hasAnswered = selectedAnswer !== null;

    // 在进入第一题时记录开始时间
    if (currentIndex === 0 && !hasAnswered && startTime === 0) {
      setStartTime(Date.now());
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
        <header className="w-full py-4 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={goToMenu}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="text-lg font-bold">
                第 {currentIndex + 1} / {questions.length} 题
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* 思考币显示 */}
              <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full">
                <Coins className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <span className="font-bold text-yellow-700 dark:text-yellow-300">{thinkingCoins}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                正确: {results.filter(r => r.isCorrect).length}/{results.length}
              </div>
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
          {/* 难度和类型标签 */}
          <div className="flex justify-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentQuestion.difficulty === "easy"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : currentQuestion.difficulty === "medium"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            }`}>
              {currentQuestion.difficulty === "easy" ? "😊 简单" :
               currentQuestion.difficulty === "medium" ? "🤔 中等" : "😰 困难"}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
              {currentQuestion.type === "pattern" ? "📊 规律" :
               currentQuestion.type === "part-composition" ? "🧩 组合" :
               currentQuestion.type === "meaning" ? "💭 语义" : "🧠 逻辑"}
            </span>
          </div>

          {/* 提示按钮（答题前可用） */}
          {!hasAnswered && (
            <div className="flex justify-center">
              <Button
                onClick={handleUseHint}
                variant="outline"
                size="sm"
                className="gap-2"
                disabled={thinkingCoins < 1 && getHintLevelForQuestion(currentQuestion.id) !== 'none'}
              >
                <Lightbulb className="h-4 w-4" />
                使用提示 {getHintLevelForQuestion(currentQuestion.id) !== 'none' && `(已用)`}
              </Button>
            </div>
          )}

          {/* 当前提示显示 */}
          {currentHint && (
            <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-300">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 dark:text-blue-200">{currentHint}</p>
              </div>
            </Card>
          )}

          {/* 问题卡片 */}
          <Card className="p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur">
            <div className="text-center space-y-6">
              {/* 题目 */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-2xl">
                <div className="text-2xl font-kaiti text-foreground">
                  {currentQuestion.question.left}{" "}
                  <span className="text-primary font-bold">{currentQuestion.question.operator}</span>
                  {currentQuestion.question.right && (
                    <>{currentQuestion.question.right}</>
                  )}
                  {" "}= ?
                </div>
                {currentQuestion.question.hint && (
                  <div className="text-sm text-muted-foreground mt-4">
                    💡 {currentQuestion.question.hint}
                  </div>
                )}
              </div>

              {/* 选项 */}
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === currentQuestion.correctAnswer;
                  const showResult = hasAnswered && isSelected;

                  let bgColor = "bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600";
                  let borderColor = "border-2 border-slate-200 dark:border-slate-600";

                  if (showResult) {
                    if (isSelected) {
                      bgColor = isCorrect
                        ? "bg-green-100 dark:bg-green-900/30"
                        : "bg-red-100 dark:bg-red-900/30";
                      borderColor = isCorrect
                        ? "border-2 border-green-500"
                        : "border-2 border-red-500";
                    } else if (!isSelected && isCorrect && selectedAnswer !== null) {
                      // 显示正确答案
                      bgColor = "bg-green-50 dark:bg-green-900/20";
                      borderColor = "border-2 border-green-300";
                    }
                  }

                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      disabled={hasAnswered}
                      className={`
                        p-6 rounded-2xl border-2 transition-all duration-200
                        font-kaiti text-4xl
                        ${bgColor} ${borderColor}
                        ${!hasAnswered ? 'hover:scale-105 active:scale-95 shadow-md' : 'shadow-sm'}
                        ${hasAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {option}
                        {showResult && isSelected && (
                          <span className="text-2xl">
                            {isCorrect ? <CheckCircle2 className="h-6 w-6 text-green-600" /> : <XCircle className="h-6 w-6 text-red-600" />}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 解析 */}
              {showExplanation && (
                <div className={`mt-6 p-6 rounded-2xl border-2 transition-all ${
                  selectedAnswer === currentQuestion.correctAnswer
                    ? "bg-green-50 dark:bg-green-900/20 border-green-300"
                    : "bg-red-50 dark:bg-red-900/20 border-red-300"
                }`}>
                  <div className="flex items-start gap-3">
                    <Lightbulb className={`h-6 w-6 flex-shrink-0 mt-1 ${
                      selectedAnswer === currentQuestion.correctAnswer
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`} />
                    <div className="flex-1">
                      <div className={`font-bold mb-2 ${
                        selectedAnswer === currentQuestion.correctAnswer
                          ? "text-green-800 dark:text-green-300"
                          : "text-red-800 dark:text-red-300"
                      }`}>
                        {selectedAnswer === currentQuestion.correctAnswer ? "✅ 回答正确！" : "❌ 回答错误"}
                      </div>
                      <div className="text-lg text-foreground">
                        <div className="mb-2">正确答案：<span className="font-bold text-primary">{currentQuestion.correctAnswer}</span></div>
                        <div className="text-muted-foreground">{currentQuestion.explanation}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* 导航按钮 */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* 上一题 */}
            <Button
              onClick={goToPrevious}
              variant="outline"
              size="lg"
              disabled={!canGoPrevious}
              className="gap-2"
            >
              <ChevronLeft className="h-5 w-5" />
              上一题
            </Button>

            {/* 跳过 */}
            {!hasAnswered && (
              <Button
                onClick={skipQuestion}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                跳过
              </Button>
            )}

            {/* 下一题 */}
            <Button
              onClick={goToNext}
              variant="default"
              size="lg"
              disabled={!hasAnswered}
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

          {/* 提示信息 */}
          <div className="text-center text-sm text-muted-foreground">
            💡 选择答案后查看解析，可随时切换题目
          </div>
        </main>
      </div>
    );
  }

  // 结果界面
  if (gameState === "result") {
    const correctCount = results.filter(r => r.isCorrect).length;
    const totalCount = results.length;
    const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    const skippedCount = results.filter(r => r.userAnswer === "跳过").length;
    const wrongCount = totalCount - correctCount - skippedCount;
    const hintsUsedCount = results.reduce((sum, r) => sum + r.hintsUsed, 0);

    // 分析表现
    let message = "";
    let emoji = "";
    if (accuracy === 100) {
      message = "太棒了！全部正确！你是汉字推理大师！";
      emoji = "🏆";
    } else if (accuracy >= 80) {
      message = "很优秀！继续保持！";
      emoji = "🌟";
    } else if (accuracy >= 60) {
      message = "还不错，再接再厉！";
      emoji = "💪";
    } else {
      message = "加油，多练习会更好！";
      emoji = "🎯";
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
        <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goToMenu}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">挑战完成</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
          {/* 成绩卡片 */}
          <Card className="p-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur text-center">
            <div className="space-y-6">
              <div className="text-8xl">{emoji}</div>
              <h2 className="text-3xl font-bold">{message}</h2>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-8">
                <div>
                  <div className="text-4xl font-bold text-primary">{correctCount}</div>
                  <div className="text-sm text-muted-foreground">答对</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-red-600">{wrongCount}</div>
                  <div className="text-sm text-muted-foreground">答错</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gray-600">{skippedCount}</div>
                  <div className="text-sm text-muted-foreground">跳过</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-600">{accuracy}%</div>
                  <div className="text-sm text-muted-foreground">正确率</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-yellow-600">{thinkingCoins}</div>
                  <div className="text-sm text-muted-foreground">思考币</div>
                </div>
              </div>

              <div className="text-lg text-muted-foreground space-y-2">
                <p>总共挑战了 <span className="font-bold">{totalCount}</span> 题</p>
                {hintsUsedCount > 0 && (
                  <p className="text-sm">使用了 <span className="font-bold">{hintsUsedCount}</span> 次提示</p>
                )}
              </div>
            </div>
          </Card>

          {/* 错题统计 */}
          {wrongCount > 0 && (
            <Card className="p-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-red-600 dark:text-red-400" />
                  <div>
                    <h3 className="text-lg font-bold">新增 {wrongCount} 道错题</h3>
                    <p className="text-sm text-muted-foreground">
                      错题已自动添加到错题本，可随时复习
                    </p>
                  </div>
                </div>
                <Button
                  onClick={startWrongReview}
                  variant="outline"
                  className="gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  立即复习
                </Button>
              </div>
            </Card>
          )}

          {/* 答题详情 */}
          <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur">
            <h3 className="text-xl font-bold mb-4">答题详情</h3>
            <div className="space-y-3">
              {results.map((result, index) => {
                const question = questions[index];
                return (
                  <div
                    key={result.questionId}
                    className={`p-4 rounded-lg border-2 ${
                      result.isCorrect
                        ? "bg-green-50 dark:bg-green-900/20 border-green-300"
                        : result.userAnswer === "跳过"
                        ? "bg-gray-50 dark:bg-gray-900/20 border-gray-300"
                        : "bg-red-50 dark:bg-red-900/20 border-red-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-mono text-sm text-muted-foreground mb-1">
                          第 {index + 1} 题
                        </div>
                        <div className="font-kaiti text-xl">
                          {question.question.left} {question.question.operator} {question.question.right || "?"} = ?
                        </div>
                      </div>
                      <div className="flex items-center gap-4 ml-4">
                        <div className="text-2xl">
                          {result.isCorrect ? "✅" : result.userAnswer === "跳过" ? "⏭️" : "❌"}
                        </div>
                        <div className="text-sm">
                          {result.userAnswer !== "跳过" && (
                            <span className={
                              result.isCorrect ? "text-green-600" : "text-red-600"
                            }>
                              你的答案: {result.userAnswer}
                            </span>
                          )}
                          {!result.isCorrect && (
                            <span className="text-green-600 ml-2">
                              正解: {question.correctAnswer}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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

export default PuzzleGame;
