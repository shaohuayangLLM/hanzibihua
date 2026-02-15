import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const Install = lazy(() => import("./pages/Install"));
const StrokeLearning = lazy(() => import("./pages/StrokeLearning"));
const PinyinQuiz = lazy(() => import("./pages/PinyinQuiz"));
const PinyinBasics = lazy(() => import("./pages/PinyinBasics"));
const PinyinCombination = lazy(() => import("./pages/PinyinCombination"));
const RadicalLearning = lazy(() => import("./pages/RadicalLearning"));
const PolyphonePractice = lazy(() => import("./pages/PolyphonePractice"));
const SimilarCharacters = lazy(() => import("./pages/SimilarCharacters"));
const QuantityWordPractice = lazy(() => import("./pages/QuantityWordPractice"));
const AntonymSynonymPractice = lazy(() => import("./pages/AntonymSynonymPractice"));
const HomophoneMeaningPractice = lazy(() => import("./pages/HomophoneMeaningPractice"));
const StrokeNames = lazy(() => import("./pages/StrokeNames"));
const CharacterFinder = lazy(() => import("./pages/CharacterFinder"));
const FindDifferentGame = lazy(() => import("./pages/FindDifferentGame"));
const PuzzleGame = lazy(() => import("./pages/PuzzleGame"));
const CharacterGraph = lazy(() => import("./pages/CharacterGraph"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MathHome = lazy(() => import("./pages/math/Home"));
const MathModulePage = lazy(() => import("./pages/math/ModulePage"));
const MathTestPage = lazy(() => import("./pages/math/TestPage"));
const MathResultPage = lazy(() => import("./pages/math/ResultPage"));
const KnowledgePage = lazy(() => import("./pages/math/KnowledgePage"));
const LetterSounds = lazy(() => import("./pages/english/LetterSounds"));
const CVCPractice = lazy(() => import("./pages/english/CVCPractice"));
const PhonicsRules = lazy(() => import("./pages/english/PhonicsRules"));
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
            <Route path="/quiz" element={<PinyinQuiz />} />
            <Route path="/pinyin-basics" element={<PinyinBasics />} />
            <Route path="/pinyin-combination" element={<PinyinCombination />} />
            <Route path="/radicals" element={<RadicalLearning />} />
            <Route path="/polyphone" element={<PolyphonePractice />} />
            <Route path="/similar-characters" element={<SimilarCharacters />} />
            <Route path="/quantity-words" element={<QuantityWordPractice />} />
            <Route path="/antonym-synonym" element={<AntonymSynonymPractice />} />
            <Route path="/homophone-meaning" element={<HomophoneMeaningPractice />} />
            <Route path="/stroke-names" element={<StrokeNames />} />
            <Route path="/character-finder" element={<CharacterFinder />} />
            <Route path="/find-different" element={<FindDifferentGame />} />
            <Route path="/puzzle-game" element={<PuzzleGame />} />
            <Route path="/character-graph" element={<CharacterGraph />} />

            <Route path="/install" element={<Install />} />
            {/* Math Module Routes */}
            <Route path="/math" element={<MathHome />} />
            <Route path="/math/module/:moduleId" element={<MathModulePage />} />
            <Route path="/math/knowledge/:moduleId" element={<KnowledgePage />} />
            <Route path="/math/test/:moduleId" element={<MathTestPage />} />
            <Route path="/math/result/:sessionId" element={<MathResultPage />} />
            {/* English Module Routes */}
            <Route path="/english/letter-sounds" element={<LetterSounds />} />
            <Route path="/english/cvc-practice" element={<CVCPractice />} />
            <Route path="/english/phonics-rules" element={<PhonicsRules />} />
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
