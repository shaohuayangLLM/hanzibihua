import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CVC_WORDS, getCVCWordsByVowel } from "@/data/english/cvcWords";
import { ArrowLeft, Volume2, RotateCcw, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

type PracticeMode = 'blend' | 'match' | 'spell';
type VowelFilter = 'all' | 'a' | 'e' | 'i' | 'o' | 'u';

const CVCPractice = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<PracticeMode>('blend');
  const [vowelFilter, setVowelFilter] = useState<VowelFilter>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // 获取当前练习的单词列表
  const getWords = useCallback(() => {
    if (vowelFilter === 'all') {
      return CVC_WORDS;
    }
    return getCVCWordsByVowel(vowelFilter);
  }, [vowelFilter]);

  const words = getWords();
  const currentWord = words[currentIndex];

  // 朗读单词
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  // 朗读发音
  const speakPhonics = () => {
    if (!currentWord) return;
    const { first, vowel, last } = currentWord.phonics;
    speak(`c ${first.replace(/\//g, '')}, ${vowel.replace(/\//g, '')}, ${last?.replace(/\//g, '')}, ${currentWord.word}`);
  };

  // 检查答案（match模式）
  const checkMatch = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
      toast.success('正确！🎉');
    } else {
      toast.error(`不对哦，答案是 ${currentWord.word}`);
    }
    setShowResult(true);
  };

  // 检查拼写（spell模式）
  const checkSpelling = () => {
    if (userAnswer.toLowerCase() === currentWord.word.toLowerCase()) {
      setScore(score + 1);
      toast.success('拼写正确！🎉');
    } else {
      toast.error(`拼写错误，正确答案是 ${currentWord.word}`);
    }
    setShowResult(true);
  };

  // 下一个单词
  const nextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // 完成
      toast.success(`练习完成！得分: ${score}/${words.length}`);
      setCurrentIndex(0);
      setScore(0);
    }
    setShowResult(false);
    setUserAnswer('');
  };

  // 重置
  const reset = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setUserAnswer('');
  };

  if (!currentWord) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>加载中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-4 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">CVC 拼读练习</h1>
              <p className="text-sm text-muted-foreground">
                {score}/{words.length} • 第 {currentIndex + 1}/{words.length} 题
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            重置
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Mode and Filter Selection */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Mode Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">模式:</span>
            <Button
              variant={mode === 'blend' ? 'default' : 'outline'}
              size="sm"
              onClick={() => { setMode('blend'); reset(); }}
            >
              拼读
            </Button>
            <Button
              variant={mode === 'match' ? 'default' : 'outline'}
              size="sm"
              onClick={() => { setMode('match'); reset(); }}
            >
              配对
            </Button>
            <Button
              variant={mode === 'spell' ? 'default' : 'outline'}
              size="sm"
              onClick={() => { setMode('spell'); reset(); }}
            >
              拼写
            </Button>
          </div>

          {/* Vowel Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">元音:</span>
            {(['all', 'a', 'e', 'i', 'o', 'u'] as VowelFilter[]).map((v) => (
              <Button
                key={v}
                variant={vowelFilter === v ? 'default' : 'outline'}
                size="sm"
                onClick={() => { setVowelFilter(v); reset(); }}
              >
                {v === 'all' ? '全部' : v.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* Practice Card */}
        <Card className="p-8">
          {mode === 'blend' && (
            <div className="space-y-8">
              {/* Blend Mode: 拼读模式 */}
              <div className="text-center space-y-6">
                {/* Word Display */}
                <div className="text-7xl font-bold text-primary mb-4">
                  {currentWord.word}
                </div>

                {/* Phonics Breakdown */}
                <div className="flex items-center justify-center gap-4">
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {currentWord.word[0].toUpperCase()}
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      {currentWord.phonics.first}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-muted-foreground">+</div>
                  <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {currentWord.word[1].toUpperCase()}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                      {currentWord.phonics.vowel}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-muted-foreground">+</div>
                  <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {currentWord.word[2].toUpperCase()}
                    </div>
                    <div className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                      {currentWord.phonics.last}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-muted-foreground">=</div>
                  <div className="p-4 rounded-xl bg-primary/10 border-2 border-primary">
                    <div className="text-2xl font-bold text-primary">
                      {currentWord.word}
                    </div>
                    <div className="text-sm text-primary mt-1">
                      {currentWord.translation}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-4">
                  <Button size="lg" onClick={speakPhonics} disabled={isSpeaking}>
                    <Volume2 className={`h-5 w-5 mr-2 ${isSpeaking ? 'animate-pulse' : ''}`} />
                    拼读发音
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => speak(currentWord.word)} disabled={isSpeaking}>
                    <Volume2 className={`h-5 w-5 mr-2 ${isSpeaking ? 'animate-pulse' : ''}`} />
                    整词发音
                  </Button>
                </div>
              </div>
            </div>
          )}

          {mode === 'match' && (
            <div className="space-y-8">
              {/* Match Mode: 配对模式 */}
              <div className="text-center space-y-6">
                <div className="text-5xl font-bold text-primary mb-4">
                  {currentWord.word}
                </div>
                <div className="text-xl text-muted-foreground">
                  {currentWord.translation}
                </div>

                {!showResult ? (
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => checkMatch(true)}
                      className="h-24 w-24 text-3xl"
                    >
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => checkMatch(false)}
                      className="h-24 w-24 text-3xl"
                    >
                      <XCircle className="h-12 w-12 text-red-500" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-primary">
                      {currentWord.word}
                    </div>
                    <div className="text-lg text-muted-foreground">
                      {currentWord.translation}
                    </div>
                    <Button size="lg" onClick={() => speak(currentWord.word)} disabled={isSpeaking}>
                      <Volume2 className="h-5 w-5 mr-2" />
                      听发音
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {mode === 'spell' && (
            <div className="space-y-8">
              {/* Spell Mode: 拼写模式 */}
              <div className="text-center space-y-6">
                <div className="text-xl text-muted-foreground">
                  请拼写单词
                </div>
                <div className="text-3xl font-bold text-primary">
                  {currentWord.translation}
                </div>
                <Button size="lg" onClick={() => speak(currentWord.word)} disabled={isSpeaking}>
                  <Volume2 className={`h-5 w-5 mr-2 ${isSpeaking ? 'animate-pulse' : ''}`} />
                  听发音
                </Button>

                {!showResult ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="w-full max-w-xs mx-auto text-4xl font-bold text-center p-4 border-2 rounded-xl focus:border-primary outline-none"
                      placeholder="输入单词"
                      autoFocus
                      onKeyPress={(e) => e.key === 'Enter' && checkSpelling()}
                    />
                    <Button size="lg" onClick={checkSpelling}>
                      检查答案
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-2xl">
                      你的答案: <span className={userAnswer.toLowerCase() === currentWord.word.toLowerCase() ? 'text-green-600' : 'text-red-600'}>
                        {userAnswer}
                      </span>
                    </div>
                    <div className="text-lg text-muted-foreground">
                      正确答案: <span className="text-primary font-bold">{currentWord.word}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
              setShowResult(false);
              setUserAnswer('');
            }}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            上一题
          </Button>
          <Button onClick={nextWord}>
            {showResult ? '下一题' : '跳过'}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CVCPractice;
