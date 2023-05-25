import { Student } from 'entities/Student';

export interface Group {
  id: string;
  name: string;
  students: Student[];
}

export interface CreateGroup {
  name: string;
  invitedStudents: string[];
}

export interface EditGroup {
  id: string;
  name?: string;
  students?: string[];
}
