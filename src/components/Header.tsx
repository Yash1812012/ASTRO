import { useState } from 'react';
import { BirthProfile } from '../types/astrology';
import { Sparkles, Compass, Heart, Moon, Bell, ChevronDown, Plus } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profiles: BirthProfile[];
  activeProfile: BirthProfile;
  onSelectProfile: (profile: BirthProfile) => void;
  onOpenNewChart: () => void;
  onOpenNotifications: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  profiles,
  activeProfile,
  onSelectProfile,
  onOpenNewChart,
  onOpenNotifications,
}: HeaderProps) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: 'horoscope', label: 'Daily Horoscope', icon: Sparkles },
    { id: 'wheel', label: 'Birth Chart', icon: Compass },
    { id: 'compatibility', label: 'Compatibility', icon: Heart },
    { id: 'moon', label: 'Moon & Transits', icon: Moon },
    { id: 'alerts', label: 'Transit Alerts', icon: Bell },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand Identity */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => setActiveTab('horoscope')}
          >
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs">
              <Sparkles className="w-4 h-4 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-slate-900 font-celestial">
                  AETHERIA
                </span>
                <span className="hidden sm:inline-block text-[10px] text-amber-800 font-semibold px-1.5 py-0.5 rounded bg-amber-100 border border-amber-300">
                  Ephemeris
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Built by <span className="text-slate-800 font-medium">Yash Mishra</span>
              </p>
            </div>
          </div>

          {/* Desktop Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-100 text-amber-950 border border-amber-300 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Profile Switcher & Alerts Bell */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Active Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-amber-400 text-xs text-slate-800 transition-colors shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="font-semibold max-w-[100px] sm:max-w-[130px] truncate">
                  {activeProfile.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 text-xs">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-semibold text-slate-400 border-b border-slate-100">
                    Birth Profiles
                  </div>
                  {profiles.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectProfile(p);
                        setProfileDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-amber-50/60 transition-colors ${
                        p.id === activeProfile.id
                          ? 'text-amber-900 font-semibold bg-amber-50'
                          : 'text-slate-700'
                      }`}
                    >
                      <span className="truncate">{p.name}</span>
                      <span className="text-[11px] text-slate-400">{p.sunSign}</span>
                    </button>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1 px-2">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenNewChart();
                      }}
                      className="w-full py-1.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New Birth Chart</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg bg-white border border-slate-200 hover:border-amber-400 text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
              title="Transit Alerts & Notifications"
              aria-label="Transit Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden overflow-x-auto py-2 border-t border-slate-100 gap-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
