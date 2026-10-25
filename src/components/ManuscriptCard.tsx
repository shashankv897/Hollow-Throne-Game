import React from 'react';
import { 
  Coins, 
  Swords, 
  Eye, 
  Scroll, 
  Flame, 
  Cross, 
  ShieldAlert, 
  Crown, 
  Shield, 
  Church, 
  Users,
  AlertOctagon,
  Sparkles,
  Trash2
} from 'lucide-react';
import { GameCard, PillarType } from '../types/game';
import { sound } from '../utils/audio';

interface ManuscriptCardProps {
  card: GameCard;
  currentGold: number;
  currentPillars: Record<PillarType, number>;
  onPlay: (card: GameCard) => void;
  onHover?: (card: GameCard | null) => void;
  disabled?: boolean;
}

export const ManuscriptCard: React.FC<ManuscriptCardProps> = ({
  card,
  currentGold,
  currentPillars,
  onPlay,
  onHover,
  disabled = false,
}) => {
  const isCurse = card.isCurse || card.category === 'curses';
  const effectiveCost = isCurse ? (card.curseDiscardCost ?? 2) : card.cost.gold;
  const canAffordGold = currentGold >= effectiveCost;
  const canAffordSacrifice = !card.cost.pillarSacrifice || 
    currentPillars[card.cost.pillarSacrifice.pillar] > card.cost.pillarSacrifice.amount;

  const isPlayable = !disabled && canAffordGold && canAffordSacrifice;

  const getCategoryColor = (cat: GameCard['category']) => {
    switch (cat) {
      case 'advisors':
        return 'border-amber-700/70 bg-gradient-to-b from-[#251a10] to-[#120c08] text-amber-200';
      case 'actions':
        return 'border-stone-600/70 bg-gradient-to-b from-[#211d19] to-[#120f0d] text-stone-200';
      case 'secrets':
        return 'border-purple-800/70 bg-gradient-to-b from-[#1c1228] to-[#0e0816] text-purple-200';
      case 'curses':
        return 'border-red-800/80 bg-gradient-to-b from-[#2a1114] to-[#140608] text-red-200';
      case 'heresy':
        return 'border-rose-900/80 bg-gradient-to-b from-[#260e18] to-[#12060c] text-rose-200';
      default:
        return 'border-[#3a3227] bg-[#161310] text-[#ded1b8]';
    }
  };

  const getSymbolIcon = (symbol: string) => {
    switch (symbol) {
      case 'crossed-swords':
        return <Swords className="w-7 h-7 text-red-400" />;
      case 'iron-helmet':
        return <Shield className="w-7 h-7 text-amber-400" />;
      case 'dagger-dripping':
      case 'raven-letter':
      case 'wax-seal-broken':
        return <Eye className="w-7 h-7 text-purple-400" />;
      case 'wheat-chalice':
      case 'burning-cross':
        return <Church className="w-7 h-7 text-blue-400" />;
      case 'bread-basket':
      case 'balance-scales':
      case 'chest-overflowing':
      case 'gold-pouch':
        return <Coins className="w-7 h-7 text-amber-300" />;
      case 'black-reliquary':
      case 'occult-eye':
      case 'skull-chalice':
        return <Flame className="w-7 h-7 text-rose-400" />;
      case 'broken-mask':
      case 'burning-village':
        return <AlertOctagon className="w-7 h-7 text-red-500 animate-pulse" />;
      default:
        return <Scroll className="w-7 h-7 text-[#c5a059]" />;
    }
  };

  return (
    <div
      onMouseEnter={() => {
        sound.playCardPlay();
        onHover?.(card);
      }}
      onMouseLeave={() => {
        onHover?.(null);
      }}
      onClick={() => {
        if (isPlayable) {
          sound.playCardPlay();
          onPlay(card);
        }
      }}
      className={`relative w-48 min-w-[12rem] h-[19.5rem] rounded-xl flex flex-col justify-between p-3 select-none transition-all duration-300 cursor-pointer shadow-2xl border-2 ${getCategoryColor(
        card.category
      )} ${
        isPlayable
          ? 'hover:-translate-y-3 hover:shadow-[0_15px_30px_rgba(197,160,89,0.35)] hover:border-[#c5a059]'
          : 'opacity-50 cursor-not-allowed filter grayscale-[40%]'
      }`}
      style={{
        boxShadow: isPlayable
          ? 'inset 0 0 25px rgba(0, 0, 0, 0.7), 0 8px 20px rgba(0,0,0,0.8)'
          : 'none',
      }}
    >
      {/* Illuminated Gold Ornamental Corners */}
      <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#c5a059]/60 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#c5a059]/60 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#c5a059]/60 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#c5a059]/60 rounded-br-sm pointer-events-none" />

      {/* Card Header: Category & Cost */}
      <div>
        <div className="flex items-center justify-between pb-1.5 border-b border-[#3a3227]/60">
          <span className={`text-[10px] uppercase font-cinzel font-bold tracking-widest ${
            isCurse ? 'text-red-400 font-black' : 'text-[#c5a059]'
          }`}>
            {isCurse ? 'Curse / Scandal' : card.category}
          </span>

          <div className="flex items-center gap-1">
            {/* Gold Cost / Purge Cost */}
            <div
              className={`flex items-center gap-0.5 text-xs font-cinzel font-bold px-1.5 py-0.5 rounded border ${
                canAffordGold
                  ? isCurse
                    ? 'border-red-600 bg-red-950 text-red-200'
                    : 'border-amber-500/50 bg-amber-950/60 text-amber-300'
                  : 'border-red-600/70 bg-red-950/80 text-red-300 animate-pulse'
              }`}
            >
              {isCurse ? <Trash2 className="w-3 h-3 text-red-400" /> : <Coins className="w-3 h-3 text-amber-400" />}
              <span>{effectiveCost}g</span>
            </div>

            {/* Pillar Sacrifice */}
            {card.cost.pillarSacrifice && (
              <div className="flex items-center gap-0.5 text-[10px] font-cinzel font-bold px-1 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-300">
                <span>-{card.cost.pillarSacrifice.amount} {card.cost.pillarSacrifice.pillar}</span>
              </div>
            )}
          </div>
        </div>

        {/* Card Title */}
        <h4 className="font-cinzel font-bold text-sm text-[#f1e6cf] mt-1.5 leading-snug tracking-wide text-center">
          {card.name}
        </h4>
      </div>

      {/* Illustration Seal Window */}
      <div className="my-1 flex flex-col items-center justify-center p-2 rounded-lg bg-[#0a0807]/90 border border-[#c5a059]/30 relative overflow-hidden group">
        <div className="transition-transform duration-300 group-hover:scale-110">
          {getSymbolIcon(card.illustrationSymbol)}
        </div>
        {card.effects.crisisProgress ? (
          <span className="mt-1 text-[10px] font-cinzel font-bold text-[#e6ca85] flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-amber-400" />
            +{card.effects.crisisProgress} Crisis Progress
          </span>
        ) : isCurse ? (
          <span className="mt-1 text-[10px] font-cinzel font-bold text-red-400 flex items-center gap-1">
            <AlertOctagon className="w-3 h-3" />
            Clogs Hand · Pay to Discard
          </span>
        ) : null}
      </div>

      {/* Card Effects & Pillar Deltas (0 to 10 scale) */}
      <div className="space-y-0.5">
        <div className="grid grid-cols-2 gap-1 text-[11px] font-cinzel font-semibold">
          {card.effects.pillars.crown !== undefined && (
            <div className="flex items-center gap-1">
              <Crown className="w-3 h-3 text-amber-300" />
              <span className={card.effects.pillars.crown > 0 ? 'text-emerald-400' : 'text-red-400'}>
                {card.effects.pillars.crown > 0 ? `+${card.effects.pillars.crown}` : card.effects.pillars.crown}
              </span>
            </div>
          )}
          {card.effects.pillars.army !== undefined && (
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-red-400" />
              <span className={card.effects.pillars.army > 0 ? 'text-emerald-400' : 'text-red-400'}>
                {card.effects.pillars.army > 0 ? `+${card.effects.pillars.army}` : card.effects.pillars.army}
              </span>
            </div>
          )}
          {card.effects.pillars.church !== undefined && (
            <div className="flex items-center gap-1">
              <Church className="w-3 h-3 text-blue-300" />
              <span className={card.effects.pillars.church > 0 ? 'text-emerald-400' : 'text-red-400'}>
                {card.effects.pillars.church > 0 ? `+${card.effects.pillars.church}` : card.effects.pillars.church}
              </span>
            </div>
          )}
          {card.effects.pillars.people !== undefined && (
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 text-emerald-400" />
              <span className={card.effects.pillars.people > 0 ? 'text-emerald-400' : 'text-red-400'}>
                {card.effects.pillars.people > 0 ? `+${card.effects.pillars.people}` : card.effects.pillars.people}
              </span>
            </div>
          )}
        </div>

        {/* Special effects */}
        {card.effects.gold && (
          <div className="text-[10px] text-amber-300 flex items-center gap-1 font-cinzel">
            <Coins className="w-3 h-3" /> +{card.effects.gold} Gold to Coffers
          </div>
        )}
        {card.effects.revealSecret && (
          <div className="text-[10px] text-purple-300 flex items-center gap-1">
            <Eye className="w-3 h-3" /> Uncovers Hidden Treason
          </div>
        )}
        {card.effects.purgeCurses && (
          <div className="text-[10px] text-emerald-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Purges Hand Scandals
          </div>
        )}
      </div>

      {/* Flavor Prose in Italic */}
      <p className="text-[10px] italic text-stone-400 line-clamp-2 border-t border-[#3a3227]/50 pt-1 leading-snug font-serif">
        {card.flavor}
      </p>

      {/* Inability Overlay */}
      {!isPlayable && (
        <div className="absolute inset-0 bg-black/65 rounded-xl flex items-center justify-center p-2 text-center pointer-events-none">
          <span className="text-xs font-cinzel font-bold text-red-300 bg-red-950/90 border border-red-700 px-2 py-1 rounded">
            {!canAffordGold ? `Needs ${effectiveCost}g` : 'Cannot Pay Sacrifice'}
          </span>
        </div>
      )}
    </div>
  );
};
