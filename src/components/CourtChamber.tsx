import React, { useState } from 'react';
import { 
  Users, 
  ShieldAlert, 
  Coins, 
  Eye, 
  Crown, 
  Lock, 
  Unlock, 
  Send, 
  AlertCircle,
  Award,
  HelpCircle
} from 'lucide-react';
import { Advisor, PillarType } from '../types/game';
import { sound } from '../utils/audio';

interface CourtChamberProps {
  advisors: Advisor[];
  currentGold: number;
  currentCrown: number;
  onBribe: (advisorId: string) => void;
  onBestowTitle: (advisorId: string) => void;
  onToggleImprison: (advisorId: string) => void;
  onBanish: (advisorId: string) => void;
  onClose: () => void;
}

export const CourtChamber: React.FC<CourtChamberProps> = ({
  advisors,
  currentGold,
  currentCrown,
  onBribe,
  onBestowTitle,
  onToggleImprison,
  onBanish,
  onClose,
}) => {
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor>(advisors[0] || null);

  const getFactionBadge = (faction: PillarType) => {
    switch (faction) {
      case 'army':
        return <span className="text-red-400 font-cinzel text-xs">Faction: Army</span>;
      case 'church':
        return <span className="text-blue-300 font-cinzel text-xs">Faction: Church</span>;
      case 'crown':
        return <span className="text-amber-300 font-cinzel text-xs">Faction: Crown</span>;
      case 'people':
        return <span className="text-emerald-400 font-cinzel text-xs">Faction: People</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-5xl bg-[#14110e] border-2 border-[#c5a059]/40 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#3a3227] flex items-center justify-between bg-gradient-to-r from-[#1c1815] via-[#14110e] to-[#1c1815]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#251f18] rounded-lg border border-[#c5a059]/30">
              <Users className="w-6 h-6 text-[#d8b26e]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#f5e4b8]">
                Court Intrigue & Living Council
              </h2>
              <p className="text-xs text-stone-400">
                Advisors have Loyalty and Ambition (0–10). If Ambition exceeds Loyalty, they may blackmail you or stage a coup.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playSealStamp();
              onClose();
            }}
            className="px-4 py-2 bg-[#2a221a] hover:bg-[#3d3226] text-[#ded1b8] border border-[#c5a059]/40 rounded-lg font-cinzel text-xs font-bold transition-colors cursor-pointer"
          >
            Return to Throne
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto">
          {/* Advisors List */}
          <div className="md:col-span-5 p-4 border-r border-[#3a3227] space-y-3 bg-[#0d0b09]/60">
            <h3 className="text-xs font-cinzel uppercase tracking-widest text-[#c5a059] font-bold">
              Privy Councilors ({advisors.length})
            </h3>

            <div className="space-y-2">
              {advisors.map((adv) => {
                const isSelected = selectedAdvisor?.id === adv.id;
                const isTraitor = adv.ambition > adv.loyalty;

                return (
                  <div
                    key={adv.id}
                    onClick={() => {
                      sound.playCardPlay();
                      setSelectedAdvisor(adv);
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#c5a059] bg-[#221c15] shadow-lg'
                        : 'border-[#2d251c] bg-[#161310] hover:border-[#3a3227]'
                    } ${adv.isImprisoned ? 'opacity-70 bg-stone-950/60' : ''}`}
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="font-cinzel text-sm font-bold text-[#f1e6cf] truncate">
                          {adv.name}
                        </span>
                        {adv.isImprisoned && (
                          <span title="Imprisoned in Dungeons">
                            <Lock className="w-3.5 h-3.5 text-stone-400" />
                          </span>
                        )}
                        {!adv.isImprisoned && isTraitor && (
                          <span title="Ambition exceeds Loyalty!">
                            <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse flex-shrink-0" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-400 truncate">{adv.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {getFactionBadge(adv.faction)}
                        <span className="text-[10px] text-stone-500">·</span>
                        <span className="text-[10px] text-stone-400">
                          {adv.isSecretRevealed ? 'Secret Known' : 'Secret Hidden'}
                        </span>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end gap-0.5">
                      <div className="text-xs font-cinzel font-bold flex items-center gap-1">
                        <span className={adv.loyalty < adv.ambition ? 'text-red-400' : 'text-emerald-400'}>
                          L:{adv.loyalty.toFixed(1)}
                        </span>
                        <span className="text-stone-600">/</span>
                        <span className="text-amber-400">
                          A:{adv.ambition.toFixed(1)}
                        </span>
                      </div>
                      {isTraitor && !adv.isImprisoned && (
                        <span className="text-[9px] uppercase font-cinzel font-bold text-red-400">
                          Disloyal
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Advisor Dossier */}
          {selectedAdvisor && (
            <div className="md:col-span-7 p-6 flex flex-col justify-between bg-[#14110e]">
              <div className="space-y-5">
                {/* Dossier Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#3a3227]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-cinzel font-bold text-[#f5e4b8]">
                        {selectedAdvisor.name}
                      </h3>
                      {selectedAdvisor.isImprisoned && (
                        <span className="px-2 py-0.5 bg-stone-900 border border-stone-600 text-stone-300 text-[10px] font-cinzel font-bold rounded">
                          In Dungeons
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#c5a059] font-cinzel">
                      {selectedAdvisor.title}
                    </p>
                    <div className="mt-1">
                      {getFactionBadge(selectedAdvisor.faction)}
                    </div>
                  </div>

                  {selectedAdvisor.ambition > selectedAdvisor.loyalty && !selectedAdvisor.isImprisoned && (
                    <div className="mt-2 sm:mt-0 flex items-center gap-1.5 px-3 py-1 bg-red-950/80 border border-red-700 rounded-lg text-red-300 text-xs font-cinzel font-bold">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span>Coup / Blackmail Risk</span>
                    </div>
                  )}
                </div>

                {/* Loyalty vs Ambition (0-10 scale) */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Loyalty (0 - 10) */}
                  <div className="p-3.5 bg-[#191512] rounded-xl border border-[#2d251c]">
                    <div className="flex justify-between text-xs font-cinzel mb-1">
                      <span className="text-stone-300 font-bold">Loyalty to Crown</span>
                      <span className={selectedAdvisor.loyalty < selectedAdvisor.ambition ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                        {selectedAdvisor.loyalty.toFixed(1)} / 10
                      </span>
                    </div>
                    <div className="h-2 w-full bg-[#0a0807] rounded-full overflow-hidden border border-[#2d251c]">
                      <div
                        className={`h-full transition-all duration-300 ${
                          selectedAdvisor.loyalty < selectedAdvisor.ambition ? 'bg-red-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${(selectedAdvisor.loyalty / 10) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-stone-500 mt-1">
                      Increased by bribes and royal titles.
                    </p>
                  </div>

                  {/* Ambition (0 - 10) */}
                  <div className="p-3.5 bg-[#191512] rounded-xl border border-[#2d251c]">
                    <div className="flex justify-between text-xs font-cinzel mb-1">
                      <span className="text-stone-300 font-bold">Personal Ambition</span>
                      <span className="text-amber-400 font-bold">{selectedAdvisor.ambition.toFixed(1)} / 10</span>
                    </div>
                    <div className="h-2 w-full bg-[#0a0807] rounded-full overflow-hidden border border-[#2d251c]">
                      <div
                        className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300"
                        style={{ width: `${(selectedAdvisor.ambition / 10) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-stone-500 mt-1">
                      If Ambition &gt; Loyalty, advisor schemes against you.
                    </p>
                  </div>
                </div>

                {/* Court Trait */}
                <div className="p-3.5 bg-[#1a1612] rounded-xl border border-[#3a3227]">
                  <span className="text-xs font-cinzel font-bold text-[#c5a059] uppercase tracking-wider">
                    Council Skill: {selectedAdvisor.trait}
                  </span>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed font-serif">
                    {selectedAdvisor.traitDescription}
                  </p>
                </div>

                {/* Hidden Secret / Agenda */}
                <div className="p-3.5 rounded-xl border border-[#3a3227] bg-[#120f0d]">
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-cinzel font-bold text-purple-300 uppercase tracking-wider">
                      Secret Agenda
                    </span>
                  </div>
                  {selectedAdvisor.isSecretRevealed ? (
                    <p className="text-xs text-stone-300 italic font-serif">
                      “{selectedAdvisor.secret}”
                    </p>
                  ) : (
                    <div className="flex items-center gap-2 text-stone-500 text-xs italic font-serif">
                      <HelpCircle className="w-4 h-4 text-stone-600" />
                      <span>Shrouded in shadows. Play secret cards or use Spymaster to reveal.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Court Actions: Reward/Bribe, Bestow Title, Imprison, Banish */}
              <div className="pt-6 border-t border-[#3a3227] mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* 1. Bribe / Reward */}
                <button
                  disabled={currentGold < 3 || selectedAdvisor.isImprisoned}
                  onClick={() => {
                    sound.playCoin();
                    onBribe(selectedAdvisor.id);
                  }}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all text-center cursor-pointer ${
                    currentGold >= 3 && !selectedAdvisor.isImprisoned
                      ? 'border-amber-600/50 bg-amber-950/30 hover:bg-amber-900/50 text-amber-200'
                      : 'border-stone-800 bg-stone-900/40 text-stone-600 cursor-not-allowed'
                  }`}
                >
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-cinzel font-bold">Reward & Bribe</span>
                  <span className="text-[10px] text-stone-400">-3 Gold (+2.0 Loyalty)</span>
                </button>

                {/* 2. Bestow Title */}
                <button
                  disabled={currentCrown < 1.0 || selectedAdvisor.isImprisoned}
                  onClick={() => {
                    sound.playSealStamp();
                    onBestowTitle(selectedAdvisor.id);
                  }}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all text-center cursor-pointer ${
                    currentCrown >= 1.0 && !selectedAdvisor.isImprisoned
                      ? 'border-yellow-600/50 bg-yellow-950/30 hover:bg-yellow-900/50 text-yellow-200'
                      : 'border-stone-800 bg-stone-900/40 text-stone-600 cursor-not-allowed'
                  }`}
                >
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-cinzel font-bold">Bestow Title</span>
                  <span className="text-[10px] text-stone-400">-0.5 Crown (+2.5 Loy, +1.5 Amb)</span>
                </button>

                {/* 3. Imprison / Release */}
                <button
                  onClick={() => {
                    sound.playSword();
                    onToggleImprison(selectedAdvisor.id);
                  }}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all text-center cursor-pointer ${
                    selectedAdvisor.isImprisoned
                      ? 'border-blue-600/60 bg-blue-950/40 text-blue-300'
                      : 'border-stone-700 bg-stone-900/60 hover:bg-stone-800 text-stone-300'
                  }`}
                >
                  {selectedAdvisor.isImprisoned ? (
                    <>
                      <Unlock className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-cinzel font-bold">Release from Cell</span>
                      <span className="text-[10px] text-blue-300">Restore Councilor</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-stone-400" />
                      <span className="text-xs font-cinzel font-bold">Imprison</span>
                      <span className="text-[10px] text-stone-400">-1.0 Faction Pillar</span>
                    </>
                  )}
                </button>

                {/* 4. Banish from Realm */}
                <button
                  onClick={() => {
                    sound.playSword();
                    onBanish(selectedAdvisor.id);
                  }}
                  className="p-2.5 rounded-xl border border-red-700/60 bg-red-950/40 hover:bg-red-900/60 text-red-200 flex flex-col items-center justify-center gap-1 transition-all text-center cursor-pointer"
                >
                  <Send className="w-4 h-4 text-red-400" />
                  <span className="text-xs font-cinzel font-bold">Banish from Realm</span>
                  <span className="text-[10px] text-red-400/80">-1.5 Faction (Permanent)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
