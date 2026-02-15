import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MATH_MODULES } from '@/data/math/modules';
import { Button } from '@/components/ui/button';
import Calculator from 'lucide-react/dist/esm/icons/calculator';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';

export const MathHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center shadow-button">
            <Calculator className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            数学学习中心
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            选择学习模块
          </h2>
          <p className="text-muted-foreground">
            按学习路径循序练习，逐步完成知识巩固
          </p>
        </div>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MATH_MODULES.map((module) => (
            <button
              key={module.id}
              onClick={() => !module.disabled && navigate(`/math/module/${module.id}`)}
              disabled={module.disabled}
              className={`
                group relative p-6 rounded-2xl border-2
                shadow-md transition-all duration-300 text-left
                ${module.disabled
                  ? 'bg-muted/30 border-muted opacity-50 cursor-not-allowed'
                  : 'bg-card border-border hover:shadow-xl hover:scale-105 hover:border-primary/50 active:scale-95'
                }
              `}
            >
              {/* Icon */}
              <div className={`
                w-16 h-16 rounded-2xl ${module.color} flex items-center justify-center
                text-3xl mb-4 shadow-lg transition-transform pointer-events-none
                ${module.disabled ? 'grayscale opacity-50' : 'group-hover:scale-110'}
              `}>
                {module.icon}
              </div>

              {/* Title */}
              <h3 className={`text-xl font-bold mb-2 transition-colors pointer-events-none ${
                module.disabled ? 'text-muted-foreground' : 'text-foreground group-hover:text-primary'
              }`}>
                {module.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 pointer-events-none">
                {module.description}
              </p>

              {/* Status indicator */}
              <div className={`flex items-center font-medium text-sm pointer-events-none ${
                module.disabled ? 'text-muted-foreground' : 'text-primary'
              }`}>
                {module.disabled ? (
                  <>🚧 暂不可用</>
                ) : (
                  <>
                    开始学习
                    <span className="ml-1 transform group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            💡 提示：先完成基础概念，再进行综合巩固
          </p>
        </div>
      </main>
    </div>
  );
};

export default MathHome;
