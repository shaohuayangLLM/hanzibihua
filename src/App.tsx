import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Install from "./pages/Install";
import PinyinQuiz from "./pages/PinyinQuiz";
import PinyinBasics from "./pages/PinyinBasics";
import RadicalLearning from "./pages/RadicalLearning";
import PolyphonePractice from "./pages/PolyphonePractice";
import SimilarCharacters from "./pages/SimilarCharacters";
import QuantityWordPractice from "./pages/QuantityWordPractice";
import AntonymSynonymPractice from "./pages/AntonymSynonymPractice";
import WordCollocationPractice from "./pages/WordCollocationPractice";
import SentenceExpansionPractice from "./pages/SentenceExpansionPractice";
import StrokeNames from "./pages/StrokeNames";
import NotFound from "./pages/NotFound";
import MathHome from "./pages/math/Home";
import MathModulePage from "./pages/math/ModulePage";
import MathTestPage from "./pages/math/TestPage";
import MathResultPage from "./pages/math/ResultPage";
import KnowledgePage from "./pages/math/KnowledgePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/k12">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quiz" element={<PinyinQuiz />} />
          <Route path="/pinyin-basics" element={<PinyinBasics />} />
          <Route path="/radicals" element={<RadicalLearning />} />
          <Route path="/polyphone" element={<PolyphonePractice />} />
          <Route path="/similar-characters" element={<SimilarCharacters />} />
          <Route path="/quantity-words" element={<QuantityWordPractice />} />
          <Route path="/antonym-synonym" element={<AntonymSynonymPractice />} />
          <Route path="/word-collocation" element={<WordCollocationPractice />} />
          <Route path="/sentence-expansion" element={<SentenceExpansionPractice />} />
          <Route path="/stroke-names" element={<StrokeNames />} />
          <Route path="/install" element={<Install />} />
          {/* Math Module Routes */}
          <Route path="/math" element={<MathHome />} />
          <Route path="/math/module/:moduleId" element={<MathModulePage />} />
          <Route path="/math/knowledge/:moduleId" element={<KnowledgePage />} />
          <Route path="/math/test/:moduleId" element={<MathTestPage />} />
          <Route path="/math/result/:sessionId" element={<MathResultPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
