import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const Install = lazy(() => import("./pages/Install"));
const StrokeLearning = lazy(() => import("./pages/StrokeLearning"));
const PinyinBasics = lazy(() => import("./pages/PinyinBasics"));
const PinyinCombination = lazy(() => import("./pages/PinyinCombination"));
const RadicalLearning = lazy(() => import("./pages/RadicalLearning"));
const StrokeNames = lazy(() => import("./pages/StrokeNames"));
const CharacterFinder = lazy(() => import("./pages/CharacterFinder"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MathHome = lazy(() => import("./pages/math/Home"));
const MathModulePage = lazy(() => import("./pages/math/ModulePage"));
const MathTestPage = lazy(() => import("./pages/math/TestPage"));
const MathResultPage = lazy(() => import("./pages/math/ResultPage"));
const KnowledgePage = lazy(() => import("./pages/math/KnowledgePage"));
const ShapeLearning = lazy(() => import("./pages/math/ShapeLearning"));
const Grade1Vol2Home = lazy(() => import("./pages/math/grade1Vol2/Grade1Vol2Home"));
const G1V2UnitPage = lazy(() => import("./pages/math/grade1Vol2/UnitPage"));
const G1V2LessonPage = lazy(() => import("./pages/math/grade1Vol2/LessonPage"));
const VoiceTest = lazy(() => import("./pages/VoiceTest").then(m => ({ default: m.VoiceTest })));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/k12">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">加载中...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/stroke-learning" element={<StrokeLearning />} />
            <Route path="/pinyin-basics" element={<PinyinBasics />} />
            <Route path="/pinyin-combination" element={<PinyinCombination />} />
            <Route path="/radicals" element={<RadicalLearning />} />
            <Route path="/stroke-names" element={<StrokeNames />} />
            <Route path="/character-finder" element={<CharacterFinder />} />

            <Route path="/install" element={<Install />} />
            {/* Math Module Routes */}
            <Route path="/math/shapes" element={<ShapeLearning />} />
            <Route path="/math/g1v2" element={<Grade1Vol2Home />} />
            <Route path="/math/g1v2/unit/:unitId" element={<G1V2UnitPage />} />
            <Route path="/math/g1v2/lesson/:lessonId" element={<G1V2LessonPage />} />
            <Route path="/math" element={<MathHome />} />
            <Route path="/math/module/:moduleId" element={<MathModulePage />} />
            <Route path="/math/knowledge/:moduleId" element={<KnowledgePage />} />
            <Route path="/math/test/:moduleId" element={<MathTestPage />} />
            <Route path="/math/result/:sessionId" element={<MathResultPage />} />
            <Route path="/voice-test" element={<VoiceTest />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
