import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pencil from 'lucide-react/dist/esm/icons/pencil';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';
import Calculator from 'lucide-react/dist/esm/icons/calculator';
import Globe from 'lucide-react/dist/esm/icons/globe';
import { MATH_MODULES } from "@/data/math/modules";
import { CHINESE_MODULES } from "@/data/chinese/modules";
import { ENGLISH_MODULES } from "@/data/english/modules";

type Subject = 'chinese' | 'math' | 'english';

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
              subject === 'chinese' ? 'bg-primary' :
              subject === 'math' ? 'bg-purple-500' :
              'bg-indigo-500'
            }`}>
              {subject === 'chinese' ? (
                <Pencil className="h-5 w-5 text-primary-foreground" />
              ) : subject === 'math' ? (
                <Calculator className="h-5 w-5 text-white" />
              ) : (
                <Globe className="h-5 w-5 text-white" />
              )}
            </div>
            <h1 className="text-xl font-bold text-foreground">
              {subject === 'chinese' ? '一年级学习' : subject === 'math' ? '一年级数学' : '一年级英语'}
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
              <button
                onClick={() => setSubject('english')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  subject === 'english'
                    ? 'bg-indigo-500 text-white shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                🌍 英语
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
                一年级小朋友专属
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                选择学习模块
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                点击卡片开始学习，探索汉字的奥秘
              </p>
            </section>

            {/* Module Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
              {CHINESE_MODULES.map((module) => (
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
          </>
        )}

        {/* Math Subject Content */}
        {subject === 'math' && (
          <>
            <section className="text-center space-y-4 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-purple-600" />
                苏教版一年级上册
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                选择学习模块
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                点击卡片开始练习或测试
              </p>
            </section>

            {/* Module Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
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
                      : 'bg-card border-border hover:shadow-xl hover:scale-105 hover:border-purple-400 active:scale-95'
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
                    module.disabled ? 'text-muted-foreground' : 'text-foreground group-hover:text-purple-600'
                  }`}>
                    {module.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 pointer-events-none">
                    {module.description}
                  </p>

                  {/* Status indicator */}
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

            {/* Bottom Info */}
            <div className="text-center animate-fade-in">
              <p className="text-sm text-muted-foreground">
                💡 提示：每个模块都包含练习模式和测试模式
              </p>
            </div>
          </>
        )}

        {/* English Subject Content */}
        {subject === 'english' && (
          <>
            <section className="text-center space-y-4 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                自然拼读 Phonics
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                选择学习模块
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                从字母发音开始，掌握英语拼读规律
              </p>
            </section>

            {/* Module Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {ENGLISH_MODULES.map((module) => (
                <button
                  key={module.id}
                  onClick={() => !module.disabled && navigate(module.route)}
                  disabled={module.disabled}
                  className={`
                    group relative p-6 rounded-2xl border-2
                    shadow-md transition-all duration-300 text-left
                    ${module.disabled
                      ? 'bg-muted/30 border-muted opacity-50 cursor-not-allowed'
                      : 'bg-card border-border hover:shadow-xl hover:scale-105 hover:border-indigo-400 active:scale-95'
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
                    module.disabled ? 'text-muted-foreground' : 'text-foreground group-hover:text-indigo-600'
                  }`}>
                    {module.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 pointer-events-none">
                    {module.description}
                  </p>

                  {/* Status indicator */}
                  <div className={`flex items-center font-medium text-sm pointer-events-none ${
                    module.disabled ? 'text-muted-foreground' : 'text-indigo-600'
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
            <div className="text-center animate-fade-in">
              <p className="text-sm text-muted-foreground">
                💡 提示：从字母发音开始，循序渐进学习自然拼读
              </p>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 border-t border-border/50 mt-auto">
        <p className="text-center text-sm text-muted-foreground font-kaiti">
          专为一年级小朋友设计 ❤️ {
            subject === 'chinese' ? '快乐学汉字' :
            subject === 'math' ? '轻松学数学' :
            '趣味学英语'
          }
        </p>
      </footer>
    </div>
  );
};

export default Index;
