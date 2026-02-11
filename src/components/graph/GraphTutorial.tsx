/**
 * 图谱首次使用引导组件
 *
 * 提供交互式引导，帮助首次使用的用户了解如何操作图谱
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface GraphTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

interface TutorialStep {
  title: string;
  description: string;
  highlight?: string; // 需要高亮的元素选择器
  illustration?: string; // 插图 emoji
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: '欢迎使用汉字图谱！',
    description: '这是一个帮助小朋友探索汉字关系的学习工具。通过图谱，你可以看到汉字之间的形近字、同部首、组词等关系。',
    illustration: '🎯',
  },
  {
    title: '认识中心字',
    description: '蓝色圆圈中的大字是"中心字"，周围的小字是与它相关的汉字。你可以看到"天"字周围有"大"、"夫"等形近字。',
    illustration: '🔵',
    highlight: '.react-flow__node[data-id*="center"]',
  },
  {
    title: '单击查看详情',
    description: '点击任何一个汉字，会弹出详细信息窗口，显示拼音、释义、组词和例句。试试点击"大"字吧！',
    illustration: '👆',
  },
  {
    title: '双击切换中心',
    description: '快速点击两次（双击）任何汉字，它就会变成新的中心字，周围的关系网络也会更新。这样你就可以不断探索新的汉字！',
    illustration: '👆👆',
  },
  {
    title: '使用筛选器',
    description: '左侧面板可以筛选教材（一年级上/下册）和关系类型（形近字、同部首、组词等）。手机用户点击菜单按钮打开面板。',
    illustration: '🎛️',
  },
  {
    title: '学习足迹',
    description: '你探索过的汉字会记录在"学习足迹"中，还会有智能推荐告诉你下一步学什么。点击推荐的字可以直接跳转！',
    illustration: '👣',
  },
  {
    title: '开始探索吧！',
    description: '现在你已经了解基本操作了。从"天"字开始，探索汉字的奇妙世界吧！记得每天都来学习新的汉字哦。',
    illustration: '🚀',
  },
];

export const GraphTutorial = ({ isOpen, onClose, onComplete }: GraphTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showHighlight, setShowHighlight] = useState(false);

  const currentStepData = TUTORIAL_STEPS[currentStep];
  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1;
  const isFirstStep = currentStep === 0;

  // 高亮元素效果
  useEffect(() => {
    if (currentStepData.highlight && isOpen) {
      setShowHighlight(true);
      const element = document.querySelector(currentStepData.highlight);
      if (element) {
        element.classList.add('tutorial-highlight');
      }

      return () => {
        const element = document.querySelector(currentStepData.highlight!);
        if (element) {
          element.classList.remove('tutorial-highlight');
        }
      };
    }
  }, [currentStep, currentStepData.highlight, isOpen]);

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  const handleSkip = () => {
    onComplete();
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl flex items-center gap-2">
                <span className="text-3xl">{currentStepData.illustration}</span>
                {currentStepData.title}
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSkip}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <DialogDescription className="text-base leading-relaxed py-4">
            {currentStepData.description}
          </DialogDescription>

          {/* 进度指示器 */}
          <div className="flex items-center justify-center gap-2 py-2">
            {TUTORIAL_STEPS.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-6 bg-primary'
                    : index < currentStep
                    ? 'w-2 bg-primary/50'
                    : 'w-2 bg-muted'
                }`}
              />
            ))}
          </div>

          <DialogFooter className="flex items-center justify-between sm:justify-between">
            <div className="text-sm text-muted-foreground">
              {currentStep + 1} / {TUTORIAL_STEPS.length}
            </div>
            <div className="flex gap-2">
              {!isFirstStep && (
                <Button variant="outline" onClick={handlePrev}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  上一步
                </Button>
              )}
              <Button onClick={handleNext}>
                {isLastStep ? '开始使用' : '下一步'}
                {!isLastStep && <ChevronRight className="h-4 w-4 ml-1" />}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CSS for tutorial highlight effect */}
      <style>{`
        .tutorial-highlight {
          position: relative;
          z-index: 1000;
          animation: pulse-highlight 2s infinite;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5) !important;
          border-radius: 8px;
        }

        @keyframes pulse-highlight {
          0%, 100% {
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.3);
          }
        }
      `}</style>
    </>
  );
};

/**
 * Hook for managing tutorial state
 */
export const useTutorial = () => {
  const TUTORIAL_STORAGE_KEY = 'graph_tutorial_completed';

  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [hasCompletedTutorial, setHasCompletedTutorial] = useState(() => {
    const completed = localStorage.getItem(TUTORIAL_STORAGE_KEY);
    return completed === 'true';
  });

  // 自动显示引导（首次使用）
  useEffect(() => {
    if (!hasCompletedTutorial) {
      // 延迟 500ms 显示，让页面先渲染完成
      const timer = setTimeout(() => {
        setIsTutorialOpen(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [hasCompletedTutorial]);

  const handleCompleteTutorial = () => {
    localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
    setHasCompletedTutorial(true);
    setIsTutorialOpen(false);
  };

  const handleCloseTutorial = () => {
    setIsTutorialOpen(false);
  };

  const resetTutorial = () => {
    localStorage.removeItem(TUTORIAL_STORAGE_KEY);
    setHasCompletedTutorial(false);
    setIsTutorialOpen(true);
  };

  const openTutorial = () => {
    setIsTutorialOpen(true);
  };

  return {
    isTutorialOpen,
    hasCompletedTutorial,
    handleCompleteTutorial,
    handleCloseTutorial,
    resetTutorial,
    openTutorial,
  };
};
