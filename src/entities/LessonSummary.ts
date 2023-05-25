import { Lesson } from './Lesson';

export interface LessonSummary {
  id: string;
  rate: number;
  description: string;
  lesson: Lesson;
  timeSpent: number;
}

export interface CreateLessonSummaryRequest {
  id: string;
  goalLevel: number;
  focusRating: number;
  description: string;
}
