import React from 'react';
import { 
  Crown, 
  Play, 
  GitBranch, 
  Calendar, 
  Flame, 
  BookOpen, 
  Settings as SettingsIcon, 
  ShoppingBag,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { GameMode } from '../types/game';
import { sound } from '../utils/audio';

interface TitleScreenProps {
  onStartGame: (mode: GameMode) => void;
  onOpenChronicle: () => void;
  onOpenSettings: () => void;
  onOpenStoreModal: () => void;
  renown: number;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStartGame,
  onOpenChronicle,
  onOpenSettings,
  onOpenStoreModal,
  renown,
}) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden select-none bg-[#0a0807]">
      {/* Background Castle Silhouette Artwork */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-45 filter contrast-125"
        style={{
          backgroundImage: `url('/src/assets/images/title_screen_crown_1792596426685.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-radial from-transparent via-[#0a0807]/70 to-[#0a0807] pointer-events-none" />

      {/* Top Bar */}
      <header className="relative z-10 p-4 sm:p-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-cinzel tracking-widest text-[#c5a059] font-bold border border-[#c5a059]/40 px-2 py-0.5 rounded bg-black/40">
            Version 1.0 · Premium Roguelike
          </span>
          <span className="text-[10px] uppercase font-cinzel tracking-widest text-emerald-400 font-bold border border-emerald-800 px-2 py-0.5 rounded bg-black/40 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Fully Offline
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-black/60 rounded-xl border border-[#3a3227] text-xs font-cinzel text-purple-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Renown: <strong>{renown}</strong></span>
          </div>

          <button
            onClick={() => {
              sound.playSealStamp();
              onOpenSettings();
            }}
            className="p-2 rounded-xl bg-black/60 hover:bg-[#221c16] text-stone-300 border border-[#3a3227] transition-all cursor-pointer"
            title="Settings"
          >
            <SettingsIcon className="w-4 h-4 text-[#c5a059]" />
          </button>
        </div>
      </header>

      {/* Main Title Centerpiece */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4 py-8">
        <div className="inline-flex items-center gap-2 mb-3">
          <Crown className="w-6 h-6 text-[#d8b26e] animate-pulse" />
          <span className="text-xs uppercase font-cinzel font-bold tracking-[0.3em] text-[#d8b26e]">
            Rule · Betray · Survive
          </span>
          <Crown className="w-6 h-6 text-[#d8b26e] animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-cinzel font-black tracking-wider text-[#f5e4b8] drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
          HOLLOW THRONE
        </h1>
        <p className="font-cinzel text-sm sm:text-base tracking-[0.2em] text-[#c5a059] uppercase mt-1">
          Card Kingdom
        </p>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-stone-300 font-serif italic mt-4 leading-relaxed drop-shadow">
          Every crown is stolen. Every court is lying. Survive twelve seasons of famine, rebellion, and court intrigue using a living deck of advisors, armies, and dark secrets.
        </p>

        {/* Play Game Modes */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
          {/* Standard Reign */}
          <button
            onClick={() => {
              sound.playBell();
              onStartGame('standard');
            }}
            className="col-span-1 sm:col-span-2 py-3 px-6 rounded-xl font-cinzel font-black text-sm uppercase tracking-widest bg-gradient-to-r from-[#8a682c] via-[#c5a059] to-[#8a682c] text-black hover:brightness-110 active:brightness-95 shadow-[0_0_25px_rgba(197,160,89,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Ascend the Throne (Standard Reign)</span>
          </button>

          {/* Dynasty Mode */}
          <button
            onClick={() => {
              sound.playSealStamp();
              onStartGame('dynasty');
            }}
            className="py-2.5 px-4 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider bg-[#1d1610]/90 hover:bg-[#2d2218] text-[#ded1b8] border border-[#c5a059]/40 hover:border-[#c5a059] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <GitBranch className="w-4 h-4 text-purple-400" />
            <span>Dynasty Mode (3 Heirs)</span>
          </button>

          {/* Daily Reign */}
          <button
            onClick={() => {
              sound.playSealStamp();
              onStartGame('daily');
            }}
            className="py-2.5 px-4 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider bg-[#1d1610]/90 hover:bg-[#2d2218] text-[#ded1b8] border border-[#c5a059]/40 hover:border-[#c5a059] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Daily Seeded Reign</span>
          </button>

          {/* Iron Crown Challenge */}
          <button
            onClick={() => {
              sound.playSword();
              onStartGame('challenge');
            }}
            className="py-2.5 px-4 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider bg-[#1d1610]/90 hover:bg-red-950/40 text-red-200 border border-red-900/60 hover:border-red-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Flame className="w-4 h-4 text-red-400" />
            <span>Iron Crown Challenge</span>
          </button>

          {/* Chronicle Book */}
          <button
            onClick={() => {
              sound.playSealStamp();
              onOpenChronicle();
            }}
            className="py-2.5 px-4 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider bg-[#1d1610]/90 hover:bg-[#2d2218] text-[#ded1b8] border border-[#3a3227] hover:border-[#c5a059]/60 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <BookOpen className="w-4 h-4 text-[#c5a059]" />
            <span>The Chronicle & Endings</span>
          </button>
        </div>
      </div>

      {/* Bottom Footer & Store Details */}
      <footer className="relative z-10 p-4 sm:p-6 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400 border-t border-[#3a3227]/40 bg-black/40 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <span>Premium $4.99</span>
          <span>·</span>
          <span>No Ads</span>
          <span>·</span>
          <span>No Pay-to-Win</span>
          <span>·</span>
          <span>10–15 Min Sessions</span>
        </div>

        <button
          onClick={() => {
            sound.playSealStamp();
            onOpenStoreModal();
          }}
          className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-cinzel font-bold transition-colors cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span>App Store Listing & DLC Expansions</span>
        </button>
      </footer>
    </div>
  );
};
