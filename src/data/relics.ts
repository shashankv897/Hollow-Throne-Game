import { Relic } from '../types/game';

export const ALL_RELICS: Relic[] = [
  {
    id: 'chipped_scepter',
    name: 'The Chipped Iron Scepter',
    symbol: '👑',
    description: 'Forged from the melted blades of defeated dukes. Heavy, unpolished, and terrifying.',
    passiveEffect: 'Crown authority cannot naturally decay below 20 from passive events.',
  },
  {
    id: 'venetian_scale',
    name: 'The Venetian Brass Scale',
    symbol: '⚖️',
    description: 'Weighted precisely by master goldsmiths of the Rialto. It never errs.',
    passiveEffect: 'Gain +3 Gold whenever you resolve a crisis with 5 or more points.',
  },
  {
    id: 'poisoners_signet',
    name: 'The Poisoner\'s Signet Ring',
    symbol: '💍',
    description: 'A hollow cabochon garnet containing two drops of odorless belladonna.',
    passiveEffect: 'Automatically reveals one Courtier\'s hidden secret at the start of Year 2 and Year 3.',
  },
  {
    id: 'saint_fingerbone',
    name: 'Relic of Saint Celestine',
    symbol: '✝️',
    description: 'Preserved in rock crystal and gold leaf. Holy men weep upon touching it.',
    passiveEffect: 'Once per reign, if Church hits 0, miraculous intercession restores it to 25.',
  },
  {
    id: 'mercenary_charter',
    name: 'Black Company Charter',
    symbol: '⚔️',
    description: 'Signed in blood on sheepskin parchment by twelve free captains.',
    passiveEffect: 'Martial cards grant +2 extra crisis progress points.',
  },
];
