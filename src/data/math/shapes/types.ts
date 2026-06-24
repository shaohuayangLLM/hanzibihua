/** 5 种基本平面图形 */
export type ShapeType = 'rectangle' | 'square' | 'triangle' | 'circle' | 'parallelogram';

export interface GridShape {
  type: ShapeType;
  gridW: number;
  gridH: number;
  path: string;
  color: string;
  label: string;
}

export interface PlacedPiece {
  id: string;
  shape: GridShape;
  gridX: number;
  gridY: number;
  rotation: 0 | 90 | 180 | 270;
  flipH: boolean;
  flipV: boolean;
}

export interface ShapeInfo {
  type: ShapeType;
  name: string;
  features: string[];
  sides: number;
  realWorldExamples: Array<{ name: string; emoji: string }>;
  svgPath: string;
  color: string;
}

export interface RecognitionQuestion {
  id: string;
  question: string;
  shapes: Array<{ type: ShapeType; id: string }>;
  answer: ShapeType;
}

export interface FoldStep {
  description: string;
  svgElements: Array<{
    type: 'shape' | 'foldLine' | 'cutLine' | 'arrow';
    path: string;
    color: string;
    opacity?: number;
    dashArray?: string;
  }>;
}

export interface FoldLesson {
  id: string;
  title: string;
  sourceShape: ShapeType;
  resultShapes: ShapeType[];
  method: string;
  steps: FoldStep[];
  summary: string;
}

export type PuzzleDifficulty = 'beginner' | 'intermediate' | 'challenge';

export interface PuzzleLevel {
  id: string;
  title: string;
  difficulty: PuzzleDifficulty;
  gridSize: { cols: number; rows: number };
  targetOutline: string;
  availablePieces: GridShape[];
  solutionPlacements: Array<{
    shapeIndex: number;
    gridX: number;
    gridY: number;
    rotation: 0 | 90 | 180 | 270;
    flipH: boolean;
  }>;
  transformHint: string;
}

export interface PatternQuestion {
  id: string;
  sequence: Array<{ type: ShapeType; color: string; size?: 'small' | 'medium' | 'large' }>;
  missingIndex: number;
  answer: { type: ShapeType; color: string; size?: 'small' | 'medium' | 'large' };
  options: Array<{ type: ShapeType; color: string; size?: 'small' | 'medium' | 'large' }>;
  patternRule: string;
}
