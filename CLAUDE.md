# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

K12-Education is a Chinese character learning application for first-grade students, featuring stroke order animation (HanziWriter), pinyin quizzes, and textbook-aligned character practice. It is deployed as a subdirectory SPA (`/k12/`) within a larger portfolio site.

**Live**: https://ainside.cn/k12/

## Development Commands

```bash
# Start dev server (runs on http://localhost:8080/k12/)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

**Critical**: The dev server runs at `http://localhost:8080/k12/`, NOT root. All routes include the `/k12/` prefix.

## Deployment Architecture

This app is deployed as a **subdirectory** within the parent portfolio repository:

```
portfolio-2025/
├── k12/                    # Built output from K12-Education/dist/
├── K12-Education/          # Source code (this repo, .gitignored in parent)
├── vercel.json             # Routes /k12/* to k12/*
└── index.html              # Main portfolio with K12 entry card
```

**Deploy流程:**
1. In `K12-Education/`: `npm run build`
2. Copy `dist/*` to `../k12/`
3. In `portfolio-2025/`: `git add k12/ && git commit && git push`
4. Vercel auto-deploys

## High-Level Architecture

### Routing
- React Router v6 with `basename="/k12/"`
- Routes defined in `src/App.tsx`:
  - `/` - Main character learning page (`Index.tsx`)
  - `/quiz` - Pinyin quiz with reducer-based state (`PinyinQuiz.tsx`)
  - `/pinyin-basics` - Pinyin fundamentals (`PinyinBasics.tsx`)
  - `/install` - PWA installation guide

### Data Layer (Two-Tier)

**Local First, AI Fallback:**
1. **Local database** (`src/data/characterInfo.ts`) - Merged from 3 files (~900 characters)
2. **AI fallback** via Supabase Edge Function (`get-character-info`) for missing characters

```typescript
// Data merge pattern in characterInfo.ts
export const characterDatabase = {
  ...baseCharacters,
  ...grade1Vol1Characters,
  ...grade1Vol2Characters,
};

export const getCharacterInfo = (char: string) => {
  // Check local first, then call Supabase AI
};
```

**Character Data Structure:**
```typescript
interface CharacterInfo {
  character: string;
  pinyin: string;
  meaning: string;
  strokeCount: number;
  radicalInfo: string;
  structure?: string;
  words: Array<{word: string; pinyin: string; meaning: string}>;
  sentences: string[];
  additionalReadings?: PinyinReading[];  // 多音字
  quizContexts?: QuizContext[];
}
```

### Quiz System (Reducer Pattern)

`PinyinQuiz.tsx` uses `useReducer` for complex quiz state:

```typescript
type QuizAction =
  | { type: 'START'; questions: QuizQuestion[] }
  | { type: 'ANSWER'; answer: QuizAnswer }
  | { type: 'NEXT' | 'RESTART' | 'EXIT' };

// Question generation modes:
// - Comprehensive: Random from all characters
// - Nasal: Front/back nasal contrast (ang/an, eng/en, ing/in)
// - Tongue: Flat/curled tongue contrast (zh/z, ch/c, sh/s)
```

### Key Algorithms (src/data/characterInfo.ts)

- `removeTones()` - Strip tone marks for pinyin matching
- `extractTone()` - Extract tone number (1-4)
- `applyTone()` - Apply tone to first vowel
- `convertNasal()` - Front/back nasal conversion for quiz distractors
- `convertTongue()` - Flat/curled tongue conversion for quiz distractors

### Component Architecture

**Container/Presentational Pattern:**
- Pages (`src/pages/`) handle state, data fetching, navigation
- Components (`src/components/`) handle display and user interaction

**Example:**
```typescript
// Index.tsx (container)
const [character, setCharacter] = useState("");
const [characterInfo, setCharacterInfo] = useState<CharacterInfo | null>(null);
// Fetches data, manages loading state

// CharacterDetails.tsx (presentational)
interface Props { info: CharacterInfo; }
// Only displays data, no fetching logic
```

### Specialized Components

**HanziWriter Integration** (`StrokeDisplay.tsx`):
```typescript
HanziWriter.create(container, character, {
  strokeAnimationSpeed: 1,
  delayBetweenStrokes: 300,
  strokeColor: "#3d3226",
  drawingColor: "#e04a3a",
});
```

**田字格 (Field Grid)** - Pure CSS implementation in `index.css`:
```css
.mizige {
  border: 2px solid #333;
  /* Dashed cross lines via repeating-linear-gradient */
}
```

## Configuration Details

### Path Aliases (`tsconfig.json`)
```typescript
"@/*": ["./src/*"]
// Usage: import { Button } from "@/components/ui/button"
```

### Vite Config (`vite.config.ts`)
- `base: '/k12/'` - Subdirectory deployment
- Port 8080
- PWA with `vite-plugin-pwa` (auto-update service worker)

### Environment Variables (`.env`)
```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_PROJECT_ID=...
```

## Styling System

**CSS Variables** (`index.css`):
```css
--primary: 25 95% 55%;        /* Orange-red tone */
--accent: 160 60% 45%;        /* Green tone */
--radius: 1rem;
```

**Font Strategy:**
- Primary: System Kaiti (楷书) for educational authenticity
- Fallback: Google Fonts (Ma Shan Zheng, Long Cang)
- Class: `.font-kaiti`, `.font-brush`

## Unique Conventions

1. **Pinyin tone handling** - Custom algorithms for tone manipulation, not regex-based
2. **No form library** - Simple controlled inputs for child-friendly UX
3. **shadcn/ui** - Copy-paste components (not npm package), in `src/components/ui/`
4. **Text-to-Speech** - Web Speech API directly in components, not abstracted
5. **Textbook filtering** - Filter characters by textbook volume (人教版、北师大版、苏教版)

## Data Files

| File | Purpose |
|------|---------|
| `src/data/types.ts` | All TypeScript interfaces (centralized) |
| `src/data/baseCharacters.ts` | ~200 common characters |
| `src/data/grade1Vol1Characters.ts` | ~300 Grade 1 Vol 1 |
| `src/data/grade1Vol2Characters.ts` | ~400 Grade 1 Vol 2 |
| `src/data/characterInfo.ts` | Data access + quiz generation |
| `src/data/pinyinBasics.ts` | 23 initials, 24 finals, 16 whole-syllable |
