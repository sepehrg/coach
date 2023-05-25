import Illustrations from 'assets/images/llustrations/illustrations';
import { t } from 'i18next';

export const levels = [
  { level: '0', title: t('Study Cards.Learn.Apprentice'), icon: Illustrations.Apprentice },
  {
    level: '1',
    title: t('Study Cards.Learn.Professional'),
    icon: Illustrations.Professional,
  },
  { level: '2', title: t('Study Cards.Learn.Master'), icon: Illustrations.Master },
  { level: '3', title: t('Study Cards.Learn.Expert'), icon: Illustrations.Expert },
  { level: '4', title: t('Study Cards.Learn.Favorites'), icon: Illustrations.Favorites },
];
