import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";

interface CharacterInputProps {
  onSubmit: (character: string) => void;
  isLoading?: boolean;
}

export const CharacterInput = ({ onSubmit, isLoading }: CharacterInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Only take the first character if multiple are entered
      onSubmit(inputValue.trim().charAt(0));
    }
  };

  const suggestedChars = ["大", "小", "人", "山", "水", "日", "月", "木"];

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入一个汉字..."
            className="w-full h-16 px-6 pr-16 text-2xl font-medium rounded-2xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
            maxLength={1}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          试试这些字：
        </p>
        <div className="flex flex-wrap gap-2">
          {suggestedChars.map((char) => (
            <button
              key={char}
              onClick={() => onSubmit(char)}
              className="w-12 h-12 rounded-xl bg-secondary text-secondary-foreground text-xl font-brush hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110 active:scale-95"
            >
              {char}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
