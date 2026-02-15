import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check, X, ChevronLeft, ChevronRight, RotateCcw, Lightbulb, AlertTriangle } from "lucide-react";
import {
  COLLOCATION_CATEGORIES,
  COLLOCATION_CATEGORY_INFO,
} from "@/data/wordCollocationDataNew";
import {
  WORD_COLLOCATION_QUESTIONS_V2,
  WORD_COLLOCATION_QUESTIONS_V2_ALL,
} from "@/data/wordCollocationV2";
import type {
  CollocationAmbiguityFeedback,
  CollocationQuestionV2,
  OptionRationale,
} from "@/data/wordCollocationTypes";
import { toast } from "sonner";

type QuizState = "intro" | "playing" | "result";

interface AnswerState {
  selected: string;
  isCorrect: boolean | null;
}

interface QuestionResult {
  selected: string;
  isCorrect: boolean;
}

const AMBIGUITY_FEEDBACK_STORAGE_KEY = "k12_collocation_ambiguity_feedback";

const readAmbiguityFeedback = (): CollocationAmbiguityFeedback[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(AMBIGUITY_FEEDBACK_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CollocationAmbiguityFeedback[]) : [];
  } catch {
    return [];
  }
};

const writeAmbiguityFeedback = (items: CollocationAmbiguityFeedback[]): void => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AMBIGUITY_FEEDBACK_STORAGE_KEY, JSON.stringify(items));
};

