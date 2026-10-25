import React from 'react';
import { Crown, Shield, Church, Users, AlertTriangle } from 'lucide-react';
import { Pillars, PillarType } from '../types/game';

interface PillarsBarProps {
  pillars: Pillars;
  previewChanges?: Partial<Record<PillarType, number>> | null;
  colorBlindMode?: boolean;
}

interface PillarConfig {
  key: PillarType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  doomLow: string;
  doomHigh: string;
}

const PILLAR_CONFIGS: PillarConfig[] = [
  {
    key: 'crown',
    label: 'Crown',
    icon: Crown,
    colorClass: 'text-amber-300',
    doomLow: 'At 0: Bankrupt & stripped of ermine by barons.',
    doomHigh: 'At 10: Paranoiac tyranny; terrified nobles assassinate you.',
  },
  {
    key: 'army',
    label: 'Army',
    icon: Shield,
    colorClass: 'text-red-400',
    doomLow: 'At 0: Defenseless; foreign invaders sack the capital.',
    doomHigh: 'At 10: Praetorian military coup; generals seize rule.',
  },
  {
    key: 'church',
    label: 'Church',
    icon: Church,
    colorClass: 'text-blue-300',
    doomLow: 'At 0: Branded heretic; burned by the Holy Inquisition.',
    doomHigh: 'At 10: Complete theocracy; priests cloister you as puppet.',
  },
  {
    key: 'people',
    label: 'People',
    icon: Users,
    colorClass: 'text-emerald-400',
    doomLow: 'At 0: Starvation jacquerie; mob storms the gates with scythes.',
    doomHigh: 'At 10: Demanding anarchy; lazy subjects welcome foreign conquerors.',
  },
];

export const PillarsBar: React.FC<PillarsBarProps> = ({
  pillars,
  previewChanges,
  colorBlindMode = false,
}) => {
  return (
    <div className="w-full bg-[#110f0d]/95 border-y border-[#c5a059]/30 py-2.5 px-3 sm:px-6 shadow-xl backdrop-blur-md">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {PILLAR_CONFIGS.map(({ key, label, icon: Icon, colorClass, doomLow, doomHigh }) => {
          const rawVal = Math.min(10, Math.max(0, pillars[key]));
          const currentVal = Math.round(rawVal * 10) / 10;
          const delta = previewChanges?.[key] ? Math.round(previewChanges[key]! * 10) / 10 : 0;
          const projectedVal = Math.min(10, Math.max(0, Math.round((currentVal + delta) * 10) / 10));

          const isCriticalLow = currentVal <= 2.0;
          const isCriticalHigh = currentVal >= 8.5;

          return (
            <div
              key={key}
              className={`relative group p-2.5 rounded-xl border transition-all duration-300 select-none ${
                isCriticalLow
                  ? 'border-red-600/70 bg-red-950/25 shadow-[0_0_15px_rgba(220,38,38,0.25)]'
                  : isCriticalHigh
                  ? 'border-amber-500/60 bg-amber-950/25 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                  : 'border-[#3a3227] bg-[#161310]/85 hover:border-[#c5a059]/50'
              }`}
            >
              {/* Pillar Header */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className={`${colorClass} p-1 rounded-lg bg-[#0d0c0a] border border-[#3a3227]`}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="font-cinzel text-xs tracking-wider text-[#ded1b8] font-bold uppercase block leading-none">
                      {label}
                    </span>
                    {colorBlindMode && (
                      <span className="text-[9px] text-stone-400 font-mono">
                        [{key.toUpperCase()}]
                      </span>
                    )}
                  </div>
                </div>

                {/* Numerical display (0 - 10) */}
                <div className="flex items-baseline gap-1 text-sm font-cinzel font-bold">
                  <span
                    className={
                      isCriticalLow
                        ? 'text-red-400 animate-pulse'
                        : isCriticalHigh
                        ? 'text-amber-400 font-black'
                        : 'text-[#ded1b8]'
                    }
                  >
                    {currentVal.toFixed(1)}
                  </span>
                  {delta !== 0 && (
                    <span
                      className={`text-xs ${
                        delta > 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {delta > 0 ? `+${delta}` : delta}
                    </span>
                  )}
                  <span className="text-[10px] text-stone-500">/10</span>
                </div>
              </div>

              {/* Meter Track (0 to 10) */}
              <div className="relative h-2.5 w-full bg-[#0a0908] rounded-full overflow-hidden border border-[#2b251f]">
                {/* Visual danger thresholds at 0-2 and 8.5-10 */}
                <div className="absolute top-0 bottom-0 left-0 w-[20%] bg-red-950/40 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-[15%] bg-amber-950/40 pointer-events-none" />

                {/* Current Value Bar */}
                <div
                  className={`h-full transition-all duration-400 ${
                    key === 'crown'
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-400'
                      : key === 'army'
                      ? 'bg-gradient-to-r from-red-800 to-orange-500'
                      : key === 'church'
                      ? 'bg-gradient-to-r from-indigo-800 to-sky-400'
                      : 'bg-gradient-to-r from-emerald-800 to-lime-400'
                  }`}
                  style={{ width: `${(currentVal / 10) * 100}%` }}
                />

                {/* Projected Change Bar */}
                {delta !== 0 && (
                  <div
                    className={`absolute top-0 bottom-0 transition-all duration-200 ${
                      delta > 0
                        ? 'bg-emerald-400/60 border-r-2 border-emerald-300'
                        : 'bg-red-500/60 border-l-2 border-red-300'
                    }`}
                    style={{
                      left: `${(Math.min(currentVal, projectedVal) / 10) * 100}%`,
                      width: `${(Math.abs(delta) / 10) * 100}%`,
                    }}
                  />
                )}
              </div>

              {/* Status Warning if near 0 or 10 */}
              <div className="flex items-center justify-between mt-1 text-[10px]">
                {isCriticalLow ? (
                  <span className="text-red-400 flex items-center gap-1 font-cinzel font-semibold">
                    <AlertTriangle className="w-3 h-3 text-red-400 animate-bounce" />
                    Fall Imminent (&le;2.0)
                  </span>
                ) : isCriticalHigh ? (
                  <span className="text-amber-400 flex items-center gap-1 font-cinzel font-semibold">
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    Hubris Danger (&ge;8.5)
                  </span>
                ) : (
                  <span className="text-stone-500 font-cinzel">Balanced</span>
                )}
                <span className="text-stone-600 font-mono text-[9px]">0-10</span>
              </div>

              {/* Tooltip on Hover */}
              <div className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 left-0 right-0 z-40 p-2.5 bg-[#0e0c0a] border border-[#c5a059]/40 rounded-xl shadow-2xl text-[11px] text-[#ded1b8] leading-tight">
                <p className="font-cinzel text-xs text-[#c5a059] font-bold mb-1">
                  Pillar of {label} (Range 0 - 10)
                </p>
                <div className="space-y-1 text-stone-300">
                  <p className="text-red-300">{doomLow}</p>
                  <p className="text-amber-300">{doomHigh}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
