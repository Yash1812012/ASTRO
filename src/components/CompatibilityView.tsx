import { useState } from 'react';
import { ZodiacSignName } from '../types/astrology';
import { ZODIAC_SIGNS, ZODIAC_ORDER, calculateCompatibility } from '../utils/astrologyEngine';
import { ArrowRightLeft, Grid, Check, AlertCircle } from 'lucide-react';

interface CompatibilityViewProps {
  initialSign1?: ZodiacSignName;
}

export default function CompatibilityView({ initialSign1 = 'Aries' }: CompatibilityViewProps) {
  const [sign1, setSign1] = useState<ZodiacSignName>(initialSign1);
  const [sign2, setSign2] = useState<ZodiacSignName>('Leo');
  const [showMatrix, setShowMatrix] = useState(false);

  const result = calculateCompatibility(sign1, sign2);
  const info1 = ZODIAC_SIGNS[sign1];
  const info2 = ZODIAC_SIGNS[sign2];

  const handleSwap = () => {
    const temp = sign1;
    setSign1(sign2);
    setSign2(temp);
  };

  return (
    <div className="space-y-6">
      {/* Executive Header & Selectors */}
      <div className="rounded-xl bg-white border border-amber-200/90 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-amber-700 font-semibold uppercase tracking-wider block mb-1">
              Synastry Analyzer
            </span>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-celestial">
              Zodiac Sign Compatibility
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-lg">
              Compare any two signs across emotional resonance, communication, passion, and long-term durability.
            </p>
          </div>

          <button
            onClick={() => setShowMatrix(!showMatrix)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-50 border border-amber-300 hover:bg-amber-100 text-xs font-medium text-amber-900 transition-colors self-start sm:self-auto shadow-xs"
          >
            <Grid className="w-3.5 h-3.5 text-amber-700" />
            <span>{showMatrix ? 'Hide 12×12 Matrix' : '12×12 Synergy Matrix'}</span>
          </button>
        </div>

        {/* Clean Sign Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-4 pt-4 border-t border-slate-100">
          {/* Sign 1 Selector */}
          <div className="md:col-span-2 p-4 bg-[#faf9f5] rounded-xl border border-slate-200 space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Primary Sign
            </span>
            <div className="flex items-center gap-3">
              <span className="text-2xl text-amber-600 font-bold">{info1.glyph}</span>
              <select
                value={sign1}
                onChange={(e) => setSign1(e.target.value as ZodiacSignName)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:border-amber-500"
              >
                {ZODIAC_ORDER.map((s) => (
                  <option key={`s1-${s}`} value={s}>
                    {ZODIAC_SIGNS[s].glyph} {s} ({ZODIAC_SIGNS[s].element})
                  </option>
                ))}
              </select>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-1 font-medium">
              <span>{info1.element}</span>
              <span>·</span>
              <span>{info1.modality}</span>
              <span>·</span>
              <span>Ruler: {info1.ruler}</span>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSwap}
              title="Swap Signs"
              className="w-10 h-10 rounded-full bg-amber-100 hover:bg-amber-200 border border-amber-300 flex items-center justify-center text-amber-900 transition-colors shadow-xs"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Sign 2 Selector */}
          <div className="md:col-span-2 p-4 bg-[#faf9f5] rounded-xl border border-slate-200 space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Counterpart Sign
            </span>
            <div className="flex items-center gap-3">
              <span className="text-2xl text-amber-600 font-bold">{info2.glyph}</span>
              <select
                value={sign2}
                onChange={(e) => setSign2(e.target.value as ZodiacSignName)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:border-amber-500"
              >
                {ZODIAC_ORDER.map((s) => (
                  <option key={`s2-${s}`} value={s}>
                    {ZODIAC_SIGNS[s].glyph} {s} ({ZODIAC_SIGNS[s].element})
                  </option>
                ))}
              </select>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-1 font-medium">
              <span>{info2.element}</span>
              <span>·</span>
              <span>{info2.modality}</span>
              <span>·</span>
              <span>Ruler: {info2.ruler}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 12x12 Matrix Expansion */}
      {showMatrix && (
        <div className="rounded-xl bg-white border border-amber-200/90 p-5 overflow-x-auto shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Complete 12×12 Zodiac Synergy Matrix
            </h3>
            <span className="text-xs text-slate-500">Click any score to view pairing</span>
          </div>

          <table className="w-full text-center text-xs border-collapse min-w-[580px]">
            <thead>
              <tr>
                <th className="p-2 text-slate-400 font-medium text-left">Sign</th>
                {ZODIAC_ORDER.map((s) => (
                  <th key={`hdr-${s}`} className="p-2 text-amber-800 font-bold">
                    {ZODIAC_SIGNS[s].glyph}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ZODIAC_ORDER.map((rowSign) => (
                <tr key={`row-${rowSign}`} className="border-t border-slate-100">
                  <td className="p-2 font-semibold text-slate-800 text-left">
                    {ZODIAC_SIGNS[rowSign].glyph} {rowSign}
                  </td>
                  {ZODIAC_ORDER.map((colSign) => {
                    const score = calculateCompatibility(rowSign, colSign).overallScore;
                    const isCurrent =
                      (rowSign === sign1 && colSign === sign2) ||
                      (rowSign === sign2 && colSign === sign1);

                    return (
                      <td key={`cell-${rowSign}-${colSign}`} className="p-1">
                        <button
                          onClick={() => {
                            setSign1(rowSign);
                            setSign2(colSign);
                          }}
                          className={`w-full py-1 rounded text-[11px] transition-colors ${
                            isCurrent
                              ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                              : score >= 90
                              ? 'bg-amber-100 text-amber-950 font-semibold'
                              : score >= 80
                              ? 'bg-yellow-50 text-slate-800'
                              : 'bg-slate-50 text-slate-500'
                          }`}
                        >
                          {score}%
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Main Analysis Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Overall Score & 4 Harmony Sliders */}
        <div className="space-y-6">
          <div className="rounded-xl bg-white border border-amber-200/90 p-6 text-center space-y-4 shadow-sm">
            <span className="text-xs text-amber-700 uppercase font-semibold tracking-wider block">
              Overall Compatibility
            </span>
            <div className="text-5xl font-black text-amber-500 font-celestial tracking-tight">
              {result.overallScore}%
            </div>
            <p className="text-xs text-slate-600 italic">"{result.archetypeBond}"</p>

            {/* Score Breakdown Bars */}
            <div className="space-y-3 pt-3 text-left border-t border-slate-100">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Emotional Connection</span>
                  <span className="font-semibold text-slate-800">{result.emotionalScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${result.emotionalScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Mental Communication</span>
                  <span className="font-semibold text-slate-800">{result.communicationScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${result.communicationScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Passion & Chemistry</span>
                  <span className="font-semibold text-slate-800">{result.passionScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${result.passionScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Long-term Stability</span>
                  <span className="font-semibold text-slate-800">{result.longevityScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${result.longevityScore}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Elemental & Modality Dynamics */}
          <div className="rounded-xl bg-white border border-amber-200/90 p-5 space-y-4 text-xs shadow-sm">
            <div>
              <span className="text-[10px] font-semibold text-amber-700 uppercase tracking-wider block mb-1">
                Elemental Dynamic
              </span>
              <h4 className="font-bold text-slate-900 text-sm">{result.elementMatch.type}</h4>
              <p className="text-slate-600 mt-1 leading-relaxed">{result.elementMatch.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Modality Dynamic
              </span>
              <h4 className="font-bold text-slate-900 text-sm">{result.modalityMatch.type}</h4>
              <p className="text-slate-600 mt-1 leading-relaxed">{result.modalityMatch.description}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Strengths, Friction & Advice */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Strengths */}
          <div className="rounded-xl bg-white border border-amber-200/90 p-6 space-y-3 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Core Strengths of {sign1} & {sign2}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {result.keyStrengths.map((str, idx) => (
                <div
                  key={`str-${idx}`}
                  className="p-3.5 rounded-lg bg-[#faf9f5] border border-slate-200 text-xs text-slate-800 flex items-start gap-2.5"
                >
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{str}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Friction Points */}
          <div className="rounded-xl bg-white border border-amber-200/90 p-6 space-y-3 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Potential Growth Areas</span>
            </h3>
            <div className="space-y-2.5 pt-1">
              {result.growthFriction.map((fric, idx) => (
                <div
                  key={`fric-${idx}`}
                  className="p-3.5 rounded-lg bg-[#faf9f5] border border-slate-200 text-xs text-slate-800 flex items-start gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{fric}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Karmic Advice */}
          <div className="rounded-xl bg-amber-50/90 border border-amber-200 p-5 space-y-1.5 text-xs shadow-xs">
            <span className="font-semibold text-amber-800 uppercase tracking-wider block text-[10px]">
              Astrological Recommendation
            </span>
            <p className="text-slate-800 leading-relaxed font-medium italic">
              "{result.karmicAdvice}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
