/**
 * 图谱控制面板组件
 */

import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { GraphFilters } from '@/types/graph';
import { RotateCcw } from 'lucide-react';

interface GraphControlsProps {
  filters: GraphFilters;
  onFilterChange: (filters: GraphFilters) => void;
  onResetView: () => void;
}

const GraphControls = ({ filters, onFilterChange, onResetView }: GraphControlsProps) => {
  return (
    <Card className="p-4 space-y-4">
      <div className="font-semibold text-sm">关系类型筛选</div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="similar"
            checked={filters.showSimilar}
            onCheckedChange={(checked) =>
              onFilterChange({ ...filters, showSimilar: checked as boolean })
            }
          />
          <label
            htmlFor="similar"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
          >
            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
            形近字
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="radical"
            checked={filters.showRadical}
            onCheckedChange={(checked) =>
              onFilterChange({ ...filters, showRadical: checked as boolean })
            }
          />
          <label
            htmlFor="radical"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
          >
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            同部首
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="structure"
            checked={filters.showStructure}
            onCheckedChange={(checked) =>
              onFilterChange({ ...filters, showStructure: checked as boolean })
            }
          />
          <label
            htmlFor="structure"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
          >
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            结构相似
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="word"
            checked={filters.showWord}
            onCheckedChange={(checked) =>
              onFilterChange({ ...filters, showWord: checked as boolean })
            }
          />
          <label
            htmlFor="word"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
          >
            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
            组词关系
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="sentence"
            checked={filters.showSentence}
            onCheckedChange={(checked) =>
              onFilterChange({ ...filters, showSentence: checked as boolean })
            }
          />
          <label
            htmlFor="sentence"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
          >
            <span className="w-3 h-3 rounded-full bg-pink-500"></span>
            例句关系
          </label>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onResetView}
        className="w-full"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        重置视图
      </Button>
    </Card>
  );
};

export default GraphControls;
