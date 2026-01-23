import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getModuleById } from '@/data/math/modules';
import { getModuleKnowledge, KNOWLEDGE_ENABLED_MODULES } from '@/data/math/knowledge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, ClipboardCheck, Lightbulb } from 'lucide-react';

export const MathModulePage: React.FC = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams<{ moduleId: string }>();
  const module = getModuleById(moduleId ?? '');

  const [selectedMode, setSelectedMode] = useState<'practice' | 'test'>('practice');
  const [questionCount, setQuestionCount] = useState(10);

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

  if (module.disabled) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">🚧</div>
          <h2 className="text-2xl font-bold text-foreground">模块暂不可用</h2>
          <p className="text-muted-foreground">此模块正在开发中，敬请期待</p>
          <Button onClick={() => navigate('/math')}>返回首页</Button>
        </div>
      </div>
    );
  }

  const handleStart = () => {
    navigate(`/math/test/${moduleId}?mode=${selectedMode}&count=${questionCount}`);
  };

  const handleLearnKnowledge = () => {
    navigate(`/math/knowledge/${moduleId}`);
  };

  const hasKnowledge = moduleId && KNOWLEDGE_ENABLED_MODULES.includes(moduleId);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/math')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className={`w-10 h-10 rounded-xl ${module.color} flex items-center justify-center shadow-button`}>
            <span className="text-2xl">{module.icon}</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">
            {module.title}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Module Info */}
          <div className="text-center space-y-4">
            <div className={`inline-flex w-20 h-20 rounded-2xl ${module.color} items-center justify-center text-4xl shadow-lg`}>
              {module.icon}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{module.title}</h2>
              <p className="text-muted-foreground">{module.description}</p>
            </div>
          </div>

          {/* Mode Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">选择模式</h3>

            {/* Learn Knowledge Button - if available */}
            {hasKnowledge && (
              <button
                onClick={handleLearnKnowledge}
                className="w-full p-4 rounded-xl border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all"
              >
                <div className="flex items-center justify-center gap-3">
                  <Lightbulb className="w-6 h-6 text-primary" />
                  <div className="text-left">
                    <div className="font-semibold text-foreground">📚 先学习知识</div>
                    <div className="text-sm text-muted-foreground">
                      查看本模块的基础知识讲解
                    </div>
                  </div>
                </div>
              </button>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedMode('practice')}
                className={`
                  p-6 rounded-xl border-2 transition-all
                  ${selectedMode === 'practice'
                    ? 'border-primary bg-primary/10 shadow-md'
                    : 'border-border bg-card hover:border-primary/50'}
                `}
              >
                <BookOpen className={`w-8 h-8 mx-auto mb-3 ${selectedMode === 'practice' ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className="font-semibold text-foreground mb-1">练习模式</div>
                <div className="text-sm text-muted-foreground">
                  有提示，不计分
                </div>
              </button>

              <button
                onClick={() => setSelectedMode('test')}
                className={`
                  p-6 rounded-xl border-2 transition-all
                  ${selectedMode === 'test'
                    ? 'border-primary bg-primary/10 shadow-md'
                    : 'border-border bg-card hover:border-primary/50'}
                `}
              >
                <ClipboardCheck className={`w-8 h-8 mx-auto mb-3 ${selectedMode === 'test' ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className="font-semibold text-foreground mb-1">测试模式</div>
                <div className="text-sm text-muted-foreground">
                  无提示，计分统计
                </div>
              </button>
            </div>
          </div>

          {/* Question Count */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">题目数量</h3>
            <div className="flex justify-center gap-3">
              {[5, 10, 15, 20].map((count) => (
                <button
                  key={count}
                  onClick={() => setQuestionCount(count)}
                  className={`
                    w-16 h-16 rounded-xl border-2 text-lg font-semibold transition-all
                    ${questionCount === count
                      ? 'border-primary bg-primary text-primary-foreground shadow-md scale-105'
                      : 'border-border bg-card text-foreground hover:border-primary/50'}
                  `}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={handleStart}
              size="lg"
              className="min-w-[200px] text-lg"
            >
              开始{selectedMode === 'practice' ? '练习' : '测试'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MathModulePage;
