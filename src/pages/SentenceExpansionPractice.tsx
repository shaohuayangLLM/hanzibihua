import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check, X, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { SENTENCE_EXPANSIONS, EXPANSION_CATEGORIES, type SentenceExpansionExercise } from "@/data/sentenceExpansionData";
import { toast } from "sonner";

type QuizState = "intro" | "playing" | "result";

interface AnswerState {
  selected: string;
  isCorrect: boolean | null;
}

const SentenceExpansionPractice = () => {
  const navigate = useNavigate();
  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>({ selected: "", isCorrect: null });
  const [score, setScore] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("全部");

  // 根据分类筛选题目
  const filteredExercises = useMemo(() => {
    if (selectedCategory === "全部") {
      return SENTENCE_EXPANSIONS;
    }
    return SENTENCE_EXPANSIONS.filter(ex => ex.category === selectedCategory);
  }, [selectedCategory]);

  const currentExercise = filteredExercises[currentIndex];
  const totalQuestions = filteredExercises.length;

  // 选择答案
  const selectAnswer = (option: string) => {
    if (answerState.isCorrect !== null) return;

    const isCorrect = option === currentExercise.correct;
    setAnswerState({ selected: option, isCorrect });

    if (isCorrect) {
      toast.success("✅ 回答正确！");
      setScore(prev => prev + 1);
      setCompletedCount(prev => prev + 1);
    } else {
      const correctAnswer = currentExercise.fullExpansion || currentExercise.correct;
      toast.error(`❌ 不对哦，正确答案是"${correctAnswer}"`);
      setCompletedCount(prev => prev + 1);
    }
  };

  // 下一题
  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
      setAnswerState({ selected: "", isCorrect: null });
    } else {
      setQuizState("result");
    }
  };

  // 上一题
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setAnswerState({ selected: "", isCorrect: null });
    }
  };

  // 重置当前题目
  const resetCurrent = () => {
    if (!answerState.isCorrect) {
      setCompletedCount(prev => prev - 1);
    }
    setAnswerState({ selected: "", isCorrect: null });
  };

  // 开始练习
  const startQuiz = () => {
    setQuizState("playing");
    setCurrentIndex(0);
    setScore(0);
    setCompletedCount(0);
    setAnswerState({ selected: "", isCorrect: null });
  };

  // 返回主页
  const goHome = () => {
    navigate("/");
  };

  // 计算正确率
  const calculateScore = () => {
    return completedCount > 0 ? Math.round((score / completedCount) * 100) : 0;
  };

  // 介绍页面
  if (quizState === "intro") {
    return (
      <div className="min-h-screen bg-background">
        <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goHome}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">短句扩写</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <Card className="p-8">
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">✍️</div>
              <h2 className="text-3xl font-bold">短句扩写练习</h2>

              <div className="text-left space-y-4 max-w-md mx-auto">
                <p className="text-muted-foreground">
                  短句扩写就是给简单的句子加上更多的内容，让句子更丰富、更具体。
                </p>

                <div className="bg-secondary p-4 rounded-lg space-y-2">
                  <p className="font-semibold">练习规则：</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>共 {SENTENCE_EXPANSIONS.length} 道练习题</li>
                    <li>包含加上谁、怎么样、在哪里等多种扩写</li>
                    <li>可按分类筛选练习</li>
                    <li>每题 4 个选项，选择正确的扩写</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg space-y-2">
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    扩写示例：
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>基础句：</strong>小鸟飞。</p>
                    <p><strong>加上谁：</strong>小鸟飞 → <span className="text-green-600">快乐</span>的小鸟飞。</p>
                    <p><strong>加上在哪里：</strong>小鸟飞 → 小鸟在<span className="text-green-600">天上</span>飞。</p>
                    <p><strong>完整扩写：</strong>小鸟飞 → <span className="text-green-600">早晨</span><span className="text-green-600">快乐</span>的小鸟在<span className="text-green-600">天上</span>飞。</p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                onClick={startQuiz}
                className="min-w-[200px] text-lg"
              >
                开始练习
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  // 结果页面
  if (quizState === "result") {
    const finalScore = calculateScore();
    return (
      <div className="min-h-screen bg-background">
        <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goHome}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">练习完成</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <Card className="p-8">
            <div className="text-center space-y-6">
              <div className="text-6xl">🎉</div>
              <h2 className="text-3xl font-bold">太棒了！</h2>
              <p className="text-xl text-muted-foreground">
                你完成了 {completedCount} 道题目
              </p>

              <div className="py-8">
                <div className="text-5xl font-bold text-primary mb-2">
                  {finalScore}%
                </div>
                <p className="text-muted-foreground">正确率</p>
                <p className="text-sm text-muted-foreground mt-2">
                  答对 {score} / {completedCount} 题
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={startQuiz}>
                  <RotateCcw className="mr-2 h-5 w-5" />
                  再练一次
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={goHome}
                >
                  返回主页
                </Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  // 练习页面
  return (
    <div className="min-h-screen bg-background">
      <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goHome}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">短句扩写</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            {currentIndex + 1} / {totalQuestions}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-4 space-y-4">
        {/* 进度条 */}
        <div className="w-full bg-secondary rounded-full h-1.5">
          <div
            className="bg-primary h-1.5 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
            }}
          />
        </div>

        {/* 分类选择 */}
        {currentIndex === 0 && answerState.isCorrect === null && (
          <Card className="p-3">
            <div className="flex flex-wrap gap-2">
              {EXPANSION_CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </Card>
        )}

        {/* 当前题目 */}
        <Card className="p-6">
          <div className="text-center space-y-4">
            {/* 分类标签 */}
            <div className="flex justify-center gap-2">
              <div className="px-3 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {currentExercise.category}
              </div>
            </div>

            {/* 原句 */}
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">原句：</p>
              <p className="text-3xl font-bold text-foreground">
                {currentExercise.baseSentence}
              </p>
            </div>

            {/* 提示 */}
            {currentExercise.hint && (
              <div className="text-lg text-muted-foreground">
                💡 {currentExercise.hint}
              </div>
            )}

            {/* 问题 */}
            <div className="text-2xl font-semibold text-primary">
              请选择正确的扩写：
            </div>

            {/* 答案选项 */}
            <div className="space-y-3 max-w-2xl mx-auto">
              {currentExercise.options.map((option) => {
                const isSelected = answerState.selected === option;
                const showResult = answerState.isCorrect !== null;
                const isCorrectOption = option === currentExercise.correct;

                return (
                  <Button
                    key={option}
                    size="lg"
                    onClick={() => selectAnswer(option)}
                    disabled={showResult}
                    variant={showResult && isCorrectOption ? "default" : "outline"}
                    className={`w-full text-left justify-start h-auto py-4 px-6 transition-all ${
                      showResult && isCorrectOption
                        ? "bg-green-500 hover:bg-green-500 text-white"
                        : showResult && isSelected && !isCorrectOption
                        ? "bg-red-500 hover:bg-red-500 text-white"
                        : ""
                    }`}
                  >
                    <span className="text-lg">{option}</span>
                  </Button>
                );
              })}
            </div>

            {/* 正确答案显示 */}
            {answerState.isCorrect !== null && (
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  正确答案：
                </p>
                <p className="text-2xl font-bold text-primary">
                  {currentExercise.fullExpansion || currentExercise.correct}
                </p>
              </div>
            )}

            {/* 反馈信息 */}
            {answerState.isCorrect !== null && (
              <div className={`flex items-center justify-center gap-2 text-base ${
                answerState.isCorrect ? "text-green-600" : "text-red-600"
              }`}>
                {answerState.isCorrect ? (
                  <>
                    <Check className="h-5 w-5" />
                    <span>回答正确！</span>
                  </>
                ) : (
                  <>
                    <X className="h-5 w-5" />
                    <span>再想想看哦</span>
                  </>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <div className="flex gap-3">
            <Button
              onClick={handlePrevious}
              variant="outline"
              size="sm"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              上一题
            </Button>
            <Button
              onClick={resetCurrent}
              variant="outline"
              size="sm"
              disabled={answerState.isCorrect === null}
            >
              <RotateCcw className="mr-1 h-4 w-4" />
              重置
            </Button>
          </div>
          <Button
            onClick={handleNext}
            size="sm"
            variant={currentIndex === totalQuestions - 1 ? "default" : "outline"}
          >
            {currentIndex === totalQuestions - 1 ? "查看结果" : "下一题"}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* 全部题目概览 */}
        <Card className="p-4">
          <h2 className="text-lg font-bold mb-3">全部题目</h2>
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {filteredExercises.map((exercise, idx) => (
              <button
                key={exercise.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setAnswerState({ selected: "", isCorrect: null });
                }}
                className={`
                  p-2 rounded-lg border-2 transition-all text-center
                  ${
                    idx === currentIndex
                      ? 'border-primary bg-primary/10 scale-105'
                      : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                  }
                `}
              >
                <div className="text-xs font-medium">#{idx + 1}</div>
                <div className="text-[10px] text-muted-foreground truncate">
                  {exercise.category}
                </div>
              </button>
            ))}
          </div>
        </Card>
      </main>

      <footer className="w-full py-4 px-4 border-t border-border/50 mt-auto">
        <p className="text-center text-xs text-muted-foreground font-kaiti">
          💡 提示：给句子加上"谁、怎么样、在哪里、什么时候"，让句子更丰富
        </p>
      </footer>
    </div>
  );
};

export default SentenceExpansionPractice;