const WordCollocationPractice = () => {
  const navigate = useNavigate();
  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersByExercise, setAnswersByExercise] = useState<Record<string, QuestionResult>>({});
  const [reportedAmbiguityIds, setReportedAmbiguityIds] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("全部");

  useEffect(() => {
    const feedbackItems = readAmbiguityFeedback();
    const reportedMap: Record<string, boolean> = {};
    for (const item of feedbackItems) {
      reportedMap[item.questionId] = true;
    }
    setReportedAmbiguityIds(reportedMap);
  }, []);

  // 根据分类和难度筛选题目
  const filteredExercises = useMemo(() => {
    let result = WORD_COLLOCATION_QUESTIONS_V2;

    if (selectedCategory !== "全部") {
      result = result.filter(ex => ex.category === selectedCategory);
    }

    if (selectedDifficulty !== "全部") {
      result = result.filter(ex => ex.difficulty === selectedDifficulty);
    }

    return result;
  }, [selectedCategory, selectedDifficulty]);

  const totalQuestions = filteredExercises.length;

  useEffect(() => {
    if (totalQuestions === 0) {
      if (currentIndex !== 0) {
        setCurrentIndex(0);
      }
      return;
    }

    if (currentIndex >= totalQuestions) {
      setCurrentIndex(0);
    }
  }, [currentIndex, totalQuestions]);

  const currentExercise = filteredExercises[currentIndex] as CollocationQuestionV2 | undefined;
  const answerState: AnswerState = currentExercise && answersByExercise[currentExercise.id]
    ? answersByExercise[currentExercise.id]
    : { selected: "", isCorrect: null };
  const completedCount = Object.keys(answersByExercise).length;
  const score = Object.values(answersByExercise).filter(result => result.isCorrect).length;

  // 选择答案
  const selectAnswer = (option: string) => {
    if (!currentExercise || answerState.isCorrect !== null) return;

    const isCorrect = option === currentExercise.correct;

    setAnswersByExercise(prev => ({
      ...prev,
      [currentExercise.id]: { selected: option, isCorrect },
    }));

    if (isCorrect) {
      toast.success("✅ 回答正确！");
    } else {
      toast.error(`❌ 不对哦，正确答案是"${currentExercise.correct}"`);
    }
  };

  // 下一题
  const handleNext = () => {
    if (totalQuestions === 0) return;

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setQuizState("result");
    }
  };

  // 上一题
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // 重置当前题目
  const resetCurrent = () => {
    if (!currentExercise) return;

    setAnswersByExercise(prev => {
      if (!prev[currentExercise.id]) return prev;
      const next = { ...prev };
      delete next[currentExercise.id];
      return next;
    });
  };

  // 开始练习
  const startQuiz = () => {
    setQuizState("playing");
    setCurrentIndex(0);
    setAnswersByExercise({});
  };

  // 返回主页
  const goHome = () => {
    navigate("/");
  };

  // 计算正确率
  const calculateScore = () => {
    return completedCount > 0 ? Math.round((score / completedCount) * 100) : 0;
  };

  const reportAmbiguity = () => {
    if (!currentExercise || answerState.selected === "") return;
    if (reportedAmbiguityIds[currentExercise.id]) return;

    const allFeedback = readAmbiguityFeedback();
    const alreadyExists = allFeedback.some(item => item.questionId === currentExercise.id);
    if (alreadyExists) {
      setReportedAmbiguityIds(prev => ({ ...prev, [currentExercise.id]: true }));
      toast.info("这道题已提交过歧义反馈");
      return;
    }

    const feedback: CollocationAmbiguityFeedback = {
      questionId: currentExercise.id,
      category: currentExercise.category,
      selectedOption: answerState.selected,
      correctOption: currentExercise.correct,
      stem: currentExercise.stem,
      createdAt: new Date().toISOString(),
    };
    writeAmbiguityFeedback([...allFeedback, feedback]);
    setReportedAmbiguityIds(prev => ({ ...prev, [currentExercise.id]: true }));
    toast.success("已记录歧义反馈，后续会用于题目修订");
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
            <h1 className="text-2xl font-bold">词语搭配</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <Card className="p-8">
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">🔗</div>
              <h2 className="text-3xl font-bold">词语搭配练习</h2>

              <div className="text-left space-y-4 max-w-md mx-auto">
                <p className="text-muted-foreground">
                  词语搭配就是把合适的词语放在一起，让句子更通顺、更优美。
                </p>

                <div className="bg-secondary p-4 rounded-lg space-y-2">
                  <p className="font-semibold">练习规则：</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>共 {WORD_COLLOCATION_QUESTIONS_V2.length} 道练习题（已通过去歧义校验）</li>
                    <li>已暂时下线 {WORD_COLLOCATION_QUESTIONS_V2_ALL.length - WORD_COLLOCATION_QUESTIONS_V2.length} 道高歧义风险题</li>
                    <li>包含 {COLLOCATION_CATEGORIES.length} 种搭配类型</li>
                    <li>可按分类筛选练习</li>
                    <li>每题 4 个选项，选择正确的搭配</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg space-y-2">
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    搭配类型：
                  </p>
                  <div className="space-y-1 text-sm">
                    {COLLOCATION_CATEGORIES.map((cat) => {
                      const info = COLLOCATION_CATEGORY_INFO[cat];
                      return (
                        <p key={cat}>
                          <strong>{info.name}：</strong>
                          <span className="text-muted-foreground">{info.example}</span>
                        </p>
                      );
                    })}
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

  if (!currentExercise) {
    return (
      <div className="min-h-screen bg-background">
        <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goHome}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">词语搭配</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <Card className="p-8 text-center space-y-6">
            <h2 className="text-2xl font-bold">当前筛选暂无题目</h2>
            <p className="text-muted-foreground">
              请调整筛选条件后再开始练习。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => {
                  setSelectedCategory("全部");
                  setSelectedDifficulty("全部");
                  setCurrentIndex(0);
                }}
              >
                重置筛选
              </Button>
              <Button variant="outline" onClick={goHome}>
                返回主页
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  const selectedRationale: OptionRationale | undefined =
    answerState.selected !== ""
      ? currentExercise.feedback.rationales.find(r => r.option === answerState.selected)
      : undefined;
  const correctRationale: OptionRationale | undefined =
    currentExercise.feedback.rationales.find(r => r.isCorrect);

  // 练习页面
  return (
    <div className="min-h-screen bg-background">
      <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goHome}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">词语搭配</h1>
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
              width: `${totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0}%`,
            }}
          />
        </div>

        {/* 分类和难度选择 */}
        {currentIndex === 0 && answerState.isCorrect === null && (
          <Card className="p-3 space-y-3">
            {/* 分类选择 */}
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-semibold">搭配类型：</p>
              <div className="flex flex-wrap gap-2">
                {COLLOCATION_CATEGORIES.map((category) => {
                  const info = COLLOCATION_CATEGORY_INFO[category];
                  return (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentIndex(0);
                      }}
                      title={info.description}
                    >
                      <span className="mr-1">{info.icon}</span>
                      {category}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* 难度选择 */}
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-semibold">难度等级：</p>
              <div className="flex flex-wrap gap-2">
                {["全部", "easy", "medium", "hard"].map((difficulty) => (
                  <Button
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedDifficulty(difficulty);
                      setCurrentIndex(0);
                    }}
                  >
                    {difficulty === "easy" && "🟢 简单"}
                    {difficulty === "medium" && "🟡 中等"}
                    {difficulty === "hard" && "🔴 困难"}
                    {difficulty === "全部" && "全部"}
                  </Button>
                ))}
              </div>
            </div>

            {/* 重置筛选 */}
            {(selectedCategory !== "全部" || selectedDifficulty !== "全部") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory("全部");
                  setSelectedDifficulty("全部");
                  setCurrentIndex(0);
                }}
                className="w-full"
              >
                重置筛选
              </Button>
            )}
          </Card>
        )}

        {/* 当前题目 */}
        <Card className="p-6">
          <div className="text-center space-y-4">
            {/* 分类标签和描述 */}
            <div className="mb-4">
              <div className="flex justify-center gap-2 mb-2">
                <div className="px-3 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {currentExercise.leftPos}
                </div>
                <div className="px-3 py-0.5 rounded-full bg-purple-500/10 text-purple-600 text-xs font-medium">
                  {currentExercise.category}
                </div>
                <div className="px-3 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 text-xs font-medium">
                  {currentExercise.quality.reviewStatus}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {currentExercise.categoryDescription}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                考点：{currentExercise.competency}
              </p>
            </div>

            {/* 问题 */}
            <div className="space-y-4">
              <div className="text-2xl text-muted-foreground">
                请选择正确的词语填空
              </div>
              <p className="text-sm text-muted-foreground">
                基于句子语境，选择唯一最合适的搭配
              </p>

              <div className="py-4 px-4 sm:px-6 rounded-lg bg-secondary/50 border text-left">
                <p className="text-xl sm:text-2xl font-semibold leading-relaxed">
                  {currentExercise.stem}
                </p>
                {currentExercise.answerMode === "word" && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    搭配提示：{currentExercise.left}{currentExercise.connector ?? ""}___
                  </p>
                )}
              </div>
            </div>

            {/* 答案选项 */}
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              {currentExercise.options.map((option) => {
                const isSelected = answerState.selected === option.text;
                const showResult = answerState.isCorrect !== null;
                const isCorrectOption = option.text === currentExercise.correct;
                const optionPhrase = `${currentExercise.left}${currentExercise.connector ?? ""}${option.text}`;
                const optionLabel =
                  currentExercise.answerMode === "word" ? option.text : optionPhrase;

                return (
                  <Button
                    key={option.text}
                    size="lg"
                    onClick={() => selectAnswer(option.text)}
                    disabled={showResult}
                    variant={showResult && isCorrectOption ? "default" : "outline"}
                    className={`h-20 text-xl font-semibold transition-all ${
                      showResult && isCorrectOption
                        ? "bg-green-500 hover:bg-green-500 text-white"
                        : showResult && isSelected && !isCorrectOption
                        ? "bg-red-500 hover:bg-red-500 text-white"
                        : ""
                    }`}
                  >
                    <span className="flex flex-col items-center">
                      <span>{optionLabel}</span>
                      <span className="text-xs text-muted-foreground font-normal">{option.pinyin}</span>
                    </span>
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
                <div className="text-2xl font-bold text-primary">
                  <span>{currentExercise.left}</span>
                  {currentExercise.connector && (
                    <span className="text-foreground px-1">{currentExercise.connector}</span>
                  )}
                  <span className="text-green-600 px-1">{currentExercise.correct}</span>
                  <span className="text-sm text-muted-foreground">({currentExercise.rightPos})</span>
                </div>
                {/* 搭配规律提示 */}
                {currentExercise.tip && (
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <Lightbulb className="inline h-4 w-4 mr-1" />
                      <span className="font-semibold">提示：</span>{currentExercise.tip}
                    </p>
                  </div>
                )}
                {/* 常见错误 */}
                {currentExercise.commonMistakes && currentExercise.commonMistakes.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground mb-1">
                      <AlertTriangle className="inline h-3 w-3 mr-1" />
                      常见错误：
                    </p>
                    <div className="space-y-1">
                      {currentExercise.commonMistakes.map((mistake, idx) => (
                        <p key={idx} className="text-sm text-red-600 font-medium">
                          {mistake}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
                <p className="mt-3 text-sm text-muted-foreground">
                  完整句子：{currentExercise.contextSentence}
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
                    <span>
                      正确答案是：<strong>{currentExercise.correct}</strong>
                    </span>
                  </>
                )}
              </div>
            )}

            {/* 错因解释 */}
            {answerState.isCorrect !== null && (
              <div className="w-full text-left bg-secondary/50 p-3 rounded-lg space-y-2">
                {selectedRationale && !selectedRationale.isCorrect && (
                  <div className="p-2 rounded bg-red-50 dark:bg-red-900/20">
                    <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                      你选择的“{selectedRationale.option}”为什么不对
                    </p>
                    <p className="text-sm text-muted-foreground">{selectedRationale.reason}</p>
                    {selectedRationale.contrastExample && (
                      <p className="text-xs text-muted-foreground mt-1">{selectedRationale.contrastExample}</p>
                    )}
                  </div>
                )}
                {correctRationale && (
                  <div className="p-2 rounded bg-green-50 dark:bg-green-900/20">
                    <p className="text-sm font-semibold text-green-700 dark:text-green-300">
                      正确答案“{correctRationale.option}”为什么对
                    </p>
                    <p className="text-sm text-muted-foreground">{correctRationale.reason}</p>
                  </div>
                )}
                <div className="pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={reportAmbiguity}
                    disabled={reportedAmbiguityIds[currentExercise.id]}
                  >
                    {reportedAmbiguityIds[currentExercise.id] ? "已提交歧义反馈" : "这题有歧义"}
                  </Button>
                </div>
              </div>
            )}

            {/* 例句展示 */}
            {answerState.isCorrect !== null && currentExercise.examples && currentExercise.examples.length > 0 && (
              <div className="bg-secondary/50 p-3 rounded-lg">
                <p className="text-xs font-semibold mb-1">
                  💡 例句
                  {currentExercise.difficulty && (
                    <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
                      currentExercise.difficulty === "easy" ? "bg-green-100 text-green-700" :
                      currentExercise.difficulty === "medium" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {currentExercise.difficulty === "easy" ? "简单" :
                       currentExercise.difficulty === "medium" ? "中等" : "困难"}
                    </span>
                  )}
                </p>
                <div className="space-y-2">
                  {currentExercise.examples.map((example, idx) => (
                    <p key={idx} className="text-base">
                      <span className="text-primary font-semibold">{example.highlight}</span>
                      <span className="text-muted-foreground">
                        {example.sentence.replace(example.highlight, "")}
                      </span>
                    </p>
                  ))}
                </div>
                {/* 标签 */}
                {currentExercise.tags && currentExercise.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {currentExercise.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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

        {/* 全部词语概览 */}
        <Card className="p-4">
          <h2 className="text-lg font-bold mb-3">全部词语 ({filteredExercises.length})</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {filteredExercises.map((exercise, idx) => (
              <button
                key={exercise.id}
                onClick={() => setCurrentIndex(idx)}
                className={`
                  p-2 rounded-lg border-2 transition-all text-center
                  ${
                    idx === currentIndex
                      ? "border-primary bg-primary/10 scale-105"
                      : "border-border hover:border-primary/50 hover:bg-secondary/50"
                  }
                `}
              >
                <div className="text-sm font-medium truncate">
                  {exercise.left}
                  {exercise.connector && <span className="text-muted-foreground text-xs">{exercise.connector}</span>}
                  <span className="text-primary font-semibold">{exercise.correct}</span>
                </div>
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
          💡 提示：多读例句，记住常用的词语搭配
        </p>
      </footer>
    </div>
  );
};

export default WordCollocationPractice;
