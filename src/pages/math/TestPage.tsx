import React, { useReducer, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { generateQuestions } from '@/data/math/generators';
import { getModuleById } from '@/data/math/modules';
import { MathQuestion, MathTestMode, MathTestSession } from '@/data/math/types';
import { QuestionRenderer } from '@/components/math/QuestionRenderer';
import { TestTimer } from '@/components/math/TestTimer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, RotateCcw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Action types
type TestAction =
  | { type: 'START'; questions: MathQuestion[] }
  | { type: 'ANSWER'; questionId: string; answer: string | number; isCorrect: boolean }
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'FINISH' }
  | { type: 'RESTART' }
  | { type: 'EXIT' }
  | { type: 'ERROR' };

// State interface
interface TestState {
  phase: 'idle' | 'playing' | 'finished' | 'error';
  questions: MathQuestion[];
  currentQuestion: number;
  answers: Map<string, { selected: string | number; isCorrect: boolean }>;
  correctCount: number;
  startTime: number;
  endTime?: number;
}

// Reducer
const testReducer = (state: TestState, action: TestAction): TestState => {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        phase: 'playing',
        questions: action.questions,
        currentQuestion: 0,
        answers: new Map(),
        correctCount: 0,
        startTime: Date.now(),
      };

    case 'ANSWER':
      const newAnswers = new Map(state.answers);
      newAnswers.set(action.questionId, { selected: action.answer, isCorrect: action.isCorrect });
      const newCorrectCount = state.correctCount + (action.isCorrect ? 1 : 0);
      return {
        ...state,
        answers: newAnswers,
        correctCount: newCorrectCount,
      };

    case 'NEXT':
      if (state.currentQuestion + 1 >= state.questions.length) {
        return {
          ...state,
          phase: 'finished',
          endTime: Date.now(),
        };
      }
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      };

    case 'PREVIOUS':
      if (state.currentQuestion > 0) {
        return {
          ...state,
          currentQuestion: state.currentQuestion - 1,
        };
      }
      return state;

    case 'FINISH':
      return {
        ...state,
        phase: 'finished',
        endTime: Date.now(),
      };

    case 'RESTART':
      return {
        ...state,
        phase: 'idle',
        questions: [],
        currentQuestion: 0,
        answers: new Map(),
        correctCount: 0,
        startTime: 0,
      };

    case 'EXIT':
      return {
        ...state,
        phase: 'idle',
      };

    case 'ERROR':
      return {
        ...state,
        phase: 'error',
      };

    default:
      return state;
  }
};

const INITIAL_STATE: TestState = {
  phase: 'idle',
  questions: [],
  currentQuestion: 0,
  answers: new Map(),
  correctCount: 0,
  startTime: 0,
};

