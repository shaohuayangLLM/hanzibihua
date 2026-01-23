import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MathTestSession, MathTestResult } from '@/data/math/types';
import { getModuleById } from '@/data/math/modules';
import { QuestionRenderer } from '@/components/math/QuestionRenderer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const MathResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();
  const [session, setSession] = useState<MathTestSession | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('mathTestResult');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert answers array back to Map
        if (parsed.answers && Array.isArray(parsed.answers)) {
          parsed.answers = new Map(parsed.answers);
        }
        setSession(parsed);
      } catch (e) {
        console.error('Failed to parse session data:', e);
      }
    }
  }, [sessionId]);

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">结果未找到</h2>
          <Button onClick={() => navigate('/math')}>返回</Button>
        </div>
      </div>
    );
  }

  const module = getModuleById(session.moduleId);
  const isPractice = session.mode === 'practice';
  const correctCount = session.questions.filter((q, i) => {
    const answer = session.answers.get(q.id);
    return answer?.isCorrect ?? false;
  }).length;

  const timeSpent = session.endTime ? session.endTime - session.startTime : 0;
  const minutes = Math.floor(timeSpent / 60000);
  const seconds = Math.floor((timeSpent % 60000) / 1000);

  const handleRetry = () => {
    sessionStorage.removeItem('mathTestResult');
    navigate(`/math/module/${session.moduleId}`);
  };

  const handleHome = () => {
    sessionStorage.removeItem('mathTestResult');
    navigate('/math');
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-4 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleHome}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className={`w-8 h-8 rounded-lg ${module?.color ?? 'bg-gray-500'} flex items-center justify-center`}>
            <span className="text-lg">{module?.icon ?? '📊'}</span>
          </div>
          <span className="font-semibold text-foreground">{isPractice ? '练习完成' : '测试结果'}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Score Card - Only show in test mode */}
        {!isPractice && (
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2">
            <div className="text-center space-y-6">
              <div>
                <div className="text-6xl font-bold mb-2">
                  <span className={getScoreColor(session.score)}>{session.score}</span>
                  <span className="text-3xl text-muted-foreground">分</span>
                </div>
                <p className="text-lg text-muted-foreground">
                  {session.score >= 90 ? '太棒了！' : session.score >= 70 ? '做得很好！' : session.score >= 60 ? '继续努力！' : '加油！'}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-green-600">{correctCount}</div>
                  <div className="text-sm text-muted-foreground">正确</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-red-600">{session.questions.length - correctCount}</div>
                  <div className="text-sm text-muted-foreground">错误</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-blue-600">
                    {minutes > 0 ? `${minutes}:${seconds.toString().padStart(2, '0')}` : `${seconds}秒`}
                  </div>
                  <div className="text-sm text-muted-foreground">用时</div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Answer Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">{isPractice ? '题目回顾' : '答题详情'}</h3>
          <div className="space-y-4">
            {session.questions.map((question, index) => {
              const answer = session.answers.get(question.id);
              const isCorrect = answer?.isCorrect ?? false;
              const hasAnswer = !!answer;

              return (
                <Card key={question.id} className={`p-4 border-2 ${!isPractice && (isCorrect ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50')} ${isPractice ? 'border-border bg-card' : ''}`}>
                  <div className="flex items-start gap-3">
                    {!isPractice && (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                        {isCorrect ? <CheckCircle className="w-5 h-5 text-white" /> : <XCircle className="w-5 h-5 text-white" />}
                      </div>
                    )}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">第 {index + 1} 题</span>
                        {!isPractice && (
                          <>
                            {isCorrect ? (
                              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">正确</span>
                            ) : (
                              <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">错误</span>
                            )}
                          </>
                        )}
                      </div>

                      <QuestionRenderer
                        question={question}
                        showAnswer={true}
                        selectedAnswer={hasAnswer ? answer?.selected ?? null : null}
                      />

                      {!isPractice && !isCorrect && (
                        <div className="pt-2 border-t border-border/50">
                          <div className="text-sm text-muted-foreground">
                            你的答案：<span className="font-medium text-red-600">{answer?.selected ?? '未作答'}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <Button onClick={handleRetry} size="lg" variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            再来一次
          </Button>
          <Button onClick={handleHome} size="lg">
            <Home className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </div>
      </main>
    </div>
  );
};

export default MathResultPage;
