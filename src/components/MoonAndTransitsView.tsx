import { useState } from 'react';
import { getCurrentMoonStatus, getLunarCalendarMonth, UPCOMING_TRANSITS, ZODIAC_SIGNS } from '../utils/astrologyEngine';
import { TransitEvent } from '../types/astrology';
import { Calendar, Orbit } from 'lucide-react';

export default function MoonAndTransitsView() {
  const [filterType, setFilterType] = useState<string>('All');
  const moonStatus = getCurrentMoonStatus();
  const lunarCalendar = getLunarCalendarMonth();

  const filteredTransits = UPCOMING_TRANSITS.filter((t) => {
    if (filterType === 'All') return true;
    if (filterType === 'Retrogrades') return t.type === 'Retrograde';
    if (filterType === 'Ingresses') return t.type === 'Ingress';
    if (filterType === 'Eclipses') return t.type === 'Eclipse';
    return true;
  });

  const renderMoonSvg = () => {
    const r = 45;
    const illum = moonStatus.illumination;
    const isWaxing = moonStatus.phaseName.includes('Waxing') || moonStatus.phaseName === 'First Quarter';

    return (
      <svg viewBox="0 0 110 110" className="w-28 h-28 drop-shadow-md">
        {/* Dark body of the moon */}
        <circle cx="55" cy="55" r={r} fill="#1e293b" stroke="#cbd5e1" strokeWidth="1" />

        {/* Illuminated portion in golden yellow */}
        {illum === 0 ? null : illum === 100 ? (
          <circle cx="55" cy="55" r={r} fill="#facc15" />
        ) : (
          <path
            d={
              isWaxing
                ? `M 55 10 A ${r} ${r} 0 0 1 55 100 A ${Math.abs((illum - 50) / 50 * r)} ${r} 0 0 ${
                    illum < 50 ? 1 : 0
                  } 55 10`
                : `M 55 10 A ${r} ${r} 0 0 0 55 100 A ${Math.abs((illum - 50) / 50 * r)} ${r} 0 0 ${
                    illum < 50 ? 0 : 1
                  } 55 10`
            }
            fill="#facc15"
          />
        )}

        {/* Craters */}
        <circle cx="45" cy="42" r="5" fill="rgba(15, 23, 42, 0.15)" />
        <circle cx="65" cy="62" r="6" fill="rgba(15, 23, 42, 0.15)" />
        <circle cx="48" cy="70" r="3.5" fill="rgba(15, 23, 42, 0.15)" />
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      {/* Real-time Moon Phase Dashboard */}
      <div className="rounded-xl bg-white border border-amber-200/90 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Moon Visual & Phase */}
          <div className="flex items-center gap-5">
            <div className="flex-shrink-0">{renderMoonSvg()}</div>
            <div>
              <span className="text-[10px] text-amber-700 font-semibold uppercase tracking-wider block">
                Live Moon Phase
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5 font-celestial">{moonStatus.phaseName}</h2>
              <div className="text-sm font-semibold text-amber-600 mt-1">
                {moonStatus.illumination}% Illuminated
              </div>
              <span className="text-xs text-slate-500 mt-0.5 block">
                Lunar Age: {moonStatus.moonAgeDays} days
              </span>
            </div>
          </div>

          {/* Current Sign & Void-of-Course */}
          <div className="p-4 rounded-xl bg-[#faf9f5] border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-500">Current Zodiac Position</span>
              <span className="font-semibold text-slate-900">
                {ZODIAC_SIGNS[moonStatus.currentSign].glyph} {moonStatus.currentSign} ({moonStatus.degreeInSign}°)
              </span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-500">Void-of-Course</span>
              <span className={moonStatus.isVoidOfCourse ? 'text-amber-700 font-bold' : 'text-emerald-700 font-semibold'}>
                {moonStatus.isVoidOfCourse ? 'Active (Rest Period)' : 'Direct Motion'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Lunar Nodes Axis</span>
              <span className="font-semibold text-amber-800">{moonStatus.lunarNodesSign}</span>
            </div>
          </div>

          {/* Upcoming Milestones */}
          <div className="p-4 rounded-xl bg-[#faf9f5] border border-slate-200 space-y-2 text-xs">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Upcoming Lunar Milestones
            </span>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-500">Next New Moon</span>
              <span className="font-medium text-slate-900">{moonStatus.nextNewMoon}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Next Full Moon</span>
              <span className="font-bold text-amber-700">{moonStatus.nextFullMoon}</span>
            </div>
          </div>
        </div>

        {/* Phase Astrological Influence & Advice */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-[#faf9f5] border border-slate-200">
            <span className="text-[10px] font-semibold text-amber-700 uppercase tracking-wider block mb-1">
              Astrological Energy
            </span>
            <p className="text-slate-700 leading-relaxed">{moonStatus.astrologicalInfluence}</p>
          </div>
          <div className="p-4 rounded-lg bg-amber-50/80 border border-amber-200">
            <span className="text-[10px] font-semibold text-amber-800 uppercase tracking-wider block mb-1">
              Recommended Focus
            </span>
            <p className="text-slate-800 leading-relaxed font-medium">{moonStatus.ritualAdvice}</p>
          </div>
        </div>
      </div>

      {/* 30-Day Lunar Calendar Month Strip */}
      <div className="rounded-xl bg-white border border-amber-200/90 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>30-Day Lunar Cycle Ephemeris</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Daily illumination and transiting zodiac sign through the synodic orbit
            </p>
          </div>
          <span className="text-xs text-amber-800 font-semibold px-2 py-0.5 rounded bg-amber-100">
            30 Days Projected
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-10 gap-2 overflow-x-auto pb-1">
          {lunarCalendar.map((day, idx) => (
            <div
              key={`lunar-day-${idx}`}
              className={`p-2 rounded-lg border text-center transition-colors ${
                day.isKeyPhase
                  ? 'bg-amber-100 border-amber-400 font-semibold shadow-xs'
                  : 'bg-[#faf9f5] border-slate-200'
              }`}
            >
              <div className="text-[10px] font-medium text-slate-500">
                {new Date(day.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}
              </div>
              <div className="text-base my-0.5">
                {day.phaseName === 'New Moon'
                  ? '🌑'
                  : day.phaseName === 'Full Moon'
                  ? '🌕'
                  : day.phaseName.includes('Crescent')
                  ? '🌙'
                  : '🌓'}
              </div>
              <div className="text-[10px] font-bold text-amber-800">{day.illumination}%</div>
              <div className="text-[9px] text-slate-600 truncate mt-0.5 font-medium">
                {ZODIAC_SIGNS[day.sign].glyph} {day.sign.slice(0, 3)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Major Planetary Transit Movement Alerts */}
      <div className="rounded-xl bg-white border border-amber-200/90 p-6 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Orbit className="w-4 h-4 text-amber-600" />
              <span>Major Planetary Transits & Movements</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Current astronomical shifts, retrogrades, and sign ingresses
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
            {['All', 'Retrogrades', 'Ingresses', 'Eclipses'].map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterType(filter)}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  filterType === filter ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Transit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTransits.map((transit: TransitEvent) => (
            <div
              key={transit.id}
              className="p-5 rounded-xl bg-[#faf9f5] border border-slate-200/90 hover:border-amber-300 transition-colors space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-700 block">
                    {transit.type} · {transit.date}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-0.5">{transit.title}</h4>
                </div>
                <span className="text-[10px] text-amber-900 bg-amber-100 font-semibold px-2 py-0.5 rounded border border-amber-300 flex-shrink-0">
                  {transit.intensity}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">{transit.summary}</p>

              <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span className="text-[11px] text-slate-500">Affected Signs:</span>
                  <div className="flex gap-1.5">
                    {transit.impactedSigns.map((s) => (
                      <span key={s} className="text-amber-800 font-semibold text-xs">
                        {ZODIAC_SIGNS[s].glyph} {s}
                      </span>
                    ))}
                  </div>
                </div>
                {transit.exactDegree && (
                  <span className="text-[11px] text-slate-500 font-mono font-medium">{transit.exactDegree}</span>
                )}
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-600">
                <strong className="text-slate-900 font-semibold">Recommended Action: </strong>
                {transit.remedyOrRitual}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
