/**
 * 图谱控制面板组件
 * 
 * 提供关系类型筛选开关（形近字、部首、组词等）
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { GraphFilterConfig } from '@/types/graph';

interface GraphControlPanelProps {
  filter: GraphFilterConfig;
  onChange: (filter: GraphFilterConfig) => void;
}

const relationOptions = [
  { key: 'showSimilar', label: '形近字', icon: '📝' },
  { key: 'showRadical', label: '同部首', icon: '🔤' },
  { key: 'showWord', label: '组词关系', icon: '📚' },
  { key: 'showStructure', label: '结构关系', icon: '🏗️' },
  { key: 'showSentence', label: '例句关系', icon: '💬' },
  { key: 'showPronunciation', label: '多音字', icon: '🔊' },
] as const;

export const GraphControlPanel = ({ filter, onChange }: GraphControlPanelProps) => {
  const handleToggle = (key: keyof GraphFilterConfig) => {
    onChange({
      ...filter,
      [key]: !filter[key],
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">关系筛选</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {relationOptions.map(({ key, label, icon }) => (
          <div key={key} className="flex items-center justify-between">
            <Label
              htmlFor={key}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <span>{icon}</span>
              <span>{label}</span>
            </Label>
            <Switch
              id={key}
              checked={filter[key]}
              onCheckedChange={() => handleToggle(key)}
            />
          </div>
        ))}

        {/* 学习状态筛选 */}
        <div className="pt-3 border-t">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="onlyLearned"
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <span>✅</span>
              <span>只显示已学</span>
            </Label>
            <Switch
              id="onlyLearned"
              checked={filter.onlyLearned}
              onCheckedChange={() => handleToggle('onlyLearned')}
            />
          </div>
          <div className="flex items-center justify-between mt-3">
            <Label
              htmlFor="onlyUnlearned"
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <span>🔒</span>
              <span>只显示未学</span>
            </Label>
            <Switch
              id="onlyUnlearned"
              checked={filter.onlyUnlearned}
              onCheckedChange={() => handleToggle('onlyUnlearned')}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
