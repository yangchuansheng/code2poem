export type GameLevel = 'easy' | 'hard';

export interface PoemData {
  poem: string;
  code: string;
  hint?: string;
}

export interface GameState {
  score: number;
  streak: number;
  currentPoem: string;
  selectedChars: string[];
  availableChars: string[];
  codeSnippet: string;
  hint?: string;
}

export interface GameConfig {
  level: GameLevel;
  confusionCharCount: number;
}