import { useNavigate } from 'react-router-dom';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import { Button } from '@/components/ui/button';
import { FoldDemo } from '@/components/shapes/FoldDemo';

const ShapeLearning = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="w-full py-4 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center shadow-button text-xl">
            🔷
          </div>
          <h1 className="text-xl font-bold text-foreground">认识图形</h1>
          <span className="text-sm text-muted-foreground">图形变换演示</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <FoldDemo />
      </main>
    </div>
  );
};

export default ShapeLearning;
