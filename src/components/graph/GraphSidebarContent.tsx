/**
 * 图谱侧边栏内容组件（可复用于桌面端和移动端）
 */

import { GraphFilterConfig } from '@/types/graph';
import { LearningRecord } from '@/types/graph';
import { GraphControlPanel } from './GraphControlPanel';
import { LearningHistorySidebar } from './LearningHistorySidebar';

interface GraphSidebarContentProps {
  filter: GraphFilterConfig;
  onFilterChange: (filter: GraphFilterConfig) => void;
  records: LearningRecord[];
  currentPath: string[];
  currentChar: string;
  onResetPath: () => void;
  onClearAll: () => void;
  onSelectCharacter: (char: string) => void;
  isPathMode: boolean;
  onTogglePathMode: () => void;
}

export const GraphSidebarContent = ({
  filter,
  onFilterChange,
  records,
  currentPath,
  currentChar,
  onResetPath,
  onClearAll,
  onSelectCharacter,
  isPathMode,
  onTogglePathMode,
}: GraphSidebarContentProps) => {
  return (
    <div className="space-y-4">
      <GraphControlPanel filter={filter} onChange={onFilterChange} />

      <LearningHistorySidebar
        records={records}
        currentPath={currentPath}
        currentChar={currentChar}
        onResetPath={onResetPath}
        onClearAll={onClearAll}
        onSelectCharacter={onSelectCharacter}
        isPathMode={isPathMode}
        onTogglePathMode={onTogglePathMode}
      />
    </div>
  );
};
