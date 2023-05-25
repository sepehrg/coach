import { RootState } from '../rootReducer';

export const videoSelector = (state: RootState) => state.player.video;
