import { createSelector } from 'reselect';
import { RootState } from 'store/rootReducer';
import { MaterialFrameState } from './material-frame.types';

export const materialFrameSelector = (state: RootState) => state.materialFrame;
export const isUrlBlockedForIFrameSelectorFactory = (url: string) =>
  createSelector(
    materialFrameSelector,
    (state: MaterialFrameState) => state.isUrlBlockedForIFrame[url] as boolean | undefined,
  );
