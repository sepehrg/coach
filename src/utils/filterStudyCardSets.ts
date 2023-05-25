import { StudyCardSet } from '../entities/StudyCardSet';

export const ownedByMeSets = (sets: StudyCardSet[]): StudyCardSet[] =>
  sets.filter((set: StudyCardSet) => set.isOwner === true);
