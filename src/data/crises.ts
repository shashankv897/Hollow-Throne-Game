import { Crisis } from '../types/game';

export const REIGN_CRISES: Omit<Crisis, 'currentResolutionPoints' | 'resolved'>[] = [
  {
    id: 'crisis_1',
    seasonNumber: 1,
    year: 1,
    seasonName: 'Spring',
    title: 'The Bread Riot',
    manuscriptDropCap: 'B',
    urgency: 'moderate',
    requiredResolutionPoints: 3,
    description: 'Starving crowds gather outside the palace portcullis. Gray mold rotted the spring seed grain, and the city bakers have shuttered their ovens. Ten thousand angry commoners brandish pitchforks and scythes, demanding imperial flour or noble blood.',
    defaultFailurePenalty: {
      pillars: { people: -2.5, crown: -1.2 },
    },
    choices: [
      {
        id: 'c1_choice_1',
        text: 'Open the palace grain reserves and distribute loaves under knightly guard.',
        consequencesSummary: '-3 Gold. +2.0 People, -0.6 Crown.',
        cost: { gold: 3 },
        effects: {
          pillars: { people: 2.0, crown: -0.6 },
          crisisProgress: 2,
        },
      },
      {
        id: 'c1_choice_2',
        text: 'Order the citadel crossbowmen to loose a volley over their heads.',
        consequencesSummary: '+1.4 Army, -2.2 People, +0.6 Crown.',
        cost: { gold: 0 },
        effects: {
          pillars: { army: 1.4, people: -2.2, crown: 0.6 },
          crisisProgress: 2,
        },
      },
    ],
  },
  {
    id: 'crisis_2',
    seasonNumber: 2,
    year: 1,
    seasonName: 'Summer',
    title: 'The Envoy’s Offer',
    manuscriptDropCap: 'E',
    urgency: 'perilous',
    requiredResolutionPoints: 4,
    description: 'A grand embassy arrives from the neighboring Grand Duchy of Valois. Their ambassador offers an imperial dynastic marriage and a treaty of non-aggression, but demands sovereignty over your eastern salt mines and the extradition of exiled dissidents.',
    defaultFailurePenalty: {
      pillars: { crown: -1.8, army: -1.5 },
    },
    choices: [
      {
        id: 'c2_choice_1',
        text: 'Accept the marriage pact and yield the mineral rights.',
        consequencesSummary: '+1.5 Crown, -1.2 People, -0.8 Army.',
        cost: { gold: 0 },
        effects: {
          pillars: { crown: 1.5, people: -1.2, army: -0.8 },
          crisisProgress: 3,
        },
      },
      {
        id: 'c2_choice_2',
        text: 'Publicly humiliate the ambassador and expel their retinue at dusk.',
        consequencesSummary: '+1.8 Army, +1.0 People, -1.5 Crown.',
        cost: { gold: 1 },
        effects: {
          pillars: { army: 1.8, people: 1.0, crown: -1.5 },
          crisisProgress: 3,
        },
      },
    ],
  },
  {
    id: 'crisis_3',
    seasonNumber: 3,
    year: 1,
    seasonName: 'Autumn',
    title: 'The Dying Bishop',
    manuscriptDropCap: 'D',
    urgency: 'perilous',
    requiredResolutionPoints: 4,
    description: 'The ancient Archbishop of Saint Denis lies dying in his carved mahogany bed. Two rival factions circle like wolves: the Papal Nuncio who demands an ultramontane inquisitor, and the domestic monastery abbots who pledge loyalty to your royal crown.',
    defaultFailurePenalty: {
      pillars: { church: -2.4, crown: -1.4 },
    },
    choices: [
      {
        id: 'c3_choice_1',
        text: 'Appoint the Rome-backed candidate and bestow rich abbey tithes.',
        consequencesSummary: '+2.5 Church, -1.4 Crown, -4 Gold.',
        cost: { gold: 4 },
        effects: {
          pillars: { church: 2.5, crown: -1.4 },
          crisisProgress: 3,
        },
      },
      {
        id: 'c3_choice_2',
        text: 'Forcefully install your royal cousin onto the episcopal cathedra.',
        consequencesSummary: '+1.8 Crown, -2.2 Church, +0.8 People.',
        cost: { gold: 1 },
        effects: {
          pillars: { crown: 1.8, church: -2.2, people: 0.8 },
          crisisProgress: 3,
        },
      },
    ],
  },
  {
    id: 'crisis_4',
    seasonNumber: 4,
    year: 1,
    seasonName: 'Winter',
    title: 'The Poisoned Cup',
    manuscriptDropCap: 'P',
    urgency: 'cataclysmic',
    requiredResolutionPoints: 5,
    description: 'During the winter banquet of the Boar’s Head, your royal cupbearer took a sip from the silver goblet and choked to death in agony, foaming black phlegm. The hall erupted into drew steel. One of your closest counselors was clutching an empty vial.',
    defaultFailurePenalty: {
      pillars: { crown: -3.0, army: -1.5 },
    },
    choices: [
      {
        id: 'c4_choice_1',
        text: 'Lock all portcullises and send torturers into every courtier’s solar.',
        consequencesSummary: '+1.6 Crown, -1.2 Church, reveals all advisor secrets.',
        cost: { gold: 2 },
        effects: {
          pillars: { crown: 1.6, church: -1.2 },
          crisisProgress: 3,
          revealSecret: true,
        },
      },
      {
        id: 'c4_choice_2',
        text: 'Quietly frame an expendable border baron and seize his ancestral lands.',
        consequencesSummary: '+6 Gold, +1.2 Crown, -1.4 Army.',
        cost: { gold: 0 },
        effects: {
          gold: 6,
          pillars: { crown: 1.2, army: -1.4 },
          crisisProgress: 3,
        },
      },
    ],
  },
  {
    id: 'crisis_5',
    seasonNumber: 5,
    year: 2,
    seasonName: 'Spring',
    title: 'The Papal Interdict Threat',
    manuscriptDropCap: 'I',
    urgency: 'cataclysmic',
    requiredResolutionPoints: 5,
    description: 'Papal legates bearing bulls wrapped in lead seals arrive from Rome. The Pope threatens to close every cathedral in your realm—no weddings, no baptisms, no burials in holy soil—unless you surrender the ecclesiastical tax revenues.',
    defaultFailurePenalty: {
      pillars: { church: -3.5, people: -1.6 },
    },
    choices: [
      {
        id: 'c5_choice_1',
        text: 'Submit to Rome with gold bullion and kiss the legate’s emerald ring.',
        consequencesSummary: '+2.8 Church, -1.5 Crown, -5 Gold.',
        cost: { gold: 5 },
        effects: {
          pillars: { church: 2.8, crown: -1.5 },
          crisisProgress: 4,
        },
      },
      {
        id: 'c5_choice_2',
        text: 'Denounce foreign clerical taxation and champion royal sovereignty.',
        consequencesSummary: '-2.6 Church, +2.0 Crown, +1.2 People.',
        cost: { gold: 0 },
        effects: {
          pillars: { church: -2.6, crown: 2.0, people: 1.2 },
          crisisProgress: 3,
        },
      },
    ],
  },
  {
    id: 'crisis_6',
    seasonNumber: 6,
    year: 2,
    seasonName: 'Summer',
    title: 'The Blacksmiths’ Strike',
    manuscriptDropCap: 'T',
    urgency: 'perilous',
    requiredResolutionPoints: 5,
    description: 'The Guild of Armorers and Blacksmiths has extinguished their forges. No swords, halberds, or horseshoe nails are being forged. They demand exemption from military impressment and a guaranteed seat on your Privy Council.',
    defaultFailurePenalty: {
      pillars: { army: -2.2, crown: -1.8 },
    },
    choices: [
      {
        id: 'c6_choice_1',
        text: 'Disband the guild by force and hang their masters from the bridge.',
        consequencesSummary: '+1.5 Army, -2.4 People, +0.8 Crown.',
        cost: { gold: 0 },
        effects: {
          pillars: { army: 1.5, people: -2.4, crown: 0.8 },
          crisisProgress: 3,
        },
      },
      {
        id: 'c6_choice_2',
        text: 'Bribe the guild elders with an exclusive royal monopoly on armaments.',
        consequencesSummary: '-4 Gold. +1.6 People, +1.2 Army.',
        cost: { gold: 4 },
        effects: {
          pillars: { people: 1.6, army: 1.2 },
          crisisProgress: 4,
        },
      },
    ],
  },
  {
    id: 'crisis_7',
    seasonNumber: 7,
    year: 2,
    seasonName: 'Autumn',
    title: 'Marcher Lords’ Rebellion',
    manuscriptDropCap: 'M',
    urgency: 'cataclysmic',
    requiredResolutionPoints: 6,
    description: 'The Northern border dukes have formed a treasonous confederacy. Five thousand knights assemble under banners of the Black Boar, refusing to pay royal dues and swearing to crown an exiled cousin.',
    defaultFailurePenalty: {
      pillars: { army: -2.8, crown: -2.5 },
    },
    choices: [
      {
        id: 'c7_choice_1',
        text: 'Lead the royal army in person and crush them on the frozen heath.',
        consequencesSummary: '-1.8 Army, +2.4 Crown, +0.8 Church.',
        cost: { gold: 3 },
        effects: {
          pillars: { army: -1.8, crown: 2.4, church: 0.8 },
          crisisProgress: 4,
        },
      },
      {
        id: 'c7_choice_2',
        text: 'Bribe their mercenary vanguard to switch flags at midnight.',
        consequencesSummary: '-6 Gold. +2.0 Crown, +1.2 Army.',
        cost: { gold: 6 },
        effects: {
          pillars: { crown: 2.0, army: 1.2 },
          crisisProgress: 4,
        },
      },
    ],
  },
  {
    id: 'crisis_8',
    seasonNumber: 8,
    year: 2,
    seasonName: 'Winter',
    title: 'The Crimson Plague',
    manuscriptDropCap: 'C',
    urgency: 'cataclysmic',
    requiredResolutionPoints: 6,
    description: 'A pestilence of bloody coughs has entered the port on grain carracks. Courtiers flee into the hills, leaving dead bodies piling up in gutters. Citizens claim the heavens curse your usurped lineage with divine chastisement.',
    defaultFailurePenalty: {
      pillars: { people: -3.2, army: -1.8 },
    },
    choices: [
      {
        id: 'c8_choice_1',
        text: 'Seal infected districts behind brick barriers and maintain ruthless order.',
        consequencesSummary: '+1.0 Army, -2.6 People, +0.6 Crown.',
        cost: { gold: 1 },
        effects: {
          pillars: { army: 1.0, people: -2.6, crown: 0.6 },
          crisisProgress: 3,
        },
      },
      {
        id: 'c8_choice_2',
        text: 'Empty the royal treasury to hire alchemists and monastic hospitallers.',
        consequencesSummary: '-7 Gold. +2.4 People, +1.8 Church.',
        cost: { gold: 7 },
        effects: {
          pillars: { people: 2.4, church: 1.8 },
          crisisProgress: 4,
        },
      },
    ],
  },
  {
    id: 'crisis_9',
    seasonNumber: 9,
    year: 3,
    seasonName: 'Spring',
    title: 'The Pretender’s Armada',
    manuscriptDropCap: 'N',
    urgency: 'cataclysmic',
    requiredResolutionPoints: 6,
    description: 'Eighty longships carrying Norse mercenaries and exiled loyalists have sailed into the river delta. The claimant to your throne waves the ancient royal standard, promising to restore the old order and execute all collaborators.',
    defaultFailurePenalty: {
      pillars: { army: -3.0, crown: -2.8 },
    },
    choices: [
      {
        id: 'c9_choice_1',
        text: 'Sally out with fire galleys and chain the harbor entrance.',
        consequencesSummary: '-1.6 Army, +2.5 Crown, -0.8 People.',
        cost: { gold: 4 },
        effects: {
          pillars: { army: -1.6, crown: 2.5, people: -0.8 },
          crisisProgress: 4,
        },
      },
      {
        id: 'c9_choice_2',
        text: 'Offer their warlord the title of Grand Constable and half the crown tithe.',
        consequencesSummary: '+2.0 Army, -1.8 Crown, -4 Gold.',
        cost: { gold: 4 },
        effects: {
          pillars: { army: 2.0, crown: -1.8 },
          crisisProgress: 4,
        },
      },
    ],
  },
  {
    id: 'crisis_10',
    seasonNumber: 10,
    year: 3,
    seasonName: 'Summer',
    title: 'The Great Heresy Trials',
    manuscriptDropCap: 'H',
    urgency: 'perilous',
    requiredResolutionPoints: 5,
    description: 'A radical sect calling themselves the Children of Light preaches that all nobility are devils and all property is theft. They have converted whole regiments. The Grand Inquisitor demands fifty pyres in the cathedral square.',
    defaultFailurePenalty: {
      pillars: { church: -2.6, people: -2.0 },
    },
    choices: [
      {
        id: 'c10_choice_1',
        text: 'Hand over the accused heretics for immediate public incineration.',
        consequencesSummary: '+2.4 Church, -1.8 People, -0.8 Crown.',
        cost: { gold: 0 },
        effects: {
          pillars: { church: 2.4, people: -1.8, crown: -0.8 },
          crisisProgress: 4,
        },
      },
      {
        id: 'c10_choice_2',
        text: 'Grant royal sanctuary to their artisans and banish the inquisitors.',
        consequencesSummary: '-2.8 Church, +1.8 People, +1.4 Crown.',
        cost: { gold: 2 },
        effects: {
          pillars: { church: -2.8, people: 1.8, crown: 1.4 },
          crisisProgress: 3,
        },
      },
    ],
  },
  {
    id: 'crisis_11',
    seasonNumber: 11,
    year: 3,
    seasonName: 'Autumn',
    title: 'The Midnight Conspiracy',
    manuscriptDropCap: 'M',
    urgency: 'cataclysmic',
    requiredResolutionPoints: 7,
    description: 'An intercepted letter from your own privy chamber reveals that two members of your inner council have made pacts with foreign kings to open the citadel postern gate at the tolling of the midnight bell.',
    defaultFailurePenalty: {
      pillars: { crown: -4.0, army: -2.5 },
    },
    choices: [
      {
        id: 'c11_choice_1',
        text: 'Ring the iron bell and decapitate suspected councilors without trial.',
        consequencesSummary: '+3.0 Crown, -1.8 Church, -1.6 People.',
        cost: { gold: 3 },
        effects: {
          pillars: { crown: 3.0, church: -1.8, people: -1.6 },
          crisisProgress: 5,
        },
      },
      {
        id: 'c11_choice_2',
        text: 'Outbid the foreign powers with titles and royal estates.',
        consequencesSummary: '-1.6 Crown, +1.8 Army, -6 Gold.',
        cost: { gold: 6 },
        effects: {
          pillars: { crown: -1.6, army: 1.8 },
          crisisProgress: 4,
        },
      },
    ],
  },
  {
    id: 'crisis_12',
    seasonNumber: 12,
    year: 3,
    seasonName: 'Winter',
    title: 'The Dawn of the Dynasty',
    manuscriptDropCap: 'D',
    urgency: 'cataclysmic',
    requiredResolutionPoints: 8,
    description: 'Twelve seasons have come and gone. The realm has weathered war, pestilence, famine, and betrayal. The high nobility, bishops, and representatives of the guilds stand in silence before your throne, awaiting your final proclamation.',
    defaultFailurePenalty: {
      pillars: { crown: -5.0, army: -4.0, church: -4.0, people: -4.0 },
    },
    choices: [
      {
        id: 'c12_choice_1',
        text: 'Crown yourself Emperor of the Realm and decree the Golden Code of Law.',
        consequencesSummary: '+3.0 Crown, +1.0 all other pillars.',
        cost: { gold: 5 },
        effects: {
          pillars: { crown: 3.0, army: 1.0, church: 1.0, people: 1.0 },
          crisisProgress: 6,
        },
      },
      {
        id: 'c12_choice_2',
        text: 'Scatter gold to the commons and open an era of perpetual jubilee.',
        consequencesSummary: '-10 Gold. +3.5 People, +2.0 Church, +1.5 Crown.',
        cost: { gold: 10 },
        effects: {
          pillars: { people: 3.5, church: 2.0, crown: 1.5 },
          crisisProgress: 6,
        },
      },
    ],
  },
];
