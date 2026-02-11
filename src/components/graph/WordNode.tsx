/**
 * 词语节点组件
 * 
 * 用于显示双字词,支持双击展开为两个汉字节点
 */

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { WordNodeData } from '@/types/graph';
import { cn } from '@/lib/utils';

interface WordNodeProps extends NodeProps<WordNodeData> {}

export const WordNode = memo(({ data, selected }: WordNodeProps) => {
  const { word, pinyin, meaning } = data;

  return (
    <div
      className={cn(
        "relative px-4 py-3 rounded-lg border-2 transition-all duration-300",
        "hover:shadow-md hover:scale-105 cursor-pointer",
        "bg-purple-50 border-purple-300",
        selected && "ring-4 ring-purple-300 shadow-lg"
      )}
    >
      {/* 连接点 */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-purple-500 !w-2 !h-2"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-purple-500 !w-2 !h-2"
      />

      {/* 词语内容 */}
      <div className="text-center">
        <div className="font-kaiti font-bold text-2xl text-purple-700">
          {word}
        </div>
        <div className="text-xs text-purple-600 mt-0.5">
          {pinyin}
        </div>
        <div className="text-xs text-muted-foreground mt-1 max-w-[120px] truncate">
          {meaning}
        </div>
      </div>

      {/* 提示双击展开 */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        双击展开
      </div>
    </div>
  );
});

WordNode.displayName = 'WordNode';
