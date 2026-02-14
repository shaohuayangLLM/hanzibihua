import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, RotateCcw, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChoiceQuestionPanel } from "@/components/word-building/ChoiceQuestionPanel";
import { ContextQuestionPanel } from "@/components/word-building/ContextQuestionPanel";
import { DragQuestionPanel } from "@/components/word-building/DragQuestionPanel";
import { InputQuestionPanel } from "@/components/word-building/InputQuestionPanel";
import {
  getCorrectAnswerText,
  getWordBuildingQuestions,
  WORD_BUILDING_QUESTIONS_PUBLISHED,
} from "@/data/wordBuildingQuestions";
import type {
  GradeBand,
  WordBuildingMode,
  WordBuildingQuestion,
  WordBuildingWrongRecord,
} from "@/data/wordBuildingTypes";
import { GRADE_BANDS, GRADE_LABELS, MODE_LABELS } from "@/data/wordBuildingTypes";

type QuizState = "intro" | "playing" | "result";

interface AnswerRecord {
  selected: string;
  isCorrect: boolean;
}

const MODE_ORDER: WordBuildingMode[] = ["choice", "drag", "context", "input"];

const MODE_DESC: Record<WordBuildingMode, string> = {
  choice: "给定目标字，从 4 个词中选出正确组词",
  drag: "拖拽字卡，按正确字序组成词语",
  context: "根据句子语境，选择最合适词语填空",
  input: "根据提示主动输入词语，按词库精确匹配",
};

const WRONG_BOOK_STORAGE_KEY = "k12_word_building_wrongbook_v1";

const normalizeInput = (value: string): string => {
  const toHalfWidth = value.replace(/[\uFF01-\uFF5E]/g, char =>
    String.fromCharCode(char.charCodeAt(0) - 0xfee0)
  );
  return toHalfWidth.trim().toLowerCase();
};

const readWrongBook = (): WordBuildingWrongRecord[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(WRONG_BOOK_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as WordBuildingWrongRecord[]) : [];
  } catch {
    return [];
  }
};

const writeWrongBook = (items: WordBuildingWrongRecord[]): void => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(WRONG_BOOK_STORAGE_KEY, JSON.stringify(items));
};

const questionById = WORD_BUILDING_QUESTIONS_PUBLISHED.reduce<Record<string, WordBuildingQuestion>>(
  (acc, question) => {
    acc[question.id] = question;
    return acc;
  },
  {}
);

