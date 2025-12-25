import { useEffect, useRef, useState } from "react";
import HanziWriter from "hanzi-writer";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

interface StrokeDisplayProps {
  character: string;
}

export const StrokeDisplay = ({ character }: StrokeDisplayProps) => {
  const writerRef = useRef<HanziWriter | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStroke, setCurrentStroke] = useState(0);
  const [totalStrokes, setTotalStrokes] = useState(0);
  const [strokeSteps, setStrokeSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!containerRef.current || !character) return;

    // Clear previous content
    containerRef.current.innerHTML = "";
    setCurrentStroke(0);
    setIsPlaying(false);

    const writer = HanziWriter.create(containerRef.current, character, {
      width: 200,
      height: 200,
      padding: 10,
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 300,
      strokeColor: "#3d3226",
      radicalColor: "#3d3226",
      outlineColor: "#ddd",
      drawingColor: "#e04a3a",
      showOutline: true,
      showCharacter: false,
    });

    writerRef.current = writer;

    // Get stroke count
    HanziWriter.loadCharacterData(character).then((data) => {
      if (data) {
        setTotalStrokes(data.strokes.length);
        setStrokeSteps(Array.from({ length: data.strokes.length }, (_, i) => i + 1));
      }
    });

    return () => {
      writerRef.current = null;
    };
  }, [character]);

  const handlePlay = () => {
    if (!writerRef.current) return;
    
    setIsPlaying(true);
    setCurrentStroke(0);
    
    writerRef.current.animateCharacter({
      onComplete: () => {
        setIsPlaying(false);
        setCurrentStroke(totalStrokes);
      },
    });
  };

  const handleReset = () => {
    if (!writerRef.current) return;
    writerRef.current.hideCharacter();
    writerRef.current.showOutline();
    setCurrentStroke(0);
    setIsPlaying(false);
  };

  const handleNextStroke = () => {
    if (!writerRef.current || currentStroke >= totalStrokes) return;
    
    writerRef.current.animateStroke(currentStroke, {
      onComplete: () => {
        setCurrentStroke((prev) => prev + 1);
      },
    });
  };

  const handlePrevStroke = () => {
    if (!writerRef.current || currentStroke <= 0) return;
    
    // Reset and redraw up to previous stroke
    writerRef.current.hideCharacter();
    const newStroke = currentStroke - 1;
    
    for (let i = 0; i < newStroke; i++) {
      writerRef.current.showCharacter();
    }
    
    setCurrentStroke(newStroke);
    handleReset();
    
    // Animate up to the previous stroke
    setTimeout(() => {
      for (let i = 0; i < newStroke; i++) {
        writerRef.current?.animateStroke(i);
      }
    }, 100);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Main character display */}
      <div className="relative">
        <div
          ref={containerRef}
          className="w-[200px] h-[200px] rounded-2xl bg-card border-2 border-border stroke-grid flex items-center justify-center"
        />
        
        {/* Stroke counter badge */}
        <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full shadow-button">
          {currentStroke}/{totalStrokes}笔
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex items-center gap-3 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevStroke}
          disabled={currentStroke <= 0 || isPlaying}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="warm"
          size="lg"
          onClick={isPlaying ? handleReset : handlePlay}
          className="min-w-[120px]"
        >
          {isPlaying ? (
            <>
              <Pause className="h-5 w-5" />
              暂停
            </>
          ) : (
            <>
              <Play className="h-5 w-5" />
              播放
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNextStroke}
          disabled={currentStroke >= totalStrokes || isPlaying}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        <Button variant="secondary" size="icon" onClick={handleReset}>
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>

      {/* Stroke step indicators */}
      {totalStrokes > 0 && (
        <div className="flex items-center gap-1.5 mt-4">
          {strokeSteps.map((step) => (
            <div
              key={step}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                step <= currentStroke
                  ? "bg-primary scale-100"
                  : "bg-muted scale-75"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
