import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { G1V2_UNITS } from '@/data/math/grade1Vol2';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import BookOpen from 'lucide-react/dist/esm/icons/book-open';

const Grade1Vol2Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/math')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center shadow-button">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">一年级下册 · 1-3 单元复习</h1>
            <p className="text-sm text-muted-foreground">17 节小课，每节配讲解 + 互动练习</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">选择一个单元开始复习</h2>
          <p className="text-muted-foreground">建议按顺序：先打地基（单元 1），再玩图形（单元 2），最后整理数据（单元 3）。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {G1V2_UNITS.map((unit) => (
            <button
              key={unit.id}
              onClick={() => navigate(`/math/g1v2/unit/${unit.id}`)}
              className="group relative p-6 rounded-2xl border-2 border-border bg-card shadow-md hover:shadow-xl hover:scale-105 hover:border-primary/50 active:scale-95 transition-all duration-300 text-left"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-14 h-14 rounded-2xl ${unit.colorClass} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                  {unit.icon}
                </div>
                <div className="text-xs font-bold text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                  第 {unit.index} 单元
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1 text-foreground group-hover:text-primary transition-colors">
                {unit.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{unit.subtitle}</p>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{unit.description}</p>

              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <span className="text-xs text-muted-foreground">{unit.lessons.length} 节小课</span>
                <span className="text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                  开始 →
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 p-5 rounded-xl bg-amber-50 border border-amber-200">
          <h3 className="text-base font-bold text-amber-900 mb-2">💡 给爸爸妈妈的小提示</h3>
          <ul className="text-sm text-amber-800 space-y-1 leading-relaxed">
            <li>· 每节小课大约 3-5 分钟，建议每天完成 1-2 节，避免疲劳。</li>
            <li>· 答错时不要催，看看「展开提示」里的解题步骤，让孩子复述一遍。</li>
            <li>· 三个单元的进度独立，孩子可以选择自己感兴趣的先学。</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Grade1Vol2Home;
