import { Subject } from 'entities/Subject';

export enum TaskType {
  HOMEWORK = 'Homework',
  EXAM = 'Exam',
  IDO = 'Ido',
  FRIENDS = 'Friends',
  FAMILY = 'Family',
  TIME_FOR_MYSELF = 'TimeForMyself',
}

export interface Task {
  id: string;
  startDate: Date;
  subject: Subject;
  title: string;
  details: string;
  recurringType: string;
  type: TaskType;
}

export interface TaskDto {
  id: string;
  title: string;
  details: string;
  type: TaskType;
  subjectId: string;
  recurringType: string;
  startDate: Date;
  dayOfWeek: number;
  dayOfMonth: number;
}

export type TaskCreateRequest = {
  title: string;
  subjectId: string;
  details: string;
  type: TaskType;
  startDate: Date;
  isFullDayEvent: boolean;
  recurringType: string;
};

export type TaskEditRequest = {
  id: string;
  startDate: Date;
  title?: string;
  details?: string;
  subjectId?: string;
};
