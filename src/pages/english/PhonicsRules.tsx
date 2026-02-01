import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PHONICS_RULES, getRuleCategories, getRulesByCategory } from "@/data/english/phonicsRules";
import { ArrowLeft, Volume2, BookOpen } from "lucide-react";

const PhonicsRules = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('basic');
  const [expandedRule, setExpandedRule] = useState<string | null>(null);

  const categories = getRuleCategories();
  const currentRules = getRulesByCategory(selectedCategory);

  // 朗读单词
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-4 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">拼读规则</h1>
            <p className="text-sm text-muted-foreground">Phonics Rules</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Info Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
            <BookOpen className="h-4 w-4" />
            掌握拼读规律，轻松识记单词
          </div>
          <p className="text-muted-foreground">
            英语拼读遵循一定规律，掌握这些规则可以帮助你更快地认读和拼写单词
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setSelectedCategory(category.id);
                setExpandedRule(null);
              }}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Rules Cards */}
        <div className="space-y-4">
          {currentRules.map((rule) => (
            <Card
              key={rule.id}
              className={`p-6 transition-all cursor-pointer ${
                expandedRule === rule.id ? 'border-primary' : ''
              }`}
              onClick={() => setExpandedRule(expandedRule === rule.id ? null : rule.id)}
            >
              {/* Rule Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-foreground">
                      {rule.name}
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {rule.pattern}
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    {rule.description}
                  </p>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedRule === rule.id && (
                <div className="mt-6 space-y-4">
                  {/* Sound Info */}
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                    <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">发音</div>
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100 font-mono">
                      {rule.sound}
                    </div>
                  </div>

                  {/* Examples */}
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                      <span>示例单词</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speak(rule.examples.map(ex => ex.word).join(', '));
                        }}
                        className="p-1 rounded-full hover:bg-accent"
                      >
                        <Volume2 className="h-5 w-5 text-primary" />
                      </button>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {rule.examples.map((example, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            speak(example.word);
                          }}
                          className="group p-3 rounded-lg border-2 bg-card hover:border-primary hover:shadow-md transition-all text-center"
                        >
                          <div className="text-2xl font-bold text-primary mb-1">
                            {example.word}
                          </div>
                          <div className="text-xs text-muted-foreground font-mono mb-1">
                            {example.phonetic}
                          </div>
                          <div className="text-sm text-foreground">
                            {example.translation}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Exceptions */}
                  {rule.exceptions && rule.exceptions.length > 0 && (
                    <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
                      <div className="text-sm text-orange-600 dark:text-orange-400 mb-2">例外情况</div>
                      <div className="text-sm text-orange-900 dark:text-orange-100">
                        {rule.exceptions.join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Learning Tips */}
        <div className="mt-12 p-6 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border-2 border-purple-200 dark:border-purple-800">
          <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-3">
            💡 学习建议
          </h3>
          <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
            <li>• <strong>循序渐进</strong>：先掌握短元音和 Magic E，再学习复杂的字母组合</li>
            <li>• <strong>大量练习</strong>：通过拼读练习巩固规则，形成语感</li>
            <li>• <strong>注意例外</strong>：英语有很多不规则单词，需要单独记忆</li>
            <li>• <strong>结合阅读</strong>：在阅读中运用拼读规则，加深理解</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default PhonicsRules;
