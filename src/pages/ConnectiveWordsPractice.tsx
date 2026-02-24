import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle2, CircleX, Play, RotateCcw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { usePinyinSpeech } from "@/hooks/usePinyinSpeech";
import {
  CONNECTIVE_CATEGORIES,
  CONNECTIVE_LESSONS,
  CONNECTIVE_PRACTICE_QUESTIONS,
  type ConnectiveCategory,
  type ConnectiveLesson,
} from "@/data/connectiveWordsData";

type LearningState = "intro" | "learn" | "practice" | "result";
type LearnFilter = ConnectiveCategory | "全部";

interface AnswerRecord {
  selected: string;
  isCorrect: boolean;
}

interface PinyinAlignedTextProps {
  text: string;
  pinyin: string;
  charClassName?: string;
  pinyinClassName?: string;
}

const TOTAL_QUESTIONS = CONNECTIVE_PRACTICE_QUESTIONS.length;
const HANZI_REGEX = /[\u4e00-\u9fff]/;
const PUNCTUATION_REGEX = /[，。！？、；：,.!?;:]/;

const splitPinyinSyllables = (pinyin: string): string[] => {
  const normalized = pinyin.replace(/[，。！？、；：,.!?;:]/g, " ");
  return normalized
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
};

const PinyinAlignedText = ({
  text,
  pinyin,
  charClassName = "text-sm text-amber-950",
  pinyinClassName = "text-[10px] tracking-[-0.03em] text-sky-600",
}: PinyinAlignedTextProps) => {
  const syllables = splitPinyinSyllables(pinyin);
  let syllableIndex = 0;

  return (
    <span className="inline-flex max-w-full flex-wrap items-end gap-x-0.5 gap-y-1">
      {Array.from(text).map((char, index) => {
        const hasPinyin = HANZI_REGEX.test(char);
        const isPunctuation = PUNCTUATION_REGEX.test(char);
        const currentPinyin = hasPinyin ? syllables[syllableIndex++] ?? "" : "";
        const minWidthEm = hasPinyin ? 1.45 : isPunctuation ? 0.62 : 1;
        return (
          <span
            key={`${char}-${index}`}
            className="inline-flex flex-col items-center px-[0.02em]"
            style={{ minWidth: `${minWidthEm}em` }}
          >
            <span className={`h-4 leading-none whitespace-nowrap ${pinyinClassName}`}>{hasPinyin ? currentPinyin : "\u00A0"}</span>
            <span className={`leading-none ${charClassName}`}>{char}</span>
          </span>
        );
      })}
    </span>
  );
};

const shuffleOptions = (options: string[]): string[] => {
  const cloned = [...options];
  for (let index = cloned.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [cloned[index], cloned[randomIndex]] = [cloned[randomIndex], cloned[index]];
  }
  return cloned;
};

const buildShuffledOptionsMap = (): Record<string, string[]> => {
  return CONNECTIVE_PRACTICE_QUESTIONS.reduce<Record<string, string[]>>((accumulator, question) => {
    accumulator[question.id] = shuffleOptions(question.options);
    return accumulator;
  }, {});
};

