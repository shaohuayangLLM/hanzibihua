import { useEffect, useRef, useState, useCallback } from "react";
import HanziWriter from "hanzi-writer";
import { Button } from "@/components/ui/button";
import { RotateCcw, Eye, EyeOff, Lightbulb, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

interface WritingPracticeProps {
  character: string;
}

export const WritingPractice = ({ character }: WritingPracticeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<HanziWriter | null>(null);
  const [showOutline, setShowOutline] = useState(true);
  const [mistakes, setMistakes] = useState(0);
  const [strokesCompleted, setStrokesCompleted] = useState(0);
  const [totalStrokes, setTotalStrokes] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);

  const initWriter = useCallback(() => {
    if (!containerRef.current || !character) return;

    // Clean up previous instance
    if (writerRef.current) {
      writerRef.current.cancelQuiz();
      containerRef.current.innerHTML = "";
      writerRef.current = null;
    }

    // Reset state
    setMistakes(0);
    setStrokesCompleted(0);
    setIsComplete(false);
    setIsQuizActive(false);

    const writer = HanziWriter.create(containerRef.current, character, {
      width: 280,
      height: 280,
      padding: 20,
      showOutline: showOutline,
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 100,
      strokeColor: "hsl(var(--stroke-complete))",
      outlineColor: "hsl(var(--stroke-outline))",
      drawingColor: "hsl(var(--primary))",
      drawingWidth: 20,
      showHintAfterMisses: 2,
      highlightOnComplete: true,
      highlightColor: "hsl(var(--stroke-active))",
      charDataLoader: (char) => {
        return HanziWriter.loadCharacterData(char).then((data) => {
          if (!data) throw new Error('Character data not found');
          return data;
        });
      },
    });

    writerRef.current = writer;

    // Get total strokes
    HanziWriter.loadCharacterData(character).then((data) => {
      if (data) {
        setTotalStrokes(data.strokes.length);
      }
    });
  }, [character, showOutline]);

  useEffect(() => {
    initWriter();

    return () => {
      if (writerRef.current) {
        writerRef.current.cancelQuiz();
      }
    };
  }, [initWriter]);

  const startQuiz = () => {
    if (!writerRef.current) return;

    setMistakes(0);
    setStrokesCompleted(0);
    setIsComplete(false);
    setIsQuizActive(true);

    writerRef.current.quiz({
      onMistake: (strokeData) => {
        setMistakes((prev) => prev + 1);
      },
      onCorrectStroke: (strokeData) => {
        setStrokesCompleted(strokeData.strokeNum + 1);
      },
      onComplete: (summaryData) => {
        setIsComplete(true);
        setIsQuizActive(false);
        if (summaryData.totalMistakes === 0) {
          toast.success("太棒了！写得非常好！🌟", {
            description: "一笔都没错，真厉害！",
          });
        } else if (summaryData.totalMistakes <= 2) {
          toast.success("写得很好！继续加油！✨", {
            description: `只错了${summaryData.totalMistakes}笔`,
          });
        } else {
          toast("完成了！多练习几次吧！💪", {
            description: `错了${summaryData.totalMistakes}笔，再试一次`,
          });
        }
      },
    });
  };

  const handleReset = () => {
    initWriter();
    setTimeout(() => {
      startQuiz();
    }, 100);
  };

  const handleShowHint = () => {
    if (writerRef.current && isQuizActive) {
      // Show hint by animating current stroke
      writerRef.current.cancelQuiz();
      writerRef.current.animateCharacter({
        onComplete: () => {
          // Restart quiz after showing animation
          setTimeout(() => {
            handleReset();
          }, 500);
        },
      });
    }
  };

  const toggleOutline = () => {
    setShowOutline((prev) => !prev);
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-primary rounded-full" />
        动手写一写（跟着描一描）
      </h3>

      <div className="flex flex-col items-center gap-4">
        {/* Writing area */}
        <div className="relative">
          <div
            ref={containerRef}
            className="w-[280px] h-[280px] rounded-2xl bg-card border-4 border-primary/20 stroke-grid overflow-hidden shadow-lg"
            style={{
              backgroundImage: `
                linear-gradient(to right, hsl(var(--stroke-outline) / 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--stroke-outline) / 0.3) 1px, transparent 1px),
                linear-gradient(to right, hsl(var(--stroke-outline) / 0.2) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--stroke-outline) / 0.2) 1px, transparent 1px)
              `,
              backgroundSize: "140px 140px, 140px 140px, 70px 70px, 70px 70px",
              backgroundPosition: "center center",
            }}
          />

          {/* Progress indicator */}
          {isQuizActive && (
            <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium border border-border">
              {strokesCompleted}/{totalStrokes}
            </div>
          )}

          {/* Completion overlay */}
          {isComplete && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-2xl">
              <div className="text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-2" />
                <p className="text-lg font-bold text-foreground">完成啦！</p>
                <p className="text-sm text-muted-foreground">
                  {mistakes === 0 ? "太棒了！" : `错了${mistakes}笔`}
                </p>
              </div>
            </div>
          )}

          {/* Start prompt */}
          {!isQuizActive && !isComplete && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-2xl">
              <Button
                onClick={startQuiz}
                size="lg"
                className="text-lg px-8 py-6 rounded-xl font-bold shadow-lg"
              >
                开始练习
              </Button>
            </div>
          )}
        </div>

        {/* Mistake counter */}
        {isQuizActive && mistakes > 0 && (
          <div className="flex items-center gap-2 text-destructive">
            <XCircle className="w-5 h-5" />
            <span className="text-sm font-medium">错了 {mistakes} 笔</span>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            重写
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleOutline}
            className="gap-2"
          >
            {showOutline ? (
              <>
                <EyeOff className="w-4 h-4" />
                隐藏轮廓
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                显示轮廓
              </>
            )}
          </Button>

          {isQuizActive && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleShowHint}
              className="gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              提示
            </Button>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center text-sm text-muted-foreground bg-muted/50 rounded-xl p-4 max-w-xs">
          <p className="font-medium mb-1">✍️ 使用手指或鼠标跟着笔顺描写</p>
          <p>系统会自动判断你写得对不对哦！</p>
        </div>
      </div>
    </div>
  );
};
