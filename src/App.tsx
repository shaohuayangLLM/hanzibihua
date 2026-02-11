import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Install from "./pages/Install";
import StrokeLearning from "./pages/StrokeLearning";
import PinyinQuiz from "./pages/PinyinQuiz";
import PinyinBasics from "./pages/PinyinBasics";
import PinyinCombination from "./pages/PinyinCombination";
import RadicalLearning from "./pages/RadicalLearning";
import PolyphonePractice from "./pages/PolyphonePractice";
import SimilarCharacters from "./pages/SimilarCharacters";
import QuantityWordPractice from "./pages/QuantityWordPractice";
import AntonymSynonymPractice from "./pages/AntonymSynonymPractice";
import WordCollocationPractice from "./pages/WordCollocationPractice";
import SentenceExpansionPractice from "./pages/SentenceExpansionPractice";
import StrokeNames from "./pages/StrokeNames";
import CharacterFinder from "./pages/CharacterFinder";
import FindDifferentGame from "./pages/FindDifferentGame";
import PuzzleGame from "./pages/PuzzleGame";
import CharacterGraph from "./pages/CharacterGraph";

import NotFound from "./pages/NotFound";
import MathHome from "./pages/math/Home";
import MathModulePage from "./pages/math/ModulePage";
import MathTestPage from "./pages/math/TestPage";
import MathResultPage from "./pages/math/ResultPage";
import KnowledgePage from "./pages/math/KnowledgePage";
import LetterSounds from "./pages/english/LetterSounds";
import CVCPractice from "./pages/english/CVCPractice";
import PhonicsRules from "./pages/english/PhonicsRules";
import { VoiceTest } from "./pages/VoiceTest";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/k12">
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
          <Route path="/word-collocation" element={<WordCollocationPractice />} />
          <Route path="/sentence-expansion" element={<SentenceExpansionPractice />} />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
