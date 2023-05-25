import HttpService from './http.service';
import {
  CreateStudyNotePayload,
  GetStudyNoteOverviewPayload,
  GetStudyNotePayload,
  StudyNote,
  UpdateStudyNotePayload,
} from 'entities/StudyNote';

class StudyNotesApi extends HttpService {
  STUDY_NOTES_API = 'study-note';

  getStudyNote = (payload: GetStudyNotePayload): Promise<StudyNote[]> => {
    return this.get(
      `${this.STUDY_NOTES_API}?filter=date||$eq||${payload.date}
        &filter=subject.id||$eq||${payload.subjectId}&sort=date,DESC`,
    );
  };

  getStudyNoteOverview = (payload: GetStudyNoteOverviewPayload): Promise<StudyNote[]> => {
    return this.get(
      `${this.STUDY_NOTES_API}?filter=date||$gte||${payload.startDate}
      &filter=date||$lt||${payload.endDate}${
        payload.subjectId ? `&filter=subject.id||$eq||${payload.subjectId}` : ''
      }&sort=date,DESC`,
    );
  };

  getFavoriteStudyNotes = (): Promise<StudyNote[]> => {
    return this.get(`${this.STUDY_NOTES_API}?filter=isFavorite||$eq||true&sort=date,DESC`);
  };

  create = (studyNote: CreateStudyNotePayload): Promise<StudyNote> => {
    return this.post(this.STUDY_NOTES_API, studyNote);
  };

  update = (studyNote: UpdateStudyNotePayload): Promise<StudyNote> => {
    return this.patch(`${this.STUDY_NOTES_API}/${studyNote.id}`, studyNote);
  };
}

export default new StudyNotesApi({});
