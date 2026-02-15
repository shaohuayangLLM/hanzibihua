/**
 * 汉字图谱自定义节点组件
 */

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card } from '@/components/ui/card';
import { NodeType } from '@/types/graph';

interface CharacterNodeData {
  label: string;
  pinyin: string;
  strokeCount: number;
  radical: string;
  type: NodeType;
}

const CharacterNode = ({ data }: NodeProps<CharacterNodeData>) => {
  const { label, pinyin, type } = data;

  // 根据类型设置样式
  const getNodeStyle = () => {
    switch (type) {
      case 'center':
        return {
          size: 'w-20 h-20',
          fontSize: 'text-4xl',
          borderColor: 'border-primary',
          bgColor: 'bg-primary/10',
        };
      case 'similar':
        return {
          size: 'w-16 h-16',
          fontSize: 'text-3xl',
          borderColor: 'border-orange-500',
          bgColor: 'bg-orange-50',
        };
      case 'radical':
        return {
          size: 'w-16 h-16',
          fontSize: 'text-3xl',
          borderColor: 'border-green-500',
          bgColor: 'bg-green-50',
        };
      case 'structure':
        return {
          size: 'w-16 h-16',
          fontSize: 'text-3xl',
          borderColor: 'border-blue-500',
          bgColor: 'bg-blue-50',
        };
      case 'word':
        return {
          size: 'w-16 h-16',
          fontSize: 'text-3xl',
          borderColor: 'border-purple-500',
          bgColor: 'bg-purple-50',
        };
      case 'sentence':
        return {
          size: 'w-16 h-16',
          fontSize: 'text-3xl',
          borderColor: 'border-pink-500',
          bgColor: 'bg-pink-50',
        };
      default:
        return {
          size: 'w-16 h-16',
          fontSize: 'text-3xl',
          borderColor: 'border-gray-300',
          bgColor: 'bg-white',
        };
    }
  };

  const style = getNodeStyle();

  return (
    <div className="relative group">
      <Handle type="target" position={Position.Top} className="opacity-0" />

      <Card
        className={`${style.size} ${style.borderColor} ${style.bgColor} border-2 cursor-pointer hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-center p-2`}
      >
        <div className={`${style.fontSize} font-kaiti font-bold`}>{label}</div>
        <div className="text-xs text-muted-foreground mt-1">{pinyin}</div>
      </Card>

      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
};

export default memo(CharacterNode);
