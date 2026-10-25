import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Scroll, 
  ShieldAlert, 
  Coins 
} from 'lucide-react';
import { Crisis, CrisisChoice, GameCard, PillarType } from '../types/game';
import { sound } from '../utils/audio';

interface CrisisViewProps {
  crisis: Crisis;
  currentGold: number;
  currentPillars: Record<PillarType, number>;
  onMakeChoice: (choice: CrisisChoice) => void;
  onConcludeSeason: () => void;
  playedCardsThisSeason: GameCard[];
}

export const CrisisView: React.FC<CrisisViewProps> = ({
  crisis,
  currentGold,
  currentPillars,
  onMakeChoice,
  onConcludeSeason,
  playedCardsThisSeason,
}) => {
  const isResolved = crisis.currentResolutionPoints >= crisis.requiredResolutionPoints;

  const getUrgencyBadge = (urgency: Crisis['urgency']) => {
    switch (urgency) {
      case 'cataclysmic':
        return 'text-rose-400 border-rose-800 bg-rose-950/60';
      case 'perilous':
        return 'text-amber-400 border-amber-800 bg-amber-950/60';
      default:
        return 'text-stone-300 border-stone-700 bg-stone-900/60';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-3 p-4 sm:p-6 rounded-2xl parchment-panel relative overflow-hidden">
      {/* Decorative Illuminated Manuscript Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-70" />

      {/* Main Crisis Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#3a3227]/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#241c14] border border-[#c5a059]/40 flex items-center justify-center font-manuscript text-2xl text-[#d8b26e] font-bold shadow-inner">
            {crisis.manuscriptDropCap}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-cinzel tracking-widest text-[#c5a059]">
                Year {crisis.year} · {crisis.seasonName} · Season {crisis.seasonNumber}/12
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-cinzel font-bold border uppercase ${getUrgencyBadge(crisis.urgency)}`}>
                {crisis.urgency}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#f5e4b8] tracking-wide">
              {crisis.title}
            </h2>
          </div>
        </div>

        {/* Resolution Progress Badge */}
        <div className="flex items-center gap-3 bg-[#0f0d0b] px-4 py-2 rounded-xl border border-[#3a3227]">
          <div>
            <div className="flex items-center justify-between text-xs font-cinzel font-bold text-stone-300 mb-1">
              <span>Resolution Progress</span>
              <span className={isResolved ? 'text-emerald-400' : 'text-amber-400'}>
                {crisis.currentResolutionPoints} / {crisis.requiredResolutionPoints}
              </span>
            </div>
            <div className="w-36 h-2 bg-[#1f1913] rounded-full overflow-hidden border border-[#3a3227]">
              <div
                className={`h-full transition-all duration-500 ${
                  isResolved
                    ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]'
                    : 'bg-gradient-to-r from-amber-600 to-yellow-400'
                }`}
                style={{
                  width: `${Math.min(
                    100,
                    (crisis.currentResolutionPoints / crisis.requiredResolutionPoints) * 100
                  )}%`,
                }}
              />
            </div>
          </div>

          {isResolved ? (
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-cinzel font-bold px-2 py-1 bg-emerald-950/60 rounded border border-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Resolved</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-amber-400 text-xs font-cinzel font-bold px-2 py-1 bg-amber-950/40 rounded border border-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Pending</span>
            </div>
          )}
        </div>
      </div>

      {/* Narrative Manuscript Prose */}
      <div className="py-4 text-stone-300 leading-relaxed text-sm sm:text-base border-b border-[#3a3227]/50 font-serif">
        <p className="first-letter:text-3xl first-letter:font-cinzel first-letter:text-[#d8b26e] first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:leading-none">
          {crisis.description}
        </p>
      </div>

      {/* Crisis Resolution Section: Edicts & Decisions vs Cards */}
      <div className="pt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Direct Royal Edicts (Choices) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center gap-2">
            <Scroll className="w-4 h-4 text-[#c5a059]" />
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#c5a059]">
              Imperial Pronouncements (Choose One or Play Cards)
            </h3>
          </div>

          <div className="space-y-2">
            {crisis.choices.map((choice) => {
              const canAfford = !choice.cost || currentGold >= choice.cost.gold;

              return (
                <div
                  key={choice.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    canAfford
                      ? 'border-[#3a3227] bg-[#161310]/80 hover:border-[#c5a059]/60 hover:bg-[#1f1a14]'
                      : 'border-stone-800 bg-[#0e0c0a] opacity-60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#f1e6cf] font-serif">
                        {choice.text}
                      </p>
                      <p className="text-xs text-[#c5a059] mt-0.5 font-cinzel">
                        {choice.consequencesSummary}
                      </p>
                    </div>

                    <button
                      disabled={!canAfford}
                      onClick={() => {
                        sound.playSealStamp();
                        onMakeChoice(choice);
                      }}
                      className={`px-3 py-1.5 rounded-lg font-cinzel text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                        canAfford
                          ? 'bg-[#2d2218] hover:bg-[#423322] text-[#faebd7] border border-[#c5a059]/50 shadow-md'
                          : 'bg-stone-900 text-stone-600 border border-stone-800 cursor-not-allowed'
                      }`}
                    >
                      {choice.cost && choice.cost.gold > 0 && (
                        <span className="flex items-center gap-0.5 text-amber-300">
                          <Coins className="w-3 h-3" /> {choice.cost.gold}
                        </span>
                      )}
                      <span>Enact Decree</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Crisis Stakes & Season Conclusion */}
        <div className="lg:col-span-5 p-4 rounded-xl bg-[#0f0d0b] border border-[#3a3227] flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-cinzel font-bold text-red-400">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Consequence If Unresolved At Season End:</span>
            </div>
            <div className="p-2.5 rounded bg-red-950/20 border border-red-900/40 text-xs text-stone-300 space-y-1">
              {Object.entries(crisis.defaultFailurePenalty.pillars).map(([pillar, val]) => (
                <div key={pillar} className="flex justify-between font-cinzel">
                  <span className="capitalize text-stone-400">{pillar} Pillar:</span>
                  <span className="text-red-400 font-bold">{val}</span>
                </div>
              ))}
            </div>

            {/* Played Cards summary this season */}
            <div className="text-[11px] text-stone-400 pt-1">
              <span>Cards played this season: </span>
              <span className="text-[#ded1b8] font-bold">{playedCardsThisSeason.length}</span>
            </div>
          </div>

          {/* Season Conclude Action */}
          <div className="mt-4 pt-3 border-t border-[#3a3227]">
            <button
              onClick={() => {
                sound.playBell();
                onConcludeSeason();
              }}
              className={`w-full py-2.5 px-4 rounded-xl font-cinzel font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                isResolved
                  ? 'bg-gradient-to-r from-emerald-800 to-teal-700 hover:from-emerald-700 hover:to-teal-600 text-white border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-[#291e17] hover:bg-[#382b20] text-[#ded1b8] border border-[#c5a059]/40'
              }`}
            >
              <span>Conclude Season {crisis.seasonNumber}</span>
              <span className="text-xs text-stone-400">
                {isResolved ? '(Reign Stabilized)' : '(Unresolved Danger)'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
