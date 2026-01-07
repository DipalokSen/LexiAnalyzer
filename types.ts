
export interface BandInsight {
  reason: string;
  mistake: string;
  usage: string;
}

export interface TaskUsage {
  task1: string;
  task2: string;
  reading: string;
}

export interface VocabularyItem {
  word: string;
  pos: string;
  englishMeaning: string;
  bengaliMeaning: string;
  alternatives: string[];
  collocations: string[];
  exampleSentence: string;
  banglaExample: string;
  isHighValue: boolean;
  registerWarning?: string;
  paraphrasedSentence: string;
  memoryHook: string;
  bandInsight: BandInsight;
  taskUsage: TaskUsage;
}

export interface AnalysisResult {
  vocabulary: VocabularyItem[];
  originalText: string;
  summary: string;
}
