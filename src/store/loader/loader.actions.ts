import { LoaderActionsType, START_ACTION, STOP_ACTION } from './loader.types';

export const startAction = (type: string, ...params: any[]): LoaderActionsType => ({
  type: START_ACTION,
  payload: {
    name: type,
    params,
  },
});

export const stopAction = (payload: string): LoaderActionsType => ({
  type: STOP_ACTION,
  payload,
});
