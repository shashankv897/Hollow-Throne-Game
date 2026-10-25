import React, { useState } from 'react';
import { 
  History, 
  ChevronDown, 
  ChevronUp, 
  Crown, 
  Shield, 
  Church, 
  Users, 
  Coins, 
  ShieldAlert, 
  Eye, 
  X,
  Scroll
} from 'lucide-react';
import { GameCard } from '../types/game';
import { sound } from '../utils/audio';

interface ReignLogProps {
  playedCardsThisSeason: GameCard[];
  seasonNumber: number;
}

export const ReignLog: React.FC<ReignLogProps> = ({
  playedCardsThisSeason,
  seasonNumber,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Take the last 5 cards in reverse order (most recent first)
  const recentCards = [...playedCardsThisSeason].reverse().slice(0, 5);

  const getCategoryBadgeClass = (category: GameCard['category']) => {
    switch (category) {
      case 'advisors':
        return 'text-amber-300 border-amber-800/60 bg-amber-950/40';
      case 'actions':
        return 'text-stone-300 border-stone-700 bg-stone-900/60';
      case 'secrets':
        return 'text-purple-300 border-purple-800/60 bg-purple-950/40';
      case 'curses':
        return 'text-red-300 border-red-800/60 bg-red-950/40';
      case 'heresy':
        return 'text-rose-300 border-rose-800/60 bg-rose-950/40';
      default:
        return 'text-[#c5a059] border-[#3a3227] bg-[#1a140f]';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none">
      {/* Floating Toggle Button */}
      <button
        onClick={() => {
          sound.playCardPlay();
          setIsOpen(!isOpen);
        }}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all shadow-2xl cursor-pointer ${
          isOpen
            ? 'bg-[#2a2016] border-[#c5a059] text-[#f5e4b8]'
            : 'bg-[#14100c]/90 hover:bg-[#201912] border-[#c5a059]/40 text-[#ded1b8] backdrop-blur-md hover:border-[#c5a059]'
        }`}
        title="View recent decrees played this season"
      >
        <History className="w-4 h-4 text-[#d8b26e]" />
        <span className="font-cinzel text-xs font-bold tracking-wider">
          Reign Log
        </span>
        <span className="px-1.5 py-0.2 rounded-full bg-[#2c2217] text-[#c5a059] border border-[#3a3227] text-[10px] font-mono font-bold">
          {playedCardsThisSeason.length}
        </span>
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
        )}
      </button>

      {/* Pop-up Overlay Panel */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-80 sm:w-96 bg-[#130f0c]/95 border-2 border-[#c5a059]/50 rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.9)] backdrop-blur-lg overflow-hidden flex flex-col max-h-[26rem] animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Header */}
          <div className="p-3 bg-gradient-to-r from-[#1c150f] via-[#130f0c] to-[#1c150f] border-b border-[#3a3227] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scroll className="w-4 h-4 text-[#c5a059]" />
              <div>
                <h4 className="font-cinzel text-xs font-bold text-[#f5e4b8] uppercase tracking-wider">
                  Reign Log · Season {seasonNumber}
                </h4>
                <p className="text-[10px] text-stone-400 font-serif">
                  Last 5 decrees enacted by your hand
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playSealStamp();
                setIsOpen(false);
              }}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-[#251d14] transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Cards List */}
          <div className="p-3 overflow-y-auto space-y-2 flex-1">
            {recentCards.length === 0 ? (
              <div className="p-6 text-center text-stone-500 font-serif italic text-xs border border-dashed border-[#2f251c] rounded-xl">
                No decrees played yet this season. Play cards from your hand to resolve the crisis.
              </div>
            ) : (
              recentCards.map((card, index) => {
                const recencyNumber = recentCards.length - index;

                return (
                  <div
                    key={card.id + index}
                    className="p-2.5 rounded-xl border border-[#2d2319] bg-[#18130e]/90 hover:border-[#c5a059]/40 transition-colors space-y-1.5"
                  >
                    {/* Top Row: Index, Name, Category */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-[9px] font-mono text-stone-500 font-bold">
                          #{recencyNumber}
                        </span>
                        <h5 className="font-cinzel text-xs font-bold text-[#f1e6cf] truncate">
                          {card.name}
                        </h5>
                      </div>

                      <span
                        className={`text-[9px] font-cinzel font-bold px-1.5 py-0.5 rounded border uppercase flex-shrink-0 ${getCategoryBadgeClass(
                          card.category
                        )}`}
                      >
                        {card.category}
                      </span>
                    </div>

                    {/* Middle Row: Pillar and Resource Changes */}
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-cinzel">
                      {card.cost.gold > 0 && (
                        <span className="flex items-center gap-0.5 text-stone-400">
                          <Coins className="w-3 h-3 text-amber-400" /> -{card.cost.gold}g
                        </span>
                      )}

                      {card.effects.gold && (
                        <span className="flex items-center gap-0.5 text-amber-300 font-bold">
                          <Coins className="w-3 h-3" /> +{card.effects.gold}g
                        </span>
                      )}

                      {card.effects.pillars.crown !== undefined && (
                        <span className="flex items-center gap-0.5">
                          <Crown className="w-3 h-3 text-amber-300" />
                          <span
                            className={
                              card.effects.pillars.crown > 0
                                ? 'text-emerald-400 font-bold'
                                : 'text-red-400 font-bold'
                            }
                          >
                            {card.effects.pillars.crown > 0
                              ? `+${card.effects.pillars.crown}`
                              : card.effects.pillars.crown}
                          </span>
                        </span>
                      )}

                      {card.effects.pillars.army !== undefined && (
                        <span className="flex items-center gap-0.5">
                          <Shield className="w-3 h-3 text-red-400" />
                          <span
                            className={
                              card.effects.pillars.army > 0
                                ? 'text-emerald-400 font-bold'
                                : 'text-red-400 font-bold'
                            }
                          >
                            {card.effects.pillars.army > 0
                              ? `+${card.effects.pillars.army}`
                              : card.effects.pillars.army}
                          </span>
                        </span>
                      )}

                      {card.effects.pillars.church !== undefined && (
                        <span className="flex items-center gap-0.5">
                          <Church className="w-3 h-3 text-blue-300" />
                          <span
                            className={
                              card.effects.pillars.church > 0
                                ? 'text-emerald-400 font-bold'
                                : 'text-red-400 font-bold'
                            }
                          >
                            {card.effects.pillars.church > 0
                              ? `+${card.effects.pillars.church}`
                              : card.effects.pillars.church}
                          </span>
                        </span>
                      )}

                      {card.effects.pillars.people !== undefined && (
                        <span className="flex items-center gap-0.5">
                          <Users className="w-3 h-3 text-emerald-400" />
                          <span
                            className={
                              card.effects.pillars.people > 0
                                ? 'text-emerald-400 font-bold'
                                : 'text-red-400 font-bold'
                            }
                          >
                            {card.effects.pillars.people > 0
                              ? `+${card.effects.pillars.people}`
                              : card.effects.pillars.people}
                          </span>
                        </span>
                      )}

                      {card.effects.crisisProgress ? (
                        <span className="flex items-center gap-0.5 text-[#e6ca85] font-bold">
                          <ShieldAlert className="w-3 h-3 text-amber-400" />
                          +{card.effects.crisisProgress} Crisis
                        </span>
                      ) : null}

                      {card.effects.revealSecret && (
                        <span className="flex items-center gap-0.5 text-purple-300">
                          <Eye className="w-3 h-3" /> Secret
                        </span>
                      )}
                    </div>

                    {/* Bottom: Flavor quotation */}
                    <p className="text-[10px] text-stone-400 italic font-serif line-clamp-1 border-t border-[#2d2319] pt-1">
                      &ldquo;{card.flavor}&rdquo;
                    </p>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-2 bg-[#0e0a07] border-t border-[#2d2319] text-center">
            <span className="text-[10px] font-cinzel text-stone-500">
              Total decrees this season: <strong className="text-stone-300">{playedCardsThisSeason.length}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
