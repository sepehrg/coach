import { Lesson } from 'entities/Lesson';

export const checkLessonValid = (lessons: Lesson[]): Lesson[] =>
  lessons.filter(
    (lesson: Lesson) => Object.prototype.toString.call(lesson.startedAt) === '[object Date]',
  );

export const validateLessons = (lessons: Lesson[]): Lesson[] =>
  lessons.filter((lesson: Lesson) => lesson.summary.length !== 0 && lesson.startedAt !== null);
