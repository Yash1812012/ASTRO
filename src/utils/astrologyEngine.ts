import {
  ZodiacSignName,
  ZodiacSignInfo,
  BirthProfile,
  PlanetPlacement,
  HouseCusp,
  AspectInfo,
  DailyHoroscope,
  DailyTransitImpact,
  CompatibilityAnalysis,
  MoonStatus,
  MoonPhaseType,
  LunarCalendarDay,
  TransitEvent,
  PlanetName,
} from '../types/astrology';

export const ZODIAC_SIGNS: Record<ZodiacSignName, ZodiacSignInfo> = {
  Aries: {
    name: 'Aries',
    symbol: 'Ram',
    glyph: '♈',
    element: 'Fire',
    modality: 'Cardinal',
    polarity: 'Yang (Masculine)',
    ruler: 'Mars',
    dateRange: 'Mar 21 – Apr 19',
    startMonth: 3,
    startDay: 21,
    endMonth: 4,
    endDay: 19,
    traits: ['Courageous', 'Pioneering', 'Passionate', 'Dynamic', 'Direct'],
    keywords: ['Initiation', 'Willpower', 'Vitality', 'Courage'],
    stone: 'Diamond & Red Jasper',
    color: 'Crimson & Fiery Scarlet',
    celestialArchetype: 'The Cosmic Trailblazer',
    description: 'The first sign of the zodiac, radiating primal spark, boundless enthusiasm, and bold leadership.',
  },
  Taurus: {
    name: 'Taurus',
    symbol: 'Bull',
    glyph: '♉',
    element: 'Earth',
    modality: 'Fixed',
    polarity: 'Yin (Feminine)',
    ruler: 'Venus',
    dateRange: 'Apr 20 – May 20',
    startMonth: 4,
    startDay: 20,
    endMonth: 5,
    endDay: 20,
    traits: ['Grounded', 'Sensual', 'Loyal', 'Steadfast', 'Patient'],
    keywords: ['Endurance', 'Abundance', 'Beauty', 'Steadiness'],
    stone: 'Emerald & Rose Quartz',
    color: 'Forest Green & Soft Rose',
    celestialArchetype: 'The Earth Artisan',
    description: 'Rooted in serenity and earthly pleasures, manifesting beauty, endurance, and quiet strength.',
  },
  Gemini: {
    name: 'Gemini',
    symbol: 'Twins',
    glyph: '♊',
    element: 'Air',
    modality: 'Mutable',
    polarity: 'Yang (Masculine)',
    ruler: 'Mercury',
    dateRange: 'May 21 – Jun 20',
    startMonth: 5,
    startDay: 21,
    endMonth: 6,
    endDay: 20,
    traits: ['Curious', 'Versatile', 'Witty', 'Articulate', 'Perceptive'],
    keywords: ['Communication', 'Duality', 'Intellect', 'Curiosity'],
    stone: 'Agate & Citrine',
    color: 'Bright Amber & Starlight Yellow',
    celestialArchetype: 'The Weaver of Ideas',
    description: 'Governed by Hermes, Gemini connects worlds through dialogue, rapid thought, and boundless wonder.',
  },
  Cancer: {
    name: 'Cancer',
    symbol: 'Crab',
    glyph: '♋',
    element: 'Water',
    modality: 'Cardinal',
    polarity: 'Yin (Feminine)',
    ruler: 'Moon',
    dateRange: 'Jun 21 – Jul 22',
    startMonth: 6,
    startDay: 21,
    endMonth: 7,
    endDay: 22,
    traits: ['Intuitive', 'Nurturing', 'Protective', 'Empathetic', 'Deep'],
    keywords: ['Sanctuary', 'Memory', 'Emotion', 'Tides'],
    stone: 'Moonstone & Pearl',
    color: 'Silver & Ocean Pearl',
    celestialArchetype: 'The Lunar Guardian',
    description: 'Guided by the moon’s ever-shifting light, holding profound emotional memory, fierce devotion, and spiritual empathy.',
  },
  Leo: {
    name: 'Leo',
    symbol: 'Lion',
    glyph: '♌',
    element: 'Fire',
    modality: 'Fixed',
    polarity: 'Yang (Masculine)',
    ruler: 'Sun',
    dateRange: 'Jul 23 – Aug 22',
    startMonth: 7,
    startDay: 23,
    endMonth: 8,
    endDay: 22,
    traits: ['Radiant', 'Generous', 'Noble', 'Creative', 'Magnetic'],
    keywords: ['Sovereignty', 'Creativity', 'Warmth', 'Radiance'],
    stone: 'Sunstone & Peridot',
    color: 'Solar Gold & Royal Ochre',
    celestialArchetype: 'The Solar Sovereign',
    description: 'Illuminating every space with noble warmth, artistic vitality, and an open, fearless heart.',
  },
  Virgo: {
    name: 'Virgo',
    symbol: 'Maiden',
    glyph: '♍',
    element: 'Earth',
    modality: 'Mutable',
    polarity: 'Yin (Feminine)',
    ruler: 'Mercury',
    dateRange: 'Aug 23 – Sep 22',
    startMonth: 8,
    startDay: 23,
    endMonth: 9,
    endDay: 22,
    traits: ['Discerning', 'Devoted', 'Analytical', 'Healing', 'Methodical'],
    keywords: ['Refinement', 'Service', 'Discernment', 'Mastery'],
    stone: 'Sapphire & Amazonite',
    color: 'Sage Olive & Warm Linen',
    celestialArchetype: 'The Sacred Healer',
    description: 'Master of fine discernment and devoted alchemy, transmuting raw ideas into crystalline precision and restorative care.',
  },
  Libra: {
    name: 'Libra',
    symbol: 'Scales',
    glyph: '♎',
    element: 'Air',
    modality: 'Cardinal',
    polarity: 'Yang (Masculine)',
    ruler: 'Venus',
    dateRange: 'Sep 23 – Oct 22',
    startMonth: 9,
    startDay: 23,
    endMonth: 10,
    endDay: 22,
    traits: ['Harmonious', 'Diplomatic', 'Graceful', 'Just', 'Aesthetic'],
    keywords: ['Equilibrium', 'Beauty', 'Union', 'Justice'],
    stone: 'Lapis Lazuli & Opal',
    color: 'Twilight Blue & Dusty Pink',
    celestialArchetype: 'The Harmonizer of Souls',
    description: 'Seeking sublime balance, sacred symmetry, and divine bridge-building between opposing perspectives.',
  },
  Scorpio: {
    name: 'Scorpio',
    symbol: 'Scorpion',
    glyph: '♏',
    element: 'Water',
    modality: 'Fixed',
    polarity: 'Yin (Feminine)',
    ruler: 'Pluto & Mars',
    dateRange: 'Oct 23 – Nov 21',
    startMonth: 10,
    startDay: 23,
    endMonth: 11,
    endDay: 21,
    traits: ['Profound', 'Magnetic', 'Transformative', 'Perceptive', 'Resilient'],
    keywords: ['Rebirth', 'Depth', 'Alchemy', 'Truth'],
    stone: 'Obsidian & Malachite',
    color: 'Deep Burgundy & Midnight Black',
    celestialArchetype: 'The Phoenix Alchemist',
    description: 'Dwelling in the mysteries beneath the surface, possessing unfathomable courage to shed old skins and undergo profound rebirth.',
  },
  Sagittarius: {
    name: 'Sagittarius',
    symbol: 'Archer',
    glyph: '♐',
    element: 'Fire',
    modality: 'Mutable',
    polarity: 'Yang (Masculine)',
    ruler: 'Jupiter',
    dateRange: 'Nov 22 – Dec 21',
    startMonth: 11,
    startDay: 22,
    endMonth: 12,
    endDay: 21,
    traits: ['Philosophical', 'Optimistic', 'Free-Spirited', 'Expansive', 'Adventurous'],
    keywords: ['Wisdom', 'Horizons', 'Faith', 'Exploration'],
    stone: 'Turquoise & Topaz',
    color: 'Electric Indigo & Royal Purple',
    celestialArchetype: 'The Cosmic Seeker',
    description: 'An arrow aimed at universal truth, wandering distant lands and intellectual realms in relentless search of grand meaning.',
  },
  Capricorn: {
    name: 'Capricorn',
    symbol: 'Sea-Goat',
    glyph: '♑',
    element: 'Earth',
    modality: 'Cardinal',
    polarity: 'Yin (Feminine)',
    ruler: 'Saturn',
    dateRange: 'Dec 22 – Jan 19',
    startMonth: 12,
    startDay: 22,
    endMonth: 1,
    endDay: 19,
    traits: ['Disciplined', 'Visionary', 'Strategic', 'Patient', 'Masterful'],
    keywords: ['Legacy', 'Ascent', 'Mastery', 'Integrity'],
    stone: 'Garnet & Onyx',
    color: 'Charcoal Slate & Deep Khaki',
    celestialArchetype: 'The Mountain Master',
    description: 'Ascending the highest cosmic summit with patient wisdom, constructing timeless legacies built to outlast generations.',
  },
  Aquarius: {
    name: 'Aquarius',
    symbol: 'Water-Bearer',
    glyph: '♒',
    element: 'Air',
    modality: 'Fixed',
    polarity: 'Yang (Masculine)',
    ruler: 'Uranus & Saturn',
    dateRange: 'Jan 20 – Feb 18',
    startMonth: 1,
    startDay: 20,
    endMonth: 2,
    endDay: 18,
    traits: ['Visionary', 'Humanitarian', 'Inventive', 'Independent', 'Unconventional'],
    keywords: ['Future', 'Liberation', 'Collective', 'Innovation'],
    stone: 'Amethyst & Labradorite',
    color: 'Cyan Blue & Electric Violet',
    celestialArchetype: 'The Starlight Visionary',
    description: 'Channeling the future into the present, shattering archaic constructs to usher in collective liberation and starry awakening.',
  },
  Pisces: {
    name: 'Pisces',
    symbol: 'Two Fish',
    glyph: '♓',
    element: 'Water',
    modality: 'Mutable',
    polarity: 'Yin (Feminine)',
    ruler: 'Neptune & Jupiter',
    dateRange: 'Feb 19 – Mar 20',
    startMonth: 2,
    startDay: 19,
    endMonth: 3,
    endDay: 20,
    traits: ['Mystical', 'Compassionate', 'Imaginative', 'Transcendent', 'Intuitive'],
    keywords: ['Oneness', 'Dreams', 'Surrender', 'Compassion'],
    stone: 'Aquamarine & Fluorite',
    color: 'Seafoam Teal & Lavender Mist',
    celestialArchetype: 'The Dream Mystic',
    description: 'The final oceanic embrace of the zodiac, dissolving boundaries in boundless compassion, poetic visions, and divine oneness.',
  },
};

