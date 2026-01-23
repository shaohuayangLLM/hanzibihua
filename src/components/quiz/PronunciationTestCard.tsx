import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Mic from 'lucide-react/dist/esm/icons/mic';
import MicOff from 'lucide-react/dist/esm/icons/mic-off';
import Check from 'lucide-react/dist/esm/icons/check';
import X from 'lucide-react/dist/esm/icons/x';
import RotateCcw from 'lucide-react/dist/esm/icons/rotate-ccw';
import { MatchResult } from "@/data/types";

interface PronunciationTestCardProps {
  character: string;
  correctPinyin: string;
  questionNumber: number;
  totalQuestions: number;
  isRecording: boolean;
  result: MatchResult | null;
  onStartRecord: () => void;
  onRetry: () => void;
  browserSupported: boolean;
}

export const PronunciationTestCard = ({
  character,
  correctPinyin,
  questionNumber,
  totalQuestions,
  isRecording,
  result,
  onStartRecord,
  onRetry,
  browserSupported,
}: PronunciationTestCardProps) => {
  if (!browserSupported) {
    return (
      <Card className="w-full max-w-2xl mx-auto p-8">
        <div className="text-center space-y-4">
          <div className="text-6xl">🎤</div>
          <h3 className="text-xl font-medium text-foreground">
            语音识别功能
          </h3>
          <p className="text-muted-foreground">
            使用浏览器内置的语音识别 API
          </p>
          <div className="text-sm text-muted-foreground bg-secondary/50 p-4 rounded-lg">
            <p className="font-medium mb-2">要求：</p>
            <ul className="text-left space-y-1 list-disc list-inside">
              <li>支持 Chrome、Edge 浏览器（推荐）</li>
              <li>允许麦克风权限</li>
              <li>网络连接正常</li>
            </ul>
          </div>
        </div>
      </Card>
    );
  }

  const hasResult = result !== null;

  return (
    <Card className="w-full max-w-2xl mx-auto p-8">
      <div className="text-center space-y-6">
        {/* Question number */}
        <div className="text-sm text-muted-foreground">
          第 {questionNumber} 题，共 {totalQuestions} 题
        </div>

        {/* Character display */}
        <div className="flex flex-col items-center gap-3 py-6">
          <div className="w-32 h-32 sm:w-40 sm:h-40 mizige rounded-2xl flex items-center justify-center">
            <span className="text-7xl sm:text-9xl font-medium text-foreground relative z-10">
              {character}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            请大声朗读这个汉字
          </div>
        </div>

        {/* Recording button or result */}
        {!hasResult ? (
          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={onStartRecord}
              disabled={isRecording}
              size="lg"
              className={`rounded-full w-24 h-24 ${
                isRecording ? 'animate-pulse bg-red-500 hover:bg-red-600' : ''
              }`}
            >
              {isRecording ? (
                <MicOff className="h-10 w-10" />
              ) : (
                <Mic className="h-10 w-10" />
              )}
            </Button>

            {/* Recording status */}
            {isRecording && (
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  正在录音...请大声朗读
                </p>
                <p className="text-xs text-muted-foreground">
                  （点击后等待 1 秒再说话）
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            {/* Result icon */}
            <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
              result.isMatch
                ? 'bg-green-100 text-green-600 dark:bg-green-900/20'
                : 'bg-red-100 text-red-600 dark:bg-red-900/20'
            }`}>
              {result.isMatch ? (
                <Check className="h-12 w-12" />
              ) : (
                <X className="h-12 w-12" />
              )}
            </div>

            {/* Result message */}
            <div className="text-center">
              <p className={`text-2xl font-bold ${
                result.isMatch
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {result.isMatch ? '发音正确！' : '再试一次'}
              </p>
              {!result.isMatch && (
                <p className="text-sm text-muted-foreground mt-2">
                  正确拼音：{correctPinyin}
                </p>
              )}
            </div>

            {/* Retry button */}
            <Button
              onClick={onRetry}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              重新录音
            </Button>
          </div>
        )}

        {/* Status text */}
        {isRecording && !hasResult && (
          <div className="text-center">
            <p className="text-lg font-medium animate-pulse">
              正在聆听...
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              请大声朗读汉字
            </p>
          </div>
        )}

        {/* Instructions when idle */}
        {!isRecording && !hasResult && (
          <div className="text-center text-sm text-muted-foreground">
            <p>点击麦克风按钮，然后朗读显示的汉字</p>
          </div>
        )}
      </div>
    </Card>
  );
};
