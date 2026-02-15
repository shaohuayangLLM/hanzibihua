/**
 * 汉字图谱自定义连接线组件
 */

import { memo } from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';
import { EdgeType } from '@/types/graph';

interface CharacterEdgeData {
  label: string;
  type: EdgeType;
}

const CharacterEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps<CharacterEdgeData>) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // 根据类型设置颜色
  const getEdgeColor = () => {
    switch (data?.type) {
      case 'similar':
        return '#f97316'; // orange-500
      case 'radical':
        return '#22c55e'; // green-500
      case 'structure':
        return '#3b82f6'; // blue-500
      case 'word':
        return '#a855f7'; // purple-500
      case 'sentence':
        return '#ec4899'; // pink-500
      default:
        return '#94a3b8'; // slate-400
    }
  };

  const color = getEdgeColor();

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        stroke={color}
        strokeWidth={2}
        fill="none"
      />
      <text>
        <textPath
          href={`#${id}`}
          style={{ fontSize: 12, fill: color }}
          startOffset="50%"
          textAnchor="middle"
        >
          {data?.label}
        </textPath>
      </text>
    </>
  );
};

export default memo(CharacterEdge);
