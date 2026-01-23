import { Card } from "@/components/ui/card";
import { getAllRadicals } from "@/data/radicalData";

interface RadicalSelectorProps {
  selectedRadical: string | null;
  onSelectRadical: (radical: string) => void;
}

export const RadicalSelector = ({
  selectedRadical,
  onSelectRadical,
}: RadicalSelectorProps) => {
  const radicals = getAllRadicals();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-foreground">
        选择偏旁（共 {radicals.length} 个）
      </h2>
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
        {radicals.map((item) => (
          <Card
            key={item.radical}
            className={`
              cursor-pointer transition-all duration-200
              hover:-translate-y-1 hover:shadow-lg
              ${selectedRadical === item.radical
                ? 'bg-primary text-primary-foreground ring-2 ring-primary'
                : 'bg-card hover:bg-card/80'
              }
            `}
            onClick={() => onSelectRadical(item.radical)}
          >
            <div className="min-h-16 flex items-center justify-center p-2">
              <span className="text-3xl font-medium">
                {item.radical}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
