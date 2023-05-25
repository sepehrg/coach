import { RootState } from 'store/rootReducer';

export const tasksSelector = (state: RootState) => state.tasks;
export const upcomingExamsSelector = (state: RootState) => state.tasks.upcomimgExams;
