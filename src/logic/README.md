# Lens Logic Refactor Documentation

## Overview
The lens recommendation logic has been refactored into smaller, more maintainable components. This modular approach improves code organization, testability, and maintainability.

## File Structure

```
src/logic/
├── types.ts                    # TypeScript interfaces and types
├── questionsFlow.ts           # Quiz questions and navigation logic
├── lensData.ts               # Comprehensive lens database
├── userProfileAnalyzer.ts    # User profile analysis utilities
├── recommendationEngine.ts   # Core recommendation logic
└── lensLogic.ts             # Main entry point (backward compatible)
```

## Components Description

### 1. `types.ts`
Contains all TypeScript interfaces and type definitions:
- `Question`, `Option`, `QuizAnswer`
- `LensRecommendation` (enhanced with `category` and `emoji`)
- `UserProfile`

### 2. `questionsFlow.ts`
Manages the quiz flow and navigation:
- Question definitions
- Navigation logic (`getNextQuestion`)

### 3. `lensData.ts`
Comprehensive lens database following your specifications:
- **👓 Progressive Lenses** (Premium & Standard)
  - Varilux X Series, Varilux Physio, Zeiss SmartLife Progressive
  - Varilux Comfort Max, Kodak Unique II HD, Zeiss Light 2
- **💻 Digital/Blue Light Lenses**
  - Eyezen Boost, Zeiss Digital Light 2
  - Kodak PowerUp
- **☀️ Photochromic Lenses**
  - Transitions GEN S, Zeiss PhotoFusion X
  - Kodak EvoBlue
- **🧾 Custom Single Vision Lenses**
  - Crizal (Essilor), Zeiss SV Superb
  - Kodak UVBlue
- **📦 Stock Single Vision Lenses**
  - Crizal FSV, Zeiss ClearView FSV
  - Kodak UVBlue FSV, Polycore UBlue FSV

### 4. `userProfileAnalyzer.ts`
User profile analysis and helper functions:
- `createUserProfile()` - Converts quiz answers to user profile
- Helper functions:
  - `isPresbyopiaCandidate()`
  - `isDigitalIntensiveUser()`
  - `isOutdoorActive()`
  - `needsCustomLens()`
  - `prefersPremium()`
  - `isYoungUser()`

### 5. `recommendationEngine.ts`
Core recommendation logic:
- `generateLensRecommendations()` - Main recommendation algorithm
- Scoring system based on user profile
- Priority-based recommendation selection
- `getRecommendationSummary()` - Generate summary text

### 6. `lensLogic.ts`
Main entry point that maintains backward compatibility:
- Re-exports all types and functions
- Main `generateRecommendation()` function
- Utility functions for external use

## Key Improvements

### 1. **Accurate Lens Data**
All lens recommendations now match your exact specifications with:
- Correct brand names and models
- Accurate feature descriptions
- Proper price ranges
- Category classifications (Premium/Standard)
- Emoji indicators

### 2. **Smart Recommendation Logic**
- **Priority-based selection**: Presbyopia → Digital → Photochromic → Custom → Stock
- **Scoring system**: Matches user preferences with lens features
- **First-time user consideration**: Suggests standard progressive for beginners
- **Budget-aware recommendations**: Respects user budget constraints

### 3. **Enhanced User Profiling**
- Comprehensive user profile creation from quiz answers
- Multiple helper functions for easy profile analysis
- Clear categorization of user needs

### 4. **Better Maintainability**
- Modular structure for easy updates
- Separation of concerns
- Type safety throughout
- Clear documentation

## Usage Examples

### Basic Usage (Backward Compatible)
```typescript
import { generateRecommendation, QuizAnswer } from './lensLogic';

const answers: QuizAnswer[] = [
  { questionId: 'age', answer: 'over-40' },
  { questionId: 'budget', answer: 'premium' },
  // ... other answers
];

const recommendations = generateRecommendation(answers);
```

### Advanced Usage
```typescript
import { 
  createUserProfile, 
  generateLensRecommendations,
  isPresbyopiaCandidate 
} from './lensLogic';

const profile = createUserProfile(answers);
if (isPresbyopiaCandidate(profile)) {
  console.log('User needs progressive lenses');
}

const recommendations = generateLensRecommendations(profile);
```

### Direct Lens Data Access
```typescript
import { progressiveLenses, digitalLenses } from './lensLogic';

const premiumProgressiveLenses = progressiveLenses.premium;
const standardDigitalLenses = digitalLenses.standard;
```

## Recommendation Categories

The system now properly categorizes recommendations based on your specifications:

1. **👓 Presbyopia/Progressive** - For users over 40 or with reading difficulties
2. **💻 Digital/Blue Light** - For intensive screen users (>8 hours)
3. **☀️ Photochromic** - For outdoor activities
4. **🧾 Custom Single Vision** - For specific prescriptions
5. **📦 Stock Single Vision** - For quick, ready-made solutions

Each category has both Premium and Standard options with accurate pricing and features.

## Testing
The modular structure makes it easy to test individual components:
- Test user profile creation separately
- Test recommendation scoring independently
- Mock lens data for unit tests
- Test question flow navigation

This refactored system provides a solid foundation for your optical lens recommendation system with accurate data, smart logic, and maintainable code structure.
