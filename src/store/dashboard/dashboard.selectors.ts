import { RootState } from '../rootReducer';

export const classmatesSelector = (state: RootState) => state.dashboard.classmates;
export const progressSelector = (state: RootState) => state.dashboard.progress;
export const mintuesStudiedSelector = (state: RootState) => state.dashboard.mintuesStudied;
export const dashboardStatisticsSelector = (state: RootState) => state.dashboard.statistics;
export const dashboardStarsSelector = (state: RootState) => state.dashboard.stars;
