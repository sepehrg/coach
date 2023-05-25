import HttpService from './http.service';
import { CreateLessonSummaryRequest } from 'entities/LessonSummary';

class StudentApi extends HttpService {
  STUDENT_API = 'student';

  createLesson = (lesson: { duration: number; subject: string }) => {
    return this.post(`${this.STUDENT_API}/lessons`, { ...lesson });
  };

  createSummary = (summary: CreateLessonSummaryRequest) => {
    return this.post(`${this.STUDENT_API}/lessons/${summary.id}/summary`, {
      goalLevel: summary.goalLevel,
      focusRating: summary.focusRating,
      description: summary.description,
    });
  };

  getStudentLessonsByDay = (studentId: string, date: Date) => {
    return this.get(`${this.STUDENT_API}/${studentId}/lessons`, { date });
  };

  getLessons = () => {
    return this.get(`${this.STUDENT_API}/lessons`);
  };

  getLessonById = (lessonId: string) => {
    return this.get(`${this.STUDENT_API}/lessons/${lessonId}`);
  };

  getLessonsByDay = (today: string, tomorrow: string) => {
    return this.get(
      `${this.STUDENT_API}/lessons?s={"startedAt":{"$between":["${today}", "${tomorrow}"]}}`,
    );
  };

  deleteLesson = (lessonId: string) => {
    return this.delete(`${this.STUDENT_API}/lessons/${lessonId}`);
  };

  startLesson = (lessonId: string) => {
    return this.post(`${this.STUDENT_API}/lessons/${lessonId}/timer`);
  };

  finishLesson = (lessonId: string) => {
    return this.delete(`${this.STUDENT_API}/lessons/${lessonId}/timer`);
  };

  getSessionTime = () => {
    return this.get(`${this.STUDENT_API}/lessons/default-session-duration`);
  };
}

export default new StudentApi({});
