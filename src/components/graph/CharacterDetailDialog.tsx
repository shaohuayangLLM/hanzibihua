/**
 * 汉字详情弹窗组件
 * 
 * 用于在图谱中点击节点时显示汉字详情
 */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CharacterDetails } from "@/components/CharacterDetails";
import { getCharacterInfo } from "@/data/characterInfo";
import { Button } from "@/components/ui/button";
import { Check, Lock } from "lucide-react";

interface CharacterDetailDialogProps {
  character: string | null;
  isOpen: boolean;
  onClose: () => void;
  isLearned?: boolean;
  onToggleLearned?: (char: string) => void;
}

export const CharacterDetailDialog = ({
  character,
  isOpen,
  onClose,
  isLearned = false,
  onToggleLearned,
}: CharacterDetailDialogProps) => {
  if (!character) return null;

  const info = getCharacterInfo(character);
  if (!info) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="font-kaiti text-3xl">{character}</span>
            {onToggleLearned && (
              <Button
                variant={isLearned ? "default" : "outline"}
                size="sm"
                onClick={() => onToggleLearned(character)}
                className="gap-2"
              >
                {isLearned ? (
                  <>
                    <Check className="h-4 w-4" />
                    已学
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    标记已学
                  </>
                )}
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>
        <CharacterDetails info={info} />
      </DialogContent>
    </Dialog>
  );
};