const ConnectiveWordsPractice = () => {
  const navigate = useNavigate();
  const { speak, isLoading } = usePinyinSpeech({ rate: 0.85 });

  const [state, setState] = useState<LearningState>("intro");
  const [learnFilter, setLearnFilter] = useState<LearnFilter>("全部");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerRecord>>({});
  const [shuffledOptionsByQuestion, setShuffledOptionsByQuestion] = useState<Record<string, string[]>>(
    () => buildShuffledOptionsMap()
  );

  const lessonsByCategory = useMemo(() => {
    const grouped = new Map<ConnectiveCategory, ConnectiveLesson[]>();
    for (const category of CONNECTIVE_CATEGORIES) {
      grouped.set(category, []);
    }
    for (const lesson of CONNECTIVE_LESSONS) {
      const existed = grouped.get(lesson.category);
      if (existed) {
        existed.push(lesson);
      }
    }
    return grouped;
  }, []);

  const optionLessonMap = useMemo(() => {
    const mapping = new Map<string, ConnectiveLesson>();
    for (const lesson of CONNECTIVE_LESSONS) {
      const optionLabel = `${lesson.pairLeft}……${lesson.pairRight}……`;
      mapping.set(optionLabel, lesson);
    }
    return mapping;
  }, []);

  const displayedCategories = useMemo(
    () => (learnFilter === "全部" ? CONNECTIVE_CATEGORIES : [learnFilter]),
    [learnFilter]
  );

  const currentQuestion = CONNECTIVE_PRACTICE_QUESTIONS[questionIndex];
  const currentAnswer = answers[currentQuestion?.id ?? ""];
  const completedCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter((item) => item.isCorrect).length;
  const accuracy = completedCount > 0 ? Math.round((correctCount / completedCount) * 100) : 0;

  const wrongQuestions = useMemo(
    () =>
      CONNECTIVE_PRACTICE_QUESTIONS.filter((question) => {
        const answer = answers[question.id];
        return answer && !answer.isCorrect;
      }),
    [answers]
  );

  const startPractice = () => {
    setQuestionIndex(0);
    setAnswers({});
    setShuffledOptionsByQuestion(buildShuffledOptionsMap());
    setState("practice");
  };

  const selectOption = (option: string) => {
    if (!currentQuestion) return;
    if (answers[currentQuestion.id]) return;

    const isCorrect = option === currentQuestion.answer;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        selected: option,
        isCorrect,
      },
    }));
  };

  const goNext = () => {
    if (!currentQuestion) return;
    const answered = Boolean(answers[currentQuestion.id]);
    if (!answered) {
      toast.error("请先选择答案，再进入下一题。");
      return;
    }

    if (questionIndex < TOTAL_QUESTIONS - 1) {
      setQuestionIndex((prev) => prev + 1);
      return;
    }

    setState("result");
  };

  const goPrev = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    }
  };

  const playPair = (lesson: ConnectiveLesson) => {
    void speak(`${lesson.pairLeft}，${lesson.pairRight}`);
  };

  const playExample = (sentence: string) => {
    void speak(sentence);
  };

  const optionsForCurrentQuestion =
    shuffledOptionsByQuestion[currentQuestion?.id ?? ""] ?? currentQuestion?.options ?? [];

  if (state === "intro") {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f4efe4,_#f8f6f2_40%,_#ffffff_80%)]">
        <header className="w-full py-6 px-4 border-b border-amber-200/70 bg-white/80 backdrop-blur">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-amber-950">连接词学习</h1>
              <p className="text-sm text-amber-800/80">先理解语义关系，再通过练习巩固句子表达逻辑</p>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <Card className="p-6 md:p-8 border-amber-200/80 bg-white/85">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-900">
                  <BookOpen className="h-4 w-4" />
                  教学 + 练习
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-amber-950">连接词分区学习路径</h2>
                <p className="text-amber-900/80 leading-relaxed break-words">
                  本模块覆盖 {CONNECTIVE_LESSONS.length} 组高频连接词，按语义关系分类学习，随后完成 {TOTAL_QUESTIONS} 道单选填空练习。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {CONNECTIVE_CATEGORIES.map((category) => (
                  <div
                    key={category}
                    className="rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-amber-900"
                  >
                    <p className="font-semibold">{category}</p>
                    <p className="text-amber-900/70">
                      {lessonsByCategory.get(category)?.length ?? 0} 组连接词
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => setState("learn")}
                  className="sm:min-w-[180px] bg-amber-700 hover:bg-amber-700/90 text-white"
                >
                  开始学习
                </Button>
                <Button variant="outline" onClick={() => navigate("/")}>
                  返回主页
                </Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  if (state === "learn") {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f4efe4,_#f8f6f2_40%,_#ffffff_80%)]">
        <header className="w-full py-6 px-4 border-b border-amber-200/70 bg-white/80 backdrop-blur">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-amber-950">连接词学习卡</h1>
                <p className="text-sm text-amber-800/80">按语义关系浏览 {CONNECTIVE_LESSONS.length} 组固定搭配连接词</p>
              </div>
            </div>
            <div className="text-sm text-amber-900/70">{CONNECTIVE_LESSONS.length} 组内容</div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8 space-y-4">
          <Card className="p-4 border-amber-200/80 bg-white/85">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-amber-950">分类导航</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={learnFilter === "全部" ? "default" : "outline"}
                  onClick={() => setLearnFilter("全部")}
                  className={learnFilter === "全部" ? "bg-amber-700 hover:bg-amber-700 text-white" : ""}
                >
                  全部
                </Button>
                {CONNECTIVE_CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    size="sm"
                    variant={learnFilter === category ? "default" : "outline"}
                    onClick={() => setLearnFilter(category)}
                    className={learnFilter === category ? "bg-amber-700 hover:bg-amber-700 text-white" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          {displayedCategories.map((category) => (
            <section key={category} className="space-y-3">
              <h2 className="text-lg font-semibold text-amber-950">{category}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {(lessonsByCategory.get(category) ?? []).map((lesson) => (
                  <Card key={lesson.id} className="p-5 border-amber-200/80 bg-white/90">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-900">
                          <span className="inline-flex items-end gap-0.5">
                            <PinyinAlignedText
                              text={lesson.pairLeft}
                              pinyin={lesson.pairLeftPinyin}
                              charClassName="text-base font-semibold text-amber-900"
                              pinyinClassName="text-[10px] tracking-[-0.03em] font-medium text-sky-700"
                            />
                            <span className="inline-flex min-w-[1em] flex-col items-center">
                              <span className="h-4 text-[10px] leading-none text-sky-700">&nbsp;</span>
                              <span className="leading-none text-amber-700">……</span>
                            </span>
                            <PinyinAlignedText
                              text={lesson.pairRight}
                              pinyin={lesson.pairRightPinyin}
                              charClassName="text-base font-semibold text-amber-900"
                              pinyinClassName="text-[10px] tracking-[-0.03em] font-medium text-sky-700"
                            />
                            <span className="inline-flex min-w-[1em] flex-col items-center">
                              <span className="h-4 text-[10px] leading-none text-sky-700">&nbsp;</span>
                              <span className="leading-none text-amber-700">……</span>
                            </span>
                          </span>
                        </span>
                        <span className="text-xs text-amber-900/70">{lesson.category}</span>
                      </div>

                      <div className="space-y-2 text-amber-950">
                        <p className="text-sm leading-relaxed break-words">
                          <span className="font-semibold">作用：</span>
                          {lesson.meaning}
                        </p>
                        <p className="text-sm leading-relaxed break-words">
                          <span className="font-semibold">使用提示：</span>
                          {lesson.usageTip}
                        </p>
                        <p className="text-sm leading-relaxed break-words text-amber-900/85">
                          <span className="font-semibold">常见误用：</span>
                          {lesson.wrongUsage}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-amber-950">例句</p>
                        <ul className="space-y-1.5">
                          {lesson.examples.map((sentence, index) => (
                            <li key={sentence} className="grid grid-cols-[1fr_auto] items-start gap-2">
                              <div>
                                <PinyinAlignedText
                                  text={sentence}
                                  pinyin={lesson.examplePinyins[index]}
                                  charClassName="text-sm text-amber-900"
                                  pinyinClassName="text-[10px] tracking-[-0.03em] text-sky-600"
                                />
                              </div>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8 shrink-0 border-amber-300"
                                onClick={() => playExample(sentence)}
                                disabled={isLoading}
                                aria-label={`朗读例句：${sentence}`}
                              >
                                <Play className="h-3.5 w-3.5" />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => playPair(lesson)}
                          disabled={isLoading}
                          className="border-amber-300"
                        >
                          <Volume2 className="mr-1.5 h-3.5 w-3.5" />
                          读连接词
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => playExample(`${lesson.examples[0]} ${lesson.examples[1]}`)}
                          disabled={isLoading}
                          className="border-amber-300"
                        >
                          <Volume2 className="mr-1.5 h-3.5 w-3.5" />
                          读例句
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          ))}

          <Card className="p-4 border-amber-200/80 bg-white/85">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <p className="text-sm text-amber-900/80">学习完成后进入练习：{TOTAL_QUESTIONS} 题单选填空，即时反馈和解析。</p>
              <Button onClick={startPractice} className="bg-amber-700 hover:bg-amber-700/90 text-white">
                开始练习
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  if (state === "result") {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f4efe4,_#f8f6f2_40%,_#ffffff_80%)]">
        <header className="w-full py-6 px-4 border-b border-amber-200/70 bg-white/80 backdrop-blur">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight text-amber-950">练习结果</h1>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8 space-y-4">
          <Card className="p-6 md:p-8 border-amber-200/80 bg-white/90">
            <div className="space-y-5 text-center">
              <h2 className="text-3xl font-bold text-amber-950">{accuracy}%</h2>
              <p className="text-amber-900/80">
                正确 {correctCount} 题，共 {TOTAL_QUESTIONS} 题
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={startPractice} className="bg-amber-700 hover:bg-amber-700/90 text-white">
                  <RotateCcw className="mr-1.5 h-4 w-4" />
                  再练一次
                </Button>
                <Button variant="outline" onClick={() => setState("learn")}>
                  回到学习卡
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-amber-200/80 bg-white/90">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-amber-950">错题回看</h3>
              {wrongQuestions.length === 0 ? (
                <p className="text-sm text-emerald-700">本次练习没有错题。</p>
              ) : (
                <div className="space-y-3">
                  {wrongQuestions.map((question) => {
                    const answer = answers[question.id];
                    return (
                      <div
                        key={question.id}
                        className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 space-y-2"
                      >
                        <p className="text-sm font-medium text-amber-950 break-words">{question.sentence}</p>
                        <p className="text-sm text-red-600 break-words">你的答案：{answer?.selected ?? "未作答"}</p>
                        <p className="text-sm text-emerald-700 break-words">正确答案：{question.answer}</p>
                        <p className="text-sm text-amber-900/85 break-words">解析：{question.analysis}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f4efe4,_#f8f6f2_40%,_#ffffff_80%)]">
      <header className="w-full py-6 px-4 border-b border-amber-200/70 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-amber-950">连接词练习</h1>
              <p className="text-sm text-amber-800/80">单选填空：先看句子关系，再选连接词对</p>
            </div>
          </div>
          <div className="text-sm text-amber-900/70">
            {questionIndex + 1} / {TOTAL_QUESTIONS}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-4">
        <div className="h-2 rounded-full bg-amber-100">
          <div
            className="h-2 rounded-full bg-amber-600 transition-all"
            style={{ width: `${((questionIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}
          />
        </div>

        <Card className="p-6 border-amber-200/80 bg-white/90 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
              {currentQuestion.category}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-amber-900/70">在空格处选择最合适的连接词对：</p>
            <p className="text-xl font-semibold text-amber-950 leading-relaxed break-words">{currentQuestion.sentence}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {optionsForCurrentQuestion.map((option) => {
              const answer = answers[currentQuestion.id];
              const isSelected = answer?.selected === option;
              const isCorrectOption = currentQuestion.answer === option;
              const answered = Boolean(answer);
              const optionLesson = optionLessonMap.get(option);

              const optionStateClass = answered
                ? isCorrectOption
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                  : isSelected
                  ? "border-red-500 bg-red-50 text-red-700"
                  : "border-amber-200 bg-white text-amber-900"
                : "border-amber-200 bg-white text-amber-900 hover:bg-amber-50";

              return (
                <Button
                  key={option}
                  type="button"
                  variant="outline"
                  onClick={() => selectOption(option)}
                  disabled={answered}
                  className={`min-h-[48px] h-auto py-3 justify-start text-left whitespace-normal break-words leading-relaxed ${optionStateClass}`}
                >
                  {optionLesson ? (
                    <span className="inline-flex items-end gap-0.5">
                      <PinyinAlignedText
                        text={optionLesson.pairLeft}
                        pinyin={optionLesson.pairLeftPinyin}
                        charClassName="text-sm font-semibold text-current"
                        pinyinClassName="text-[10px] tracking-[-0.03em] font-medium text-sky-700"
                      />
                      <span className="inline-flex min-w-[1em] flex-col items-center">
                        <span className="h-4 text-[10px] leading-none text-sky-700">&nbsp;</span>
                        <span className="leading-none text-current">……</span>
                      </span>
                      <PinyinAlignedText
                        text={optionLesson.pairRight}
                        pinyin={optionLesson.pairRightPinyin}
                        charClassName="text-sm font-semibold text-current"
                        pinyinClassName="text-[10px] tracking-[-0.03em] font-medium text-sky-700"
                      />
                      <span className="inline-flex min-w-[1em] flex-col items-center">
                        <span className="h-4 text-[10px] leading-none text-sky-700">&nbsp;</span>
                        <span className="leading-none text-current">……</span>
                      </span>
                    </span>
                  ) : (
                    <span>{option}</span>
                  )}
                </Button>
              );
            })}
          </div>

          {currentAnswer && (
            <div
              className={`rounded-xl border p-4 space-y-2 ${
                currentAnswer.isCorrect
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-red-300 bg-red-50"
              }`}
            >
              <div className={`flex items-center gap-2 text-sm font-semibold ${currentAnswer.isCorrect ? "text-emerald-700" : "text-red-700"}`}>
                {currentAnswer.isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <CircleX className="h-4 w-4" />}
                {currentAnswer.isCorrect ? "回答正确" : "回答错误"}
              </div>
              {!currentAnswer.isCorrect && (
                <p className="text-sm text-red-700 break-words">正确答案：{currentQuestion.answer}</p>
              )}
              <p className="text-sm text-amber-900/85 break-words">解析：{currentQuestion.analysis}</p>
            </div>
          )}
        </Card>

        <div className="flex items-center justify-between gap-3">
          <Button variant="outline" onClick={goPrev} disabled={questionIndex === 0}>
            上一题
          </Button>
          <div className="text-sm text-amber-900/70">
            已作答 {completedCount} / {TOTAL_QUESTIONS}
          </div>
          <Button onClick={goNext} className="bg-amber-700 hover:bg-amber-700/90 text-white">
            {questionIndex === TOTAL_QUESTIONS - 1 ? "完成练习" : "下一题"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ConnectiveWordsPractice;