export const ZODIAC_ORDER: ZodiacSignName[] = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

export const PLANET_GLYPHS: Record<PlanetName, string> = {
  Sun: '☉',
  Moon: '☽',
  Mercury: '☿',
  Venus: '♀',
  Mars: '♂',
  Jupiter: '♃',
  Saturn: '♄',
  Uranus: '♅',
  Neptune: '♆',
  Pluto: '♇',
  'North Node': '☊',
  Chiron: '⚷',
};

// Calculate Sun Sign from date
export function calculateSunSign(dateString: string): ZodiacSignName {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  for (const sign of Object.values(ZODIAC_SIGNS)) {
    if (
      (month === sign.startMonth && day >= sign.startDay) ||
      (month === sign.endMonth && day <= sign.endDay)
    ) {
      return sign.name;
    }
  }

  // Fallback for edge cases
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Aries';
}

// Calculate Moon Sign approximation based on date & time
export function calculateMoonSign(dateString: string, timeString: string): ZodiacSignName {
  const [year, month, day] = dateString.split('-').map(Number);
  const [hour, min] = timeString ? timeString.split(':').map(Number) : [12, 0];
  
  // Julian Day calculation
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const jd =
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045 +
    (hour + min / 60) / 24;

  // Approximate lunar ecliptic longitude
  const daysSinceEpoch = jd - 2451545.0; // J2000.0
  const meanLongitude = (218.316 + 13.176396 * daysSinceEpoch) % 360;
  const normalizedLong = (meanLongitude + 360) % 360;
  const signIndex = Math.floor(normalizedLong / 30);
  return ZODIAC_ORDER[signIndex % 12];
}

