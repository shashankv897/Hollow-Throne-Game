import { Achievement } from '../types/game';

export interface EndingStory {
  id: string;
  trigger: string;
  title: string;
  epitaph: string;
  outcome: 'victorious' | 'ruined';
}

export const ENDINGS_CATALOG: Record<string, EndingStory> = {
  // --- PILLAR EXTREMES (0 and 10) ---
  crown_zero: {
    id: 'crown_zero',
    trigger: 'Crown hits 0',
    title: 'The Bankrupt Beggar',
    epitaph: 'The royal treasury was emptied to the dust. The chamberlain stripped your ermine robe, the guards threw open the gates, and you were expelled into the freezing rain as a landless vagabond.',
    outcome: 'ruined',
  },
  crown_ten: {
    id: 'crown_ten',
    trigger: 'Crown hits 10',
    title: 'The Paranoiac Despot',
    epitaph: 'Your lust for absolute dominion terrified the high nobility. Convinced you would soon execute every duke in the realm, three baronial cousins strangled you in your bed with a silk curtain.',
    outcome: 'ruined',
  },
  army_zero: {
    id: 'army_zero',
    trigger: 'Army hits 0',
    title: 'The Pillaged Realm',
    epitaph: 'With no garrison to defend the borders, foreign barbarian hordes poured across the marches like locusts. The capital was sacked in three days, and your hollow crown melted in their campfires.',
    outcome: 'ruined',
  },
  army_ten: {
    id: 'army_ten',
    trigger: 'Army hits 10',
    title: 'The Praetorian Coup',
    epitaph: 'The generals grew mightier than the throne they guarded. Four thousand ironclad legionnaires surrounded the palace at dusk, saluted your High Marshall, and tossed your body into the moat.',
    outcome: 'ruined',
  },
  church_zero: {
    id: 'church_zero',
    trigger: 'Church hits 0',
    title: 'The Apostate’s Pyre',
    epitaph: 'Branded an incorrigible heretic and devil-worshipper by the Holy See. The Inquisition seized you in broad daylight; you burned upon green cedar boughs before ten thousand cheering worshippers.',
    outcome: 'ruined',
  },
  church_ten: {
    id: 'church_ten',
    trigger: 'Church hits 10',
    title: 'The Cloistered Puppet',
    epitaph: 'The Church consumed every organ of the state. You were compelled to take monastic vows, shaved in tonsure, and locked in a silent abbey tower while bishops governed in your sacred name.',
    outcome: 'ruined',
  },
  people_zero: {
    id: 'people_zero',
    trigger: 'People hits 0',
    title: 'The Jacquerie Slaughter',
    epitaph: 'Starvation and cruelty broke the commons. A howling mob of fifty thousand breached the palace walls with battered timbers; your head was hoisted high on a blacksmith’s pitchfork.',
    outcome: 'ruined',
  },
  people_ten: {
    id: 'people_ten',
    trigger: 'People hits 10',
    title: 'The Lazy Anarchy',
    epitaph: 'Lavished with free bread and wine, your subjects refused all taxes and service. When foreign emissaries arrived demanding tribute, the populace cheered the conqueror rather than lift a spear.',
    outcome: 'ruined',
  },

  // --- ADVISOR BETRAYALS ---
  betrayal_general: {
    id: 'betrayal_general',
    trigger: 'Marshall Ambition > Loyalty',
    title: 'The Marshall’s Steel',
    epitaph: 'The High Marshall decided she was tired of bowing to an indecisive sovereign. Her private guard impaled you against the throne backrest.',
    outcome: 'ruined',
  },
  betrayal_bishop: {
    id: 'betrayal_bishop',
    trigger: 'Bishop Ambition > Loyalty',
    title: 'The Poisoned Sacrament',
    epitaph: 'The Archbishop blessed the holy chalice during mass. The communion wine was laced with sweet nightshade; you died kneeling at the altar.',
    outcome: 'ruined',
  },
  betrayal_spymaster: {
    id: 'betrayal_spymaster',
    trigger: 'Spymaster Ambition > Loyalty',
    title: 'Whispers in the Dark',
    epitaph: 'Your Spymaster sold every secret passage in the castle to your bitterest rival. Assailants entered your bedchamber through the royal hearth.',
    outcome: 'ruined',
  },
  betrayal_treasurer: {
    id: 'betrayal_treasurer',
    trigger: 'Treasurer Ambition > Loyalty',
    title: 'The Stolen Treasury',
    epitaph: 'The Lord Treasurer absconded with the entire bullion reserve to Venice. Left unable to pay the watch, your palace was overrun by looters.',
    outcome: 'ruined',
  },
  betrayal_tribune: {
    id: 'betrayal_tribune',
    trigger: 'Tribune Ambition > Loyalty',
    title: 'The Guild Commune',
    epitaph: 'Brother Aldous proclaimed the Free Republic of the Commons. The royal guards abandoned you, joining the workers behind the barricades.',
    outcome: 'ruined',
  },

  // --- CRISIS DISASTERS ---
  crisis_bread_riot: {
    id: 'crisis_bread_riot',
    trigger: 'Failed Bread Riot',
    title: 'Torn asunder by the Hungry',
    epitaph: 'The palace granaries were empty. The starving mob tore down the oak gates and ripped the sovereign limb from limb for a morsel of crust.',
    outcome: 'ruined',
  },
  crisis_poisoned_cup: {
    id: 'crisis_poisoned_cup',
    trigger: 'Failed Poisoned Cup',
    title: 'The Black Vomit',
    epitaph: 'The royal banquet feast became your sepulcher. The cup was laced with powdered hemlock, and no physician could halt the convulsions.',
    outcome: 'ruined',
  },
  crisis_pretender: {
    id: 'crisis_pretender',
    trigger: 'Failed Pretender Armada',
    title: 'The Usurper Deposed',
    epitaph: 'The rightful pretender’s fleet took the river forts. You were beheaded on the wharf before the assembled barons of the realm.',
    outcome: 'ruined',
  },
  crisis_plague: {
    id: 'crisis_plague',
    trigger: 'Failed Crimson Plague',
    title: 'The Blackened Tongue',
    epitaph: 'Even royal blood carries no immunity to the fever. You died alone in your bedchamber, abandoned by terrified courtiers.',
    outcome: 'ruined',
  },

  // --- VICTORIES ---
  victory_immortal: {
    id: 'victory_immortal',
    trigger: 'Survive 12 Seasons',
    title: 'The Immortal Dynasty',
    epitaph: 'Against starvation, plagues, invasions, and court conspiracies, your will reigned supreme for twelve grueling seasons. Your dynasty will endure for centuries.',
    outcome: 'victorious',
  },
  victory_gilded: {
    id: 'victory_gilded',
    trigger: 'Survive 12 Seasons as Merchant Queen with 40+ Gold',
    title: 'The Golden Empire',
    epitaph: 'You bought armies, silenced popes, and purchased every cardinal’s conscience. The realm enters a golden age of limitless maritime wealth.',
    outcome: 'victorious',
  },
  victory_iron: {
    id: 'victory_iron',
    trigger: 'Survive 12 Seasons as Usurper',
    title: 'The Iron Conqueror',
    epitaph: 'Forged in rebellion and sealed in iron, none dare challenge your throne. The neighbouring kingdoms pay eternal tribute in awe and fear.',
    outcome: 'victorious',
  },
};

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: 'ach_12_seasons',
    title: 'Survivor of the Hollow Crown',
    description: 'Survive all 12 seasons of a single reign.',
    unlocked: false,
    icon: '👑',
  },
  {
    id: 'ach_no_war',
    title: 'The Peaceful Sovereign',
    description: 'Rule 12 seasons without playing any border war actions.',
    unlocked: false,
    icon: '🕊️',
  },
  {
    id: 'ach_betrayed_all',
    title: 'Web of Treachery',
    description: 'Have three advisors with Ambition exceeding Loyalty at once.',
    unlocked: false,
    icon: '🗡️',
  },
  {
    id: 'ach_balance_of_fools',
    title: 'The Razor’s Edge',
    description: 'End a season with all four pillars between 4.5 and 5.5.',
    unlocked: false,
    icon: '⚖️',
  },
  {
    id: 'ach_blood_money',
    title: 'Midas of the Dark Court',
    description: 'Amass 40 or more Gold in the royal treasury.',
    unlocked: false,
    icon: '💰',
  },
  {
    id: 'ach_apostate_king',
    title: 'The Defiant Apostate',
    description: 'Survive two consecutive seasons with Church pillar below 2.0.',
    unlocked: false,
    icon: '🕯️',
  },
  {
    id: 'ach_iron_crown',
    title: 'The Iron Will',
    description: 'Win a run on Iron Crown challenge mode.',
    unlocked: false,
    icon: '🛡️',
  },
  {
    id: 'ach_dynasty_heir',
    title: 'Dynasty Ascendant',
    description: 'Successfully pass your crown to an heir in Dynasty Mode.',
    unlocked: false,
    icon: '📜',
  },
];
