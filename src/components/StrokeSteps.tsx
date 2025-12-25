import { useEffect, useRef, useState } from "react";
import HanziWriter from "hanzi-writer";

interface StrokeStepsProps {
  character: string;
}

export const StrokeSteps = ({ character }: StrokeStepsProps) => {
  const [totalStrokes, setTotalStrokes] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!character) return;

    HanziWriter.loadCharacterData(character).then((data) => {
      if (data) {
        setTotalStrokes(data.strokes.length);
      }
    });
  }, [character]);

  useEffect(() => {
    if (totalStrokes === 0) return;

    // Create writers for each step
    stepRefs.current.forEach((ref, index) => {
      if (!ref) return;
      ref.innerHTML = "";

      const writer = HanziWriter.create(ref, character, {
        width: 80,
        height: 80,
        padding: 5,
        strokeColor: "#3d3226",
        outlineColor: "#e8e4df",
        drawingColor: "#e04a3a",
        showOutline: true,
        showCharacter: false,
        strokeAnimationSpeed: 2,
        delayBetweenStrokes: 100,
      });

      // Show strokes up to current step with animation
      setTimeout(() => {
        // Show completed strokes instantly
        for (let i = 0; i < index; i++) {
          writer.animateStroke(i);
        }
        // Animate current stroke
        if (index < totalStrokes) {
          setTimeout(() => {
            writer.animateStroke(index);
          }, 100 * index);
        }
      }, index * 150);
    });
  }, [character, totalStrokes]);

  if (totalStrokes === 0) return null;

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-primary rounded-full" />
        笔顺分步演示
      </h3>
      
      <div className="flex flex-wrap gap-3 justify-center">
        {Array.from({ length: totalStrokes }, (_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              ref={(el) => (stepRefs.current[i] = el)}
              className="w-20 h-20 rounded-xl bg-card border-2 border-border stroke-grid"
            />
            <span className="text-xs text-muted-foreground mt-1 font-medium">
              第{i + 1}笔
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
