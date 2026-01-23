import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Volume2 from 'lucide-react/dist/esm/icons/volume-2';
import Globe from 'lucide-react/dist/esm/icons/globe';
import GraduationCap from 'lucide-react/dist/esm/icons/graduation-cap';
import Mic from 'lucide-react/dist/esm/icons/mic';
import type { QuizMode } from "@/data/types";

interface QuizModeSelectorProps {
  mode: QuizMode;
  onModeChange: (mode: QuizMode) => void;
  questionCount: number;
  onCountChange: (count: number) => void;
}

export const QuizModeSelector = ({
  mode,
  onModeChange,
  questionCount,
  onCountChange,
}: QuizModeSelectorProps) => {
  const modes = [
    { value: 'comprehensive' as QuizMode, label: '综合测试', icon: Globe, description: '所有拼音类型混合测试（4选项）' },
    { value: 'nasal' as QuizMode, label: '鼻音区分', icon: Volume2, description: '前后鼻音二选一专项训练' },
    { value: 'tongue' as QuizMode, label: '舌位区分', icon: GraduationCap, description: '平翘舌音二选一专项训练' },
    { value: 'pronunciation' as QuizMode, label: '发音测试', icon: Mic, description: '朗读汉字，智能识别评分' },
  ];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6 space-y-6">
        {/* 模式选择 */}
        <div>
          <label className="text-sm font-medium mb-3 block">选择训练类型</label>
          <div className="grid grid-cols-1 gap-2">
            {modes.map((m) => (
              <Button
                key={m.value}
                variant={mode === m.value ? "default" : "outline"}
                className="justify-start h-auto py-3"
                onClick={() => onModeChange(m.value)}
              >
                <m.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium">{m.label}</div>
                  <div className="text-xs opacity-70">{m.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* 题目数量 */}
        <div>
          <label className="text-sm font-medium mb-3 block">题目数量</label>
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCountChange(Math.max(5, questionCount - 5))}
              disabled={questionCount <= 5}
            >
              -5
            </Button>
            <span className="text-2xl font-bold min-w-[80px] text-center">
              {questionCount}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCountChange(Math.min(50, questionCount + 5))}
              disabled={questionCount >= 50}
            >
              +5
            </Button>
          </div>
        </div>

        {/* 模式说明 */}
        {mode === 'nasal' && (
          <div className="text-sm text-muted-foreground bg-secondary/50 p-4 rounded-lg space-y-2">
            <p className="font-medium text-foreground">鼻音区分训练（2个选项）：</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-medium text-primary">前鼻音：</span>
                <span>an, en, in, ün</span>
              </div>
              <div>
                <span className="font-medium text-primary">后鼻音：</span>
                <span>ang, eng, ing, ong</span>
              </div>
            </div>
            <p className="text-xs mt-2">例如：光(guāng) vs guān（二选一）</p>
          </div>
        )}
        {mode === 'tongue' && (
          <div className="text-sm text-muted-foreground bg-secondary/50 p-4 rounded-lg space-y-2">
            <p className="font-medium text-foreground">平翘舌区分训练（2个选项）：</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-medium text-primary">平舌音：</span>
                <span>z, c, s</span>
              </div>
              <div>
                <span className="font-medium text-primary">翘舌音：</span>
                <span>zh, ch, sh, r</span>
              </div>
            </div>
            <p className="text-xs mt-2">例如：石(shí) vs sí（二选一）</p>
          </div>
        )}
        {mode === 'pronunciation' && (
          <div className="text-sm text-muted-foreground bg-secondary/50 p-4 rounded-lg space-y-2">
            <p className="font-medium text-foreground">发音测试（AI 评分）：</p>
            <p>点击麦克风按钮，大声朗读显示的汉字</p>
            <div className="space-y-1 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span>发音正确（拼音 + 声调）</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-600 dark:text-red-400">✗</span>
                <span>发音不准，可以重试</span>
              </div>
            </div>
            <p className="text-xs mt-2">需要使用 Chrome 或 Edge 浏览器</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
