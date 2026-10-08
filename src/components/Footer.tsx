import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full mt-16 bg-white border-t border-amber-200/90 py-8 text-slate-600 text-xs shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Author Attribution Card */}
        <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="text-sm font-bold text-slate-900 font-celestial">
              Aetheria Astrology & Natal Ephemeris
            </div>
            <div className="text-xs text-amber-900 font-medium mt-0.5">
              The application is built by <span className="font-bold text-amber-950 underline decoration-amber-400">Yash Mishra</span>.
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider block">
              Universal Astronomical Time (UTC)
            </span>
            <span className="text-slate-800 font-mono text-xs font-medium mt-0.5 block">{currentTime || 'Synchronizing...'}</span>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-[11px]">
          <span>© {new Date().getFullYear()} Aetheria · Tropical Zodiac & Placidus House Ephemeris</span>
          <span>
            Created by <span className="text-slate-800 font-semibold">Yash Mishra</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
