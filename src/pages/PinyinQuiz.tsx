import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateQuizQuestions, generateSpecialQuizQuestions } from "@/data/characterInfo";
import { QuizState, QuizAction, QuizAnswer, QuizMode } from "@/data/types";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { QuizStats } from "@/components/quiz/QuizStats";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import { QuizControls } from "@/components/quiz/QuizControls";
import { QuizModeSelector } from "@/components/quiz/QuizModeSelector";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

// Quiz reducer
const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'START':
      return {
        phase: 'playing',
        currentQuestion: 0,
        totalQuestions: action.questions.length,
        questions: action.questions,
        answers: [],
        correctCount: 0,
        streak: 0,
        maxStreak: 0,
      };

    case 'ANSWER':
      const isCorrect = action.answer.selectedAnswer === action.answer.correctAnswer;
      const newCorrectCount = state.correctCount + (isCorrect ? 1 : 0);
      const newStreak = isCorrect ? state.streak + 1 : 0;
      const newMaxStreak = Math.max(state.maxStreak, newStreak);

      return {
        ...state,
        answers: [...state.answers, action.answer],
        correctCount: newCorrectCount,
        streak: newStreak,
        maxStreak: newMaxStreak,
      };

    case 'NEXT':
      if (state.currentQuestion + 1 >= state.totalQuestions) {
        return {
          ...state,
          phase: 'finished',
        };
      }
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      };

    case 'RESTART':
      return {
        phase: 'idle',
        currentQuestion: 0,
        totalQuestions: 0,
        questions: [],
        answers: [],
        correctCount: 0,
        streak: 0,
        maxStreak: 0,
      };

    case 'EXIT':
      return {
        phase: 'idle',
        currentQuestion: 0,
        totalQuestions: 0,
        questions: [],
        answers: [],
        correctCount: 0,
        streak: 0,
        maxStreak: 0,
      };

    default:
      return state;
  }
};

const INITIAL_STATE: QuizState = {
  phase: 'idle',
  currentQuestion: 0,
  totalQuestions: 0,
  questions: [],
  answers: [],
  correctCount: 0,
  streak: 0,
  maxStreak: 0,
};

const QUESTION_COUNT = 10; // 每次测试的题目数量

const PinyinQuiz = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(quizReducer, INITIAL_STATE);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizMode, setQuizMode] = useState<QuizMode>('comprehensive');
  const [questionCount, setQuestionCount] = useState(10);

  const handleStart = () => {
    const questions = quizMode === 'comprehensive'
      ? generateQuizQuestions(questionCount, 'all')
      : generateSpecialQuizQuestions(quizMode, questionCount, 'all');

    dispatch({ type: 'START', questions });
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswer = (answer: string) => {
    if (showFeedback) return;

    const currentQ = state.questions[state.currentQuestion];
    const answerRecord: QuizAnswer = {
      character: currentQ.character,
      selectedAnswer: answer,
      correctAnswer: currentQ.correctPinyin,
      isCorrect: answer === currentQ.correctPinyin,
    };

    setSelectedAnswer(answer);
    setShowFeedback(true);
    dispatch({ type: 'ANSWER', answer: answerRecord });

    // 延迟后自动进入下一题
    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  const handleNext = () => {
    dispatch({ type: 'NEXT' });
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleRestart = () => {
    dispatch({ type: 'RESTART' });
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleExit = () => {
    navigate('/k12/');
  };

  const currentQuestion = state.questions[state.currentQuestion];
  const isCorrect = selectedAnswer !== null && selectedAnswer === currentQuestion?.correctPinyin;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-button">
            <Pencil className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            拼音测试
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Idle Phase - Start Screen */}
        {state.phase === 'idle' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
            <QuizModeSelector
              mode={quizMode}
              onModeChange={setQuizMode}
              questionCount={questionCount}
              onCountChange={setQuestionCount}
            />
            <div className="flex justify-center gap-3">
              <Button onClick={handleExit} variant="outline">
                返回主页
              </Button>
              <Button onClick={handleStart} size="lg" className="min-w-[120px]">
                开始训练
              </Button>
            </div>
          </div>
        )}

        {/* Playing Phase */}
        {state.phase === 'playing' && currentQuestion && (
          <div className="space-y-6 animate-fade-in">
            {/* Stats at top */}
            <QuizStats
              correct={state.correctCount}
              total={state.answers.length}
              streak={state.streak}
              maxStreak={state.maxStreak}
            />

            {/* Progress */}
            <QuizProgress
              current={state.currentQuestion + 1}
              total={state.totalQuestions}
            />

            {/* Question Card */}
            <QuestionCard
              character={currentQuestion.character}
              contextSentence={currentQuestion.contextSentence}
              options={currentQuestion.options}
              questionNumber={state.currentQuestion + 1}
              totalQuestions={state.totalQuestions}
              selectedAnswer={selectedAnswer}
              showFeedback={showFeedback}
              isCorrect={isCorrect}
              onAnswer={handleAnswer}
            />

            {/* Controls */}
            <QuizControls
              phase={state.phase}
              onStart={handleStart}
              onNext={handleNext}
              onRestart={handleRestart}
              onExit={handleExit}
              canGoNext={showFeedback}
            />
          </div>
        )}

        {/* Finished Phase */}
        {state.phase === 'finished' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">测试完成！</h2>
              <p className="text-muted-foreground">
                看看你表现得怎么样
              </p>
            </div>

            {/* Final Stats */}
            <QuizStats
              correct={state.correctCount}
              total={state.totalQuestions}
              streak={state.maxStreak}
              maxStreak={state.maxStreak}
            />

            {/* Controls */}
            <QuizControls
              phase={state.phase}
              onStart={handleStart}
              onNext={handleNext}
              onRestart={handleRestart}
              onExit={handleExit}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default PinyinQuiz;
