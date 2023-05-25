import { Material } from 'entities/Material';
import { Student } from 'entities/Student';

export interface Subject {
  id: string;
  name: string;
  materials?: Material[];
  icon: string;
  color: string;
  students: Student[];
  native: boolean;
  nonnative: boolean;
}

export interface BaseSubject {
  id: string;
  name: string;
  icon: string;
}

export interface StudyCardsSubject extends BaseSubject {
  count: number;
}

export interface CreateSubjectRequest {
  name: string;
}
