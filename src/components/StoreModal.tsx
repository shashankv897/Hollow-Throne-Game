import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Snowflake, 
  Flame, 
  Coins, 
  X,
  ExternalLink
} from 'lucide-react';
import { sound } from '../utils/audio';

interface StoreModalProps {
  onClose: () => void;
}

export const StoreModal: React.FC<StoreModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'listing' | 'screenshots' | 'dlc'>('listing');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-4xl bg-[#14110e] border-2 border-[#c5a059]/40 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#3a3227] flex items-center justify-between bg-gradient-to-r from-[#1c1815] via-[#14110e] to-[#1c1815]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#251f18] rounded-lg border border-[#c5a059]/30">
              <ShoppingBag className="w-6 h-6 text-[#d8b26e]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#f5e4b8]">
                App Store Listing & DLC Expansions
              </h2>
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span>Category: Games &gt; Strategy (Card)</span>
                <span>·</span>
                <span>Age Rating: 12+</span>
                <span>·</span>
                <span className="text-emerald-400 font-bold">$4.99 Premium</span>
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

        {/* Tab switcher */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-[#0e0c0a] border-b border-[#2d251c]">
          <button
            onClick={() => {
              sound.playCardPlay();
              setActiveTab('listing');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer ${
              activeTab === 'listing'
                ? 'bg-[#2a221a] text-[#f5e4b8] border border-[#c5a059]/50 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Store Listing & Features
          </button>
          <button
            onClick={() => {
              sound.playCardPlay();
              setActiveTab('screenshots');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer ${
              activeTab === 'screenshots'
                ? 'bg-[#2a221a] text-[#f5e4b8] border border-[#c5a059]/50 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Key Promotional Screenshots
          </button>
          <button
            onClick={() => {
              sound.playCardPlay();
              setActiveTab('dlc');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer ${
              activeTab === 'dlc'
                ? 'bg-[#2a221a] text-[#f5e4b8] border border-[#c5a059]/50 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Upcoming DLC Expansions
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* 1. Store Listing */}
          {activeTab === 'listing' && (
            <div className="space-y-4 text-xs sm:text-sm font-serif text-stone-300 leading-relaxed">
              <div className="p-4 bg-[#191512] rounded-xl border border-[#3a3227] space-y-2">
                <span className="text-[10px] uppercase font-cinzel tracking-widest text-[#c5a059] font-bold block">
                  Product Overview
                </span>
                <h3 className="font-cinzel text-base font-bold text-[#f5e4b8]">
                  Hollow Throne: Card Kingdom — Rule, Betray, Survive
                </h3>
                <p className="italic">
                  “Every crown is stolen. Every court is lying. You’ve seized a kingdom, but nobody trusts you. Survive twelve seasons of famine, rebellion, plots, and foreign threats using a deck of advisors, armies, secrets, and favors.”
                </p>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#120f0d] rounded-xl border border-[#2d251c] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-cinzel text-[#ded1b8] block">Deck-building Rule:</strong>
                    Solve seasonal crises and draft new actions, advisors, and secrets into your royal deck.
                  </div>
                </div>

                <div className="p-3 bg-[#120f0d] rounded-xl border border-[#2d251c] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-cinzel text-[#ded1b8] block">A Court that Schemes:</strong>
                    Advisors track Loyalty vs. Ambition. If ambition outgrows loyalty, they stage coups.
                  </div>
                </div>

                <div className="p-3 bg-[#120f0d] rounded-xl border border-[#2d251c] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-cinzel text-[#ded1b8] block">Balance Four Powers (0-10):</strong>
                    Crown, Army, Church, and People. If any hits 0 or 10, a dramatic downfall triggers.
                  </div>
                </div>

                <div className="p-3 bg-[#120f0d] rounded-xl border border-[#2d251c] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-cinzel text-[#ded1b8] block">30+ Story Endings:</strong>
                    Over 30 unique chronicle endings spanning poisonings, jacqueries, excommunications, and triumphs.
                  </div>
                </div>

                <div className="p-3 bg-[#120f0d] rounded-xl border border-[#2d251c] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-cinzel text-[#ded1b8] block">Fair and Complete:</strong>
                    One purchase of $4.99. No advertisements, no energy timers, no pay-to-win microtransactions.
                  </div>
                </div>

                <div className="p-3 bg-[#120f0d] rounded-xl border border-[#2d251c] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-cinzel text-[#ded1b8] block">10–15 Minute Sessions:</strong>
                    Perfect for swift tactical runs, fully offline with persistent local save and resume.
                  </div>
                </div>
              </div>

              {/* Keywords string */}
              <div className="p-3 bg-[#100d0b] rounded-lg border border-[#29221a] text-[11px] font-mono text-stone-400">
                <span className="text-[#c5a059]">Keywords: </span>
                roguelike,deckbuilder,card game,strategy,kingdom,medieval,offline,tactics,court,rpg,turn based
              </div>
            </div>
          )}

          {/* 2. Screenshots Showcase */}
          {activeTab === 'screenshots' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { title: '“Rule a kingdom of lies”', desc: 'Throne room view with four delicate 0-10 pillar meters and crises in progress.' },
                { title: '“Trust no advisor”', desc: 'Court screen displaying live loyalty vs. ambition meters and betrayal alerts.' },
                { title: '“Build your deck of power”', desc: 'End-of-season drafts featuring rare manuscript edicts and free company contracts.' },
                { title: '“30+ ways to fall”', desc: 'Illuminated manuscript epilogues chronicling your dynasty’s gory or glorious fate.' },
                { title: '“One purchase. No ads.”', desc: 'Full premium experience with offline play, daily seeded runs, and dynasty succession.' },
              ].map((shot, idx) => (
                <div key={idx} className="p-4 bg-[#181410] rounded-xl border border-[#3a3227] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-cinzel uppercase text-[#c5a059] font-bold">Screenshot {idx + 1}</span>
                    <h4 className="font-cinzel font-bold text-sm text-[#f5e4b8] mt-1">{shot.title}</h4>
                    <p className="text-xs text-stone-400 font-serif italic mt-2">{shot.desc}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#2d251c] text-[10px] font-cinzel text-stone-500 uppercase">
                    Format: 1290 x 2796 px (iOS Super Retina)
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. DLC Expansions */}
          {activeTab === 'dlc' && (
            <div className="space-y-3">
              {[
                {
                  title: 'The Frozen North',
                  price: '$1.99',
                  icon: <Snowflake className="w-5 h-5 text-sky-400" />,
                  desc: 'New sub-arctic kingdom, frost-bitten cards, mammoth hunts, and winter famine crises.',
                },
                {
                  title: 'Crown of Ash',
                  price: '$2.99',
                  icon: <Flame className="w-5 h-5 text-rose-400" />,
                  desc: 'Religious holy war expansion featuring inquisitorial tribunals, flagellant orders, and heretical factions.',
                },
                {
                  title: 'The Merchant Wars',
                  price: '$2.49',
                  icon: <Coins className="w-5 h-5 text-amber-400" />,
                  desc: 'Trade-focused rulers, Venetian trade fleets, hyperinflation crises, and market monopolies.',
                },
              ].map((dlc, idx) => (
                <div key={idx} className="p-4 bg-[#181410] rounded-xl border border-[#3a3227] flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-[#241c14] border border-[#c5a059]/30">
                      {dlc.icon}
                    </div>
                    <div>
                      <h4 className="font-cinzel font-bold text-base text-[#f5e4b8]">{dlc.title}</h4>
                      <p className="text-xs text-stone-400 font-serif italic mt-0.5">{dlc.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-cinzel font-bold text-sm text-[#c5a059] block">{dlc.price}</span>
                    <span className="text-[10px] uppercase font-cinzel text-stone-500">Post-Launch DLC</span>
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