// Calculate Ascendant (Rising Sign) based on birth time & Sun position
export function calculateAscendant(sunSign: ZodiacSignName, timeString: string): ZodiacSignName {
  const [hour, min] = timeString ? timeString.split(':').map(Number) : [12, 0];
  const totalHours = hour + min / 60;
  
  // At sunrise (~06:00), Ascendant matches Sun sign.
  // The Ascendant advances ~1 sign every 2 hours.
  const hoursSinceSunrise = (totalHours - 6 + 24) % 24;
  const signOffset = Math.floor(hoursSinceSunrise / 2);
  const sunIndex = ZODIAC_ORDER.indexOf(sunSign);
  const ascIndex = (sunIndex + signOffset) % 12;
  return ZODIAC_ORDER[ascIndex];
}

// Generate complete Natal Chart / Birth Profile
export function generateBirthProfile(
  name: string,
  birthDate: string,
  birthTime: string,
  birthPlace: string,
  lat = 40.7128,
  lng = -74.006
): BirthProfile {
  const sunSign = calculateSunSign(birthDate);
  const moonSign = calculateMoonSign(birthDate, birthTime);
  const ascendantSign = calculateAscendant(sunSign, birthTime);

  const dateObj = new Date(birthDate);
  const seed = dateObj.getFullYear() * 10000 + (dateObj.getMonth() + 1) * 100 + dateObj.getDate();
  const pseudoRand = (offset: number) => {
    const x = Math.sin(seed + offset) * 10000;
    return x - Math.floor(x);
  };

  const sunIdx = ZODIAC_ORDER.indexOf(sunSign);
  const ascIdx = ZODIAC_ORDER.indexOf(ascendantSign);

  // Generate house cusps starting with Ascendant on the 1st House
  const houses: HouseCusp[] = [];
  const houseTitles = [
    'House of Self & Identity',
    'House of Value & Resources',
    'House of Mind & Communication',
    'House of Home & Roots',
    'House of Pleasure & Creative Spark',
    'House of Health & Sacred Routine',
    'House of Partnership & Others',
    'House of Transformation & Mystery',
    'House of Philosophy & Expansion',
    'House of Calling & Public Legacy',
    'House of Community & Vision',
    'House of Spirit & Unconscious',
  ];
  const houseDomains = [
    'Physical body, personality projection, vitality',
    'Finances, material security, personal self-worth',
    'Intellect, sibling bonds, local exploration',
    'Emotional foundation, ancestry, private sanctuary',
    'Romance, play, artistry, joy and children',
    'Daily wellness, service, refining skills',
    'Committed marriage, contracts, shadow projection',
    'Shared wealth, rebirth, occult insight',
    'Higher truth, travel, wisdom teachings',
    'Career pinnacle, reputation, destiny in the world',
    'Friendships, collective humanitarian hopes',
    'Dreamscapes, karmic closure, mystical surrender',
  ];

  for (let i = 0; i < 12; i++) {
    const hSign = ZODIAC_ORDER[(ascIdx + i) % 12];
    houses.push({
      house: i + 1,
      sign: hSign,
      degree: Math.floor(pseudoRand(i * 3) * 28) + 1,
      title: houseTitles[i],
      domain: houseDomains[i],
    });
  }

  // Planetary placements
  const placements: PlanetPlacement[] = [
    {
      planet: 'Sun',
      glyph: PLANET_GLYPHS['Sun'],
      sign: sunSign,
      degree: Math.floor(pseudoRand(1) * 28) + 1,
      minute: Math.floor(pseudoRand(2) * 59),
      house: ((sunIdx - ascIdx + 12) % 12) + 1,
      isRetrograde: false,
      meaning: 'Core solar vitality, sovereign purpose, authentic identity',
    },
    {
      planet: 'Moon',
      glyph: PLANET_GLYPHS['Moon'],
      sign: moonSign,
      degree: Math.floor(pseudoRand(3) * 28) + 1,
      minute: Math.floor(pseudoRand(4) * 59),
      house: ((ZODIAC_ORDER.indexOf(moonSign) - ascIdx + 12) % 12) + 1,
      isRetrograde: false,
      meaning: 'Inner emotional landscape, instinctual safety, subconscious patterns',
    },
    {
      planet: 'Mercury',
      glyph: PLANET_GLYPHS['Mercury'],
      sign: ZODIAC_ORDER[(sunIdx + (pseudoRand(5) > 0.5 ? 1 : 11)) % 12],
      degree: Math.floor(pseudoRand(6) * 28) + 1,
      minute: Math.floor(pseudoRand(7) * 59),
      house: Math.floor(pseudoRand(8) * 12) + 1,
      isRetrograde: pseudoRand(9) > 0.8,
      meaning: 'Mental architecture, voice, cognitive synthesis, learning style',
    },
    {
      planet: 'Venus',
      glyph: PLANET_GLYPHS['Venus'],
      sign: ZODIAC_ORDER[(sunIdx + Math.floor(pseudoRand(10) * 3) - 1 + 12) % 12],
      degree: Math.floor(pseudoRand(11) * 28) + 1,
      minute: Math.floor(pseudoRand(12) * 59),
      house: Math.floor(pseudoRand(13) * 12) + 1,
      isRetrograde: pseudoRand(14) > 0.9,
      meaning: 'Erotic magnetism, aesthetic taste, love language, harmonious attraction',
    },
    {
      planet: 'Mars',
      glyph: PLANET_GLYPHS['Mars'],
      sign: ZODIAC_ORDER[Math.floor(pseudoRand(15) * 12)],
      degree: Math.floor(pseudoRand(16) * 28) + 1,
      minute: Math.floor(pseudoRand(17) * 59),
      house: Math.floor(pseudoRand(18) * 12) + 1,
      isRetrograde: pseudoRand(19) > 0.85,
      meaning: 'Raw drive, sacred rage, athletic stamina, sexual ambition',
    },
    {
      planet: 'Jupiter',
      glyph: PLANET_GLYPHS['Jupiter'],
      sign: ZODIAC_ORDER[Math.floor(pseudoRand(20) * 12)],
      degree: Math.floor(pseudoRand(21) * 28) + 1,
      minute: Math.floor(pseudoRand(22) * 59),
      house: Math.floor(pseudoRand(23) * 12) + 1,
      isRetrograde: pseudoRand(24) > 0.7,
      meaning: 'Cosmic fortune, philosophical expansion, spiritual luck, generosity',
    },
    {
      planet: 'Saturn',
      glyph: PLANET_GLYPHS['Saturn'],
      sign: ZODIAC_ORDER[Math.floor(pseudoRand(25) * 12)],
      degree: Math.floor(pseudoRand(26) * 28) + 1,
      minute: Math.floor(pseudoRand(27) * 59),
      house: Math.floor(pseudoRand(28) * 12) + 1,
      isRetrograde: pseudoRand(29) > 0.65,
      meaning: 'Karmic architecture, sacred boundaries, mastery through endurance',
    },
    {
      planet: 'Uranus',
      glyph: PLANET_GLYPHS['Uranus'],
      sign: ZODIAC_ORDER[Math.floor(pseudoRand(30) * 12)],
      degree: Math.floor(pseudoRand(31) * 28) + 1,
      minute: Math.floor(pseudoRand(32) * 59),
      house: Math.floor(pseudoRand(33) * 12) + 1,
      isRetrograde: pseudoRand(34) > 0.6,
      meaning: 'Awakening lightning, radical liberation, eccentric genius',
    },
    {
      planet: 'Neptune',
      glyph: PLANET_GLYPHS['Neptune'],
      sign: ZODIAC_ORDER[Math.floor(pseudoRand(35) * 12)],
      degree: Math.floor(pseudoRand(36) * 28) + 1,
      minute: Math.floor(pseudoRand(37) * 59),
      house: Math.floor(pseudoRand(38) * 12) + 1,
      isRetrograde: pseudoRand(39) > 0.6,
      meaning: 'Mystical dissolution, divine compassion, poetic glamour',
    },
    {
      planet: 'Pluto',
      glyph: PLANET_GLYPHS['Pluto'],
      sign: ZODIAC_ORDER[Math.floor(pseudoRand(40) * 12)],
      degree: Math.floor(pseudoRand(41) * 28) + 1,
      minute: Math.floor(pseudoRand(42) * 59),
      house: Math.floor(pseudoRand(43) * 12) + 1,
      isRetrograde: pseudoRand(44) > 0.6,
      meaning: 'Psychic depth, underworld power, irrevocable regeneration',
    },
    {
      planet: 'North Node',
      glyph: PLANET_GLYPHS['North Node'],
      sign: ZODIAC_ORDER[Math.floor(pseudoRand(45) * 12)],
      degree: Math.floor(pseudoRand(46) * 28) + 1,
      minute: Math.floor(pseudoRand(47) * 59),
      house: Math.floor(pseudoRand(48) * 12) + 1,
      isRetrograde: true,
      meaning: 'Dharmic destiny, soul growth edge, magnetic future calling',
    },
    {
      planet: 'Chiron',
      glyph: PLANET_GLYPHS['Chiron'],
      sign: ZODIAC_ORDER[Math.floor(pseudoRand(49) * 12)],
      degree: Math.floor(pseudoRand(50) * 28) + 1,
      minute: Math.floor(pseudoRand(51) * 59),
      house: Math.floor(pseudoRand(52) * 12) + 1,
      isRetrograde: pseudoRand(53) > 0.7,
      meaning: 'Wounded healer archetype, medicine born from past pain',
    },
  ];

  // Aspects between key planets
  const aspects: AspectInfo[] = [
    {
      planet1: 'Sun',
      planet2: 'Jupiter',
      aspectType: 'Trine',
      angle: 120,
      orb: 1.8,
      nature: 'Harmonious',
      interpretation:
        'A natural halo of cosmic confidence and optimism. Doors open through sheer authentic goodwill.',
    },
    {
      planet1: 'Moon',
      planet2: 'Venus',
      aspectType: 'Sextile',
      angle: 60,
      orb: 2.1,
      nature: 'Harmonious',
      interpretation:
        'Charming emotional equilibrium. You effortlessly create gentle, hospitable sanctuaries for those you cherish.',
    },
    {
      planet1: 'Mercury',
      planet2: 'Saturn',
      aspectType: 'Trine',
      angle: 120,
      orb: 0.9,
      nature: 'Harmonious',
      interpretation:
        'Disciplined intellect and strategic speech. Words carry weight, credibility, and lasting endurance.',
    },
    {
      planet1: 'Mars',
      planet2: 'Pluto',
      aspectType: 'Conjunction',
      angle: 0,
      orb: 3.4,
      nature: 'Intense',
      interpretation:
        'Unstoppable reservoir of willpower. When channeled intentionally, you overcome impossible obstacles.',
    },
    {
      planet1: 'Sun',
      planet2: 'Neptune',
      aspectType: 'Sextile',
      angle: 60,
      orb: 2.5,
      nature: 'Harmonious',
      interpretation:
        'Strong intuitive antennas and poetic artistic sensibility. You sense the unspoken feelings of any room.',
    },
  ];

  return {
    id: `chart_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    name,
    birthDate,
    birthTime,
    birthPlace,
    latitude: lat,
    longitude: lng,
    sunSign,
    moonSign,
    ascendantSign,
    placements,
    houses,
    aspects,
    createdAt: new Date().toISOString(),
  };
}

// Generate Personalized Daily Horoscope based on active birth chart
export function generateDailyHoroscope(profile: BirthProfile, targetDateOffset = 0): DailyHoroscope {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + targetDateOffset);
  const dateStr = targetDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const sun = ZODIAC_SIGNS[profile.sunSign];
  const moon = ZODIAC_SIGNS[profile.moonSign];
  const asc = ZODIAC_SIGNS[profile.ascendantSign];

  // Dynamic transits for today
  const activeTransits: DailyTransitImpact[] = [
    {
      natalPlanet: 'Sun',
      transitPlanet: 'Jupiter',
      transitSign: 'Gemini',
      aspect: 'Trine',
      nature: 'Fortunate',
      headline: 'Cosmic Favor & Broad Horizons',
      guidance: `Transit Jupiter illuminates your natal ${profile.sunSign} Sun, expanding opportunities in creative communication and bold self-expression.`,
    },
    {
      natalPlanet: 'Moon',
      transitPlanet: 'Venus',
      transitSign: 'Taurus',
      aspect: 'Conjunction',
      nature: 'Empowering',
      headline: 'Sensory Comfort & Heart Centering',
      guidance: `Venus caresses your natal ${profile.moonSign} Moon, soothing tension and heightening your longing for authentic, tender connection.`,
    },
    {
      natalPlanet: 'Mars',
      transitPlanet: 'Saturn',
      transitSign: 'Pisces',
      aspect: 'Sextile',
      nature: 'Empowering',
      headline: 'Focused Will & Steadfast Discipline',
      guidance:
        'Saturn offers anchor ropes to your fiery ambition; structure your day with deliberate checkpoints rather than scattered sprints.',
    },
    {
      natalPlanet: 'Mercury',
      transitPlanet: 'Uranus',
      transitSign: 'Taurus',
      aspect: 'Square',
      nature: 'Dynamic',
      headline: 'Electric Breakthroughs & Sudden Ideas',
      guidance:
        'Be alert for lightning-bolt epiphanies. Write insights down before the breeze of daily distractions carries them away.',
    },
  ];

  const overallScores = [86, 91, 79, 94, 88];
  const dayIndex = (targetDate.getDate() + profile.name.length) % overallScores.length;
  const score = overallScores[dayIndex];

  return {
    date: dateStr,
    profileName: profile.name,
    sunSign: profile.sunSign,
    moonSign: profile.moonSign,
    ascendantSign: profile.ascendantSign,
    overallScore: score,
    cosmicTheme: `The Golden Synthesis of ${sun.element} Will & ${moon.element} Intuition`,
    summary: `Today the celestial currents blend your ${sun.name} essence with the grounding frequencies of your ${asc.name} rising. You are experiencing an auspicious window where mental clarity aligns with bodily intuition. Allow your natural ${sun.traits[0].toLowerCase()} instincts to steer your major choices while holding emotional space for subtle cues from colleagues and loved ones.`,
    activeTransits,
    loveForecast: `Your ${moon.name} moon seeks genuine emotional resonance today. If single, your natural magnetic aura draws curious souls who appreciate your depth. If partnered, a heartfelt evening conversation about shared hopes will deepen mutual devotion.`,
    careerForecast: `With favorable transits to your natal chart, strategic negotiations and creative pitches find fertile ground. Don't shy away from claiming your authority; your ${asc.name} rising grants you poise and natural presence.`,
    wellnessForecast: `The nervous system responds best to deliberate grounding rituals. Infuse hydration with mint or lemon, step outside barefoot under the sky, and release digital stimulation one hour before slumber.`,
    spiritualGuidance: `Meditate upon the archetype of ${sun.celestialArchetype}. The universe is not testing your worthiness—it is reflecting the crystalline truth of your inner devotion.`,
    cosmicAffirmation: `I stand grounded in my sacred truth. My heart is open, my mind is clear, and the cosmos conspires for my highest evolution.`,
    luckyNumbers: [(targetDate.getDate() * 3) % 49 + 1, (sun.name.length * 7) % 77 + 2, 8, 21],
    luckyColor: sun.color,
    powerHours: '10:00 AM – 12:30 PM & 07:15 PM – 09:00 PM',
    suggestedCrystal: sun.stone,
  };
}

