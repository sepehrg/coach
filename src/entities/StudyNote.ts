export interface StudyNote {
  id: string;
  title: string;
  body: string;
  date: Date;
  isFavorite: boolean;
}

export interface CreateStudyNotePayload {
  title?: string;
  body?: string;
  date: string;
  subjectId: string;
  onSuccess: (studyNote: StudyNote) => void;
}

export interface UpdateStudyNotePayload {
  id: string;
  title?: string;
  body?: string;
  isFavorite?: boolean;
}

export interface GetStudyNotePayload {
  date: string;
  subjectId: string;
  onSuccess: (studyNote: StudyNote[]) => void;
}

export interface GetStudyNoteOverviewPayload {
  startDate: string;
  endDate: string;
  subjectId?: string;
}