export const MathTestPage: React.FC = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams<{ moduleId: string }>();
  const [searchParams] = useSearchParams();
  const module = getModuleById(moduleId ?? '');

  const mode = (searchParams.get('mode') ?? 'practice') as MathTestMode;
  const questionCount = parseInt(searchParams.get('count') ?? '10', 10);

  const [state, dispatch] = useReducer(testReducer, INITIAL_STATE);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | number | null>(null);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const hasNavigated = useRef(false);
  const isInitialized = useRef(false);

  // Initialize test - only run once when component mounts
  useEffect(() => {
    if (!isInitialized.current && moduleId) {
      isInitialized.current = true;
      const questions = generateQuestions(moduleId, { count: questionCount });
      if (questions.length > 0) {
        dispatch({ type: 'START', questions });
      } else {
        dispatch({ type: 'ERROR' });
      }
    }
  }, [moduleId, questionCount]);

  // Reset navigation flag when starting a new test
  useEffect(() => {
    if (state.phase === 'playing') {
      hasNavigated.current = false;
    }
  }, [state.phase, state.questions.length]);

  if (!module) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">模块未找到</h2>
          <Button onClick={() => navigate('/math')}>返回</Button>
        </div>
      </div>
    );
  }

  const currentQuestion = state.questions[state.currentQuestion];
  const progress = state.questions.length > 0 ? ((state.currentQuestion + 1) / state.questions.length) * 100 : 0;

  const handleAnswer = useCallback((answer: string | number) => {
    if (showFeedback || !currentQuestion) return;

    const isCorrect = answer === currentQuestion.answer;
    setSelectedAnswer(answer);
    setShowFeedback(true);

    // Only record answers in test mode
    if (mode === 'test') {
      dispatch({
        type: 'ANSWER',
        questionId: currentQuestion.id,
        answer,
        isCorrect: isCorrect,
      });
    }
    // User manually clicks "Next" to proceed
  }, [showFeedback, currentQuestion, mode]);

  const handlePrevious = useCallback(() => {
    if (state.currentQuestion > 0) {
      dispatch({ type: 'PREVIOUS' });
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  }, [state.currentQuestion]);

  const handleNext = useCallback(() => {
    dispatch({ type: 'NEXT' });
    setSelectedAnswer(null);
    setShowFeedback(false);
  }, []);

  const handleFinish = useCallback(() => {
    dispatch({ type: 'FINISH' });
  }, []);

  const handleRestart = useCallback(() => {
    dispatch({ type: 'RESTART' });
    setSelectedAnswer(null);
    setShowFeedback(false);
  }, []);

  const handleExit = useCallback(() => {
    navigate('/math');
  }, [navigate]);

  // Navigate to result page when finished
  useEffect(() => {
    if (state.phase === 'finished' && state.endTime && !hasNavigated.current) {
      hasNavigated.current = true;

      // Convert Map to Array for serialization
      const answersArray = Array.from(state.answers.entries());

      const session: MathTestSession = {
        id: Date.now().toString(),
        moduleId: moduleId ?? '',
        mode,
        questions: state.questions,
        currentQuestion: state.currentQuestion,
        answers: state.answers,
        score: Math.round((state.correctCount / state.questions.length) * 100),
        completed: true,
        startTime: state.startTime,
        endTime: state.endTime,
      };

      // Store session data for result page - convert Map to Array
      const sessionData = {
        ...session,
        answers: answersArray,
      };
      sessionStorage.setItem('mathTestResult', JSON.stringify(sessionData));
      navigate(`/math/result/${session.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase, state.endTime]); // Only depend on phase and endTime

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-4 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleExit}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className={`w-8 h-8 rounded-lg ${module.color} flex items-center justify-center`}>
              <span className="text-lg">{module.icon}</span>
            </div>
            <span className="font-semibold text-foreground">{module.title}</span>
          </div>

          {state.phase === 'playing' && (
            <div className="flex items-center gap-4">
              <TestTimer startTime={state.startTime} isRunning={state.phase === 'playing'} />
              <span className="text-sm text-muted-foreground">
                {state.correctCount}/{state.answers.size}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {state.phase === 'idle' && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">正在加载题目...</p>
          </div>
        )}

        {state.phase === 'error' && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg mb-4">⚠️ 题目加载失败</p>
            <p className="text-muted-foreground mb-6">该模块暂时不可用，请稍后再试</p>
            <Button onClick={() => navigate('/math')}>返回首页</Button>
          </div>
        )}

        {state.phase === 'playing' && state.questions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">题目加载失败</p>
            <Button onClick={() => navigate('/math')}>返回</Button>
          </div>
        )}

        {state.phase === 'playing' && state.questions.length > 0 && currentQuestion && (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>第 {state.currentQuestion + 1} 题</span>
                <span>共 {state.questions.length} 题</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question */}
            <div className="bg-card rounded-2xl border-2 border-border p-6 shadow-lg">
              <QuestionRenderer
                question={currentQuestion}
                showAnswer={showFeedback}
                selectedAnswer={selectedAnswer}
                onAnswer={!showFeedback ? handleAnswer : undefined}
              />
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center mt-6 max-w-lg mx-auto">
              {/* 上一题按钮 */}
              <Button
                onClick={handlePrevious}
                disabled={state.currentQuestion === 0}
                variant="outline"
                size="lg"
                className="flex-1 mr-2"
              >
                上一题
              </Button>

              {/* 下一题或提交按钮 */}
              {state.currentQuestion + 1 >= state.questions.length ? (
                <Button onClick={handleFinish} size="lg" className="flex-1 ml-2">
                  提交
                </Button>
              ) : (
                <Button onClick={handleNext} size="lg" className="flex-1 ml-2">
                  下一题
                </Button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MathTestPage;