// Synastry Compatibility Analyzer
export function calculateCompatibility(
  sign1Name: ZodiacSignName,
  sign2Name: ZodiacSignName
): CompatibilityAnalysis {
  const s1 = ZODIAC_SIGNS[sign1Name];
  const s2 = ZODIAC_SIGNS[sign2Name];

  // Element combination calculation
  const elementPair = `${s1.element} + ${s2.element}`;
  let baseScore = 75;
  let elementDynamic = {
    type: 'Complementary Flow',
    description: 'A harmonious blending of essential cosmic elements.',
  };

  if (s1.element === s2.element) {
    baseScore = 92;
    elementDynamic = {
      type: 'Mirroring Soul Connection',
      description: `Both shared ${s1.element} energy creates instantaneous telepathic understanding, matched pace, and mutual validation.`,
    };
  } else if (
    (s1.element === 'Fire' && s2.element === 'Air') ||
    (s1.element === 'Air' && s2.element === 'Fire')
  ) {
    baseScore = 94;
    elementDynamic = {
      type: 'Inspiring Creative Spark',
      description: 'Air feeds the flames of Fire, while Fire warms the breezes of Air. Boundless intellectual excitement, laughter, and high adventure.',
    };
  } else if (
    (s1.element === 'Earth' && s2.element === 'Water') ||
    (s1.element === 'Water' && s2.element === 'Earth')
  ) {
    baseScore = 95;
    elementDynamic = {
      type: 'Nurturing Sacred Sanctuary',
      description: 'Water nourishes the Earth into blooming fertility, while Earth creates safe riverbanks for Water’s emotional tides. Enduring trust and sanctuary.',
    };
  } else if (
    (s1.element === 'Fire' && s2.element === 'Water') ||
    (s1.element === 'Water' && s2.element === 'Fire')
  ) {
    baseScore = 72;
    elementDynamic = {
      type: 'Steam & High Intensity',
      description: 'Passionate and transformative, but requires careful calibration so Fire doesn’t scald Water, and Water doesn’t extinguish Fire.',
    };
  } else if (
    (s1.element === 'Air' && s2.element === 'Earth') ||
    (s1.element === 'Earth' && s2.element === 'Air')
  ) {
    baseScore = 70;
    elementDynamic = {
      type: 'Structure Meets Vision',
      description: 'Air provides the architectural blueprints, while Earth pours the foundation concrete. Beautiful for building ventures when patience reigns.',
    };
  }

  // Modality comparison
  let modalityDynamic = {
    type: 'Dynamic Dance',
    description: 'Different modes of initiating, sustaining, or adapting.',
  };

  if (s1.modality === s2.modality) {
    modalityDynamic = {
      type: `Shared ${s1.modality} Temperament`,
      description: `Both possess similar ways of navigating challenges, though stubborn standoffs require conscious compromise.`,
    };
  }

  // Calculate detailed scores
  const emotional = Math.min(
    98,
    Math.max(62, Math.round(baseScore + (s1.element === 'Water' || s2.element === 'Water' ? 4 : -2)))
  );
  const communication = Math.min(
    99,
    Math.max(60, Math.round(baseScore + (s1.element === 'Air' || s2.element === 'Air' ? 5 : -1)))
  );
  const passion = Math.min(
    99,
    Math.max(65, Math.round(baseScore + (s1.element === 'Fire' || s2.element === 'Fire' ? 6 : -3)))
  );
  const longevity = Math.min(
    97,
    Math.max(60, Math.round(baseScore + (s1.element === 'Earth' || s2.element === 'Earth' ? 6 : -2)))
  );
  const overall = Math.round((emotional * 0.25 + communication * 0.25 + passion * 0.25 + longevity * 0.25));

  const strengths = [
    `Magnetic intellectual intrigue and shared cosmic curiosity`,
    `Complementary approaches to handling life’s sudden curveballs`,
    `Deep mutual respect for each other's individual freedom and boundaries`,
    `A shared ability to transform ordinary days into memorable rituals`,
  ];

  const frictionPoints = [
    `Differences in processing emotional vulnerability during high stress`,
    `Navigating varying speeds of decision-making: spontaneous instinct vs. measured contemplation`,
    `Learning to speak each other’s specific emotional dialects without assuming malice`,
  ];

  const karmicAdvice = `Honor the divine contradiction in your pairing. Rather than seeking to turn your partner into a carbon copy of yourself, celebrate their ${s2.element} gifts as the exact spiritual counterweight your soul incarnated to experience.`;

  return {
    sign1: sign1Name,
    sign2: sign2Name,
    overallScore: overall,
    emotionalScore: emotional,
    communicationScore: communication,
    passionScore: passion,
    longevityScore: longevity,
    elementMatch: elementDynamic,
    modalityMatch: modalityDynamic,
    keyStrengths: strengths,
    growthFriction: frictionPoints,
    karmicAdvice,
    archetypeBond: `${s1.celestialArchetype} & ${s2.celestialArchetype}`,
  };
}

