import React from 'react';
import { 
  Crown, 
  Coins, 
  Volume2, 
  VolumeX, 
  Users, 
  BookOpen, 
  HelpCircle,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { Ruler } from '../types/game';
import { sound } from '../utils/audio';

interface HeaderNavProps {
  currentRuler: Ruler;
  gold: number;
  renown: number;
  seasonNumber: number;
  year: number;
  seasonName: string;
  isMuted: boolean;
  onToggleSound: () => void;
  onOpenCourt: () => void;
  onOpenCodex: () => void;
  onOpenGuide: () => void;
  onRestartRun: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentRuler,
  gold,
  renown,
  seasonNumber,
  year,
  seasonName,
  isMuted,
  onToggleSound,
  onOpenCourt,
  onOpenCodex,
  onOpenGuide,
  onRestartRun,
}) => {
  return (
    <header className="w-full bg-[#0d0b09] border-b border-[#c5a059]/30 px-4 py-2.5 shadow-2xl relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Game Title & Ruler Identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2a1f14] to-[#120d09] border border-[#c5a059] flex items-center justify-center shadow-lg">
            <Crown className="w-5 h-5 text-[#d8b26e]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-cinzel font-black text-lg tracking-wider text-[#f5e4b8]">
                HOLLOW THRONE
              </h1>
              <span className="text-[10px] uppercase font-cinzel tracking-widest text-[#c5a059] border-l border-[#3a3227] pl-2">
                {currentRuler.epithet}
              </span>
            </div>
            <p className="text-[11px] text-stone-400 font-serif">
              Reigning as <span className="text-[#ded1b8] font-semibold">{currentRuler.name}</span>
            </p>
          </div>
        </div>

        {/* Calendar / Season Progression */}
        <div className="flex items-center gap-3 bg-[#161310] px-4 py-1.5 rounded-xl border border-[#3a3227]">
          <div className="text-center">
            <span className="text-[10px] uppercase font-cinzel tracking-widest text-[#c5a059] font-bold block">
              Year {year} · {seasonName}
            </span>
            <span className="text-xs font-cinzel font-bold text-[#f1e6cf]">
              Season {seasonNumber} of 12
            </span>
          </div>
        </div>

        {/* Treasury & Navigation Actions */}
        <div className="flex items-center gap-3">
          {/* Treasury Gold */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-950/40 border border-amber-600/40 rounded-lg text-amber-300 font-cinzel font-bold text-sm shadow-inner">
            <Coins className="w-4 h-4 text-amber-400" />
            <span>{gold}</span>
            <span className="text-[10px] text-amber-500 font-normal">Gold</span>
          </div>

          {/* Dynasty Renown */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#191512] border border-[#3a3227] rounded-lg text-stone-300 font-cinzel font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>{renown}</span>
            <span className="text-[10px] text-stone-500 font-normal">Renown</span>
          </div>

          {/* Court Button */}
          <button
            onClick={() => {
              sound.playCardPlay();
              onOpenCourt();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#221a13] hover:bg-[#34271c] text-[#ded1b8] border border-[#c5a059]/40 rounded-lg font-cinzel text-xs font-bold transition-all cursor-pointer shadow-sm"
          >
            <Users className="w-3.5 h-3.5 text-[#d8b26e]" />
            <span className="hidden sm:inline">Court</span>
          </button>

          {/* Codex Button */}
          <button
            onClick={() => {
              sound.playSealStamp();
              onOpenCodex();
            }}
            className="p-1.5 bg-[#161310] hover:bg-[#221c15] text-stone-300 border border-[#3a3227] rounded-lg transition-colors cursor-pointer"
            title="Hall of Dynasties & Codex"
          >
            <BookOpen className="w-4 h-4 text-[#c5a059]" />
          </button>

          {/* Guide Button */}
          <button
            onClick={() => {
              sound.playSealStamp();
              onOpenGuide();
            }}
            className="p-1.5 bg-[#161310] hover:bg-[#221c15] text-stone-300 border border-[#3a3227] rounded-lg transition-colors cursor-pointer"
            title="How to Rule / Strategy Guide"
          >
            <HelpCircle className="w-4 h-4 text-stone-400" />
          </button>

          {/* Audio Mute Switch */}
          <button
            onClick={onToggleSound}
            className="p-1.5 bg-[#161310] hover:bg-[#221c15] text-stone-300 border border-[#3a3227] rounded-lg transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-stone-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#d8b26e]" />
            )}
          </button>

          {/* Restart Reign */}
          <button
            onClick={onRestartRun}
            className="p-1.5 bg-[#161310] hover:bg-red-950/50 text-stone-400 hover:text-red-300 border border-[#3a3227] rounded-lg transition-colors cursor-pointer"
            title="Abdicate / Restart Run"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
