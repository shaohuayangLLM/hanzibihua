import { useEffect, useRef } from "react";
import HanziWriter from "hanzi-writer";
import { cn } from "@/lib/utils";

interface StrokeAnimationProps {
    character: string;
    strokeIndex: number;
    size?: number;
    className?: string;
    gridColor?: string;
    strokeColor?: string;
    highlightColor?: string;
}

export const StrokeAnimation = ({
    character,
    strokeIndex,
    size = 200,
    className,
    gridColor = "#e5e7eb",
    strokeColor = "#94a3b8",
    highlightColor = "#e11d48",
}: StrokeAnimationProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const writerRef = useRef<HanziWriter | null>(null);

    useEffect(() => {
        if (!containerRef.current || !character) return;

        // Clean up previous writer
        containerRef.current.innerHTML = "";

        const writer = HanziWriter.create(containerRef.current, character, {
            width: size,
            height: size,
            padding: 5,
            strokeColor: strokeColor, // Color for non-active strokes
            radicalColor: strokeColor,
            showOutline: true,
            outlineColor: "#e2e8f0",
            showCharacter: true,
            strokeAnimationSpeed: 1, // Normal speed
            delayBetweenStrokes: 200,
        });

        writerRef.current = writer;

        let isAnimating = true;

        const animateLoop = () => {
            if (!isAnimating || !writerRef.current) return;

            // Logic:
            // 1. Show character with normal color
            // 2. Animate the specific stroke with highlight color
            // 3. Wait and repeat

            // But HanziWriter animateStroke draws OVER the existing stroke.
            // We want to emphasize the stroke.
            // Let's use quiz's highlight logic maybe? 
            // Or just standard animateStroke with a custom color for that stroke.

            // Unfortunately create() options are global. 
            // We can use updateColor to change colors dynamically? No, that's complex.
            // Best approach: Initialize writer. 
            // Every loop: 
            //   reset.
            //   animateStroke(index) -> this draws the stroke.

            // Better approach for teaching: 
            // Show the full character static (gray).
            // Then animate the target stroke (red) over it.

            writer.hideCharacter();
            writer.showOutline(); // Show background outline

            // We can "show" the non-target strokes immediately? 
            // writer.showCharacter() shows all.

            // To show all non-target strokes in gray:
            // This requires low-level access or custom logic.

            // SIMPLIFIED ANIMATION:
            // Just animate the stroke in isolation? No, context is good.
            // Just animate the stroke over the outline.

            const options = {
                strokeColor: highlightColor,
            };

            writer.animateStroke(strokeIndex, {
                onComplete: () => {
                    if (isAnimating) {
                        setTimeout(animateLoop, 1000);
                    }
                }
            });
        };

        // Load data then start animation
        HanziWriter.loadCharacterData(character).then(() => {
            animateLoop();
        });

        return () => {
            isAnimating = false;
            writerRef.current = null;
        };
    }, [character, strokeIndex, size, strokeColor, highlightColor]);

    return (
        <div
            ref={containerRef}
            className={cn("bg-background rounded-xl relative", className)}
            style={{ width: size, height: size }}
        >
            {/* Background Grid SVG */}
            <svg
                width={size}
                height={size}
                className="absolute top-0 left-0 pointer-events-none"
                style={{ zIndex: 0 }}
            >
                <line x1="0" y1="0" x2={size} y2={size} stroke={gridColor} strokeWidth="1" />
                <line x1={size} y1="0" x2="0" y2={size} stroke={gridColor} strokeWidth="1" />
                <line x1={size / 2} y1="0" x2={size / 2} y2={size} stroke={gridColor} strokeWidth="1" strokeDasharray="5,5" />
                <line x1="0" y1={size / 2} x2={size} y2={size / 2} stroke={gridColor} strokeWidth="1" strokeDasharray="5,5" />
            </svg>
        </div>
    );
};
