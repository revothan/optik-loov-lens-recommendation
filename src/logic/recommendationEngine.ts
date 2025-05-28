import { LensRecommendation, UserProfile } from './types';
import {
  progressiveLenses,
  digitalLenses,
  photochromicLenses,
  customSingleVisionLenses,
  stockSingleVisionLenses
} from './lensData';
import {
  isPresbyopiaCandidate,
  isDigitalIntensiveUser,
  isOutdoorActive,
  needsCustomLens,
  prefersPremium,
  isYoungUser,
  isFirstTimeProgressive
} from './userProfileAnalyzer';

export function generateLensRecommendations(profile: UserProfile): LensRecommendation[] {
  const recommendations: LensRecommendation[] = [];
  const tier = prefersPremium(profile) ? 'premium' : 'standard';

  // Priority 1: Presbyopia/Progressive lenses for 40+
  if (isPresbyopiaCandidate(profile)) {
    const progressive = selectBestFromCategory(progressiveLenses[tier], profile);
    if (progressive) {
      // Adjust recommendation for first-time users
      if (isFirstTimeProgressive(profile) && tier === 'premium') {
        // Suggest starting with standard for first-time users
        const standardProgressive = selectBestFromCategory(progressiveLenses.standard, profile);
        if (standardProgressive) {
          standardProgressive.reasons.push('Recommended untuk pemula progresif');
          recommendations.push(standardProgressive);
        } else {
          recommendations.push(progressive);
        }
      } else {
        recommendations.push(progressive);
      }
    }
  }

  // Priority 2: Digital intensive users (>8 hours screen time)
  if (isDigitalIntensiveUser(profile) && recommendations.length < 3) {
    const digital = selectBestFromCategory(digitalLenses[tier], profile);
    if (digital) {
      recommendations.push(digital);
    }
  }

  // Priority 3: Outdoor/Photochromic for active users
  if (isOutdoorActive(profile) && recommendations.length < 3) {
    const photochromic = selectBestFromCategory(photochromicLenses[tier], profile);
    if (photochromic) {
      recommendations.push(photochromic);
    }
  }

  // Priority 4: Custom single vision for specific needs
  if (needsCustomLens(profile) && recommendations.length < 3 && !isPresbyopiaCandidate(profile)) {
    const custom = selectBestFromCategory(customSingleVisionLenses[tier], profile);
    if (custom) {
      recommendations.push(custom);
    }
  }

  // Priority 5: Stock lenses for quick solutions
  if (recommendations.length < 3) {
    const stock = selectBestFromCategory(stockSingleVisionLenses[tier], profile);
    if (stock) {
      recommendations.push(stock);
    }
  }

  // Ensure we have at least one recommendation
  if (recommendations.length === 0) {
    recommendations.push(getDefaultRecommendation(profile));
  }

  return recommendations.slice(0, 3);
}

function selectBestFromCategory(
  lenses: LensRecommendation[],
  profile: UserProfile
): LensRecommendation | null {
  if (lenses.length === 0) return null;

  // Score each lens based on user profile
  const scoredLenses = lenses.map(lens => ({
    lens,
    score: calculateLensScore(lens, profile)
  }));

  // Sort by score and return the best match
  scoredLenses.sort((a, b) => b.score - a.score);
  return scoredLenses[0].lens;
}

function calculateLensScore(lens: LensRecommendation, profile: UserProfile): number {
  let score = 0;

  // Base score for matching tier
  score += lens.category === (prefersPremium(profile) ? 'premium' : 'standard') ? 10 : 5;

  // Bonus for specific brand preferences or features
  if (profile.preferences.includes('thin') && lens.features.some(f => 
    f.toLowerCase().includes('tipis') || f.toLowerCase().includes('ringan'))) {
    score += 5;
  }

  if (profile.preferences.includes('anti-glare') && lens.features.some(f => 
    f.toLowerCase().includes('anti') || f.toLowerCase().includes('silau'))) {
    score += 5;
  }

  if (profile.preferences.includes('blue-light') && lens.features.some(f => 
    f.toLowerCase().includes('blue') || f.toLowerCase().includes('biru'))) {
    score += 5;
  }

  if (profile.preferences.includes('scratch-resistant') && lens.features.some(f => 
    f.toLowerCase().includes('gores') || f.toLowerCase().includes('tahan'))) {
    score += 5;
  }

  // Age-specific scoring
  if (isYoungUser(profile) && lens.description.toLowerCase().includes('remaja')) {
    score += 3;
  }

  if (isPresbyopiaCandidate(profile) && lens.type.includes('Progresif')) {
    score += 8;
  }

  // Activity-based scoring
  if (profile.activity === 'outdoor' && lens.type.includes('Photochromic')) {
    score += 6;
  }

  if (profile.screenTime === 'high' && lens.type.includes('Digital')) {
    score += 6;
  }

  // Budget alignment
  if (profile.budget === 'luxury' && lens.category === 'premium') {
    score += 3;
  }

  if (profile.budget === 'economy' && lens.category === 'standard') {
    score += 3;
  }

  return score;
}

function getDefaultRecommendation(profile: UserProfile): LensRecommendation {
  const tier = prefersPremium(profile) ? 'premium' : 'standard';
  
  if (tier === 'premium') {
    return customSingleVisionLenses.premium[0];
  } else {
    return stockSingleVisionLenses.standard[0];
  }
}

export function getRecommendationSummary(recommendations: LensRecommendation[]): string {
  if (recommendations.length === 0) return 'Tidak ada rekomendasi yang tersedia.';

  const categories = recommendations.map(r => r.emoji).join(' ');
  const premiumCount = recommendations.filter(r => r.category === 'premium').length;
  const standardCount = recommendations.filter(r => r.category === 'standard').length;

  let summary = `${categories} Kami merekomendasikan ${recommendations.length} pilihan lensa untuk Anda. `;
  
  if (premiumCount > 0 && standardCount > 0) {
    summary += `Terdapat ${premiumCount} pilihan premium dan ${standardCount} pilihan standard.`;
  } else if (premiumCount > 0) {
    summary += `Semua rekomendasi adalah pilihan premium untuk performa optimal.`;
  } else {
    summary += `Semua rekomendasi adalah pilihan standard dengan nilai terbaik.`;
  }

  return summary;
}
