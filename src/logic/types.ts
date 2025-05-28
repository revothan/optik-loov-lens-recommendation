export interface Question {
  id: string;
  question: string;
  options: Option[];
  type: 'single' | 'multiple';
}

export interface Option {
  id: string;
  text: string;
  value: string;
  nextQuestion?: string;
}

export interface QuizAnswer {
  questionId: string;
  answer: string | string[];
}

export interface LensRecommendation {
  type: string;
  brand: string;
  features: string[];
  price: string;
  description: string;
  reasons: string[];
  category: 'premium' | 'standard';
  emoji: string;
}

export interface UserProfile {
  age: string;
  activity: string;
  screenTime: string;
  photochromic: string;
  visionType: string;
  progressiveComfort: string;
  visionCorrection: string;
  astigmatism: string;
  preferences: string[];
  budget: string;
}
