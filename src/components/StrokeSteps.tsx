import { useEffect, useState } from "react";
import HanziWriter from "hanzi-writer";

interface StrokeStepsProps {
  character: string;
}

interface CharacterData {
  strokes: string[];
  medians: number[][][];
}

export const StrokeSteps = ({ character }: StrokeStepsProps) => {
  const [charData, setCharData] = useState<CharacterData | null>(null);

  useEffect(() => {
    if (!character) return;

    setCharData(null);

    HanziWriter.loadCharacterData(character).then((data) => {
      if (data) {
        setCharData(data as CharacterData);
      }
    });
  }, [character]);

  if (!charData || charData.strokes.length === 0) return null;

  const transformData = HanziWriter.getScalingTransform(80, 80, 5);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-primary rounded-full" />
        笔顺分步演示（一笔一画写汉字）
      </h3>
      
      <div className="flex flex-wrap gap-3 justify-center">
        {charData.strokes.map((_, stepIndex) => (
          <div key={`${character}-step-${stepIndex}`} className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-xl bg-card border-2 border-border stroke-grid overflow-hidden">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="80" 
                height="80"
                className="w-full h-full"
              >
                {/* Grid lines */}
                <line x1="0" y1="40" x2="80" y2="40" stroke="hsl(var(--stroke-outline))" strokeWidth="0.5" strokeDasharray="2,2" />
                <line x1="40" y1="0" x2="40" y2="80" stroke="hsl(var(--stroke-outline))" strokeWidth="0.5" strokeDasharray="2,2" />
                
                {/* Character strokes */}
                <g transform={transformData.transform}>
                  {/* Outline - all strokes in light gray */}
                  {charData.strokes.map((strokePath, i) => (
                    <path
                      key={`outline-${i}`}
                      d={strokePath}
                      fill="hsl(var(--stroke-outline))"
                      opacity="0.3"
                    />
                  ))}
                  
                  {/* Previously completed strokes in black */}
                  {charData.strokes.slice(0, stepIndex).map((strokePath, i) => (
                    <path
                      key={`complete-${i}`}
                      d={strokePath}
                      fill="hsl(var(--stroke-complete))"
                    />
                  ))}
                  
                  {/* Current stroke in red */}
                  <path
                    d={charData.strokes[stepIndex]}
                    fill="hsl(var(--stroke-active))"
                  />
                </g>
              </svg>
            </div>
            <span className="text-xs text-muted-foreground mt-1 font-medium">
              第{stepIndex + 1}笔
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
