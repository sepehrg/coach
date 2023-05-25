import { RootState } from '../rootReducer';

export const gradesSelector = (state: RootState) => state.grade;
export const possibleGradesSelector = (state: RootState) => state.grade.data;
export const chosenGradeSelector = (state: RootState) => state.grade.chosenGrades;
