import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, RotateCcw, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChoicePanel } from "@/components/homophone-meaning/ChoicePanel";
import { ContextPanel } from "@/components/homophone-meaning/ContextPanel";
import { InputPanel } from "@/components/homophone-meaning/InputPanel";
import { RadarSummary } from "@/components/homophone-meaning/RadarSummary";
import {
  getCorrectAnswerText,
  getHomophoneMeaningQuestions,
  HOMOPHONE_MEANING_QUESTION_BY_ID,
  HOMOPHONE_MEANING_QUESTIONS_PUBLISHED,
} from "@/data/homophoneMeaningQuestions";
import type {
  GradeBand,
  HomophoneMode,
  HomophoneQuestion,
  HomophoneWrongRecord,
} from "@/data/homophoneMeaningTypes";
import { GRADE_BANDS, GRADE_LABELS, MODE_LABELS } from "@/data/homophoneMeaningTypes";

type QuizState = "intro" | "playing" | "result";

interface AnswerRecord {
  selected: string;
  isCorrect: boolean;
}

const MODE_ORDER: HomophoneMode[] = ["choice", "context", "input"];
const WRONG_BOOK_STORAGE_KEY = "k12_homophone_meaning_wrongbook_v1";

const MODE_DESC: Record<HomophoneMode, string> = {
  choice: "给出词义提示，从 4 个同音词中选择唯一正确答案",
  context: "根据句子语境，从 4 个同音词中选择最合适的一项",
  input: "根据读音与语义约束，主动输入唯一正确词语",
};

const normalizeInput = (value: string): string => {
  const toHalfWidth = value.replace(/[\uFF01-\uFF5E]/g, char =>
    String.fromCharCode(char.charCodeAt(0) - 0xfee0)
  );
  return toHalfWidth.trim().toLowerCase();
};

const readWrongBook = (): HomophoneWrongRecord[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(WRONG_BOOK_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as HomophoneWrongRecord[]) : [];
  } catch {
    return [];
  }
};

const writeWrongBook = (items: HomophoneWrongRecord[]): void => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(WRONG_BOOK_STORAGE_KEY, JSON.stringify(items));
};

