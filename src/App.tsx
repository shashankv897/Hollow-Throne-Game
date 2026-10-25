import React, { useState, useEffect, useCallback } from 'react';
import { 
  Pillars, 
  PillarType, 
  GameCard, 
  Crisis, 
  Advisor, 
  ReignRecord, 
  CrisisChoice, 
  Ruler, 
  GameMode, 
  AppSettings 
} from './types/game';
import { RULERS } from './data/rulers';
import { ALL_CARDS, DRAFT_POOL } from './data/cards';
import { REIGN_CRISES } from './data/crises';
import { INITIAL_ADVISORS, ADVISOR_POOL } from './data/advisors';
import { ENDINGS_CATALOG, ACHIEVEMENTS_LIST } from './data/endings';
import { sound } from './utils/audio';

import { TitleScreen } from './components/TitleScreen';
import { HeaderNav } from './components/HeaderNav';
import { PillarsBar } from './components/PillarsBar';
import { ManuscriptCard } from './components/ManuscriptCard';
import { CrisisView } from './components/CrisisView';
import { CourtChamber } from './components/CourtChamber';
import { RulerSelection } from './components/RulerSelection';
import { DraftModal } from './components/DraftModal';
import { GameOverModal } from './components/GameOverModal';
import { CodexModal } from './components/CodexModal';
import { GuideModal } from './components/GuideModal';
import { SettingsModal } from './components/SettingsModal';
import { StoreModal } from './components/StoreModal';
import { ReignLog } from './components/ReignLog';
import { Layers, RefreshCw, GitBranch, Calendar } from 'lucide-react';

const STORAGE_KEY_RENOWN = 'hollow_throne_renown';
const STORAGE_KEY_HISTORY = 'hollow_throne_history';
const STORAGE_KEY_UNLOCKED = 'hollow_throne_unlocked_rulers';
const STORAGE_KEY_ENDINGS = 'hollow_throne_unlocked_endings';
const STORAGE_KEY_ACHIEVEMENTS = 'hollow_throne_unlocked_achievements';
const STORAGE_KEY_SETTINGS = 'hollow_throne_settings';

