import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getUnitById } from '@/data/math/grade1Vol2';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';

const UnitPage: React.FC = () => {
  const navigate = useNavigate();
  const { unitId = '' } = useParams<{ unitId: string }>();
  const unit = getUnitById(unitId);

  if (!unit) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <p className="mb-4">没找到这个单元 :(</p>
          <Button onClick={() => navigate('/math/g1v2')}>返回复习首页</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/math/g1v2')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className={`w-12 h-12 rounded-xl ${unit.colorClass} flex items-center justify-center text-2xl shadow-button`}>
            {unit.icon}
          </div>
          <div>
            <div className="text-xs text-muted-foreground">第 {unit.index} 单元</div>
            <h1 className="text-xl font-bold text-foreground">{unit.title}</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className={`mb-6 p-4 rounded-xl border ${unit.accentClass}`}>
          <p className="text-sm text-foreground/80 leading-relaxed">{unit.description}</p>
        </div>

        <div className="space-y-3">
          {unit.lessons.map((lesson, idx) => (
            <button
              key={lesson.id}
              onClick={() => navigate(`/math/g1v2/lesson/${lesson.id}`)}
              className="w-full text-left p-5 rounded-2xl border-2 border-border bg-card hover:border-primary/50 hover:shadow-md active:scale-[0.99] transition-all flex items-center gap-4 group"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-foreground/60">
                {idx + 1}
              </div>
              <div className="flex-shrink-0 text-3xl">{lesson.icon}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{lesson.subtitle}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UnitPage;
