import { useState } from 'react';
import { BirthProfile } from '../types/astrology';
import { generateBirthProfile } from '../utils/astrologyEngine';
import { Compass, X } from 'lucide-react';

interface BirthChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (profile: BirthProfile) => void;
}

export default function BirthChartModal({ isOpen, onClose, onSaveProfile }: BirthChartModalProps) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('2000-08-15');
  const [birthTime, setBirthTime] = useState('12:00');
  const [isTimeUnknown, setIsTimeUnknown] = useState(false);
  const [birthPlace, setBirthPlace] = useState('New York, USA');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const time = isTimeUnknown ? '12:00' : birthTime;
    const newProfile = generateBirthProfile(name.trim(), birthDate, time, birthPlace.trim() || 'Global Coordinates');
    onSaveProfile(newProfile);
    onClose();
  };

  const presetLocations = [
    'Varanasi, India',
    'New Delhi, India',
    'New York, NY, USA',
    'London, UK',
    'Los Angeles, CA, USA',
    'Tokyo, Japan',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-amber-200/90 rounded-2xl p-6 shadow-2xl text-slate-900">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Compass className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold text-slate-900 font-celestial">
              Calculate Natal Birth Chart
            </h2>
          </div>
          <p className="text-xs text-slate-600">
            Enter birth details to compute Sun, Moon, Ascendant, and 12-house placements.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Yash Mishra"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-[#faf9f5] border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#faf9f5] border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">Birth Time</label>
                <label className="text-[10px] text-slate-500 flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isTimeUnknown}
                    onChange={(e) => setIsTimeUnknown(e.target.checked)}
                    className="rounded border-slate-300 text-amber-500 focus:ring-amber-400"
                  />
                  <span>Approx</span>
                </label>
              </div>
              <input
                type="time"
                disabled={isTimeUnknown}
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className={`w-full px-3 py-2 bg-[#faf9f5] border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white ${
                  isTimeUnknown ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Birth City & Region</label>
            <input
              type="text"
              required
              placeholder="e.g. Varanasi, India"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              className="w-full px-3 py-2 bg-[#faf9f5] border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[10px] text-slate-400 self-center">Presets:</span>
              {presetLocations.map((loc) => (
                <button
                  type="button"
                  key={loc}
                  onClick={() => setBirthPlace(loc)}
                  className="text-[10px] text-slate-600 hover:text-slate-900 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded border border-amber-200 transition-colors"
                >
                  {loc.split(',')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors shadow-xs"
            >
              Cast Chart
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
