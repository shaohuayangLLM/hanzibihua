import { LetterSound } from "@/data/english/types";
import { Volume2 } from "lucide-react";

interface LetterSoundCardProps {
  letterData: LetterSound;
  onClick: () => void;
  onSpeak: () => void;
}

const LetterSoundCard = ({ letterData, onClick, onSpeak }: LetterSoundCardProps) => {
  return (
    <button
      onClick={onClick}
      className="group relative p-6 rounded-2xl border-2 bg-card hover:shadow-xl transition-all duration-300 text-left"
    >
      {/* Letter Display */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-5xl font-bold text-primary">
            {letterData.letter}
          </div>
          <div className="text-3xl font-medium text-muted-foreground">
            {letterData.lowercase}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSpeak();
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-accent"
        >
          <Volume2 className="h-5 w-5 text-primary" />
        </button>
      </div>

      {/* Phonics */}
      <div className="mb-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold">
          {letterData.phonics}
        </span>
      </div>

      {/* Sound Description */}
      <div className="text-sm text-muted-foreground mb-3">
        {letterData.sound}
      </div>

      {/* Example Words */}
      <div className="flex flex-wrap gap-1">
        {letterData.examples.slice(0, 3).map((word) => (
          <span
            key={word}
            className="px-2 py-0.5 text-xs rounded bg-secondary text-secondary-foreground"
          >
            {word}
          </span>
        ))}
      </div>
    </button>
  );
};

export default LetterSoundCard;