const WordBuildingPractice = () => {
  const navigate = useNavigate();

  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [selectedGrade, setSelectedGrade] = useState<GradeBand>("grade1-vol1");
  const [selectedMode, setSelectedMode] = useState<WordBuildingMode>("choice");

  const [sessionQuestionIds, setSessionQuestionIds] = useState<string[]>([]);
  const [answersById, setAnswersById] = useState<Record<string, AnswerRecord>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const [wrongBookCount, setWrongBookCount] = useState(0);

  useEffect(() => {
    setWrongBookCount(readWrongBook().length);
  }, []);

  const sessionQuestions = useMemo(
    () => sessionQuestionIds.map(id => questionById[id]).filter(Boolean),
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

  const availableCount = useMemo(
    () => getWordBuildingQuestions(selectedGrade, selectedMode).length,
    [selectedGrade, selectedMode]
  );

  const saveWrongRecord = (question: WordBuildingQuestion, selected: string, correct: string) => {
    const all = readWrongBook();
    const nextRecord: WordBuildingWrongRecord = {
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

  const checkAnswer = (question: WordBuildingQuestion, selected: string): boolean => {
    if (question.mode === "choice" || question.mode === "context") {
      return selected === question.correct;
    }

    if (question.mode === "drag") {
      return selected === question.correctOrder.join("");
    }

    const normalizedSelected = normalizeInput(selected);
    const normalizedCorrect = normalizeInput(question.acceptedAnswers[0] || "");
    return normalizedSelected === normalizedCorrect;
  };

  const startSession = (questionIds: string[]) => {
    setSessionQuestionIds(questionIds);
    setAnswersById({});
    setCurrentIndex(0);
    setQuizState("playing");
  };

  const startQuiz = () => {
    const pool = getWordBuildingQuestions(selectedGrade, selectedMode);
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
      [currentQuestion.id]: { selected, isCorrect },
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
    const pool = getWordBuildingQuestions(selectedGrade, selectedMode);
    startSession(pool.map(question => question.id));
  };

  const goHome = () => navigate("/");

  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  if (quizState === "intro") {
    return (
      <div className="min-h-screen bg-background">
        <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goHome}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">组词训练</h1>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-3xl font-bold text-center">词语组合能力训练</h2>
            <p className="text-muted-foreground text-center">
              共 {WORD_BUILDING_QUESTIONS_PUBLISHED.length} 题，覆盖一年级到二年级四种玩法。
            </p>
            <p className="text-sm text-muted-foreground text-center">
              历史错题记录：{wrongBookCount} 条
            </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
          </Card>

          <Card className="p-5 flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm text-muted-foreground">当前题量</p>
              <p className="text-2xl font-bold">{availableCount} 题</p>
            </div>
            <Button size="lg" onClick={startQuiz} disabled={availableCount === 0}>
              开始练习
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  if (quizState === "result") {
    const wrongItems = sessionQuestions.filter(question => {
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
            <h1 className="text-2xl font-bold">练习完成</h1>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8 space-y-5">
          <Card className="p-6 text-center space-y-4">
            <h2 className="text-3xl font-bold">本轮完成</h2>
            <p className="text-muted-foreground">
              {GRADE_LABELS[selectedGrade]} · {MODE_LABELS[selectedMode]}
            </p>
            <div className="py-2">
              <p className="text-5xl font-bold text-primary">{accuracy}%</p>
              <p className="text-sm text-muted-foreground mt-1">
                答对 {correctCount} / {answeredCount} 题
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Button onClick={retryWrongQuestions} disabled={wrongItems.length === 0}>
                错题重练
              </Button>
              <Button variant="outline" onClick={restartCurrentConfig}>
                再练一次
              </Button>
              <Button variant="outline" onClick={goHome}>
                返回首页
              </Button>
            </div>
          </Card>

          <Card className="p-6 space-y-3">
            <p className="font-semibold">错题回顾（{wrongItems.length}）</p>
            {wrongItems.length === 0 ? (
              <p className="text-sm text-muted-foreground">本轮没有错题。</p>
            ) : (
              <div className="space-y-2">
                {wrongItems.map(question => {
                  const answer = answersById[question.id];
                  return (
                    <div key={question.id} className="rounded-md border p-3 text-sm">
                      <p className="font-medium">{question.targetWord}（{MODE_LABELS[question.mode]}）</p>
                      <p className="text-muted-foreground mt-1">你的答案：{answer?.selected || "-"}</p>
                      <p className="text-green-700 mt-1">正确答案：{getCorrectAnswerText(question)}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </main>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background">
        <main className="max-w-xl mx-auto px-4 py-20">
          <Card className="p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold">当前没有可练习题目</h2>
            <Button onClick={() => setQuizState("intro")}>返回选择</Button>
          </Card>
        </main>
      </div>
    );
  }

  const isChecked = Boolean(currentAnswer);
  const isCorrect = currentAnswer?.isCorrect ?? false;

  return (
    <div className="min-h-screen bg-background">
      <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setQuizState("intro")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">组词训练</h1>
              <p className="text-xs text-muted-foreground">
                {GRADE_LABELS[selectedGrade]} · {MODE_LABELS[selectedMode]}
              </p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {currentIndex + 1} / {totalQuestions}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-4 space-y-4">
        <div className="w-full bg-secondary rounded-full h-1.5">
          <div
            className="bg-primary h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0}%` }}
          />
        </div>

        <Card className="p-6 space-y-4">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">{currentQuestion.category}</span>
            <span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-700">
              难度：{currentQuestion.difficulty}
            </span>
            <span className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-700">
              题型：{MODE_LABELS[currentQuestion.mode]}
            </span>
          </div>

          {currentQuestion.mode === "choice" && (
            <ChoiceQuestionPanel
              question={currentQuestion}
              selected={currentAnswer?.selected || ""}
              checked={isChecked}
              onSubmit={submitAnswer}
            />
          )}

          {currentQuestion.mode === "drag" && (
            <DragQuestionPanel
              question={currentQuestion}
              selected={currentAnswer?.selected || ""}
              checked={isChecked}
              onSubmit={submitAnswer}
            />
          )}

          {currentQuestion.mode === "context" && (
            <ContextQuestionPanel
              question={currentQuestion}
              selected={currentAnswer?.selected || ""}
              checked={isChecked}
              onSubmit={submitAnswer}
            />
          )}

          {currentQuestion.mode === "input" && (
            <InputQuestionPanel
              question={currentQuestion}
              selected={currentAnswer?.selected || ""}
              checked={isChecked}
              onSubmit={submitAnswer}
            />
          )}

          {isChecked && (
            <div className="rounded-lg border bg-secondary/40 p-4 space-y-2">
              <div className={`flex items-center gap-2 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                {isCorrect ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                <span className="font-semibold">{isCorrect ? "回答正确" : "回答错误"}</span>
              </div>
              {!isCorrect && (
                <p className="text-sm">
                  正确答案：<span className="font-semibold text-green-700">{getCorrectAnswerText(currentQuestion)}</span>
                </p>
              )}
              <p className="text-sm text-muted-foreground">解析：{currentQuestion.explanation}</p>
              {currentQuestion.mode === "context" && (
                <p className="text-sm text-muted-foreground">完整句：{currentQuestion.contextSentence}</p>
              )}
            </div>
          )}
        </Card>

        <div className="flex justify-center gap-3">
          <Button variant="outline" onClick={goPrevious} disabled={currentIndex === 0}>
            <ChevronLeft className="h-4 w-4 mr-1" /> 上一题
          </Button>
          <Button variant="outline" onClick={resetCurrentAnswer} disabled={!currentAnswer}>
            <RotateCcw className="h-4 w-4 mr-1" /> 重置
          </Button>
          <Button onClick={goNext}>
            {currentIndex === totalQuestions - 1 ? "完成" : "下一题"}
            {currentIndex !== totalQuestions - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default WordBuildingPractice;
