export type ZodiacSignName =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

export type ElementType = 'Fire' | 'Earth' | 'Air' | 'Water';
export type ModalityType = 'Cardinal' | 'Fixed' | 'Mutable';
export type PolarityType = 'Yang (Masculine)' | 'Yin (Feminine)';

export interface ZodiacSignInfo {
  name: ZodiacSignName;
  symbol: string;
  glyph: string;
  element: ElementType;
  modality: ModalityType;
  polarity: PolarityType;
  ruler: string;
  dateRange: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  traits: string[];
  keywords: string[];
  stone: string;
  color: string;
  celestialArchetype: string;
  description: string;
}

export type PlanetName =
  | 'Sun'
  | 'Moon'
  | 'Mercury'
  | 'Venus'
  | 'Mars'
  | 'Jupiter'
  | 'Saturn'
  | 'Uranus'
  | 'Neptune'
  | 'Pluto'
  | 'North Node'
  | 'Chiron';

export interface PlanetPlacement {
  planet: PlanetName;
  glyph: string;
  sign: ZodiacSignName;
  degree: number;
  minute: number;
  house: number;
  isRetrograde: boolean;
  meaning: string;
}

export interface HouseCusp {
  house: number;
  sign: ZodiacSignName;
  degree: number;
  title: string;
  domain: string;
}

export interface AspectInfo {
  planet1: PlanetName;
  planet2: PlanetName;
  aspectType: 'Conjunction' | 'Sextile' | 'Square' | 'Trine' | 'Opposition';
  angle: number;
  orb: number;
  nature: 'Harmonious' | 'Dynamic' | 'Intense' | 'Neutral';
  interpretation: string;
}

export interface BirthProfile {
  id: string;
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM
  birthPlace: string;
  latitude: number;
  longitude: number;
  sunSign: ZodiacSignName;
  moonSign: ZodiacSignName;
  ascendantSign: ZodiacSignName;
  placements: PlanetPlacement[];
  houses: HouseCusp[];
  aspects: AspectInfo[];
  createdAt: string;
}

export interface DailyTransitImpact {
  natalPlanet: PlanetName;
  transitPlanet: PlanetName;
  transitSign: ZodiacSignName;
  aspect: string;
  nature: 'Fortunate' | 'Challenging' | 'Empowering' | 'Transformative' | 'Dynamic';
  headline: string;
  guidance: string;
}

export interface DailyHoroscope {
  date: string;
  profileName: string;
  sunSign: ZodiacSignName;
  moonSign: ZodiacSignName;
  ascendantSign: ZodiacSignName;
  overallScore: number;
  cosmicTheme: string;
  summary: string;
  activeTransits: DailyTransitImpact[];
  loveForecast: string;
  careerForecast: string;
  wellnessForecast: string;
  spiritualGuidance: string;
  cosmicAffirmation: string;
  luckyNumbers: number[];
  luckyColor: string;
  powerHours: string;
  suggestedCrystal: string;
}

export interface CompatibilityAnalysis {
  sign1: ZodiacSignName;
  sign2: ZodiacSignName;
  overallScore: number;
  emotionalScore: number;
  communicationScore: number;
  passionScore: number;
  longevityScore: number;
  elementMatch: {
    type: string;
    description: string;
  };
  modalityMatch: {
    type: string;
    description: string;
  };
  keyStrengths: string[];
  growthFriction: string[];
  karmicAdvice: string;
  archetypeBond: string;
}

export type MoonPhaseType =
  | 'New Moon'
  | 'Waxing Crescent'
  | 'First Quarter'
  | 'Waxing Gibbous'
  | 'Full Moon'
  | 'Waning Gibbous'
  | 'Third Quarter'
  | 'Waning Crescent';

export interface MoonStatus {
  phaseName: MoonPhaseType;
  illumination: number; // 0 to 100
  moonAgeDays: number; // 0 to 29.53
  currentSign: ZodiacSignName;
  degreeInSign: number;
  isVoidOfCourse: boolean;
  astrologicalInfluence: string;
  ritualAdvice: string;
  nextNewMoon: string;
  nextFullMoon: string;
  lunarNodesSign: string;
}

export interface LunarCalendarDay {
  date: string;
  dayNumber: number;
  phaseName: MoonPhaseType;
  illumination: number;
  sign: ZodiacSignName;
  isKeyPhase: boolean;
}

export interface TransitEvent {
  id: string;
  planet: PlanetName;
  type: 'Retrograde' | 'Ingress' | 'Aspect' | 'Eclipse' | 'Full Moon' | 'New Moon';
  title: string;
  date: string;
  exactDegree?: string;
  intensity: 'High Cosmic Energy' | 'Moderate Shift' | 'Major Astrological Event';
  summary: string;
  impactedSigns: ZodiacSignName[];
  remedyOrRitual: string;
  isRetrogradeStation?: boolean;
}

export interface PushNotificationPreferences {
  enabled: boolean;
  permissionGranted: boolean;
  majorIngresses: boolean;
  retrogradeAlerts: boolean;
  moonPhases: boolean;
  personalTransits: boolean;
  dailyMorningDigest: boolean;
  digestTime: string; // e.g. "08:00"
}
