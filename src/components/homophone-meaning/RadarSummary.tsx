import { Card } from "@/components/ui/card";
import type { HomophoneMode } from "@/data/homophoneMeaningTypes";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface RadarSummaryProps {
  modeAccuracy: Record<HomophoneMode, number>;
}

const MODE_TO_METRIC: Record<HomophoneMode, string> = {
  choice: "字义辨析",
  context: "语境应用",
  input: "主动输出",
};

export const RadarSummary = ({ modeAccuracy }: RadarSummaryProps) => {
  const data = (Object.keys(modeAccuracy) as HomophoneMode[]).map(mode => ({
    metric: MODE_TO_METRIC[mode],
    accuracy: modeAccuracy[mode],
  }));

  return (
    <Card className="p-5 space-y-3">
      <p className="font-semibold">知识点雷达图</p>
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }} />
            <Tooltip formatter={(value: number) => [`${value}%`, "掌握度"]} />
            <Radar
              name="掌握度"
              dataKey="accuracy"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.35}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