const HomophoneMeaningPractice = () => {
  const navigate = useNavigate();

  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [selectedGrade, setSelectedGrade] = useState<GradeBand>("grade1-vol1");
  const [selectedMode, setSelectedMode] = useState<HomophoneMode>("choice");

  const [sessionQuestionIds, setSessionQuestionIds] = useState<string[]>([]);
  const [answersById, setAnswersById] = useState<Record<string, AnswerRecord>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wrongBookCount, setWrongBookCount] = useState(0);

  useEffect(() => {
    setWrongBookCount(readWrongBook().length);
  }, []);

  const sessionQuestions = useMemo(
    () => sessionQuestionIds.map(id => HOMOPHONE_MEANING_QUESTION_BY_ID[id]).filter(Boolean),
    [sessionQuestionIds]
  );

  const totalQuestions = sessionQuestions.length;

  useEffect(() => {
    if (totalQuestions === 0) {
      if (currentIndex !== 0) setCurrentIndex(0);
      return;
    }
    if (currentIndex >= totalQuestions) setCurrentIndex(totalQuestions - 1);
  }, [currentIndex, totalQuestions]);

  const currentQuestion = sessionQuestions[currentIndex];
  const currentAnswer = currentQuestion ? answersById[currentQuestion.id] : undefined;

  const answeredCount = Object.keys(answersById).length;
  const correctCount = Object.values(answersById).filter(answer => answer.isCorrect).length;
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  const modeAccuracy = useMemo(() => {
    const initial: Record<HomophoneMode, { total: number; correct: number }> = {
      choice: { total: 0, correct: 0 },
      context: { total: 0, correct: 0 },
      input: { total: 0, correct: 0 },
    };

    for (const question of sessionQuestions) {
      const answer = answersById[question.id];
      if (!answer) continue;
      initial[question.mode].total += 1;
      if (answer.isCorrect) {
        initial[question.mode].correct += 1;
      }
    }

    return {
      choice: initial.choice.total > 0 ? Math.round((initial.choice.correct / initial.choice.total) * 100) : 0,
      context:
        initial.context.total > 0 ? Math.round((initial.context.correct / initial.context.total) * 100) : 0,
      input: initial.input.total > 0 ? Math.round((initial.input.correct / initial.input.total) * 100) : 0,
    };
  }, [answersById, sessionQuestions]);

  const availableCount = useMemo(
    () => getHomophoneMeaningQuestions(selectedGrade, selectedMode).length,
    [selectedGrade, selectedMode]
  );

  const saveWrongRecord = (question: HomophoneQuestion, selected: string, correct: string) => {
    const all = readWrongBook();
    const nextRecord: HomophoneWrongRecord = {
      questionId: question.id,
      mode: question.mode,
      grade: question.grade,
      selected,
      correct,
      targetWord: question.targetWord,
      createdAt: new Date().toISOString(),
    };

    const filtered = all.filter(item => item.questionId !== question.id);
    const next = [nextRecord, ...filtered].slice(0, 300);
    writeWrongBook(next);
    setWrongBookCount(next.length);
  };

  const checkAnswer = (question: HomophoneQuestion, selected: string): boolean => {
    if (question.mode === "choice" || question.mode === "context") {
      return selected === question.correct;
    }

    const normalizedSelected = normalizeInput(selected);
    const normalizedCorrect = normalizeInput(question.acceptedAnswers[0] || "");
    return normalizedSelected === normalizedCorrect;
  };

  const startSession = (ids: string[]) => {
    setSessionQuestionIds(ids);
    setAnswersById({});
    setCurrentIndex(0);
    setQuizState("playing");
  };

  const startQuiz = () => {
    const pool = getHomophoneMeaningQuestions(selectedGrade, selectedMode);
    if (pool.length === 0) {
      toast.error("当前筛选下暂无可用题目");
      return;
    }

    startSession(pool.map(question => question.id));
  };

  const submitAnswer = (selected: string) => {
    if (!currentQuestion || currentAnswer) return;

    const isCorrect = checkAnswer(currentQuestion, selected);
    const correct = getCorrectAnswerText(currentQuestion);

    setAnswersById(prev => ({
      ...prev,
      [currentQuestion.id]: {
        selected,
        isCorrect,
      },
    }));

    if (isCorrect) {
      toast.success("✅ 回答正确！");
    } else {
      saveWrongRecord(currentQuestion, selected, correct);
      toast.error(`❌ 正确答案是“${correct}”`);
    }
  };

  const resetCurrentAnswer = () => {
    if (!currentQuestion) return;
    setAnswersById(prev => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
  };

  const goNext = () => {
    if (totalQuestions === 0) return;
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
      return;
    }
    setQuizState("result");
  };

  const goPrevious = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const retryWrongQuestions = () => {
    const wrongIds = sessionQuestions
      .filter(question => {
        const answer = answersById[question.id];
        return answer && !answer.isCorrect;
      })
      .map(question => question.id);

    if (wrongIds.length === 0) {
      toast.info("本轮没有错题，继续保持！");
      return;
    }

    startSession(wrongIds);
  };

  const restartCurrentConfig = () => {
    const pool = getHomophoneMeaningQuestions(selectedGrade, selectedMode);
    if (pool.length === 0) {
      toast.error("当前筛选下暂无可用题目");
      return;
    }
    startSession(pool.map(question => question.id));
  };

  const goHome = () => navigate("/");

  if (quizState === "intro") {
    return (
      <div className="min-h-screen bg-background">
        <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goHome}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">同音词辨义</h1>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-3xl font-bold text-center">同音不同义专项训练</h2>
            <p className="text-muted-foreground text-center">
              当前发布题量：{HOMOPHONE_MEANING_QUESTIONS_PUBLISHED.length} 题（先行首发集）
            </p>
            <p className="text-sm text-muted-foreground text-center">历史错题记录：{wrongBookCount} 条</p>
          </Card>

          <Card className="p-5 space-y-3">
            <p className="font-semibold">1. 选择年级</p>
            <div className="flex flex-wrap gap-2">
              {GRADE_BANDS.map(grade => (
                <Button
                  key={grade}
                  variant={selectedGrade === grade ? "default" : "outline"}
                  onClick={() => setSelectedGrade(grade)}
                >
                  {GRADE_LABELS[grade]}
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-5 space-y-3">
            <p className="font-semibold">2. 选择玩法</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {MODE_ORDER.map(mode => {
                const active = mode === selectedMode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSelectedMode(mode)}
                    className={`rounded-lg border p-4 text-left transition-colors ${
                      active ? "border-primary bg-primary/10" : "border-border hover:bg-secondary/50"
                    }`}
                  >
                    <p className="font-semibold">{MODE_LABELS[mode]}</p>
                    <p className="text-sm text-muted-foreground mt-1">{MODE_DESC[mode]}</p>
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-muted-foreground">当前题量：{availableCount} 题</p>
          </Card>

          <div className="flex justify-center">
            <Button size="lg" className="min-w-[220px]" onClick={startQuiz}>
              开始练习
            </Button>
          </div>
        </main>
      </div>
    );
  }

  if (quizState === "result") {
    const wrongList = sessionQuestions.filter(question => {
      const answer = answersById[question.id];
      return answer && !answer.isCorrect;
    });

    return (
      <div className="min-h-screen bg-background">
        <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goHome}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">同音词辨义</h1>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          <Card className="p-8 text-center space-y-4">
            <p className="text-5xl font-bold text-primary">{accuracy}%</p>
            <p className="text-muted-foreground">本轮正确率</p>
            <p className="text-sm text-muted-foreground">
              共 {answeredCount} 题作答，答对 {correctCount} 题。
            </p>
          </Card>

          <RadarSummary modeAccuracy={modeAccuracy} />

          <Card className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-semibold">错题回顾（{wrongList.length}）</p>
              <Button variant="outline" onClick={retryWrongQuestions} disabled={wrongList.length === 0}>
                错题重练
              </Button>
            </div>

            {wrongList.length === 0 ? (
              <p className="text-sm text-muted-foreground">本轮没有错题，继续保持。</p>
            ) : (
              <div className="space-y-2">
                {wrongList.map(question => {
                  const answer = answersById[question.id];
                  if (!answer) return null;

                  return (
                    <div key={question.id} className="rounded-md border p-3 text-sm space-y-1">
                      <p className="font-medium">
                        {MODE_LABELS[question.mode]} · {question.targetWord}（{question.targetPinyin}）
                      </p>
                      <p className="text-muted-foreground">
                        你的答案：{answer.selected || "未作答"}；正确答案：{getCorrectAnswerText(question)}
                      </p>
                      <p className="text-muted-foreground">解析：{question.explanation}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={restartCurrentConfig}>
              <RotateCcw className="mr-2 h-4 w-4" />
              再练一轮
            </Button>
            <Button variant="outline" onClick={() => setQuizState("intro")}>
              返回模式选择
            </Button>
          </div>
        </main>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background">
        <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goHome}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">同音词辨义</h1>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-12">
          <Card className="p-6 text-center space-y-3">
            <p className="font-semibold">当前暂无可用题目</p>
            <p className="text-sm text-muted-foreground">请返回介绍页重新选择年级和玩法。</p>
            <div>
              <Button variant="outline" onClick={() => setQuizState("intro")}>返回</Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goHome}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">同音词辨义</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            {currentIndex + 1} / {totalQuestions}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${totalQuestions ? ((currentIndex + 1) / totalQuestions) * 100 : 0}%` }}
          />
        </div>

        <Card className="p-5 space-y-2">
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-primary">
              {MODE_LABELS[currentQuestion.mode]}
            </span>
            <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-muted-foreground">
              {GRADE_LABELS[currentQuestion.grade]}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">考点：{currentQuestion.competency}</p>
        </Card>

        <Card className="p-5">
          {currentQuestion.mode === "choice" && (
            <ChoicePanel
              question={currentQuestion}
              selected={currentAnswer?.selected ?? ""}
              checked={Boolean(currentAnswer)}
              onSubmit={submitAnswer}
            />
          )}

          {currentQuestion.mode === "context" && (
            <ContextPanel
              question={currentQuestion}
              selected={currentAnswer?.selected ?? ""}
              checked={Boolean(currentAnswer)}
              onSubmit={submitAnswer}
            />
          )}

          {currentQuestion.mode === "input" && (
            <InputPanel
              question={currentQuestion}
              selected={currentAnswer?.selected ?? ""}
              checked={Boolean(currentAnswer)}
              onSubmit={submitAnswer}
            />
          )}
        </Card>

        {currentAnswer && (
          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              {currentAnswer.isCorrect ? (
                <>
                  <Check className="h-5 w-5 text-green-600" />
                  <p className="font-medium text-green-600">回答正确</p>
                </>
              ) : (
                <>
                  <X className="h-5 w-5 text-red-600" />
                  <p className="font-medium text-red-600">
                    回答错误，正确答案：{getCorrectAnswerText(currentQuestion)}
                  </p>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground">解析：{currentQuestion.explanation}</p>
            {currentQuestion.mode === "context" && (
              <p className="text-sm text-muted-foreground">参考句：{currentQuestion.contextSentence}</p>
            )}
          </Card>
        )}

        <div className="flex flex-wrap gap-2 justify-center">
          <Button variant="outline" onClick={goPrevious} disabled={currentIndex === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            上一题
          </Button>
          <Button variant="outline" onClick={resetCurrentAnswer} disabled={!currentAnswer}>
            <RotateCcw className="mr-2 h-4 w-4" />
            重置作答
          </Button>
          <Button onClick={goNext} disabled={!currentAnswer}>
            {currentIndex === totalQuestions - 1 ? "查看结果" : "下一题"}
            {currentIndex < totalQuestions - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default HomophoneMeaningPractice;
