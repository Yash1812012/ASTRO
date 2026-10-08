import { useState } from 'react';
import { BirthProfile, PlanetPlacement } from '../types/astrology';
import { ZODIAC_SIGNS, ZODIAC_ORDER } from '../utils/astrologyEngine';
import { Compass, Info, X } from 'lucide-react';

interface BirthChartWheelProps {
  profile: BirthProfile;
}

export default function BirthChartWheel({ profile }: BirthChartWheelProps) {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPlacement | null>(null);

  const size = 520;
  const center = size / 2;
  const outerRadius = 230;
  const signRingInnerRadius = 185;
  const houseRingInnerRadius = 145;
  const aspectRadius = 110;

  // Align with Ascendant on the left (180 deg)
  const ascIndex = ZODIAC_ORDER.indexOf(profile.ascendantSign);
  const rotationOffset = -180 - ascIndex * 30;

  const polarToCartesian = (radius: number, angleDeg: number) => {
    const angleRad = ((angleDeg + rotationOffset) * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(angleRad),
      y: center + radius * Math.sin(angleRad),
    };
  };

  const getSectorPath = (r1: number, r2: number, startAngle: number, endAngle: number) => {
    const p1 = polarToCartesian(r2, startAngle);
    const p2 = polarToCartesian(r2, endAngle);
    const p3 = polarToCartesian(r1, endAngle);
    const p4 = polarToCartesian(r1, startAngle);

    return `M ${p1.x} ${p1.y} A ${r2} ${r2} 0 0 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${r1} ${r1} 0 0 0 ${p4.x} ${p4.y} Z`;
  };

  // Light, elegant element sector colors
  const elementColors: Record<string, { bg: string; border: string; text: string }> = {
    Fire: { bg: 'rgba(254, 243, 199, 0.65)', border: 'rgba(245, 158, 11, 0.45)', text: '#b45309' },
    Earth: { bg: 'rgba(240, 253, 244, 0.7)', border: 'rgba(34, 197, 94, 0.35)', text: '#15803d' },
    Air: { bg: 'rgba(254, 252, 232, 0.8)', border: 'rgba(234, 179, 8, 0.45)', text: '#a16207' },
    Water: { bg: 'rgba(239, 246, 255, 0.7)', border: 'rgba(59, 130, 246, 0.35)', text: '#1d4ed8' },
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-amber-200/90 shadow-sm">
      {/* Chart Title & Big Three Summary */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-4 mb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-500" />
            <span>Natal Astrological Wheel</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Geocentric Placidus House System · Ascendant on 1st House Cusp
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-amber-800">☉ {profile.sunSign}</span>
          <span className="text-slate-300">·</span>
          <span className="text-amber-800">☽ {profile.moonSign}</span>
          <span className="text-slate-300">·</span>
          <span className="text-amber-800">↑ {profile.ascendantSign}</span>
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center my-2">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full select-none">
          {/* Subtle Outer Guide Ring */}
          <circle
            cx={center}
            cy={center}
            r={outerRadius + 6}
            fill="none"
            stroke="rgba(203, 213, 225, 0.8)"
            strokeWidth="1"
          />

          {/* 12 Zodiac Sign Sectors */}
          {ZODIAC_ORDER.map((signName, idx) => {
            const startAngle = idx * 30;
            const endAngle = (idx + 1) * 30;
            const midAngle = startAngle + 15;
            const sign = ZODIAC_SIGNS[signName];
            const colors = elementColors[sign.element];
            const glyphPos = polarToCartesian((outerRadius + signRingInnerRadius) / 2, midAngle);

            return (
              <g key={signName} className="transition-opacity hover:opacity-100 opacity-95">
                <path
                  d={getSectorPath(signRingInnerRadius, outerRadius, startAngle, endAngle)}
                  fill={colors.bg}
                  stroke={colors.border}
                  strokeWidth="0.8"
                />
                <text
                  x={glyphPos.x}
                  y={glyphPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="15"
                  fill={colors.text}
                  fontWeight="bold"
                  className="select-none pointer-events-none"
                >
                  {sign.glyph}
                </text>
              </g>
            );
          })}

          {/* House Division Lines */}
          {profile.houses.map((house, idx) => {
            const angle = idx * 30;
            const pOuter = polarToCartesian(outerRadius, angle);
            const pInner = polarToCartesian(houseRingInnerRadius, angle);
            const numPos = polarToCartesian((signRingInnerRadius + houseRingInnerRadius) / 2, angle + 15);
            const isAxis = idx === 0 || idx === 3 || idx === 6 || idx === 9;

            return (
              <g key={`house-${house.house}`}>
                <line
                  x1={pInner.x}
                  y1={pInner.y}
                  x2={pOuter.x}
                  y2={pOuter.y}
                  stroke={isAxis ? 'rgba(217, 119, 6, 0.8)' : 'rgba(148, 163, 184, 0.4)'}
                  strokeWidth={isAxis ? '1.5' : '0.8'}
                  strokeDasharray={isAxis ? 'none' : '2 3'}
                />
                <text
                  x={numPos.x}
                  y={numPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="10"
                  fill={isAxis ? '#b45309' : '#64748b'}
                  fontWeight={isAxis ? 'bold' : 'normal'}
                >
                  {house.house}
                </text>
              </g>
            );
          })}

          {/* Inner Aspect Ring */}
          <circle
            cx={center}
            cy={center}
            r={houseRingInnerRadius}
            fill="#ffffff"
            stroke="rgba(217, 119, 6, 0.3)"
            strokeWidth="1"
          />
          <circle
            cx={center}
            cy={center}
            r={aspectRadius}
            fill="#fefce8"
            stroke="rgba(203, 213, 225, 0.6)"
            strokeWidth="1"
          />

          {/* Aspect Lines */}
          {profile.aspects.map((aspect, idx) => {
            const p1Placement = profile.placements.find((p) => p.planet === aspect.planet1);
            const p2Placement = profile.placements.find((p) => p.planet === aspect.planet2);
            if (!p1Placement || !p2Placement) return null;

            const signIdx1 = ZODIAC_ORDER.indexOf(p1Placement.sign);
            const signIdx2 = ZODIAC_ORDER.indexOf(p2Placement.sign);
            const angle1 = signIdx1 * 30 + p1Placement.degree;
            const angle2 = signIdx2 * 30 + p2Placement.degree;

            const pos1 = polarToCartesian(aspectRadius - 8, angle1);
            const pos2 = polarToCartesian(aspectRadius - 8, angle2);

            let strokeColor = 'rgba(148, 163, 184, 0.4)';
            let dash = 'none';
            if (aspect.aspectType === 'Trine' || aspect.aspectType === 'Sextile') {
              strokeColor = 'rgba(14, 165, 233, 0.6)';
            } else if (aspect.aspectType === 'Square' || aspect.aspectType === 'Opposition') {
              strokeColor = 'rgba(239, 68, 68, 0.6)';
              dash = '4 3';
            } else if (aspect.aspectType === 'Conjunction') {
              strokeColor = 'rgba(217, 119, 6, 0.7)';
            }

            return (
              <line
                key={`aspect-${idx}`}
                x1={pos1.x}
                y1={pos1.y}
                x2={pos2.x}
                y2={pos2.y}
                stroke={strokeColor}
                strokeWidth="1.2"
                strokeDasharray={dash}
              />
            );
          })}

          {/* Center Hub */}
          <circle cx={center} cy={center} r="18" fill="#ffffff" stroke="rgba(217, 119, 6, 0.5)" strokeWidth="1.5" />
          <text
            x={center}
            y={center}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="10"
            fill="#d97706"
          >
            ✦
          </text>

          {/* Planetary Markers */}
          {profile.placements.map((placement) => {
            const sIdx = ZODIAC_ORDER.indexOf(placement.sign);
            const planetAngle = sIdx * 30 + placement.degree;
            const pos = polarToCartesian(houseRingInnerRadius - 16, planetAngle);
            const isSelected = selectedPlanet?.planet === placement.planet;

            return (
              <g
                key={placement.planet}
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => setSelectedPlanet(placement)}
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected ? 13 : 10}
                  fill={isSelected ? '#f59e0b' : '#fef08a'}
                  stroke={isSelected ? '#78350f' : '#ca8a04'}
                  strokeWidth={isSelected ? '2' : '1'}
                />
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={isSelected ? '11' : '9'}
                  fill={isSelected ? '#ffffff' : '#854d0e'}
                  fontWeight="bold"
                >
                  {placement.glyph}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Planet Details Card */}
      <div className="w-full mt-3 p-3.5 bg-[#faf9f5] rounded-lg border border-slate-200 text-xs text-slate-800">
        {selectedPlanet ? (
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base text-amber-600 font-bold">{selectedPlanet.glyph}</span>
                <span className="font-semibold text-slate-900">{selectedPlanet.planet}</span>
                <span className="text-slate-700 font-medium">
                  {selectedPlanet.degree}° {selectedPlanet.minute}' in {selectedPlanet.sign}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-600">House {selectedPlanet.house}</span>
                {selectedPlanet.isRetrograde && (
                  <span className="text-rose-700 bg-rose-100 font-semibold px-1 rounded text-[10px]">Rx</span>
                )}
              </div>
              <p className="text-slate-600 mt-1 leading-relaxed">{selectedPlanet.meaning}</p>
            </div>
            <button
              onClick={() => setSelectedPlanet(null)}
              className="text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between text-slate-500">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-600" />
              <span>Click any planetary glyph on the wheel to inspect its degree and astrological house.</span>
            </span>
            <span className="text-amber-800 font-medium text-[11px]">Ascendant: {profile.ascendantSign}</span>
          </div>
        )}
      </div>
    </div>
  );
}
