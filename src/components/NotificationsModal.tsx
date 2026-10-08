import { useState, useEffect } from 'react';
import { PushNotificationPreferences, BirthProfile } from '../types/astrology';
import { Bell, X, Send } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: BirthProfile;
  onTriggerToast: (title: string, message: string) => void;
}

export default function NotificationsModal({
  isOpen,
  onClose,
  activeProfile,
  onTriggerToast,
}: NotificationsModalProps) {
  const [prefs, setPrefs] = useState<PushNotificationPreferences>(() => {
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

  const [testNotificationSent, setTestNotificationSent] = useState(false);

  useEffect(() => {
    localStorage.setItem('aetheria_notif_prefs', JSON.stringify(prefs));
  }, [prefs]);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    if (!('Notification' in window)) {
      onTriggerToast('Notice', 'Web Push Notifications are not supported in this browser. In-app alerts are active.');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setPrefs((prev) => ({ ...prev, permissionGranted: true, enabled: true }));
        onTriggerToast('Push Notifications Active', 'You will receive alerts for major planetary movements.');
        new Notification('Aetheria Planetary Alerts Active', {
          body: `Planetary movement alerts are now active for ${activeProfile.name}.`,
          icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">✨</text></svg>',
        });
      } else {
        setPrefs((prev) => ({ ...prev, permissionGranted: false }));
        onTriggerToast('Permission Notice', 'Browser notifications were dismissed. In-app alerts remain active.');
      }
    } catch (err) {
      console.warn('Notification permission error', err);
      onTriggerToast('Alerts Active', 'In-app notification system active for celestial movements.');
    }
  };

  const handleSendTestPush = () => {
    setTestNotificationSent(true);
    const title = 'Mercury Stations Retrograde Alert';
    const body = `Attention ${activeProfile.name} (Sun in ${activeProfile.sunSign}): Mercury station begins in Scorpio. Back up digital records and review contracts.`;

    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🪐</text></svg>',
        });
      } catch (e) {
        // Fallback
      }
    }

    onTriggerToast(title, body);
    setTimeout(() => setTestNotificationSent(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border border-amber-200/90 rounded-2xl p-6 shadow-2xl text-slate-900 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Bell className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold text-slate-900 font-celestial">
              Planetary Movement Push Alerts
            </h2>
          </div>
          <p className="text-xs text-slate-600">
            Real-time astrological notifications for retrogrades, sign ingresses, and natal transits configured for {activeProfile.name}.
          </p>
        </div>

        {/* Browser Permission Box */}
        <div className="p-4 rounded-xl bg-[#faf9f5] border border-slate-200 mb-5 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${prefs.permissionGranted ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span className="text-xs font-bold text-slate-900">
                {prefs.permissionGranted ? 'Browser Alerts Enabled' : 'Browser Permission Needed'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Receive alerts directly on your device lockscreen and desktop.
            </p>
          </div>

          {!prefs.permissionGranted ? (
            <button
              onClick={handleRequestPermission}
              className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold transition-colors flex-shrink-0 shadow-xs"
            >
              Enable Alerts
            </button>
          ) : (
            <span className="text-xs text-emerald-700 font-bold px-2 py-0.5 bg-emerald-100 rounded border border-emerald-300">
              Active ✓
            </span>
          )}
        </div>

        {/* Channel Toggles */}
        <div className="space-y-2.5 mb-6">
          <h3 className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">
            Notification Subscriptions
          </h3>

          {/* Retrogrades */}
          <label className="flex items-center justify-between p-3 rounded-lg bg-[#faf9f5] border border-slate-200 cursor-pointer hover:border-amber-300">
            <div>
              <span className="text-xs font-semibold text-slate-900 block">Planetary Retrograde Stations</span>
              <span className="text-[11px] text-slate-600">48h advance alert before Mercury, Venus, or Mars Rx stations.</span>
            </div>
            <input
              type="checkbox"
              checked={prefs.retrogradeAlerts}
              onChange={(e) => setPrefs({ ...prefs, retrogradeAlerts: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
            />
          </label>

          {/* Major Ingresses */}
          <label className="flex items-center justify-between p-3 rounded-lg bg-[#faf9f5] border border-slate-200 cursor-pointer hover:border-amber-300">
            <div>
              <span className="text-xs font-semibold text-slate-900 block">Zodiac Ingresses & Season Changes</span>
              <span className="text-[11px] text-slate-600">Outer planet sign shifts (e.g. Pluto, Saturn) and Equinoxes.</span>
            </div>
            <input
              type="checkbox"
              checked={prefs.majorIngresses}
              onChange={(e) => setPrefs({ ...prefs, majorIngresses: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
            />
          </label>

          {/* Moon Phases */}
          <label className="flex items-center justify-between p-3 rounded-lg bg-[#faf9f5] border border-slate-200 cursor-pointer hover:border-amber-300">
            <div>
              <span className="text-xs font-semibold text-slate-900 block">New & Full Moon Peaks</span>
              <span className="text-[11px] text-slate-600">Exact peak timing and lunar eclipse portal alerts.</span>
            </div>
            <input
              type="checkbox"
              checked={prefs.moonPhases}
              onChange={(e) => setPrefs({ ...prefs, moonPhases: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
            />
          </label>

          {/* Personal Natal Transits */}
          <label className="flex items-center justify-between p-3 rounded-lg bg-[#faf9f5] border border-slate-200 cursor-pointer hover:border-amber-300">
            <div>
              <span className="text-xs font-semibold text-slate-900 block">
                Transits to {activeProfile.name}’s Placements
              </span>
              <span className="text-[11px] text-slate-600">
                Exact aspects to your {activeProfile.sunSign} Sun and {activeProfile.moonSign} Moon.
              </span>
            </div>
            <input
              type="checkbox"
              checked={prefs.personalTransits}
              onChange={(e) => setPrefs({ ...prefs, personalTransits: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
            />
          </label>

          {/* Daily Morning Digest */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#faf9f5] border border-slate-200">
            <div>
              <span className="text-xs font-semibold text-slate-900 block">Daily Morning Digest</span>
              <span className="text-[11px] text-slate-600">Personalized daily horoscope delivered at dawn.</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="time"
                value={prefs.digestTime}
                onChange={(e) => setPrefs({ ...prefs, digestTime: e.target.value })}
                className="bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-900"
              />
              <input
                type="checkbox"
                checked={prefs.dailyMorningDigest}
                onChange={(e) => setPrefs({ ...prefs, dailyMorningDigest: e.target.checked })}
                className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleSendTestPush}
            className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-white border border-slate-300 hover:border-amber-400 text-xs font-semibold text-slate-700 transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <Send className="w-3.5 h-3.5 text-amber-600" />
            <span>{testNotificationSent ? 'Dispatched!' : 'Send Test Alert'}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold transition-colors shadow-xs"
          >
            Done
          </button>
        </div>

        {/* Footnote */}
        <div className="mt-4 pt-3 text-center border-t border-slate-100 text-[11px] text-slate-500">
          The application is built by <span className="text-slate-800 font-semibold">Yash Mishra</span>.
        </div>
      </div>
    </div>
  );
}
