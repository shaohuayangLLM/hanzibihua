import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Volume2 from 'lucide-react/dist/esm/icons/volume-2';
import { type PinyinBasicItem, type PinyinBasicType, getPinyinTypeLabel } from "@/data/pinyinBasics";
import { usePinyinSpeech } from "@/hooks/usePinyinSpeech";

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
  const { speak } = usePinyinSpeech({ rate: 0.7 });

  if (!item) return null;

  const typeLabel = getPinyinTypeLabel(type);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl flex items-center gap-2">
              {item.pinyin} ({typeLabel})
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => speak(item.pinyin)}
                title="朗读拼音"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4 text-center">例字：</h3>
            <div className="flex flex-wrap gap-6 justify-center">
              {item.examples.map((example, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 flex-shrink-0 opacity-60 group-hover:opacity-100 hover:scale-110 transition-all"
                    onClick={() => speak(example.char)}
                    title="朗读汉字"
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <div className="flex flex-col gap-1">
                    <div className="w-20 h-20 mizige rounded-lg flex items-center justify-center">
                      <span className="text-4xl text-foreground relative z-10">
                        {example.char}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground text-center">
                      {example.fullPinyin}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
