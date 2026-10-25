import React from 'react';
import { 
  Settings as SettingsIcon, 
  Volume2, 
  VolumeX, 
  Eye, 
  Type, 
  Languages, 
  Smartphone, 
  X,
  Check
} from 'lucide-react';
import { AppSettings } from '../types/game';
import { sound } from '../utils/audio';

interface SettingsModalProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onClose,
}) => {
  const triggerHaptic = () => {
    if (settings.hapticEnabled && 'vibrate' in navigator) {
      try {
        navigator.vibrate(30);
      } catch {}
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-xl bg-[#14110e] border-2 border-[#c5a059]/40 rounded-2xl p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="pb-4 border-b border-[#3a3227] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#251f18] rounded-lg border border-[#c5a059]/30">
              <SettingsIcon className="w-5 h-5 text-[#d8b26e]" />
            </div>
            <div>
              <h2 className="text-xl font-cinzel font-bold text-[#f5e4b8]">
                Decrees of Preference · Settings
              </h2>
              <p className="text-xs text-stone-400">
                Configure audio, tactile feedback, typography, and accessibility.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playSealStamp();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-[#221c16] hover:bg-[#322920] text-stone-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs sm:text-sm">
          {/* Audio Master Volume */}
          <div className="p-3.5 bg-[#191512] rounded-xl border border-[#2d251c] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#d8b26e]" />
                <span className="font-cinzel font-bold text-stone-200">Audio & Orchestral Sound</span>
              </div>
              <button
                onClick={() => {
                  const muted = sound.toggleMute();
                  onUpdateSettings({ soundVolume: muted ? 0 : 50 });
                }}
                className="px-2.5 py-1 rounded bg-[#241c14] border border-[#3a3227] text-xs font-cinzel text-amber-300 cursor-pointer"
              >
                {sound.getMuted() ? 'Muted' : 'Audible'}
              </button>
            </div>
            <p className="text-[11px] text-stone-400">
              Web Audio synthesizes resonant cathedral bells, cello drones, wax seal stamps, and steel blades dynamically.
            </p>
          </div>

          {/* Haptic Vibration */}
          <div className="p-3.5 bg-[#191512] rounded-xl border border-[#2d251c] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="font-cinzel font-bold text-stone-200 block">Tactile Vibration (Haptics)</span>
                <span className="text-[11px] text-stone-400">Vibrate on card snaps, coups, and seal stamps</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.hapticEnabled}
              onChange={(e) => {
                triggerHaptic();
                onUpdateSettings({ hapticEnabled: e.target.checked });
              }}
              className="w-5 h-5 accent-[#c5a059] cursor-pointer"
            />
          </div>

          {/* Text Size (Compact, Standard, Scholarly) */}
          <div className="p-3.5 bg-[#191512] rounded-xl border border-[#2d251c] space-y-2">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-sky-400" />
              <span className="font-cinzel font-bold text-stone-200">Typography Scale</span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {(['compact', 'standard', 'scholarly'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    sound.playCardPlay();
                    onUpdateSettings({ textSize: size });
                  }}
                  className={`py-1.5 px-2 rounded-lg font-cinzel text-xs font-bold capitalize transition-all cursor-pointer ${
                    settings.textSize === size
                      ? 'bg-[#2f241a] text-[#f5e4b8] border border-[#c5a059]'
                      : 'bg-[#120f0d] text-stone-400 border border-[#2d251c]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color-Blind Mode */}
          <div className="p-3.5 bg-[#191512] rounded-xl border border-[#2d251c] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-purple-400" />
              <div>
                <span className="font-cinzel font-bold text-stone-200 block">Color-Blind / High-Contrast Mode</span>
                <span className="text-[11px] text-stone-400">Adds bold textual labels [CROWN], [ARMY], [CHURCH], [PEOPLE] to meters</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.colorBlindMode}
              onChange={(e) => {
                sound.playCardPlay();
                onUpdateSettings({ colorBlindMode: e.target.checked });
              }}
              className="w-5 h-5 accent-[#c5a059] cursor-pointer"
            />
          </div>

          {/* Language Selection */}
          <div className="p-3.5 bg-[#191512] rounded-xl border border-[#2d251c] space-y-2">
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-amber-300" />
              <span className="font-cinzel font-bold text-stone-200">Manuscript Language Dialect</span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { code: 'en', label: 'English' },
                { code: 'la', label: 'Lingua Latina' },
                { code: 'fr', label: 'Vieux Français' },
              ].map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => {
                    sound.playCardPlay();
                    onUpdateSettings({ language: code as AppSettings['language'] });
                  }}
                  className={`py-1.5 px-2 rounded-lg font-cinzel text-xs font-bold transition-all cursor-pointer ${
                    settings.language === code
                      ? 'bg-[#2f241a] text-[#f5e4b8] border border-[#c5a059]'
                      : 'bg-[#120f0d] text-stone-400 border border-[#2d251c]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#3a3227] flex justify-end">
          <button
            onClick={() => {
              sound.playSealStamp();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#8a682c] to-[#c5a059] text-black font-cinzel text-xs font-bold tracking-wider cursor-pointer"
          >
            Apply Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
