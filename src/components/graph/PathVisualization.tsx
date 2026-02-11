/**
 * 学习路径可视化组件
 *
 * 在图谱画布上高亮显示完整的学习路径
 */

import { useCallback, useEffect, useMemo } from 'react';
import { Node, Edge } from 'reactflow';
import { LearningRecord } from '@/types/graph';

interface PathVisualizationProps {
  records: LearningRecord[];
  currentPath: string[];
  nodes: Node[];
  edges: Edge[];
  isPathMode: boolean;
  onNodesUpdate: (nodes: Node[]) => void;
  onEdgesUpdate: (edges: Edge[]) => void;
}

/**
 * 路径可视化 Hook
 *
 * 根据学习记录高亮节点和边
 */
export const usePathVisualization = ({
  records,
  currentPath,
  nodes,
  edges,
  isPathMode,
  onNodesUpdate,
  onEdgesUpdate,
}: PathVisualizationProps) => {

  // 构建路径边集合（A → B 的连接关系）
  const pathEdges = useMemo(() => {
    const edges = new Set<string>();

    for (let i = 0; i < currentPath.length - 1; i++) {
      const from = currentPath[i];
      const to = currentPath[i + 1];
      edges.add(`${from}-${to}`);
      edges.add(`${to}-${from}`); // 双向边
    }

    return edges;
  }, [currentPath]);

  // 更新节点样式
  const updateNodesStyle = useCallback(() => {
    if (!isPathMode) {
      // 退出路径模式，恢复默认样式
      const resetNodes = nodes.map(node => ({
        ...node,
        style: {
          ...node.style,
          opacity: 1,
          filter: 'none',
        },
      }));
      onNodesUpdate(resetNodes);
      return;
    }

    // 路径模式：高亮路径上的节点
    const pathSet = new Set(currentPath);
    const highlightedNodes = nodes.map(node => {
      const isInPath = pathSet.has(node.data.label);

      return {
        ...node,
        style: {
          ...node.style,
          opacity: isInPath ? 1 : 0.3,
          filter: isInPath ? 'none' : 'grayscale(0.5)',
          transition: 'all 0.3s ease-in-out',
        },
        data: {
          ...node.data,
          isHighlighted: isInPath,
        },
      };
    });

    onNodesUpdate(highlightedNodes);
  }, [isPathMode, currentPath, nodes, onNodesUpdate]);

  // 更新边样式
  const updateEdgesStyle = useCallback(() => {
    if (!isPathMode) {
      // 退出路径模式，恢复默认样式
      const resetEdges = edges.map(edge => ({
        ...edge,
        animated: false,
        style: {
          stroke: '#94a3b8',
          strokeWidth: 2,
          opacity: 1,
        },
      }));
      onEdgesUpdate(resetEdges);
      return;
    }

    // 路径模式：高亮路径上的边
    const highlightedEdges = edges.map(edge => {
      const source = edge.source;
      const target = edge.target;
      const edgeKey = `${source}-${target}`;
      const isInPath = pathEdges.has(edgeKey);

      return {
        ...edge,
        animated: isInPath,
        style: {
          stroke: isInPath ? '#3b82f6' : '#94a3b8',
          strokeWidth: isInPath ? 3 : 2,
          opacity: isInPath ? 1 : 0.2,
          transition: 'all 0.3s ease-in-out',
        },
      };
    });

    onEdgesUpdate(highlightedEdges);
  }, [isPathMode, pathEdges, edges, onEdgesUpdate]);

  // 自动更新样式
  useEffect(() => {
    updateNodesStyle();
    updateEdgesStyle();
  }, [updateNodesStyle, updateEdgesStyle]);

  return {
    isActive: isPathMode,
    pathLength: currentPath.length,
  };
};

/**
 * 路径统计信息组件
 */
interface PathStatsProps {
  currentPath: string[];
  records: LearningRecord[];
}

export const PathStats = ({ currentPath, records }: PathStatsProps) => {
  if (currentPath.length === 0) {
    return null;
  }

  // 计算路径时长
  const pathDuration = useMemo(() => {
    if (records.length < 2) return 0;

    const pathRecords = records.filter(r => currentPath.includes(r.character));
    if (pathRecords.length < 2) return 0;

    const start = pathRecords[0].learnedAt.getTime();
    const end = pathRecords[pathRecords.length - 1].learnedAt.getTime();
    const minutes = Math.floor((end - start) / 1000 / 60);

    return minutes;
  }, [currentPath, records]);

  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <span className="font-semibold text-foreground">{currentPath.length}</span>
        <span>个汉字</span>
      </div>
      {pathDuration > 0 && (
        <div className="flex items-center gap-1">
          <span className="font-semibold text-foreground">{pathDuration}</span>
          <span>分钟</span>
        </div>
      )}
    </div>
  );
};

/**
 * 路径面包屑组件
 */
interface PathBreadcrumbProps {
  currentPath: string[];
  onCharacterClick?: (char: string) => void;
}

export const PathBreadcrumb = ({ currentPath, onCharacterClick }: PathBreadcrumbProps) => {
  if (currentPath.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground py-4">
        暂无学习路径
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1">
      {currentPath.map((char, index) => (
        <span key={index} className="flex items-center gap-1">
          <button
            className="font-kaiti text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
            onClick={() => onCharacterClick?.(char)}
          >
            {char}
          </button>
          {index < currentPath.length - 1 && (
            <span className="text-muted-foreground text-xs">→</span>
          )}
        </span>
      ))}
    </div>
  );
};
