import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TestTimerProps {
  startTime: number;
  isRunning?: boolean;
  onComplete?: (elapsedTime: number) => void;
}

export const TestTimer: React.FC<TestTimerProps> = ({
  startTime,
  isRunning = true,
  onComplete
}) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const newElapsed = now - startTime;
      setElapsed(newElapsed);
    }, 100);

    return () => clearInterval(interval);
  }, [startTime, isRunning]);

  // 格式化时间显示
  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full">
      <Clock className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm font-mono font-medium text-foreground">
        {formatTime(elapsed)}
      </span>
    </div>
  );
};
