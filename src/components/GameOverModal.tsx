import React from 'react';
import { Crown, Skull, RotateCcw, Sparkles, Award } from 'lucide-react';
import { sound } from '../utils/audio';

interface GameOverModalProps {
  outcome: 'victorious' | 'ruined';
  causeOfDeath: string;
  seasonsSurvived: number;
  cardsPlayed: number;
  crisesResolved: number;
  goldEarned: number;
  renownAwarded: number;
  unlockedNewRuler?: string | null;
  onRestart: () => void;
  onGoToRulerSelect: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  outcome,
  causeOfDeath,
  seasonsSurvived,
  cardsPlayed,
  crisesResolved,
  goldEarned,
  renownAwarded,
  unlockedNewRuler,
  onRestart,
  onGoToRulerSelect,
}) => {
  const isVictory = outcome === 'victorious';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#14110e] border-2 border-[#c5a059]/60 rounded-2xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] text-center relative overflow-hidden">
        {/* Top illuminated banner */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />

        {/* Icon Emblem */}
        <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 border-2 shadow-xl bg-[#1d1611]">
          {isVictory ? (
            <Crown className="w-9 h-9 text-amber-400 animate-pulse" />
          ) : (
            <Skull className="w-9 h-9 text-red-500 animate-pulse" />
          )}
        </div>

        {/* Outcome Header */}
        <span className="text-xs font-cinzel font-bold uppercase tracking-widest text-[#c5a059]">
          Chronicle of the Reign
        </span>
        <h2 className="text-2xl sm:text-3xl font-cinzel font-black tracking-wide text-[#f5e4b8] mt-1">
          {isVictory ? 'The Immortal Dynasty Founded' : 'The Hollow Crown Falls'}
        </h2>

        {/* Grim Manuscript Epitaph */}
        <div className="my-5 p-4 rounded-xl bg-[#0d0a08] border border-[#3a3227] text-stone-300 font-serif italic text-sm sm:text-base leading-relaxed">
          &ldquo;{causeOfDeath}&rdquo;
        </div>

        {/* Unlock notification banner if any */}
        {unlockedNewRuler && (
          <div className="my-3 p-3 bg-amber-950/50 border border-amber-600/70 rounded-xl flex items-center justify-center gap-2 text-xs font-cinzel text-amber-300">
            <Award className="w-4 h-4 text-amber-400" />
            <span>New Sovereign Unlocked: <strong>{unlockedNewRuler}</strong></span>
          </div>
        )}

        {/* Reign Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="p-3 bg-[#191410] rounded-xl border border-[#2d251c]">
            <span className="text-stone-400 text-[10px] font-cinzel uppercase block">Seasons Ruled</span>
            <span className="text-lg font-cinzel font-bold text-[#f1e6cf]">{seasonsSurvived} / 12</span>
          </div>
          <div className="p-3 bg-[#191410] rounded-xl border border-[#2d251c]">
            <span className="text-stone-400 text-[10px] font-cinzel uppercase block">Crises Settled</span>
            <span className="text-lg font-cinzel font-bold text-amber-300">{crisesResolved}</span>
          </div>
          <div className="p-3 bg-[#191410] rounded-xl border border-[#2d251c]">
            <span className="text-stone-400 text-[10px] font-cinzel uppercase block">Cards Decreed</span>
            <span className="text-lg font-cinzel font-bold text-stone-200">{cardsPlayed}</span>
          </div>
          <div className="p-3 bg-[#191410] rounded-xl border border-[#2d251c]">
            <span className="text-stone-400 text-[10px] font-cinzel uppercase block">Renown Gained</span>
            <span className="text-lg font-cinzel font-bold text-purple-300 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> +{renownAwarded}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              sound.playBell();
              onRestart();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#947133] to-[#c5a059] text-black hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <RotateCcw className="w-4 h-4 fill-current" />
            <span>Reclaim the Throne</span>
          </button>

          <button
            onClick={() => {
              sound.playSealStamp();
              onGoToRulerSelect();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider bg-[#221c16] hover:bg-[#322920] text-[#ded1b8] border border-[#3a3227] transition-all cursor-pointer"
          >
            <span>Choose Another Sovereign</span>
          </button>
        </div>
      </div>
    </div>
  );
};
