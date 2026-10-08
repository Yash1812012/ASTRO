import { useState } from 'react';
import { BirthProfile, PushNotificationPreferences, TransitEvent } from '../types/astrology';
import { UPCOMING_TRANSITS, ZODIAC_SIGNS } from '../utils/astrologyEngine';
import { Bell, Sliders, Send } from 'lucide-react';

interface CosmicAlertsViewProps {
  activeProfile: BirthProfile;
  onTriggerToast: (title: string, message: string) => void;
  onOpenNotificationsModal: () => void;
}

export default function CosmicAlertsView({
  activeProfile,
  onTriggerToast,
  onOpenNotificationsModal,
}: CosmicAlertsViewProps) {
  const [prefs] = useState<PushNotificationPreferences>(() => {
    const saved = localStorage.getItem('aetheria_notif_prefs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      enabled: true,
      permissionGranted:
        typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted',
      majorIngresses: true,
      retrogradeAlerts: true,
      moonPhases: true,
      personalTransits: true,
      dailyMorningDigest: true,
      digestTime: '07:30',
    };
  });

  const [testSent, setTestSent] = useState(false);

  const handleTestAlert = (transit: TransitEvent) => {
    const title = `Planetary Movement Alert: ${transit.planet} Shift`;
    const message = `${transit.title} is now active. Personalized for ${activeProfile.name} (${activeProfile.sunSign} Sun).`;
    onTriggerToast(title, message);

    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body: message,
          icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🪐</text></svg>',
        });
      } catch (e) {
        // Fallback
      }
    }
  };

  const handleTriggerQuickPush = () => {
    setTestSent(true);
    const title = 'Transit Alert Test Dispatched';
    const body = `Planetary notification test successful for ${activeProfile.name}. Sun in ${activeProfile.sunSign}, Moon in ${activeProfile.moonSign}.`;
    onTriggerToast(title, body);

    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">✨</text></svg>',
        });
      } catch (e) {
        // Fallback
      }
    }
    setTimeout(() => setTestSent(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-xl bg-white border border-amber-200/90 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs text-amber-700 font-semibold uppercase tracking-wider block mb-1">
              Push Notification Center
            </span>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-celestial">
              Personalized Planetary Alerts
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              Real-time alerts for retrograde stations, outer planet sign ingresses, and exact aspects to {activeProfile.name}’s natal placements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleTriggerQuickPush}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:border-amber-400 text-xs font-semibold text-slate-700 transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5 text-amber-600" />
              <span>{testSent ? 'Dispatched!' : 'Send Test Notification'}</span>
            </button>
            <button
              onClick={onOpenNotificationsModal}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold transition-colors shadow-xs"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Configure Channels</span>
            </button>
          </div>
        </div>

        {/* Channels Status Strip */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-lg bg-[#faf9f5] border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">Retrograde Alerts</span>
            <span className="font-bold text-slate-900 mt-0.5 block">
              {prefs.retrogradeAlerts ? 'Active (48h Notice)' : 'Disabled'}
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-[#faf9f5] border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">Zodiac Ingresses</span>
            <span className="font-bold text-slate-900 mt-0.5 block">
              {prefs.majorIngresses ? 'Active' : 'Disabled'}
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-[#faf9f5] border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">Lunar Peaks</span>
            <span className="font-bold text-slate-900 mt-0.5 block">
              {prefs.moonPhases ? 'New & Full Moons' : 'Disabled'}
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-[#faf9f5] border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">Natal Transits</span>
            <span className="font-bold text-slate-900 mt-0.5 block">
              {prefs.personalTransits ? `Synced to ${activeProfile.sunSign}` : 'Disabled'}
            </span>
          </div>
        </div>
      </div>

      {/* Planetary Transit Alerts Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-600" />
            <span>Transit Movement Broadcast Feed</span>
          </h2>
          <span className="text-xs text-amber-800 font-semibold px-2 py-0.5 rounded bg-amber-100">
            Auto-Dispatched on Peak
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {UPCOMING_TRANSITS.map((transit) => {
            const isRelevantToUser = transit.impactedSigns.includes(activeProfile.sunSign);

            return (
              <div
                key={transit.id}
                className={`p-5 rounded-xl border space-y-3 shadow-xs ${
                  isRelevantToUser
                    ? 'bg-amber-50/50 border-amber-300'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-semibold text-amber-700">
                        {transit.type} · {transit.date}
                      </span>
                      {isRelevantToUser && (
                        <span className="text-[9px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-1.5 py-0.5 rounded">
                          Impacts Your {activeProfile.sunSign} Sun
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mt-0.5">{transit.title}</h3>
                  </div>
                  <button
                    onClick={() => handleTestAlert(transit)}
                    className="px-2.5 py-1 rounded bg-white hover:bg-amber-50 border border-slate-300 hover:border-amber-400 text-slate-700 text-xs font-medium transition-colors flex-shrink-0"
                    title="Simulate push alert for this event"
                  >
                    Test Alert
                  </button>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">{transit.summary}</p>

                <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="text-[11px] text-slate-500">Affected Signs:</span>
                    <div className="flex gap-1.5">
                      {transit.impactedSigns.map((s) => (
                        <span key={s} className="text-amber-800 font-bold text-xs">
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
