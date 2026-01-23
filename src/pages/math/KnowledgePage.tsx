import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getModuleKnowledge } from '@/data/math/knowledge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const KnowledgePage: React.FC = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams<{ moduleId: string }>();
  const knowledge = getModuleKnowledge(moduleId ?? '');

  if (!knowledge) {
    return (
      <div className="min-h-screen bg-background">
        <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/math')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">知识未找到</h1>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-8">
          <p className="text-muted-foreground text-center">
            该模块暂无知识讲解
          </p>
        </main>
      </div>
    );
  }

  const handleStartPractice = () => {
    navigate(`/math/module/${moduleId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/math/module/${moduleId}`)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">{knowledge.title}</h1>
              <p className="text-sm text-muted-foreground">{knowledge.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {knowledge.points.map((point, index) => (
            <Card key={index} className="p-6">
              {/* Title with number */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    {point.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {point.content}
                  </p>
                </div>
              </div>

              {/* Examples */}
              {point.examples && point.examples.length > 0 && (
                <div className="ml-14 mb-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    📝 举例说明：
                  </h3>
                  <div className="space-y-2">
                    {point.examples.map((example, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-secondary/50 border-l-4 border-primary"
                      >
                        <p className="text-sm text-foreground">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              {point.tips && (
                <div className="ml-14">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-sm font-medium">
                    💡 {point.tips}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleStartPractice}
            size="lg"
            className="min-w-[200px] shadow-button"
          >
            开始练习 →
          </Button>
        </div>
      </main>
    </div>
  );
};

export default KnowledgePage;
