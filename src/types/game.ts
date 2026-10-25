export type PillarType = 'crown' | 'army' | 'church' | 'people';

export interface Pillars {
  crown: number; // 0 to 10
  army: number;  // 0 to 10
  church: number;// 0 to 10
  people: number;// 0 to 10
}

export type SeasonName = 'Spring' | 'Summer' | 'Autumn' | 'Winter';

export type CardCategory = 'advisors' | 'actions' | 'secrets' | 'curses' | 'edict' | 'heresy';

export interface CardCost {
  gold: number;
  tokens?: number;
  pillarSacrifice?: {
    pillar: PillarType;
    amount: number;
  };
}

export interface CardEffect {
  pillars: Partial<Record<PillarType, number>>;
  gold?: number;
  crisisProgress?: number;
  advisorLoyaltyBonus?: {
    advisorFaction?: PillarType;
    amount: number;
  };
  revealSecret?: boolean;
  purgeCurses?: boolean;
  special?: string;
}

export interface GameCard {
  id: string;
  name: string;
  category: CardCategory;
  cost: CardCost;
  effects: CardEffect;
  flavor: string;
  illustrationSymbol: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'curse';
  isCurse?: boolean;
  curseDiscardCost?: number; // gold to purge
}

export interface Advisor {
  id: string;
  name: string;
  title: string;
  faction: PillarType;
  loyalty: number; // 0 to 10
  ambition: number; // 0 to 10
  secret: string;
  isSecretRevealed: boolean;
  isImprisoned?: boolean;
  avatarSeed: string;
  trait: string;
  traitDescription: string;
}

export interface CrisisChoice {
  id: string;
  text: string;
  consequencesSummary: string;
  cost?: CardCost;
  effects: CardEffect;
}

export interface Crisis {
  id: string;
  title: string;
  seasonNumber: number; // 1 to 12
  year: number;
  seasonName: SeasonName;
  description: string;
  manuscriptDropCap: string;
  urgency: 'moderate' | 'perilous' | 'cataclysmic';
  requiredResolutionPoints: number;
  currentResolutionPoints: number;
  defaultFailurePenalty: CardEffect;
  choices: CrisisChoice[];
  resolved: boolean;
}

export interface Ruler {
  id: string;
  name: string;
  epithet: string;
  description: string;
  portraitUrl: string;
  passiveTitle: string;
  passiveDescription: string;
  startingPillars: Pillars;
  startingGold: number;
  startingDeck: string[];
  unlocked: boolean;
  unlockCondition: string;
}

export interface Relic {
  id: string;
  name: string;
  description: string;
  symbol: string;
  passiveEffect: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export interface ReignRecord {
  id: string;
  rulerName: string;
  rulerId: string;
  seasonsSurvived: number;
  outcome: 'victorious' | 'ruined';
  causeOfDeath?: string;
  date: string;
  renownEarned: number;
  cardsPlayed: number;
  gameMode?: 'standard' | 'dynasty' | 'daily' | 'challenge';
}

export type GameMode = 'standard' | 'dynasty' | 'daily' | 'challenge';

export interface ChallengeRule {
  id: string;
  name: string;
  description: string;
  startingPillarsModifier?: Partial<Pillars>;
  noRedraws?: boolean;
}

export interface AppSettings {
  soundVolume: number;
  musicEnabled: boolean;
  hapticEnabled: boolean;
  textSize: 'compact' | 'standard' | 'scholarly';
  colorBlindMode: boolean;
  language: 'en' | 'la' | 'fr';
}
