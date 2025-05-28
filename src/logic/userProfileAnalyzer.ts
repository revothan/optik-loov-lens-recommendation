import { QuizAnswer, UserProfile } from './types';

export function createUserProfile(answers: QuizAnswer[]): UserProfile {
  return {
    age: getAnswer(answers, 'age'),
    activity: getAnswer(answers, 'activity'),
    screenTime: getAnswer(answers, 'screen-time'),
    photochromic: getAnswer(answers, 'photochromic'),
    visionType: getAnswer(answers, 'vision-type'),
    progressiveComfort: getAnswer(answers, 'progressive-comfort'),
    visionCorrection: getAnswer(answers, 'vision-correction'),
    astigmatism: getAnswer(answers, 'astigmatism'),
    preferences: getAnswerArray(answers, 'lens-preference'),
    budget: getAnswer(answers, 'budget')
  };
}

function getAnswer(answers: QuizAnswer[], questionId: string): string {
  const answer = answers.find(a => a.questionId === questionId)?.answer;
  return Array.isArray(answer) ? answer[0] || '' : answer || '';
}

function getAnswerArray(answers: QuizAnswer[], questionId: string): string[] {
  const answer = answers.find(a => a.questionId === questionId)?.answer;
  return Array.isArray(answer) ? answer : answer ? [answer] : [];
}

export function isPresbyopiaCandidate(profile: UserProfile): boolean {
  return (
    profile.age === 'over-40' ||
    profile.visionType === 'both' ||
    profile.visionType === 'reading-only' ||
    profile.visionCorrection === 'presbyopia'
  );
}

export function isDigitalIntensiveUser(profile: UserProfile): boolean {
  return (
    profile.screenTime === 'high' ||
    profile.preferences.includes('blue-light')
  );
}

export function isOutdoorActive(profile: UserProfile): boolean {
  return (
    profile.activity === 'outdoor' ||
    profile.photochromic === 'yes'
  );
}

export function needsCustomLens(profile: UserProfile): boolean {
  return (
    profile.astigmatism === 'yes' ||
    profile.preferences.includes('thin') ||
    profile.visionCorrection !== '' && profile.visionCorrection !== 'none'
  );
}

export function prefersPremium(profile: UserProfile): boolean {
  return (
    profile.budget === 'luxury' ||
    profile.budget === 'premium'
  );
}

export function isYoungUser(profile: UserProfile): boolean {
  return (
    profile.age === 'under-25' ||
    profile.age === '25-40'
  );
}

export function isFirstTimeProgressive(profile: UserProfile): boolean {
  return (
    profile.progressiveComfort === 'never-tried' ||
    profile.progressiveComfort === 'no'
  );
}

export function hasSpecialPreferences(profile: UserProfile): boolean {
  return profile.preferences.length > 0;
}
