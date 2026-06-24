import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pencil from 'lucide-react/dist/esm/icons/pencil';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';
import Calculator from 'lucide-react/dist/esm/icons/calculator';
import { MATH_MODULES } from "@/data/math/modules";
import { CHINESE_MODULES } from "@/data/chinese/modules";

type Subject = 'chinese' | 'math';

const CHINESE_LEARNING_GROUPS: Array<{
  id: string;
  title: string;
  description: string;
  moduleIds: string[];
}> = [
  {
    id: "foundation",
    title: "基础识字",
    description: "先学读音、笔画、偏旁，搭建稳定识字基础",
    moduleIds: ["stroke-learning", "stroke-names", "pinyin-basics", "pinyin-combination", "radicals", "character-finder"],
  },
];

const CHINESE_MODULE_BY_ID = new Map(CHINESE_MODULES.map(module => [module.id, module] as const));
const CHINESE_GROUPED_MODULES = CHINESE_LEARNING_GROUPS.map(group => ({
  ...group,
  modules: group.moduleIds
    .map(id => CHINESE_MODULE_BY_ID.get(id))
    .filter((module): module is NonNullable<typeof module> => Boolean(module)),
}));

const MATH_LEARNING_GROUPS: Array<{
  id: string;
  title: string;
  description: string;
  moduleIds: string[];
}> = [
  {
    id: "core-concepts",
    title: "基础概念",
    description: "先建立数感与位置概念，夯实数学基础",
    moduleIds: ["place-value", "queue-position"],
  },
  {
    id: "operation-thinking",
    title: "运算理解",
    description: "从情境到算式，理解加减意义与运算过程",
    moduleIds: ["calculation"],
  },
  {
    id: "multiplication",
    title: "乘法运算",
    description: "从九九乘法表开始，理解并记忆乘法",
    moduleIds: ["multiplication"],
  },
  {
    id: "shape-geometry",
    title: "图形与几何",
    description: "认识平面图形，通过折叠和拼组理解图形变换",
    moduleIds: ["shapes"],
  },
];

const MATH_MODULE_BY_ID = new Map(MATH_MODULES.map(module => [module.id, module] as const));
const MATH_GROUPED_MODULES = MATH_LEARNING_GROUPS.map(group => ({
  ...group,
  modules: group.moduleIds
    .map(id => MATH_MODULE_BY_ID.get(id))
    .filter((module): module is NonNullable<typeof module> => Boolean(module)),
}));

const Index = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState<Subject>('chinese');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-4 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          {/* 一行：图标、标题和学科切换 */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-button ${
              subject === 'chinese' ? 'bg-primary' : 'bg-purple-500'
            }`}>
              {subject === 'chinese' ? (
                <Pencil className="h-5 w-5 text-primary-foreground" />
              ) : (
                <Calculator className="h-5 w-5 text-white" />
              )}
            </div>
            <h1 className="text-xl font-bold text-foreground">
              {subject === 'chinese' ? '语文学习中心' : '数学学习中心'}
            </h1>

            {/* Subject Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSubject('chinese')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  subject === 'chinese'
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                📖 语文
              </button>
              <button
                onClick={() => setSubject('math')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  subject === 'math'
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                🔢 数学
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Chinese Subject Content */}
        {subject === 'chinese' && (
          <>
            {/* Hero section */}
            <section className="text-center space-y-4 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                <Sparkles className="h-4 w-4 text-primary" />
                分模块循序学习
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                选择学习模块
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                从基础识字到语义辨析，逐步完成语文能力提升
              </p>
            </section>

            <div className="space-y-8 animate-fade-in">
              {CHINESE_GROUPED_MODULES.map(group => (
                <section key={group.id} className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{group.title}</h3>
                    <p className="text-sm text-muted-foreground">{group.description}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {group.modules.map((module) => (
                      <button
                        key={module.id}
                        onClick={() => !module.disabled && navigate(module.route)}
                        disabled={module.disabled}
                        className={`
                          group relative p-6 rounded-2xl border-2
                          shadow-md transition-all duration-300 text-left
                          ${module.disabled
                            ? 'bg-muted/30 border-muted opacity-50 cursor-not-allowed'
                            : 'bg-card border-border hover:shadow-xl hover:scale-105 hover:border-primary active:scale-95'
                          }
                        `}
                      >
                        <div className={`
                          w-16 h-16 rounded-2xl ${module.color} flex items-center justify-center
                          text-3xl mb-4 shadow-lg transition-transform pointer-events-none
                          ${module.disabled ? 'grayscale opacity-50' : 'group-hover:scale-110'}
                        `}>
                          {module.icon}
                        </div>

                        <h4 className={`text-xl font-bold mb-2 transition-colors pointer-events-none ${
                          module.disabled ? 'text-muted-foreground' : 'text-foreground group-hover:text-primary'
                        }`}>
                          {module.title}
                        </h4>

                        <p className="text-sm text-muted-foreground mb-4 pointer-events-none">
                          {module.description}
                        </p>

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
                </section>
              ))}
            </div>
          </>
        )}

        {/* Math Subject Content */}
        {subject === 'math' && (
          <>
            <section className="text-center space-y-4 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-purple-600" />
                分模块循序学习
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                选择学习模块
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                先打基础，再做综合应用，提升数学理解与表达
              </p>
            </section>

            <div className="space-y-8 animate-fade-in">
              {MATH_GROUPED_MODULES.map(group => (
                <section key={group.id} className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{group.title}</h3>
                    <p className="text-sm text-muted-foreground">{group.description}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {group.modules.map((module) => (
                      <button
                        key={module.id}
                        onClick={() => !module.disabled && navigate(module.id === 'shapes' ? '/math/shapes' : module.id === 'multiplication' ? '/math/multiplication' : `/math/module/${module.id}`)}
                        disabled={module.disabled}
                        className={`
                          group relative p-6 rounded-2xl border-2
                          shadow-md transition-all duration-300 text-left
                          ${module.disabled
                            ? 'bg-muted/30 border-muted opacity-50 cursor-not-allowed'
                            : 'bg-card border-border hover:shadow-xl hover:scale-105 hover:border-purple-400 active:scale-95'
                          }
                        `}
                      >
                        <div className={`
                          w-16 h-16 rounded-2xl ${module.color} flex items-center justify-center
                          text-3xl mb-4 shadow-lg transition-transform pointer-events-none
                          ${module.disabled ? 'grayscale opacity-50' : 'group-hover:scale-110'}
                        `}>
                          {module.icon}
                        </div>

                        <h4 className={`text-xl font-bold mb-2 transition-colors pointer-events-none ${
                          module.disabled ? 'text-muted-foreground' : 'text-foreground group-hover:text-purple-600'
                        }`}>
                          {module.title}
                        </h4>

                        <p className="text-sm text-muted-foreground mb-4 pointer-events-none">
                          {module.description}
                        </p>

                        <div className={`flex items-center font-medium text-sm pointer-events-none ${
                          module.disabled ? 'text-muted-foreground' : 'text-purple-600'
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
                </section>
              ))}
            </div>
          </>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 border-t border-border/50 mt-auto">
        <p className="text-center text-sm text-muted-foreground font-kaiti">
          专为小学阶段语文学习设计 ❤️ {subject === 'chinese' ? '快乐学汉字' : '轻松学数学'}
        </p>
      </footer>
    </div>
  );
};

export default Index;
