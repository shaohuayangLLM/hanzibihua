import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PinyinTypeSelector } from "@/components/pinyinBasics/PinyinTypeSelector";
import { PinyinGrid } from "@/components/pinyinBasics/PinyinGrid";
import { PinyinDetailDialog } from "@/components/pinyinBasics/PinyinDetailDialog";
import {
  getPinyinBasics,
  type PinyinBasicItem,
  type PinyinBasicType,
} from "@/data/pinyinBasics";

const PinyinBasics = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<PinyinBasicType>("initial");
  const [selectedItem, setSelectedItem] = useState<PinyinBasicItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const items = getPinyinBasics(selectedType);

  const handleItemClick = (item: PinyinBasicItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground font-kaiti">
              拼音基础
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Type selector */}
        <section className="animate-fade-in">
          <PinyinTypeSelector
            value={selectedType}
            onChange={setSelectedType}
          />
        </section>

        {/* Pinyin grid */}
        <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <PinyinGrid
            items={items}
            type={selectedType}
            onItemClick={handleItemClick}
          />
        </section>
      </main>

      {/* Detail dialog */}
      <PinyinDetailDialog
        item={selectedItem}
        type={selectedType}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};

export default PinyinBasics;
