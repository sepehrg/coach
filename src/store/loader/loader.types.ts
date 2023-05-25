export const START_ACTION = 'LOADER_START_ACTION';
export const STOP_ACTION = 'LOADER_STOP_ACTION';

export type LoadingActionType = {
  name: string;
  params: any;
};

export interface LoaderState {
  actions: LoadingActionType[];
}

export interface StartAction {
  type: typeof START_ACTION;
  payload: LoadingActionType;
}

export interface StopAction {
  type: typeof STOP_ACTION;
  payload: string;
}

export type LoaderActionsType = StartAction | StopAction;
