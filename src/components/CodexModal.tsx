import React, { useState } from 'react';
import { BookOpen, Scroll, Sparkles, X, Award, Skull, Coins, CheckCircle2 } from 'lucide-react';
import { ReignRecord } from '../types/game';
import { ALL_CARDS } from '../data/cards';
import { ALL_RELICS } from '../data/relics';
import { ENDINGS_CATALOG, ACHIEVEMENTS_LIST } from '../data/endings';
import { sound } from '../utils/audio';

interface CodexModalProps {
  reignHistory: ReignRecord[];
  renown: number;
  unlockedEndings?: string[];
  unlockedAchievements?: string[];
  onClose: () => void;
}

export const CodexModal: React.FC<CodexModalProps> = ({
  reignHistory,
  renown,
  unlockedEndings = ['crown_zero', 'army_zero', 'church_zero', 'people_zero', 'victory_immortal'],
  unlockedAchievements = ['ach_12_seasons'],
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'hall' | 'endings' | 'achievements' | 'cards'>('hall');
  const cardsList = Object.values(ALL_CARDS);
  const endingsList = Object.values(ENDINGS_CATALOG);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-4xl bg-[#14110e] border-2 border-[#c5a059]/40 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#3a3227] flex items-center justify-between bg-gradient-to-r from-[#1c1815] via-[#14110e] to-[#1c1815]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#251f18] rounded-lg border border-[#c5a059]/30">
              <BookOpen className="w-6 h-6 text-[#d8b26e]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#f5e4b8]">
                The Imperial Chronicle & Hall of Dynasties
              </h2>
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span>Dynasty Renown: <strong className="text-purple-300">{renown}</strong></span>
                <span>·</span>
                <span>Past Dynasties: <strong className="text-amber-300">{reignHistory.length}</strong></span>
              </div>
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

        {/* Tab Controls */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-[#0e0c0a] border-b border-[#2d251c] overflow-x-auto">
          <button
            onClick={() => {
              sound.playCardPlay();
              setActiveTab('hall');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'hall'
                ? 'bg-[#2a221a] text-[#f5e4b8] border border-[#c5a059]/50 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Hall of Dynasties
          </button>
          <button
            onClick={() => {
              sound.playCardPlay();
              setActiveTab('endings');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'endings'
                ? 'bg-[#2a221a] text-[#f5e4b8] border border-[#c5a059]/50 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            30+ Endings Catalog ({unlockedEndings.length}/{endingsList.length})
          </button>
          <button
            onClick={() => {
              sound.playCardPlay();
              setActiveTab('achievements');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'achievements'
                ? 'bg-[#2a221a] text-[#f5e4b8] border border-[#c5a059]/50 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Achievements
          </button>
          <button
            onClick={() => {
              sound.playCardPlay();
              setActiveTab('cards');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'cards'
                ? 'bg-[#2a221a] text-[#f5e4b8] border border-[#c5a059]/50 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Manuscript Cards ({cardsList.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Tab 1: Hall of Dynasties */}
          {activeTab === 'hall' && (
            <div className="space-y-3">
              {reignHistory.length === 0 ? (
                <div className="p-8 text-center text-stone-500 font-serif italic border border-dashed border-[#3a3227] rounded-xl">
                  No past reigns recorded yet. Your current sovereign writes the first scroll of the dynasty.
                </div>
              ) : (
                reignHistory.map((reign, idx) => (
                  <div
                    key={reign.id || idx}
                    className="p-3.5 rounded-xl border border-[#3a3227] bg-[#161310] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-cinzel text-sm font-bold text-[#f5e4b8]">
                          {reign.rulerName}
                        </span>
                        <span
                          className={`text-[10px] font-cinzel font-bold px-2 py-0.5 rounded border uppercase ${
                            reign.outcome === 'victorious'
                              ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                              : 'bg-red-950/60 border-red-700 text-red-300'
                          }`}
                        >
                          {reign.outcome === 'victorious' ? '12 Seasons Ruled (Victor)' : 'Ruined'}
                        </span>
                        {reign.gameMode && (
                          <span className="text-[9px] uppercase font-cinzel text-stone-400 bg-stone-900 border border-stone-700 px-1.5 py-0.5 rounded">
                            {reign.gameMode}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-400 italic mt-0.5 font-serif">
                        {reign.causeOfDeath}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-cinzel text-stone-300">
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block">Seasons</span>
                        <span className="font-bold">{reign.seasonsSurvived}/12</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block">Cards</span>
                        <span className="font-bold">{reign.cardsPlayed}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-stone-500 uppercase block">Renown</span>
                        <span className="font-bold text-purple-300">+{reign.renownEarned}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 2: 30+ Endings Catalog */}
          {activeTab === 'endings' && (
            <div className="space-y-2">
              <p className="text-xs text-stone-400 font-serif italic mb-3">
                Every collapse of a pillar at 0 or 10, advisor conspiracy, or successful 12-season reign unlocks a unique chronicle page.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {endingsList.map((ending) => {
                  const isDiscovered = unlockedEndings.includes(ending.id);

                  return (
                    <div
                      key={ending.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isDiscovered
                          ? 'border-[#3a3227] bg-[#161310]'
                          : 'border-stone-900 bg-stone-950/60 opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-cinzel text-[#c5a059] font-bold">
                          {ending.trigger}
                        </span>
                        {isDiscovered ? (
                          <span className={`text-[10px] font-cinzel font-bold px-1.5 py-0.5 rounded ${
                            ending.outcome === 'victorious' ? 'text-emerald-400 bg-emerald-950' : 'text-red-400 bg-red-950'
                          }`}>
                            {ending.outcome === 'victorious' ? 'Ascension' : 'Downfall'}
                          </span>
                        ) : (
                          <span className="text-[10px] font-cinzel text-stone-500">Undiscovered</span>
                        )}
                      </div>

                      <h4 className="font-cinzel text-sm font-bold text-[#f5e4b8] mt-1">
                        {isDiscovered ? ending.title : '??? Sealed Chronicle ???'}
                      </h4>

                      <p className="text-xs text-stone-400 italic font-serif mt-1 line-clamp-3">
                        {isDiscovered ? `“${ending.epitaph}”` : 'Experience this fate or balance collapse to unseal the manuscript entry.'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 3: Achievements */}
          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ACHIEVEMENTS_LIST.map((ach) => {
                const isUnlocked = unlockedAchievements.includes(ach.id);

                return (
                  <div
                    key={ach.id}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                      isUnlocked
                        ? 'border-[#c5a059]/50 bg-[#191410]'
                        : 'border-stone-800 bg-stone-950/60 opacity-60'
                    }`}
                  >
                    <div className="text-2xl p-2 rounded-lg bg-[#241c14] border border-[#3a3227]">
                      {ach.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-cinzel text-xs font-bold text-[#ded1b8]">{ach.title}</h4>
                        {isUnlocked && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </div>
                      <p className="text-[11px] text-stone-400 font-serif italic mt-0.5">
                        {ach.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 4: Manuscript Cards */}
          {activeTab === 'cards' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {cardsList.map((card) => (
                <div
                  key={card.id}
                  className="p-3 rounded-xl border border-[#2d251c] bg-[#161310] flex flex-col justify-between space-y-2"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-cinzel uppercase text-[#c5a059] font-bold">
                        {card.category}
                      </span>
                      <span className="text-xs text-amber-300 font-cinzel font-bold flex items-center gap-0.5">
                        <Coins className="w-3 h-3" /> {card.cost.gold}
                      </span>
                    </div>
                    <h4 className="font-cinzel text-sm font-bold text-[#ded1b8] mt-1">
                      {card.name}
                    </h4>
                    <p className="text-xs text-stone-400 italic font-serif mt-1">
                      {card.flavor}
                    </p>
                  </div>

                  <div className="text-[11px] font-cinzel text-[#c5a059] pt-1 border-t border-[#2d251c]">
                    {card.effects.crisisProgress ? (
                      <span>+{card.effects.crisisProgress} Crisis Progress </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
