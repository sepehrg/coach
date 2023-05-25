import { RootState } from '../rootReducer';

export const loaderSelector = (state: RootState) => state.loader;
export const loadingActionSelector = (state: RootState) => (actionsToCheck: string[]) =>
  state.loader.actions.some((action) => actionsToCheck.includes(action.name));