// Calculate Current Moon Status & Lunar Calendar
export function getCurrentMoonStatus(): MoonStatus {
  const now = new Date();
  
  // Known reference New Moon epoch: Jan 11, 2024 at 11:57 UTC (Julian Day ~2460321.0)
  const refNewMoon = new Date('2024-01-11T11:57:00Z').getTime();
  const synodicMonthMs = 29.53058867 * 24 * 60 * 60 * 1000;
  const diffMs = now.getTime() - refNewMoon;
  const cycles = diffMs / synodicMonthMs;
  const currentCycleProgress = cycles - Math.floor(cycles); // 0.0 to 1.0
  const moonAgeDays = currentCycleProgress * 29.53058867;

  // Illumination calculation (smooth sinusoidal curve)
  const illumination = Math.round((1 - Math.cos(currentCycleProgress * 2 * Math.PI)) / 2 * 100);

  // Phase name determination
  let phaseName: MoonPhaseType = 'New Moon';
  if (currentCycleProgress < 0.03 || currentCycleProgress > 0.97) {
    phaseName = 'New Moon';
  } else if (currentCycleProgress < 0.22) {
    phaseName = 'Waxing Crescent';
  } else if (currentCycleProgress < 0.28) {
    phaseName = 'First Quarter';
  } else if (currentCycleProgress < 0.47) {
    phaseName = 'Waxing Gibbous';
  } else if (currentCycleProgress < 0.53) {
    phaseName = 'Full Moon';
  } else if (currentCycleProgress < 0.72) {
    phaseName = 'Waning Gibbous';
  } else if (currentCycleProgress < 0.78) {
    phaseName = 'Third Quarter';
  } else {
    phaseName = 'Waning Crescent';
  }

  // Current Moon Zodiac sign calculation
  const moonSign = calculateMoonSign(now.toISOString().split('T')[0], '12:00');
  const degreeInSign = Math.floor((moonAgeDays * 12.2) % 30);

  // Next phases calculation
  const nextNewDays = (1 - currentCycleProgress) * 29.53058867;
  const nextFullDays = currentCycleProgress < 0.5
    ? (0.5 - currentCycleProgress) * 29.53058867
    : (1.5 - currentCycleProgress) * 29.53058867;

  const nextNewDate = new Date(now.getTime() + nextNewDays * 24 * 60 * 60 * 1000);
  const nextFullDate = new Date(now.getTime() + nextFullDays * 24 * 60 * 60 * 1000);

  const phaseInfluences: Record<MoonPhaseType, { influence: string; ritual: string }> = {
    'New Moon': {
      influence: 'A sacred portal of divine void and fertile inception. Intuition is heightened while physical energy turns inward.',
      ritual: 'Plant seeds of intention. Write three core desires in a parchment journal and light white sandalwood incense.',
    },
    'Waxing Crescent': {
      influence: 'The first sliver of silver light awakens momentum, courage, and focused devotion to newborn intentions.',
      ritual: 'Take the first tangible step toward your newest creative endeavor. Drink lemon water charged under starlight.',
    },
    'First Quarter': {
      influence: 'A moment of constructive tension and decisive action. Overcoming initial hurdles requires steadfast boundaries.',
      ritual: 'Clear away clutter from your workspace. Affirm: "I meet challenge with divine grace and clarity."',
    },
    'Waxing Gibbous': {
      influence: 'High-voltage cosmic cultivation. The fruits of your labor are swelling into fullness. Patience and refinement.',
      ritual: 'Review progress with gratitude. Polish and edit pending projects; collaborate with trusted kindred spirits.',
    },
    'Full Moon': {
      influence: 'Peak lunar illumination, psychic clarity, and emotional culmination. Secrets unveil and hearts overflow.',
      ritual: 'Perform a releasing ceremony. Charge your crystals (Moonstone, Quartz) in the moonlight and journal breakthroughs.',
    },
    'Waning Gibbous': {
      influence: 'The wave recedes gracefully, inviting harvest, philosophical reflection, and sharing wisdom with your community.',
      ritual: 'Give back. Mentor an aspiring artist, express heartfelt thanks to elders, and host a nourishing meal.',
    },
    'Third Quarter': {
      influence: 'A critical threshold of spiritual shedding, forgiveness, and detaching from expired commitments.',
      ritual: 'Write down heavy burdens, resentments, and outdated habits on paper, then safely burn or dissolve it in running water.',
    },
    'Waning Crescent': {
      influence: 'The balsamic balsamic dark-of-the-moon. Deep restorative slumber, prophetic dreamscapes, and spiritual surrender.',
      ritual: 'Take an Epsom salt bath with lavender oil. Silence notifications and enter deep stillness before the new cycle rebirths.',
    },
  };

  return {
    phaseName,
    illumination,
    moonAgeDays: Math.round(moonAgeDays * 10) / 10,
    currentSign: moonSign,
    degreeInSign,
    isVoidOfCourse: (degreeInSign >= 27),
    astrologicalInfluence: phaseInfluences[phaseName].influence,
    ritualAdvice: phaseInfluences[phaseName].ritual,
    nextNewMoon: nextNewDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    nextFullMoon: nextFullDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    lunarNodesSign: 'Aries North Node / Libra South Node',
  };
}

