import { useState } from 'react';
import { BirthProfile, DailyHoroscope } from '../types/astrology';
import { generateDailyHoroscope, ZODIAC_SIGNS } from '../utils/astrologyEngine';
import BirthChartWheel from './BirthChartWheel';
import { Heart, Briefcase, Brain, Activity, Volume2, Square, Compass } from 'lucide-react';

interface DailyHoroscopeViewProps {
  profile: BirthProfile;
  onOpenNewChart: () => void;
}

export default function DailyHoroscopeView({ profile, onOpenNewChart }: DailyHoroscopeViewProps) {
  const [dayOffset, setDayOffset] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showWheelView, setShowWheelView] = useState(false);

  const horoscope: DailyHoroscope = generateDailyHoroscope(profile, dayOffset);
  const sunInfo = ZODIAC_SIGNS[profile.sunSign];
  const moonInfo = ZODIAC_SIGNS[profile.moonSign];
  const ascInfo = ZODIAC_SIGNS[profile.ascendantSign];

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToSpeak = `Daily astrological briefing for ${profile.name} on ${horoscope.date}. ${horoscope.cosmicTheme}. ${horoscope.summary} Love: ${horoscope.loveForecast} Career: ${horoscope.careerForecast} Affirmation: ${horoscope.cosmicAffirmation}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Executive Overview Header */}
      <div className="rounded-xl bg-white border border-amber-200/90 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* User & Date Info */}
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-700 font-semibold mb-1">
              <span>{horoscope.date}</span>
              <span className="text-slate-300">·</span>
              <span>{profile.birthPlace}</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-celestial">
              {profile.name}’s Daily Horoscope
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed">
              Synthesized from your natal Sun in {profile.sunSign}, Moon in {profile.moonSign}, and Ascendant in {profile.ascendantSign}.
            </p>
          </div>

          {/* Big Three Badges */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-lg bg-amber-50/80 border border-amber-200 text-center min-w-[95px] shadow-xs">
              <span className="text-[10px] text-amber-700 uppercase tracking-wider block font-semibold">Sun</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                {sunInfo.glyph} {profile.sunSign}
              </span>
            </div>

            <div className="px-4 py-2.5 rounded-lg bg-amber-50/80 border border-amber-200 text-center min-w-[95px] shadow-xs">
              <span className="text-[10px] text-amber-700 uppercase tracking-wider block font-semibold">Moon</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                {moonInfo.glyph} {profile.moonSign}
              </span>
            </div>

            <div className="px-4 py-2.5 rounded-lg bg-amber-50/80 border border-amber-200 text-center min-w-[95px] shadow-xs">
              <span className="text-[10px] text-amber-700 uppercase tracking-wider block font-semibold">Rising</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                ↑ {profile.ascendantSign}
              </span>
            </div>
          </div>
        </div>

        {/* Date Selector & Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-5 border-t border-slate-100">
          <div className="inline-flex p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setDayOffset(-1)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                dayOffset === -1 ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Yesterday
            </button>
            <button
              onClick={() => setDayOffset(0)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                dayOffset === 0 ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setDayOffset(1)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                dayOffset === 1 ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tomorrow
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleAudio}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-amber-400 text-xs text-slate-700 transition-colors shadow-xs"
            >
              {isPlayingAudio ? (
                <>
                  <Square className="w-3.5 h-3.5 text-rose-500" />
                  <span>Stop Reading</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Listen to Reading</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowWheelView(!showWheelView)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-300 hover:bg-amber-100 text-xs font-medium text-amber-900 transition-colors shadow-xs"
            >
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              <span>{showWheelView ? 'Hide Natal Wheel' : 'View Natal Wheel'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Optional Natal Chart Wheel Section */}
      {showWheelView && (
        <div className="animate-fade-in">
          <BirthChartWheel profile={profile} />
        </div>
      )}

      {/* Main Reading Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Summary, 4 Key Life Areas, Active Transits */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Core Guidance */}
          <div className="rounded-xl bg-white border border-amber-200/90 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider block">
                  Cosmic Theme
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-0.5">{horoscope.cosmicTheme}</h2>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Synergy</span>
                <span className="text-2xl font-black text-amber-600 font-celestial">{horoscope.overallScore}%</span>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed font-normal">{horoscope.summary}</p>

            {/* Cosmic Affirmation */}
            <div className="p-4 rounded-lg bg-amber-50/90 border border-amber-200 text-xs text-slate-800">
              <span className="text-[10px] text-amber-800 uppercase font-semibold tracking-wider block mb-0.5">
                Daily Affirmation
              </span>
              <p className="italic font-medium text-amber-950">"{horoscope.cosmicAffirmation}"</p>
            </div>
          </div>

          {/* Four Clean Focus Areas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Love */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-300 transition-colors space-y-2 shadow-xs">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <h3 className="text-xs font-semibold text-slate-900">Love & Relationships</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{horoscope.loveForecast}</p>
            </div>

            {/* Career */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-300 transition-colors space-y-2 shadow-xs">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-600" />
                <h3 className="text-xs font-semibold text-slate-900">Career & Ambition</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{horoscope.careerForecast}</p>
            </div>

            {/* Mind */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-300 transition-colors space-y-2 shadow-xs">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-indigo-500" />
                <h3 className="text-xs font-semibold text-slate-900">Mind & Intuition</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{horoscope.spiritualGuidance}</p>
            </div>

            {/* Wellness */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-300 transition-colors space-y-2 shadow-xs">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-semibold text-slate-900">Vitality & Wellness</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{horoscope.wellnessForecast}</p>
            </div>
          </div>

          {/* Active Transits Affecting Natal Chart */}
          <div className="rounded-xl bg-white border border-amber-200/90 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Active Transits to Your Chart</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Planetary bodies currently in aspect with your birth placements
                </p>
              </div>
              <span className="text-xs text-amber-700 font-semibold px-2 py-0.5 rounded bg-amber-100">
                {horoscope.activeTransits.length} Influences
              </span>
            </div>

            <div className="space-y-2.5">
              {horoscope.activeTransits.map((transit, idx) => (
                <div
                  key={`transit-${idx}`}
                  className="p-3.5 rounded-lg bg-[#faf9f5] border border-slate-200/80 hover:border-amber-300 text-xs space-y-1.5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">
                      Transit {transit.transitPlanet} in {transit.transitSign} {transit.aspect} Natal{' '}
                      {transit.natalPlanet}
                    </span>
                    <span className="text-[10px] text-amber-900 bg-amber-100 font-medium px-2 py-0.5 rounded">
                      {transit.nature}
                    </span>
                  </div>
                  <h4 className="font-medium text-amber-800">{transit.headline}</h4>
                  <p className="text-slate-600 leading-relaxed">{transit.guidance}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Daily Metrics & Ephemeris Table */}
        <div className="space-y-6">
          {/* Daily Resonances Card */}
          <div className="rounded-xl bg-white border border-amber-200/90 p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Daily Indicators
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Lucky Numbers</span>
                <span className="font-semibold text-slate-900">{horoscope.luckyNumbers.join(', ')}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Resonant Color</span>
                <span className="font-semibold text-slate-900">{horoscope.luckyColor}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Crystalline Stone</span>
                <span className="font-semibold text-amber-800">{horoscope.suggestedCrystal}</span>
              </div>
              <div className="pb-1">
                <span className="text-slate-500 block mb-1">Peak Power Hours</span>
                <span className="font-medium text-amber-700">{horoscope.powerHours}</span>
              </div>
            </div>
          </div>

          {/* Quick Placements Table */}
          <div className="rounded-xl bg-white border border-amber-200/90 p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Natal Coordinates
              </h3>
              <button
                onClick={onOpenNewChart}
                className="text-[11px] text-amber-700 hover:text-amber-800 font-semibold"
              >
                + New Chart
              </button>
            </div>

            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
              {profile.placements.map((p) => (
                <div
                  key={p.planet}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#faf9f5] text-xs border border-slate-200/80"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-4 text-center text-amber-600 font-bold">{p.glyph}</span>
                    <span className="font-medium text-slate-800">{p.planet}</span>
                  </div>
                  <div className="text-slate-600 flex items-center gap-1.5">
                    <span>
                      {p.degree}° {p.sign}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">H{p.house}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
