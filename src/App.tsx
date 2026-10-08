import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DailyHoroscopeView from './components/DailyHoroscopeView';
import BirthChartWheel from './components/BirthChartWheel';
import CompatibilityView from './components/CompatibilityView';
import MoonAndTransitsView from './components/MoonAndTransitsView';
import CosmicAlertsView from './components/CosmicAlertsView';
import BirthChartModal from './components/BirthChartModal';
import NotificationsModal from './components/NotificationsModal';
import { BirthProfile } from './types/astrology';
import { DEFAULT_SAMPLE_PROFILES } from './utils/astrologyEngine';
import { Bell, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('horoscope');
  const [profiles, setProfiles] = useState<BirthProfile[]>(() => {
    const saved = localStorage.getItem('aetheria_birth_profiles');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        // Fallback
      }
    }
    return DEFAULT_SAMPLE_PROFILES;
  });

  const [activeProfileId, setActiveProfileId] = useState<string>(() => {
    return profiles[0]?.id || DEFAULT_SAMPLE_PROFILES[0].id;
  });

  const [isNewChartModalOpen, setIsNewChartModalOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);

  useEffect(() => {
    localStorage.setItem('aetheria_birth_profiles', JSON.stringify(profiles));
  }, [profiles]);

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  const handleSaveProfile = (newProfile: BirthProfile) => {
    setProfiles((prev) => [newProfile, ...prev]);
    setActiveProfileId(newProfile.id);
    triggerToast(
      'Natal Chart Cast Successfully',
      `Welcome ${newProfile.name}! Sun in ${newProfile.sunSign}, Moon in ${newProfile.moonSign}, and Rising in ${newProfile.ascendantSign} are calculated.`
    );
  };

  const triggerToast = (title: string, message: string) => {
    setToast({ title, message });
    setTimeout(() => {
      setToast(null);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-[#fbfaf6] text-slate-900 flex flex-col font-sans selection:bg-amber-400/30 selection:text-amber-950">
      {/* Floating In-App Notification Toast */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 max-w-sm sm:max-w-md p-4 rounded-xl bg-white border border-amber-300 shadow-xl backdrop-blur-md animate-fade-in text-xs flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
            <Bell className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 font-celestial text-sm">{toast.title}</h4>
            <p className="text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-slate-700 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Celestial Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profiles={profiles}
        activeProfile={activeProfile}
        onSelectProfile={(p) => setActiveProfileId(p.id)}
        onOpenNewChart={() => setIsNewChartModalOpen(true)}
        onOpenNotifications={() => setIsNotifModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'horoscope' && (
          <DailyHoroscopeView
            profile={activeProfile}
            onOpenNewChart={() => setIsNewChartModalOpen(true)}
          />
        )}

        {activeTab === 'wheel' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-white border border-amber-200/80 shadow-sm">
              <div>
                <span className="text-xs text-amber-700 font-semibold uppercase tracking-wider block mb-1">
                  Full Natal Blueprint
                </span>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {activeProfile.name}’s Natal Chart & House Ephemeris
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  12 Astrological Houses, Planetary Placements, and Major Aspects
                </p>
              </div>
              <button
                onClick={() => setIsNewChartModalOpen(true)}
                className="self-start sm:self-auto px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold transition-colors shadow-sm"
              >
                + Calculate Another Chart
              </button>
            </div>

            <BirthChartWheel profile={activeProfile} />

            {/* 12 House Cusps Breakdown */}
            <div className="p-6 rounded-xl bg-white border border-amber-200/80 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900">
                Placidus 12-House Cusps Matrix
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {activeProfile.houses.map((house) => (
                  <div
                    key={`h-detail-${house.house}`}
                    className="p-3.5 rounded-lg bg-[#faf9f5] border border-slate-200/80 hover:border-amber-300 text-xs space-y-1 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-amber-800">
                        House {house.house}: {house.sign} ({house.degree}°)
                      </span>
                      <span className="text-[10px] text-slate-400">Cusp</span>
                    </div>
                    <div className="text-slate-800 font-medium">{house.title}</div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{house.domain}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'compatibility' && (
          <CompatibilityView initialSign1={activeProfile.sunSign} />
        )}

        {activeTab === 'moon' && <MoonAndTransitsView />}

        {activeTab === 'alerts' && (
          <CosmicAlertsView
            activeProfile={activeProfile}
            onTriggerToast={triggerToast}
            onOpenNotificationsModal={() => setIsNotifModalOpen(true)}
          />
        )}
      </main>

      {/* Global Modals */}
      <BirthChartModal
        isOpen={isNewChartModalOpen}
        onClose={() => setIsNewChartModalOpen(false)}
        onSaveProfile={handleSaveProfile}
      />

      <NotificationsModal
        isOpen={isNotifModalOpen}
        onClose={() => setIsNotifModalOpen(false)}
        activeProfile={activeProfile}
        onTriggerToast={triggerToast}
      />

      {/* Footer with Yash Mishra Attribution */}
      <Footer />
    </div>
  );
}
