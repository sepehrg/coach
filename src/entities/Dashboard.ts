export interface StudyProgressResponse {
  progress: number | null;
  minutesStudied: number | null;
  stats: StudyProgressDay[];
  stars: number;
}

export interface StudyProgressDay {
  date: Date;
  day: string;
  duration: number;
  subjectDuration: StudyProgressSubject[];
}

export interface StudyProgressSubject {
  subject: string;
  duration: number;
  color: string;
}