// Generate 30-day lunar calendar
export function getLunarCalendarMonth(): LunarCalendarDay[] {
  const days: LunarCalendarDay[] = [];
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const refNewMoon = new Date('2024-01-11T11:57:00Z').getTime();
    const synodicMonthMs = 29.53058867 * 24 * 60 * 60 * 1000;
    const diffMs = d.getTime() - refNewMoon;
    const progress = (diffMs / synodicMonthMs) - Math.floor(diffMs / synodicMonthMs);
    const illumination = Math.round((1 - Math.cos(progress * 2 * Math.PI)) / 2 * 100);

    let phaseName: MoonPhaseType = 'Waxing Gibbous';
    let isKey = false;
    if (progress < 0.04 || progress > 0.96) {
      phaseName = 'New Moon';
      isKey = true;
    } else if (progress < 0.22) {
      phaseName = 'Waxing Crescent';
    } else if (progress >= 0.23 && progress <= 0.27) {
      phaseName = 'First Quarter';
      isKey = true;
    } else if (progress < 0.47) {
      phaseName = 'Waxing Gibbous';
    } else if (progress >= 0.48 && progress <= 0.52) {
      phaseName = 'Full Moon';
      isKey = true;
    } else if (progress < 0.73) {
      phaseName = 'Waning Gibbous';
    } else if (progress >= 0.74 && progress <= 0.77) {
      phaseName = 'Third Quarter';
      isKey = true;
    } else {
      phaseName = 'Waning Crescent';
    }

    const sign = calculateMoonSign(d.toISOString().split('T')[0], '12:00');

    days.push({
      date: d.toISOString().split('T')[0],
      dayNumber: d.getDate(),
      phaseName,
      illumination,
      sign,
      isKeyPhase: isKey,
    });
  }

  return days;
}

