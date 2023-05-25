import { RootState } from '../rootReducer';

export const studyNoteSelector = (state: RootState) => state.studyNotes.studyNote;
export const favoriteStudyNotesSelector = (state: RootState) => state.studyNotes.favoriteStudyNotes;
export const overviewStudyNotesSelector = (state: RootState) => state.studyNotes.overviewStudyNotes;
