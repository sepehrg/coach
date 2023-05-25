import { Student } from './Student';
import { LessonSummary } from './LessonSummary';
import { Subject } from 'entities/Subject';

export interface Lesson {
  id: string;
  student: Student;
  subject: Subject;
  summary: LessonSummary[];
  startedAt: Date;
  duration: 15 | 25;
  goal: string;
}

export interface GroupRoomInvite {
  id: string;
  isAccepted: boolean;
  roomAccessToken: string;
  student: Student;
}

export interface CreateLesson {
  subject: string;
  duration: number;
  goal: string;
}

export interface CreateGroupLesson {
  subject: string;
  duration: 15 | 25;
  invitedStudents: string[];
  roomName: string;
}

export interface FinishLessonResponse {
  id: string;
  duration: number;
  sessions: Session[];
  actualDuration: number;
}

export interface Session {
  id: string;
  startedAt: Date;
  finishedAt: Date;
}
