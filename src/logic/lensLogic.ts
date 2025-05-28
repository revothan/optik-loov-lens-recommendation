// Re-export types for backward compatibility
export type {
  Question,
  Option,
  QuizAnswer,
  LensRecommendation,
  UserProfile
} from './types';

// Re-export question flow
export { questions, getNextQuestion } from './questionsFlow';

// Main recommendation function
import { QuizAnswer, LensRecommendation } from './types';
import { createUserProfile } from './userProfileAnalyzer';
import { generateLensRecommendations, getRecommendationSummary } from './recommendationEngine';

/**
 * Main function to generate lens recommendations based on quiz answers
 * @param answers Array of quiz answers
 * @returns Array of lens recommendations (max 3)
 */
export function generateRecommendation(answers: QuizAnswer[]): LensRecommendation[] {
  // Create user profile from answers
  const userProfile = createUserProfile(answers);
  
  // Generate recommendations based on profile
  const recommendations = generateLensRecommendations(userProfile);
  
  return recommendations;
}

/**
 * Get a summary of the recommendations
 * @param recommendations Array of lens recommendations
 * @returns Summary string
 */
export function getRecommendationsSummary(recommendations: LensRecommendation[]): string {
  return getRecommendationSummary(recommendations);
}

// Export utility functions for components that might need them
export {
  createUserProfile,
  isPresbyopiaCandidate,
  isDigitalIntensiveUser,
  isOutdoorActive,
  needsCustomLens,
  prefersPremium,
  isYoungUser
} from './userProfileAnalyzer';

export { generateLensRecommendations } from './recommendationEngine';

// Export lens data for advanced use cases
export {
  progressiveLenses,
  digitalLenses,
  photochromicLenses,
  customSingleVisionLenses,
  stockSingleVisionLenses
} from './lensData';
