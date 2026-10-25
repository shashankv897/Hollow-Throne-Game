import React from 'react';
import { HelpCircle, Crown, Shield, Church, Users, Eye, Sparkles, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface GuideModalProps {
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-3xl bg-[#14110e] border-2 border-[#c5a059]/40 rounded-2xl p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="pb-4 border-b border-[#3a3227] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#251f18] rounded-lg border border-[#c5a059]/30">
              <HelpCircle className="w-6 h-6 text-[#d8b26e]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#f5e4b8]">
                Decrees of State · How to Rule
              </h2>
              <p className="text-xs text-stone-400">
                A sovereign who understands balance lives to see the coronation of their heirs.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playSealStamp();
              onClose();
            }}
            className="p-2 rounded-lg bg-[#221c16] hover:bg-[#322920] text-stone-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed font-serif">
          {/* Pillar Section */}
          <div className="p-4 bg-[#191512] rounded-xl border border-[#3a3227] space-y-2">
            <h3 className="font-cinzel text-sm font-bold text-[#f5e4b8] uppercase tracking-wider flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#d8b26e]" />
              The Four Kingdom Pillars (1 - 99)
            </h3>
            <p>
              Your kingdom is held aloft by four delicate pillars. If <strong>any pillar drops to 0</strong>, your reign falls to instantaneous ruin:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2 rounded bg-[#100d0a] border border-amber-950/60 text-amber-200">
                <strong>Crown:</strong> Nobles, imperial authority, court order. If 0 &rarr; Poisoned in your chambers.
              </div>
              <div className="p-2 rounded bg-[#100d0a] border border-red-950/60 text-red-200">
                <strong>Army:</strong> Garrison garrisoned garrisons & border troops. If 0 &rarr; Garrison mutiny and storming.
              </div>
              <div className="p-2 rounded bg-[#100d0a] border border-blue-950/60 text-blue-200">
                <strong>Church:</strong> Clergy favor, inquisitorial blessing. If 0 &rarr; Excommunication and pyre.
              </div>
              <div className="p-2 rounded bg-[#100d0a] border border-emerald-950/60 text-emerald-200">
                <strong>People:</strong> Commons, grain supplies, tax resistance. If 0 &rarr; Mob tears down the gates.
              </div>
            </div>
          </div>

          {/* Seasonal Crises */}
          <div className="p-4 bg-[#191512] rounded-xl border border-[#3a3227] space-y-2">
            <h3 className="font-cinzel text-sm font-bold text-[#f5e4b8] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d8b26e]" />
              Seasonal Crises & The 12 Seasons
            </h3>
            <p>
              A complete reign lasts <strong>12 seasons</strong> (Spring, Summer, Autumn, Winter across 3 years). Each season, an urgent crisis demands resolution. Play manuscript cards or execute direct Imperial Pronouncements to reach the crisis resolution target. Unresolved crises inflict crushing penalties on your pillars when the season ends!
            </p>
          </div>

          {/* The Living Court */}
          <div className="p-4 bg-[#191512] rounded-xl border border-[#3a3227] space-y-2">
            <h3 className="font-cinzel text-sm font-bold text-[#f5e4b8] uppercase tracking-wider flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#d8b26e]" />
              The Living Court & Advisor Intrigue
            </h3>
            <p>
              Your advisors control state apparatus. If an advisor&apos;s loyalty sinks below <strong>25%</strong>, they will sponsor betrayal plots.
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs text-stone-400">
              <li><strong>Bribe Purse:</strong> Spend gold to rapidly increase loyalty.</li>
              <li><strong>Bestow Title:</strong> Invest royal prestige to bind their loyalty permanently.</li>
              <li><strong>Shadow Spies:</strong> Investigate their private quarters to expose hidden treasons.</li>
              <li><strong>Purge & Exile:</strong> Rid your court of an active traitor, though their faction will be outraged.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#3a3227] flex justify-end">
          <button
            onClick={() => {
              sound.playSealStamp();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-[#2a221a] hover:bg-[#3d3226] text-[#ded1b8] border border-[#c5a059]/40 font-cinzel text-xs font-bold transition-all cursor-pointer"
          >
            I Understand My Duties
          </button>
        </div>
      </div>
    </div>
  );
};
