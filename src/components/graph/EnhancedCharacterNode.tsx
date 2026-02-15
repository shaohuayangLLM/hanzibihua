/**
 * 增强型汉字节点组件
 * 
 * 用于图谱中显示汉字,支持状态标记、教材标签和交互
 */

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { GraphNodeData } from '@/types/graph';
import { cn } from '@/lib/utils';
import { Check, Lock } from 'lucide-react';

interface EnhancedCharacterNodeProps extends NodeProps<GraphNodeData> {}

const textbookLabels = {
  'grade1-vol1': '一上',
  'grade1-vol2': '一下',
  'grade2-vol1': '二上',
  'grade2-vol2': '二下',
  'common': '常用',
  'radical': '部首',
} as const;

const textbookColors = {
  'grade1-vol1': 'bg-blue-100 text-blue-700',
  'grade1-vol2': 'bg-green-100 text-green-700',
  'grade2-vol1': 'bg-purple-100 text-purple-700',
  'grade2-vol2': 'bg-orange-100 text-orange-700',
  'common': 'bg-gray-100 text-gray-700',
  'radical': 'bg-pink-100 text-pink-700',
} as const;

export const EnhancedCharacterNode = memo(({ data, selected }: EnhancedCharacterNodeProps) => {
  const {
    label,
    pinyin,
    isLearned,
    isMastered,
    textbook,
    isLocked,
    isCenterNode,
  } = data;

  return (
    <div
      className={cn(
        "relative px-6 py-4 rounded-xl border-2 transition-all duration-300",
        "hover:shadow-lg hover:scale-105",
        "bg-white",
        // 中心节点样式
        isCenterNode && "border-blue-500 bg-blue-50 shadow-xl scale-110",
        // 已学样式
        isLearned && !isCenterNode && "border-green-500 bg-green-50",
        // 已掌握样式
        isMastered && !isCenterNode && "border-green-600 bg-green-100 shadow-md",
        // 未学样式
        !isLearned && !isCenterNode && "border-gray-300",
        // 选中样式
        selected && "ring-4 ring-blue-300",
        // 锁定样式
        isLocked && "opacity-60 cursor-not-allowed"
      )}
    >
      {/* 连接点 */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-blue-500 !w-2 !h-2"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-blue-500 !w-2 !h-2"
      />

      {/* 教材标签 */}
      {textbook && (
        <div className="absolute -top-2 -right-2">
          <span
            className={cn(
              "text-xs px-2 py-0.5 rounded-full font-medium",
              textbookColors[textbook]
            )}
          >
            {textbookLabels[textbook]}
          </span>
        </div>
      )}

      {/* 状态图标 */}
      <div className="absolute -top-2 -left-2">
        {isLearned && (
          <div className="bg-green-500 rounded-full p-1">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
        {isLocked && (
          <div className="bg-gray-400 rounded-full p-1">
            <Lock className="w-3 h-3 text-white" />
          </div>
        )}
      </div>

      {/* 汉字内容 */}
      <div className="text-center">
        <div
          className={cn(
            "font-kaiti font-bold leading-none",
            isCenterNode ? "text-5xl" : "text-3xl",
            isMastered && "text-green-700"
          )}
        >
          {label}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {pinyin}
        </div>
      </div>
    </div>
  );
});

EnhancedCharacterNode.displayName = 'EnhancedCharacterNode';