export default function App() {
  // Persistence State
  const [renown, setRenown] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_RENOWN);
    return saved ? parseInt(saved, 10) : 0;
  });

  const [unlockedRulers, setUnlockedRulers] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_UNLOCKED);
    return saved ? JSON.parse(saved) : ['usurper', 'regent'];
  });

  const [unlockedEndings, setUnlockedEndings] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ENDINGS);
    return saved ? JSON.parse(saved) : ['crown_zero', 'army_zero', 'church_zero', 'people_zero', 'victory_immortal'];
  });

  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS);
    return saved ? JSON.parse(saved) : ['ach_12_seasons'];
  });

  const [reignHistory, setReignHistory] = useState<ReignRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
    return saved ? JSON.parse(saved) : {
      soundVolume: 50,
      musicEnabled: true,
      hapticEnabled: true,
      textSize: 'standard',
      colorBlindMode: false,
      language: 'en',
    };
  });

  // Game Flow State
  const [currentScreen, setCurrentScreen] = useState<'title' | 'ruler_select' | 'throne_room' | 'drafting' | 'game_over'>('title');
  const [activeGameMode, setActiveGameMode] = useState<GameMode>('standard');
  const [dynastyGeneration, setDynastyGeneration] = useState<number>(1);
  const [selectedRulerId, setSelectedRulerId] = useState<string>('usurper');

  // Modals
  const [isCourtOpen, setIsCourtOpen] = useState<boolean>(false);
  const [isCodexOpen, setIsCodexOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isStoreOpen, setIsStoreOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());

  // Current Run State (Pillars 0 to 10 scale)
  const [currentRuler, setCurrentRuler] = useState<Ruler>(RULERS[0]);
  const [seasonIndex, setSeasonIndex] = useState<number>(0); // 0 to 11
  const [gold, setGold] = useState<number>(14);
  const [pillars, setPillars] = useState<Pillars>({
    crown: 5.0,
    army: 5.0,
    church: 5.0,
    people: 5.0,
  });
  const [advisors, setAdvisors] = useState<Advisor[]>(INITIAL_ADVISORS);
  const [deck, setDeck] = useState<GameCard[]>([]);
  const [hand, setHand] = useState<GameCard[]>([]);
  const [discardPile, setDiscardPile] = useState<GameCard[]>([]);
  const [playedCardsThisSeason, setPlayedCardsThisSeason] = useState<GameCard[]>([]);
  const [currentCrisis, setCurrentCrisis] = useState<Crisis | null>(null);

  // Hover preview
  const [hoveredCard, setHoveredCard] = useState<GameCard | null>(null);

  // Draft & End Game State
  const [draftChoices, setDraftChoices] = useState<GameCard[]>([]);
  const [gameOverOutcome, setGameOverOutcome] = useState<'victorious' | 'ruined'>('ruined');
  const [gameOverCause, setGameOverCause] = useState<string>('');
  const [unlockedNewRulerNotification, setUnlockedNewRulerNotification] = useState<string | null>(null);
  const [cardsPlayedTotal, setCardsPlayedTotal] = useState<number>(0);
  const [crisesResolvedTotal, setCrisesResolvedTotal] = useState<number>(0);
  const [warCardsPlayedCount, setWarCardsPlayedCount] = useState<number>(0);

  // Sync settings update
  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(updated));
  };

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Check and unlock new rulers and achievements
  const checkForUnlocks = useCallback((currentGoldCount: number, survivedSeasonsCount: number) => {
    const newlyUnlocked: string[] = [];
    if (currentGoldCount >= 35 && !unlockedRulers.includes('merchant_queen')) {
      newlyUnlocked.push('merchant_queen');
    }
    if (survivedSeasonsCount >= 5 && !unlockedRulers.includes('regent')) {
      newlyUnlocked.push('regent');
    }
    if ((survivedSeasonsCount >= 8 || renown >= 60) && !unlockedRulers.includes('heretic')) {
      newlyUnlocked.push('heretic');
    }

    if (newlyUnlocked.length > 0) {
      const updated = Array.from(new Set([...unlockedRulers, ...newlyUnlocked]));
      setUnlockedRulers(updated);
      localStorage.setItem(STORAGE_KEY_UNLOCKED, JSON.stringify(updated));
      const rulerNames = newlyUnlocked
        .map((id) => RULERS.find((r) => r.id === id)?.epithet || id)
        .join(', ');
      setUnlockedNewRulerNotification(rulerNames);
    }
  }, [unlockedRulers, renown]);

  const unlockAchievement = (achId: string) => {
    if (!unlockedAchievements.includes(achId)) {
      const next = [...unlockedAchievements, achId];
      setUnlockedAchievements(next);
      localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(next));
    }
  };

  const recordDiscoveredEnding = (endingId: string) => {
    if (!unlockedEndings.includes(endingId)) {
      const next = [...unlockedEndings, endingId];
      setUnlockedEndings(next);
      localStorage.setItem(STORAGE_KEY_ENDINGS, JSON.stringify(next));
    }
  };

  // Deal cards to hand from deck
  const dealHand = useCallback((currentDeck: GameCard[], currentDiscard: GameCard[], handSize = 5) => {
    let pool = [...currentDeck];
    let discard = [...currentDiscard];

    if (pool.length < handSize) {
      pool = [...pool, ...discard].sort(() => Math.random() - 0.5);
      discard = [];
    }

    const newHand = pool.slice(0, handSize);
    const remainingDeck = pool.slice(handSize);

    setHand(newHand);
    setDeck(remainingDeck);
    setDiscardPile(discard);
  }, []);

  // Start Run
  const handleSelectGameMode = (mode: GameMode) => {
    setActiveGameMode(mode);
    setCurrentScreen('ruler_select');
  };

  const startNewRun = (rulerId: string) => {
    sound.startAmbientDrone();
    const ruler = RULERS.find((r) => r.id === rulerId) || RULERS[0];
    setCurrentRuler(ruler);

    // Initial Pillars (0 to 10 scale)
    const basePillars = { ...ruler.startingPillars };
    if (activeGameMode === 'challenge') {
      // Iron Crown: Start with pillars lower
      basePillars.crown = 3.5;
      basePillars.army = 3.5;
      basePillars.church = 3.5;
      basePillars.people = 3.5;
    }
    setPillars(basePillars);
    setGold(ruler.startingGold);

    // Initial Advisors
    const freshAdvisors = INITIAL_ADVISORS.map((a) => {
      const loyaltyBonus = ruler.id === 'regent' ? 2.0 : 0;
      return {
        ...a,
        loyalty: Math.min(10.0, a.loyalty + loyaltyBonus),
        isSecretRevealed: false,
        isImprisoned: false,
      };
    });
    setAdvisors(freshAdvisors);

    // Starting deck
    const startingCards = ruler.startingDeck
      .map((id) => ALL_CARDS[id])
      .filter(Boolean) as GameCard[];

    const shuffled = [...startingCards].sort(() => Math.random() - 0.5);

    // Season 1 Crisis (e.g. The Bread Riot)
    const firstCrisisData = REIGN_CRISES[0];
    const initialCrisis: Crisis = {
      ...firstCrisisData,
      currentResolutionPoints: 0,
      resolved: false,
    };

    setSeasonIndex(0);
    setPlayedCardsThisSeason([]);
    setCardsPlayedTotal(0);
    setCrisesResolvedTotal(0);
    setWarCardsPlayedCount(0);
    setCurrentCrisis(initialCrisis);
    setUnlockedNewRulerNotification(null);

    dealHand(shuffled, [], 5);
    setCurrentScreen('throne_room');
  };

  // Check 0 or 10 Extremes for all 4 Pillars
  const checkPillarExtremes = useCallback((currentPillars: Pillars): { endingId: string; cause: string } | null => {
    // Crown
    if (currentPillars.crown <= 0) {
      return { endingId: 'crown_zero', cause: ENDINGS_CATALOG.crown_zero.epitaph };
    }
    if (currentPillars.crown >= 10) {
      return { endingId: 'crown_ten', cause: ENDINGS_CATALOG.crown_ten.epitaph };
    }
    // Army
    if (currentPillars.army <= 0) {
      return { endingId: 'army_zero', cause: ENDINGS_CATALOG.army_zero.epitaph };
    }
    if (currentPillars.army >= 10) {
      return { endingId: 'army_ten', cause: ENDINGS_CATALOG.army_ten.epitaph };
    }
    // Church
    if (currentPillars.church <= 0) {
      return { endingId: 'church_zero', cause: ENDINGS_CATALOG.church_zero.epitaph };
    }
    if (currentPillars.church >= 10) {
      return { endingId: 'church_ten', cause: ENDINGS_CATALOG.church_ten.epitaph };
    }
    // People
    if (currentPillars.people <= 0) {
      return { endingId: 'people_zero', cause: ENDINGS_CATALOG.people_zero.epitaph };
    }
    if (currentPillars.people >= 10) {
      return { endingId: 'people_ten', cause: ENDINGS_CATALOG.people_ten.epitaph };
    }

    return null;
  }, []);

  // End of Run Handler
  const triggerGameOver = useCallback((outcome: 'victorious' | 'ruined', cause: string, endingId?: string) => {
    setGameOverOutcome(outcome);
    setGameOverCause(cause);

    if (endingId) {
      recordDiscoveredEnding(endingId);
    }

    if (outcome === 'victorious') {
      unlockAchievement('ach_12_seasons');
      if (warCardsPlayedCount === 0) {
        unlockAchievement('ach_no_war');
      }
      if (activeGameMode === 'challenge') {
        unlockAchievement('ach_iron_crown');
      }
      if (activeGameMode === 'dynasty') {
        unlockAchievement('ach_dynasty_heir');
      }
    }

    const renownEarned = (seasonIndex + 1) * 10 + (outcome === 'victorious' ? 60 : 0);
    const newRenown = renown + renownEarned;
    setRenown(newRenown);
    localStorage.setItem(STORAGE_KEY_RENOWN, newRenown.toString());

    // Record Reign in History
    const record: ReignRecord = {
      id: `reign_${Date.now()}`,
      rulerName: `${currentRuler.name} (${currentRuler.epithet})`,
      rulerId: currentRuler.id,
      seasonsSurvived: seasonIndex + (outcome === 'victorious' ? 1 : 0),
      outcome,
      causeOfDeath: cause,
      date: new Date().toLocaleDateString(),
      renownEarned,
      cardsPlayed: cardsPlayedTotal,
      gameMode: activeGameMode,
    };

    const updatedHistory = [record, ...reignHistory].slice(0, 30);
    setReignHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updatedHistory));

    checkForUnlocks(gold, seasonIndex + 1);
    setCurrentScreen('game_over');
  }, [
    seasonIndex, 
    currentRuler, 
    renown, 
    cardsPlayedTotal, 
    activeGameMode, 
    reignHistory, 
    checkForUnlocks, 
    gold, 
    warCardsPlayedCount,
    recordDiscoveredEnding,
    unlockAchievement
  ]);

  // Play a Card
  const handlePlayCard = (card: GameCard) => {
    const isCurse = card.isCurse || card.category === 'curses';
    let effectiveCost = isCurse ? (card.curseDiscardCost ?? 2) : card.cost.gold;

    if (currentRuler.id === 'usurper' && card.category === 'actions' && card.effects.pillars.army) {
      effectiveCost = Math.max(0, effectiveCost - 1);
    }

    if (gold < effectiveCost) return;

    if (card.cost.pillarSacrifice) {
      const sacrificePillar = card.cost.pillarSacrifice.pillar;
      if (pillars[sacrificePillar] <= card.cost.pillarSacrifice.amount) {
        return;
      }
    }

    // Spend gold & receive bonuses
    setGold((prev) => prev - effectiveCost + (card.effects.gold || 0));

    if (gold + (card.effects.gold || 0) >= 40) {
      unlockAchievement('ach_blood_money');
    }

    if (card.id === 'action_declare_war') {
      setWarCardsPlayedCount((prev) => prev + 1);
    }

    // Update Pillars (0 to 10 scale)
    const nextPillars: Pillars = { ...pillars };
    if (card.cost.pillarSacrifice) {
      nextPillars[card.cost.pillarSacrifice.pillar] -= card.cost.pillarSacrifice.amount;
    }

    Object.entries(card.effects.pillars).forEach(([pKey, pVal]) => {
      const key = pKey as PillarType;
      if (pVal !== undefined) {
        nextPillars[key] = Math.min(10, Math.max(0, nextPillars[key] + pVal));
      }
    });
    setPillars(nextPillars);

    // Crisis Progress
    if (currentCrisis && card.effects.crisisProgress) {
      setCurrentCrisis((prev) => {
        if (!prev) return null;
        const newPoints = prev.currentResolutionPoints + (card.effects.crisisProgress || 0);
        return {
          ...prev,
          currentResolutionPoints: newPoints,
          resolved: newPoints >= prev.requiredResolutionPoints,
        };
      });
    }

    // Reveal Secret
    if (card.effects.revealSecret) {
      setAdvisors((prev) => {
        const unrevealed = prev.filter((a) => !a.isSecretRevealed);
        if (unrevealed.length > 0) {
          const target = unrevealed[Math.floor(Math.random() * unrevealed.length)];
          return prev.map((a) => (a.id === target.id ? { ...a, isSecretRevealed: true } : a));
        }
        return prev;
      });
    }

    // Purge Curses if requested
    if (card.effects.purgeCurses) {
      setHand((prev) => prev.filter((c) => !c.isCurse && c.category !== 'curses'));
    }

    // Advisor Loyalty Bonus
    if (card.effects.advisorLoyaltyBonus) {
      const bonus = card.effects.advisorLoyaltyBonus.amount;
      const targetFaction = card.effects.advisorLoyaltyBonus.advisorFaction;
      setAdvisors((prev) =>
        prev.map((a) => {
          if (!targetFaction || a.faction === targetFaction) {
            return {
              ...a,
              loyalty: Math.min(10.0, Math.max(0, a.loyalty + bonus)),
            };
          }
          return a;
        })
      );
    }

    // Discard card
    setHand((prev) => prev.filter((c) => c.id !== card.id));
    setDiscardPile((prev) => [...prev, card]);
    setPlayedCardsThisSeason((prev) => [...prev, card]);
    setCardsPlayedTotal((prev) => prev + 1);

    // Check 0 or 10 Collapse
    const extremeHit = checkPillarExtremes(nextPillars);
    if (extremeHit) {
      triggerGameOver('ruined', extremeHit.cause, extremeHit.endingId);
    }
  };

  // Handle Crisis Choice (Decree)
  const handleMakeCrisisChoice = (choice: CrisisChoice) => {
    if (choice.cost && gold < choice.cost.gold) return;

    if (choice.cost && choice.cost.gold > 0) {
      setGold((prev) => prev - choice.cost!.gold);
    }

    if (choice.effects.gold) {
      setGold((prev) => prev + choice.effects.gold!);
    }

    const nextPillars: Pillars = { ...pillars };
    Object.entries(choice.effects.pillars).forEach(([pKey, pVal]) => {
      const key = pKey as PillarType;
      if (pVal !== undefined) {
        nextPillars[key] = Math.min(10, Math.max(0, nextPillars[key] + pVal));
      }
    });
    setPillars(nextPillars);

    if (currentCrisis && choice.effects.crisisProgress) {
      setCurrentCrisis((prev) => {
        if (!prev) return null;
        const newPoints = prev.currentResolutionPoints + choice.effects.crisisProgress!;
        return {
          ...prev,
          currentResolutionPoints: newPoints,
          resolved: newPoints >= prev.requiredResolutionPoints,
        };
      });
    }

    if (choice.effects.revealSecret) {
      setAdvisors((prev) => prev.map((a) => ({ ...a, isSecretRevealed: true })));
    }

    const extremeHit = checkPillarExtremes(nextPillars);
    if (extremeHit) {
      triggerGameOver('ruined', extremeHit.cause, extremeHit.endingId);
    }
  };

  // Conclude the Season
  const handleConcludeSeason = () => {
    let nextPillars = { ...pillars };

    // Usurper passive: -0.3 Crown decay
    if (currentRuler.id === 'usurper') {
      nextPillars.crown = Math.max(0, nextPillars.crown - 0.3);
    }

    // Check Balance of Fools achievement (4.5 to 5.5 on all 4)
    if (
      nextPillars.crown >= 4.5 && nextPillars.crown <= 5.5 &&
      nextPillars.army >= 4.5 && nextPillars.army <= 5.5 &&
      nextPillars.church >= 4.5 && nextPillars.church <= 5.5 &&
      nextPillars.people >= 4.5 && nextPillars.people <= 5.5
    ) {
      unlockAchievement('ach_balance_of_fools');
    }

    const wasCrisisResolved = currentCrisis && currentCrisis.currentResolutionPoints >= currentCrisis.requiredResolutionPoints;

    if (!wasCrisisResolved && currentCrisis) {
      Object.entries(currentCrisis.defaultFailurePenalty.pillars).forEach(([pKey, pVal]) => {
        const key = pKey as PillarType;
        if (pVal !== undefined) {
          nextPillars[key] = Math.min(10, Math.max(0, nextPillars[key] + pVal));
        }
      });
    } else {
      setCrisesResolvedTotal((prev) => prev + 1);
      if (currentRuler.id === 'regent') {
        nextPillars.crown = Math.min(10, nextPillars.crown + 0.5);
      }
    }

    // Check Advisor Coups (Ambition > Loyalty on non-imprisoned)
    const treacherousAdvisors = advisors.filter((a) => !a.isImprisoned && a.ambition > a.loyalty);
    if (treacherousAdvisors.length >= 3) {
      unlockAchievement('ach_betrayed_all');
    }

    if (treacherousAdvisors.length > 0 && Math.random() < 0.35) {
      const traitor = treacherousAdvisors[Math.floor(Math.random() * treacherousAdvisors.length)];
      const betrayalKey = traitor.id === 'adv_general'
        ? 'betrayal_general'
        : traitor.id === 'adv_bishop'
        ? 'betrayal_bishop'
        : traitor.id === 'adv_spymaster'
        ? 'betrayal_spymaster'
        : traitor.id === 'adv_treasurer'
        ? 'betrayal_treasurer'
        : 'betrayal_tribune';

      const betrayalStory = ENDINGS_CATALOG[betrayalKey] || ENDINGS_CATALOG.betrayal_spymaster;
      triggerGameOver('ruined', betrayalStory.epitaph, betrayalKey);
      return;
    }

    // Check Pillar Extremes
    const extremeHit = checkPillarExtremes(nextPillars);
    if (extremeHit) {
      triggerGameOver('ruined', extremeHit.cause, extremeHit.endingId);
      return;
    }

    // Check Victory on Season 12
    if (seasonIndex >= 11) {
      let victoryEnding = 'victory_immortal';
      if (currentRuler.id === 'merchant_queen' && gold >= 35) {
        victoryEnding = 'victory_gilded';
      } else if (currentRuler.id === 'usurper') {
        victoryEnding = 'victory_iron';
      }
      triggerGameOver('victorious', ENDINGS_CATALOG[victoryEnding].epitaph, victoryEnding);
      return;
    }

    // Seasonal revenue
    let seasonalIncome = 4;
    if (currentRuler.id === 'merchant_queen') seasonalIncome += 4;
    const caspar = advisors.find((a) => a.id === 'adv_treasurer');
    if (caspar && !caspar.isImprisoned && caspar.loyalty >= 5.0) {
      seasonalIncome += 2;
    }
    setGold((prev) => prev + seasonalIncome);

    // Natural Ambition vs Loyalty slight drift
    setAdvisors((prev) =>
      prev.map((a) => {
        if (a.isImprisoned) return a;
        return {
          ...a,
          ambition: Math.min(10, a.ambition + (Math.random() < 0.3 ? 0.3 : 0)),
          loyalty: Math.max(0, a.loyalty - (Math.random() < 0.25 ? 0.2 : 0)),
        };
      })
    );

    // Advance Season
    const nextSeasonIndex = seasonIndex + 1;
    setSeasonIndex(nextSeasonIndex);

    const nextCrisisData = REIGN_CRISES[nextSeasonIndex] || REIGN_CRISES[REIGN_CRISES.length - 1];
    setCurrentCrisis({
      ...nextCrisisData,
      currentResolutionPoints: 0,
      resolved: false,
    });

    setPillars(nextPillars);
    setPlayedCardsThisSeason([]);

    // Open Card Draft
    const shuffledDraft = [...DRAFT_POOL].sort(() => Math.random() - 0.5).slice(0, 3);
    setDraftChoices(shuffledDraft);
    setCurrentScreen('drafting');
  };

  // Draft a card
  const handleSelectDraftCard = (card: GameCard) => {
    const updatedDeck = [...deck, ...hand, ...discardPile, card];
    dealHand(updatedDeck, [], 5);
    setCurrentScreen('throne_room');
  };

  const handleSkipDraft = () => {
    setGold((prev) => prev + 2);
    const updatedDeck = [...deck, ...hand, ...discardPile];
    dealHand(updatedDeck, [], 5);
    setCurrentScreen('throne_room');
  };

  // Advisor Intrigue Actions
  const handleBribeAdvisor = (advisorId: string) => {
    if (gold < 3) return;
    setGold((prev) => prev - 3);
    setAdvisors((prev) =>
      prev.map((a) =>
        a.id === advisorId ? { ...a, loyalty: Math.min(10, a.loyalty + 2.0) } : a
      )
    );
  };

  const handleBestowTitle = (advisorId: string) => {
    if (pillars.crown < 0.5) return;
    setPillars((prev) => ({ ...prev, crown: Math.max(0, prev.crown - 0.5) }));
    setAdvisors((prev) =>
      prev.map((a) =>
        a.id === advisorId
          ? {
              ...a,
              loyalty: Math.min(10, a.loyalty + 2.5),
              ambition: Math.min(10, a.ambition + 1.5),
            }
          : a
      )
    );
  };

  const handleToggleImprison = (advisorId: string) => {
    const target = advisors.find((a) => a.id === advisorId);
    if (!target) return;

    const willImprison = !target.isImprisoned;
    if (willImprison) {
      // Outrage from their faction
      setPillars((prev) => ({
        ...prev,
        [target.faction]: Math.max(0, prev[target.faction] - 1.0),
      }));
    }

    setAdvisors((prev) =>
      prev.map((a) => (a.id === advisorId ? { ...a, isImprisoned: willImprison } : a))
    );
  };

  const handleBanishAdvisor = (advisorId: string) => {
    const target = advisors.find((a) => a.id === advisorId);
    if (!target) return;

    setPillars((prev) => ({
      ...prev,
      [target.faction]: Math.max(0, prev[target.faction] - 1.5),
      crown: Math.max(0, prev.crown - 0.5),
    }));

    const availablePool = ADVISOR_POOL.filter(
      (cand) => !advisors.some((a) => a.id === cand.id)
    );
    const replacement =
      availablePool[Math.floor(Math.random() * availablePool.length)] || {
        ...target,
        id: `adv_${Date.now()}`,
        name: 'Lord Henry the Castellan',
        loyalty: 5.0,
        ambition: 4.5,
        isSecretRevealed: false,
        isImprisoned: false,
      };

    setAdvisors((prev) => prev.map((a) => (a.id === advisorId ? replacement : a)));
  };

  const handleRedrawHand = () => {
    if (activeGameMode === 'challenge') return; // Iron Crown prohibits redraws
    if (gold < 2) return;
    sound.playCardPlay();
    setGold((prev) => prev - 2);
    const combined = [...deck, ...hand, ...discardPile];
    dealHand(combined, [], 5);
  };

  const currentYear = Math.floor(seasonIndex / 4) + 1;
  const seasonNames = ['Spring', 'Summer', 'Autumn', 'Winter'];
  const currentSeasonName = seasonNames[seasonIndex % 4];

  const syncedRulers = RULERS.map((r) => ({
    ...r,
    unlocked: unlockedRulers.includes(r.id),
  }));

  return (
    <div className={`min-h-screen bg-[#0b0c10] text-[#e0d6be] flex flex-col justify-between selection:bg-[#782823] selection:text-[#faebd7] ${
      settings.textSize === 'compact' ? 'text-xs' : settings.textSize === 'scholarly' ? 'text-base' : 'text-sm'
    }`}>
      {/* 1. Title Screen */}
      {currentScreen === 'title' && (
        <TitleScreen
          onStartGame={handleSelectGameMode}
          onOpenChronicle={() => setIsCodexOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenStoreModal={() => setIsStoreOpen(true)}
          renown={renown}
        />
      )}

      {/* 2. Sovereign Selection Screen */}
      {currentScreen === 'ruler_select' && (
        <RulerSelection
          rulers={syncedRulers}
          selectedRulerId={selectedRulerId}
          onSelectRuler={(id) => setSelectedRulerId(id)}
          onConfirmStart={() => startNewRun(selectedRulerId)}
          renown={renown}
        />
      )}

      {/* 3. Throne Room (Main Screen) */}
      {(currentScreen === 'throne_room' || currentScreen === 'drafting') && (
        <div className="flex-1 flex flex-col justify-between relative overflow-hidden">
          {/* Gothic Throne Room Background */}
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-25 filter saturate-60"
            style={{
              backgroundImage: `url('/src/assets/images/throne_chamber_bg_1792595689441.jpg')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c10]/95 via-[#0b0c10]/80 to-[#0b0c10] pointer-events-none" />

          {/* Top Header Navigation */}
          <HeaderNav
            currentRuler={currentRuler}
            gold={gold}
            renown={renown}
            seasonNumber={seasonIndex + 1}
            year={currentYear}
            seasonName={currentSeasonName}
            isMuted={isMuted}
            onToggleSound={handleToggleSound}
            onOpenCourt={() => setIsCourtOpen(true)}
            onOpenCodex={() => setIsCodexOpen(true)}
            onOpenGuide={() => setIsGuideOpen(true)}
            onRestartRun={() => setCurrentScreen('title')}
          />

          {/* Active Mode Banner */}
          {activeGameMode !== 'standard' && (
            <div className="bg-[#18110b] border-b border-[#3a3227] py-1 text-center text-[11px] font-cinzel text-amber-300 flex items-center justify-center gap-2">
              {activeGameMode === 'dynasty' ? (
                <>
                  <GitBranch className="w-3.5 h-3.5 text-purple-400" />
                  <span>Dynasty Mode · Generation {dynastyGeneration} of 3</span>
                </>
              ) : activeGameMode === 'daily' ? (
                <>
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Daily Seeded Reign · Global Score Competition</span>
                </>
              ) : (
                <span>Iron Crown Challenge · No Redraws Permitted</span>
              )}
            </div>
          )}

          {/* Four Kingdom Pillars Bar (0 to 10 Scale) */}
          <PillarsBar
            pillars={pillars}
            previewChanges={hoveredCard ? hoveredCard.effects.pillars : null}
            colorBlindMode={settings.colorBlindMode}
          />

          {/* Main Throne Arena & Crisis Display */}
          <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto p-4 flex flex-col justify-between">
            {currentCrisis && (
              <CrisisView
                crisis={currentCrisis}
                currentGold={gold}
                currentPillars={pillars}
                onMakeChoice={handleMakeCrisisChoice}
                onConcludeSeason={handleConcludeSeason}
                playedCardsThisSeason={playedCardsThisSeason}
              />
            )}

            {/* Hand of Cards at bottom */}
            <div className="w-full my-3">
              <div className="flex items-center justify-between mb-2 px-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-cinzel font-bold uppercase tracking-wider text-[#c5a059]">
                    Royal Decrees in Hand ({hand.length})
                  </span>
                  <span className="text-stone-500 text-xs hidden sm:inline">
                    · Advisors, Actions, Secrets &amp; Curses
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-cinzel text-stone-400">
                    <Layers className="w-3.5 h-3.5 text-stone-500" />
                    <span>Deck: <strong className="text-stone-200">{deck.length}</strong></span>
                    <span className="text-stone-600">/</span>
                    <span>Discard: <strong className="text-stone-200">{discardPile.length}</strong></span>
                  </div>

                  {activeGameMode !== 'challenge' && (
                    <button
                      disabled={gold < 2}
                      onClick={handleRedrawHand}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-cinzel transition-all cursor-pointer ${
                        gold >= 2
                          ? 'bg-[#1e1711] hover:bg-[#2d2218] text-amber-300 border border-[#3a3227]'
                          : 'bg-stone-900/50 text-stone-600 border border-stone-800 cursor-not-allowed'
                      }`}
                      title="Pay 2 Gold to redraw 5 cards"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Redraw (2g)</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Cards Fan / Grid */}
              <div className="flex flex-wrap items-center justify-center gap-3 pb-2 min-h-[19.5rem]">
                {hand.length === 0 ? (
                  <div className="p-8 text-center text-stone-500 font-serif italic border border-dashed border-[#3a3227] rounded-xl w-full max-w-lg">
                    No decrees in hand. Redraw or conclude the season to advance to the next year.
                  </div>
                ) : (
                  hand.map((card) => (
                    <ManuscriptCard
                      key={card.id + Math.random()}
                      card={card}
                      currentGold={gold}
                      currentPillars={pillars}
                      onPlay={handlePlayCard}
                      onHover={setHoveredCard}
                    />
                  ))
                )}
              </div>

              {/* Reign Log Overlay (Last 5 played cards of current season) */}
              <ReignLog
                playedCardsThisSeason={playedCardsThisSeason}
                seasonNumber={seasonIndex + 1}
              />
            </div>
          </main>
        </div>
      )}

      {/* Draft Modal */}
      {currentScreen === 'drafting' && (
        <DraftModal
          draftChoices={draftChoices}
          onSelectCard={handleSelectDraftCard}
          onSkipDraft={handleSkipDraft}
        />
      )}

      {/* Game Over / Epilogue Screen */}
      {currentScreen === 'game_over' && (
        <GameOverModal
          outcome={gameOverOutcome}
          causeOfDeath={gameOverCause}
          seasonsSurvived={seasonIndex + (gameOverOutcome === 'victorious' ? 1 : 0)}
          cardsPlayed={cardsPlayedTotal}
          crisesResolved={crisesResolvedTotal}
          goldEarned={gold}
          renownAwarded={(seasonIndex + 1) * 10 + (gameOverOutcome === 'victorious' ? 60 : 0)}
          unlockedNewRuler={unlockedNewRulerNotification}
          onRestart={() => startNewRun(currentRuler.id)}
          onGoToRulerSelect={() => setCurrentScreen('title')}
        />
      )}

      {/* Living Court Modal */}
      {isCourtOpen && (
        <CourtChamber
          advisors={advisors}
          currentGold={gold}
          currentCrown={pillars.crown}
          onBribe={handleBribeAdvisor}
          onBestowTitle={handleBestowTitle}
          onToggleImprison={handleToggleImprison}
          onBanish={handleBanishAdvisor}
          onClose={() => setIsCourtOpen(false)}
        />
      )}

      {/* Codex & Endings Modal */}
      {isCodexOpen && (
        <CodexModal
          reignHistory={reignHistory}
          renown={renown}
          unlockedEndings={unlockedEndings}
          unlockedAchievements={unlockedAchievements}
          onClose={() => setIsCodexOpen(false)}
        />
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {/* App Store & DLC Showcase Modal */}
      {isStoreOpen && (
        <StoreModal onClose={() => setIsStoreOpen(false)} />
      )}

      {/* Guide / Rules Modal */}
      {isGuideOpen && (
        <GuideModal onClose={() => setIsGuideOpen(false)} />
      )}
    </div>
  );
}
