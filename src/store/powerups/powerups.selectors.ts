import { RootState } from 'store/rootReducer';
import { createSelector } from 'reselect';
import { PowerupsState } from 'store/powerups/powerups.types';

export const powerupSelector = (state: RootState) => state.powerups;
export const powerupSelectedSelector = createSelector(
  powerupSelector,
  (state: PowerupsState) => state.selectedItem,
);
