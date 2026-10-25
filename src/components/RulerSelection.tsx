import React from 'react';
import { Crown, Lock, Play, Shield, Coins, Sparkles } from 'lucide-react';
import { Ruler } from '../types/game';
import { sound } from '../utils/audio';

interface RulerSelectionProps {
  rulers: Ruler[];
  selectedRulerId: string;
  onSelectRuler: (rulerId: string) => void;
  onConfirmStart: () => void;
  renown: number;
}

export const RulerSelection: React.FC<RulerSelectionProps> = ({
  rulers,
  selectedRulerId,
  onSelectRuler,
  onConfirmStart,
  renown,
}) => {
  const currentRuler = rulers.find((r) => r.id === selectedRulerId) || rulers[0];

  return (
    <div className="min-h-screen w-full bg-[#0a0807] flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden select-none">
      {/* Background illumination ambiance */}
      <div className="absolute inset-0 bg-radial from-[#1e1710]/60 via-[#0a0807] to-black pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto w-full text-center space-y-2">
        <span className="text-xs uppercase font-cinzel tracking-widest text-[#c5a059] font-bold">
          Seize the Crown · Survive the Court
        </span>
        <h1 className="text-4xl sm:text-5xl font-cinzel font-black tracking-wider text-[#f5e4b8] drop-shadow-md">
          HOLLOW THRONE
        </h1>
        <p className="max-w-2xl mx-auto text-sm text-stone-400 font-serif italic">
          Every reign is an unforgiving test of twelve seasons. Choose your sovereign. Inherit their vices, their enemies, and their fragile kingdom.
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#16120e] rounded-full border border-[#3a3227] text-xs font-cinzel text-stone-300">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Dynasty Renown Available: <strong className="text-[#f1e6cf]">{renown}</strong></span>
        </div>
      </div>

      {/* Rulers Showcase Grid */}
      <div className="relative z-10 max-w-6xl mx-auto w-full my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {rulers.map((ruler) => {
          const isSelected = ruler.id === selectedRulerId;

          return (
            <div
              key={ruler.id}
              onClick={() => {
                if (ruler.unlocked) {
                  sound.playSealStamp();
                  onSelectRuler(ruler.id);
                }
              }}
              className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300 flex flex-col justify-between ${
                ruler.unlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
              } ${
                isSelected
                  ? 'border-[#c5a059] shadow-[0_0_25px_rgba(197,160,89,0.35)] scale-[1.02] bg-[#1a140f]'
                  : 'border-[#2c2319] hover:border-[#4a3b2b] bg-[#120e0a]'
              }`}
            >
              {/* Portrait Window */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black border-b border-[#3a3227]">
                <img
                  src={ruler.portraitUrl}
                  alt={ruler.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isSelected ? 'scale-105' : 'hover:scale-102'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120e0a] via-transparent to-transparent opacity-80" />

                {/* Locked Overlay */}
                {!ruler.unlocked && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center">
                    <Lock className="w-8 h-8 text-stone-500 mb-2" />
                    <span className="font-cinzel text-xs font-bold text-stone-400 uppercase tracking-wider">
                      Locked Sovereign
                    </span>
                    <p className="text-[11px] text-stone-500 mt-1 italic">
                      {ruler.unlockCondition}
                    </p>
                  </div>
                )}

                {/* Rarity / Active Tag */}
                {isSelected && (
                  <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-600 text-amber-300 text-[10px] font-cinzel font-bold shadow-md">
                    Selected
                  </div>
                )}
              </div>

              {/* Ruler Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] uppercase font-cinzel tracking-widest text-[#c5a059] font-bold block">
                    {ruler.epithet}
                  </span>
                  <h3 className="text-lg font-cinzel font-bold text-[#f5e4b8] leading-tight">
                    {ruler.name}
                  </h3>
                  <p className="text-xs text-stone-400 font-serif mt-1 line-clamp-3">
                    {ruler.description}
                  </p>
                </div>

                {/* Passive Power */}
                <div className="p-2.5 bg-[#18130e] rounded-lg border border-[#3a3227] text-left">
                  <div className="flex items-center gap-1.5 text-xs font-cinzel font-bold text-[#d8b26e]">
                    <Crown className="w-3.5 h-3.5 text-[#d8b26e]" />
                    <span>{ruler.passiveTitle}</span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1 leading-snug">
                    {ruler.passiveDescription}
                  </p>
                </div>

                {/* Starting Resources */}
                <div className="flex items-center justify-between text-xs font-cinzel text-stone-400 pt-2 border-t border-[#2c2319]">
                  <span className="flex items-center gap-1 text-amber-300">
                    <Coins className="w-3.5 h-3.5" /> {ruler.startingGold} Gold
                  </span>
                  <span className="flex items-center gap-1 text-stone-300">
                    <Shield className="w-3.5 h-3.5" /> {ruler.startingDeck.length} Cards
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Bar */}
      <div className="relative z-10 max-w-xl mx-auto w-full text-center pb-4">
        <button
          onClick={() => {
            sound.playBell();
            onConfirmStart();
          }}
          className="w-full sm:w-auto px-10 py-3.5 rounded-xl font-cinzel font-black text-sm uppercase tracking-widest bg-gradient-to-r from-[#947133] via-[#c5a059] to-[#947133] text-[#120d09] hover:brightness-110 active:brightness-95 shadow-[0_0_25px_rgba(197,160,89,0.4)] transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Ascend the Hollow Throne with {currentRuler.epithet}</span>
        </button>
      </div>
    </div>
  );
};
