import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check, X, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { QUANTITY_EXERCISES, QUANTITY_CATEGORIES, type QuantityWordExercise } from "@/data/quantityWordData";
import { toast } from "sonner";

type QuizState = "intro" | "playing" | "result";

interface AnswerState {
  selected: string;
  isCorrect: boolean | null;
}

const QuantityWordPractice = () => {
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
      return QUANTITY_EXERCISES;
    }
    return QUANTITY_EXERCISES.filter(ex => ex.category === selectedCategory);
  }, [selectedCategory]);

  const currentExercise = filteredExercises[currentIndex];
  const totalQuestions = filteredExercises.length;

  // 选择答案
  const selectAnswer = (quantity: string) => {
    if (answerState.isCorrect !== null) return; // 已作答

    const isCorrect = quantity === currentExercise.correct;
    setAnswerState({ selected: quantity, isCorrect });

    if (isCorrect) {
      toast.success("✅ 回答正确！");
      setScore(prev => prev + 1);
      setCompletedCount(prev => prev + 1);
    } else {
      toast.error(`❌ 不对哦，正确答案是"${currentExercise.correct}"`);
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
        {/* Header */}
        <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goHome}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">量词学习</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <Card className="p-8">
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">📊</div>
              <h2 className="text-3xl font-bold">量词填空练习</h2>

              <div className="text-left space-y-4 max-w-md mx-auto">
                <p className="text-muted-foreground">
                  量词是表示人、事物、动作的单位的词。在中文里，不同的名词要用不同的量词。
                </p>

                <div className="bg-secondary p-4 rounded-lg space-y-2">
                  <p className="font-semibold">练习规则：</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>共 {QUANTITY_EXERCISES.length} 道练习题</li>
                    <li>按分类练习，共有 8 个类别</li>
                    <li>每题 4 个选项，选择正确的量词</li>
                    <li>实时反馈，自动计分</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    例题演示：
                  </p>
                  <div className="text-center py-3">
                    <span className="text-2xl font-bold">一___ 鸟</span>
                  </div>
                  <p className="text-sm mt-2 font-semibold">
                    答案：<span className="text-green-600">一只鸟</span>
                  </p>
                  <p className="text-sm mt-1 text-muted-foreground">
                    其他常见的：一头牛、一条鱼、一匹马
                  </p>
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
      {/* Header */}
      <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goHome}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">量词学习</h1>
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
              {QUANTITY_CATEGORIES.map((category) => (
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
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {currentExercise.category}
            </div>

            {/* 名词展示 */}
            <div className="space-y-2">
              <div className="text-5xl font-bold text-foreground">
                {currentExercise.noun}
              </div>
              <div className="text-lg text-muted-foreground">
                {currentExercise.pinyin}
              </div>
            </div>

            {/* 问题 */}
            <div className="text-xl font-semibold">
              一___ {currentExercise.noun}
            </div>

            {/* 答案选项 */}
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
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
                    className={`h-16 text-lg font-semibold transition-all ${
                      showResult && isCorrectOption
                        ? "bg-green-500 hover:bg-green-500 text-white"
                        : showResult && isSelected && !isCorrectOption
                        ? "bg-red-500 hover:bg-red-500 text-white"
                        : ""
                    }`}
                  >
                    一{option} {currentExercise.noun}
                  </Button>
                );
              })}
            </div>

            {/* 反馈信息 */}
            {answerState.isCorrect !== null && (
              <div className={`flex items-center justify-center gap-2 text-base ${
                answerState.isCorrect ? "text-green-600" : "text-red-600"
              }`}>
                {answerState.isCorrect ? (
                  <>
                    <Check className="h-6 w-6" />
                    <span>回答正确！</span>
                  </>
                ) : (
                  <>
                    <X className="h-6 w-6" />
                    <span>
                      正确答案是：<strong>一{currentExercise.correct}</strong>
                    </span>
                  </>
                )}
              </div>
            )}

            {/* 例句展示 */}
            {answerState.isCorrect !== null && (
              <div className="bg-secondary/50 p-3 rounded-lg">
                <p className="text-sm font-semibold mb-2">例句：</p>
                <div className="space-y-0.5">
                  {currentExercise.examples.map((example, idx) => (
                    <p key={idx} className="text-base">
                      {example}
                    </p>
                  ))}
                </div>
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

        {/* 全部量词概览 */}
        <Card className="p-4">
          <h2 className="text-lg font-bold mb-3">全部量词练习</h2>
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
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
                <div className="text-sm font-medium">{exercise.noun}</div>
                <div className="text-[10px] text-muted-foreground">
                  {exercise.correct}
                </div>
              </button>
            ))}
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-4 border-t border-border/50 mt-auto">
        <p className="text-center text-xs text-muted-foreground font-kaiti">
          💡 提示：多读例句，记住常用的量词搭配
        </p>
      </footer>
    </div>
  );
};

export default QuantityWordPractice;
