import { useEffect, useState } from "react";
import HanziWriter from "hanzi-writer";
import { cn } from "@/lib/utils";

interface StrokeCardDisplayProps {
  character: string;
  strokeIndex: number; // 0-based index
  size?: number;
  className?: string;
  showOutline?: boolean;
}

interface CharacterData {
  strokes: string[];
  medians: number[][][];
}

export const StrokeCardDisplay = ({ 
  character, 
  strokeIndex, 
  size = 100, 
  className,
  showOutline = true 
}: StrokeCardDisplayProps) => {
  const [charData, setCharData] = useState<CharacterData | null>(null);

  useEffect(() => {
    if (!character) return;
    
    let isMounted = true;
    HanziWriter.loadCharacterData(character).then((data) => {
      if (isMounted && data) {
        setCharData(data as CharacterData);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [character]);

  if (!charData || !charData.strokes[strokeIndex]) return null;

  // HanziWriter uses a 1024x1024 coordinate system by default usually, but let's check transform
  // standard hanzi-writer-data is 1024x1024 with a specific transform.
  // The logic in StrokeSteps uses getScalingTransform to fit it into the box.
  const transformData = HanziWriter.getScalingTransform(size, size, size / 10);

  return (
    <div 
      className={cn("relative overflow-hidden bg-background rounded-lg", className)} 
      style={{ width: size, height: size }}
    >
      <svg 
        width={size} 
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Grid lines (Mizige style) */}
        <line x1="0" y1="0" x2={size} y2={size} stroke="currentColor" strokeOpacity="0.1" />
        <line x1={size} y1="0" x2="0" y2={size} stroke="currentColor" strokeOpacity="0.1" />
        <line x1={size/2} y1="0" x2={size/2} y2={size} stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4,4" />
        <line x1="0" y1={size/2} x2={size} y2={size/2} stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4,4" />

        <g transform={transformData.transform}>
          {/* Render all strokes efficiently */}
          {charData.strokes.map((strokePath, i) => {
             const isTarget = i === strokeIndex;
             return (
               <path
                 key={i}
                 d={strokePath}
                 fill={isTarget ? "#e11d48" : (showOutline ? "#94a3b8" : "transparent")} // Red for target, Gray for others
                 opacity={isTarget ? 1 : 0.3}
               />
             );
          })}
        </g>
      </svg>
    </div>
  );
};