// Major Planetary Transits & Movement Alerts
export const UPCOMING_TRANSITS: TransitEvent[] = [
  {
    id: 'transit-pluto-aquarius',
    planet: 'Pluto',
    type: 'Ingress',
    title: 'Pluto Enters Aquarius: The Era of Cosmic Humanism',
    date: 'Active Throughout 2026',
    exactDegree: '03° Aquarius',
    intensity: 'Major Astrological Event',
    summary:
      'Pluto continues its revolutionary transit through Aquarius, dismantling centralized monopolies and igniting collective awakening, artificial intelligence sovereignty, and democratic renewal.',
    impactedSigns: ['Aquarius', 'Leo', 'Scorpio', 'Taurus'],
    remedyOrRitual:
      'Contemplate what power structures you can decentralize in your own life. Align with authentic grassroots communities.',
  },
  {
    id: 'transit-saturn-neptune-aries',
    planet: 'Saturn',
    type: 'Ingress',
    title: 'Saturn & Neptune Ingress into Aries Portal',
    date: 'Approaching Climax',
    exactDegree: '00° Aries (The World Axis)',
    intensity: 'Major Astrological Event',
    summary:
      'The meeting of Saturn (structure, discipline) and Neptune (dreams, spiritual vision) on the Aries Point marks an epochal reboot of spiritual courage and new foundational institutions.',
    impactedSigns: ['Aries', 'Libra', 'Cancer', 'Capricorn'],
    remedyOrRitual:
      'Turn poetic ideals into concrete blueprints. Take brave, practical action on behalf of your cherished vision.',
  },
  {
    id: 'transit-mercury-retrograde',
    planet: 'Mercury',
    type: 'Retrograde',
    title: 'Mercury Stations Retrograde in Scorpio',
    date: 'Next Station: In 12 Days',
    exactDegree: '18° Scorpio to 02° Scorpio',
    intensity: 'High Cosmic Energy',
    summary:
      'Mercury plunges into the underworld waters of Scorpio, inviting profound truth-seeking, uncovering hidden communications, and reconciling past contracts.',
    impactedSigns: ['Scorpio', 'Taurus', 'Aquarius', 'Leo'],
    remedyOrRitual:
      'Review contracts twice, backup digital archives, speak with deliberate measured truth, and avoid hasty gossip.',
    isRetrogradeStation: true,
  },
  {
    id: 'transit-jupiter-cancer',
    planet: 'Jupiter',
    type: 'Ingress',
    title: 'Jupiter in Cancer: Exalted Abundance & Emotional Roots',
    date: 'Upcoming Transit Cycle',
    exactDegree: '00° Cancer Exaltation',
    intensity: 'High Cosmic Energy',
    summary:
      'Jupiter reaches its supreme sign of exaltation in Cancer, pouring magnificent blessings into home, food security, maternal lineage, and emotional sanctuary.',
    impactedSigns: ['Cancer', 'Scorpio', 'Pisces', 'Taurus', 'Virgo'],
    remedyOrRitual:
      'Bless your sanctuary, host communal dinners, and honor ancestral wisdom with fresh spring flowers.',
  },
  {
    id: 'transit-solar-eclipse',
    planet: 'Sun',
    type: 'Eclipse',
    title: 'Annular Solar Eclipse Portal',
    date: 'Next Cosmic Window',
    exactDegree: 'Aries-Libra Axis',
    intensity: 'Major Astrological Event',
    summary:
      'A karmic reset of sovereign will vs. relational compromise. Destined doorways swing open while outdated contracts dissolve overnight.',
    impactedSigns: ['Aries', 'Libra', 'Cancer', 'Capricorn'],
    remedyOrRitual:
      'Practice stillness during the eclipse peak. Avoid forced manifestation; let destiny clear the stage unhindered.',
  },
  {
    id: 'transit-venus-leo',
    planet: 'Venus',
    type: 'Ingress',
    title: 'Venus Ingress into Leo: Bold Romantic Splendor',
    date: 'Current Season Highlight',
    exactDegree: '12° Leo',
    intensity: 'Moderate Shift',
    summary:
      'The goddess of beauty dons her golden crown, infusing romance, style, and creative endeavors with royal generosity and fearless passion.',
    impactedSigns: ['Leo', 'Aries', 'Sagittarius', 'Gemini', 'Libra'],
    remedyOrRitual:
      'Dress in radiant golds and vibrant hues. Shower your beloved with majestic compliments and creative tokens.',
  },
];

// Default sample profile (for instant preview)
export const DEFAULT_SAMPLE_PROFILES: BirthProfile[] = [
  generateBirthProfile('Yash Mishra', '1998-07-28', '14:30', 'Varanasi, India', 25.3176, 82.9739),
  generateBirthProfile('Maya Sterling', '2001-11-14', '08:45', 'San Francisco, CA', 37.7749, -122.4194),
  generateBirthProfile('Julian Vance', '1995-04-05', '19:15', 'London, UK', 51.5074, -0.1278),
];
