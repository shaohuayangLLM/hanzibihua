import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { type PinyinBasicItem, type PinyinBasicType, getPinyinTypeLabel } from "@/data/pinyinBasics";

interface PinyinDetailDialogProps {
  item: PinyinBasicItem | null;
  type: PinyinBasicType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PinyinDetailDialog = ({
  item,
  type,
  open,
  onOpenChange,
}: PinyinDetailDialogProps) => {
  if (!item) return null;

  const typeLabel = getPinyinTypeLabel(type);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-kaiti">
              {item.pinyin} ({typeLabel})
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4 text-center">例字：</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {item.examples.map((example, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 mizige rounded-lg flex items-center justify-center">
                    <span className="text-4xl font-kaiti text-foreground relative z-10">
                      {example.char}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground font-kaiti">
                    {example.fullPinyin}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
