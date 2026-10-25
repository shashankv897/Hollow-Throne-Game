import React from 'react';
import { GameCard } from '../types/game';
import { ManuscriptCard } from './ManuscriptCard';
import { Sparkles, Coins } from 'lucide-react';
import { sound } from '../utils/audio';

interface DraftModalProps {
  draftChoices: GameCard[];
  onSelectCard: (card: GameCard) => void;
  onSkipDraft: () => void;
}

export const DraftModal: React.FC<DraftModalProps> = ({
  draftChoices,
  onSelectCard,
  onSkipDraft,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-4xl bg-[#14110e] border-2 border-[#c5a059]/50 rounded-2xl p-6 shadow-2xl relative text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-[#d8b26e]" />
          <span className="text-xs font-cinzel font-bold uppercase tracking-widest text-[#c5a059]">
            The Season Has Ended · Spoils of Rule
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#f5e4b8]">
          Draft an Imperial Card
        </h2>
        <p className="text-sm text-stone-400 font-serif max-w-lg mx-auto mt-1 mb-6">
          Your court grows. Add a powerful advisor, decree, secret, or regiment to your royal deck to prepare for the oncoming crises.
        </p>

        {/* 3 Choices Showcase */}
        <div className="flex flex-wrap items-center justify-center gap-6 my-6">
          {draftChoices.map((card) => (
            <div key={card.id} className="flex flex-col items-center gap-3">
              <ManuscriptCard
                card={card}
                currentGold={999}
                currentPillars={{ crown: 99, army: 99, church: 99, people: 99 }}
                onPlay={() => {}}
                disabled={false}
              />
              <button
                onClick={() => {
                  sound.playSealStamp();
                  onSelectCard(card);
                }}
                className="px-5 py-2 bg-gradient-to-r from-[#2c2014] to-[#3d2f21] hover:from-[#3d2f21] hover:to-[#523f2d] border border-[#c5a059]/60 text-[#f5e4b8] rounded-xl font-cinzel text-xs font-bold tracking-wider transition-all shadow-md cursor-pointer"
              >
                Add to Royal Deck
              </button>
            </div>
          ))}
        </div>

        {/* Skip button for gold */}
        <div className="pt-4 border-t border-[#3a3227] flex justify-center">
          <button
            onClick={() => {
              sound.playCoin();
              onSkipDraft();
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#181410] hover:bg-[#221c16] text-stone-400 hover:text-amber-300 border border-[#3a3227] rounded-xl font-cinzel text-xs font-bold transition-all cursor-pointer"
          >
            <Coins className="w-4 h-4 text-amber-400" />
            <span>Pass on Choices (+2 Gold to Coffers)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
