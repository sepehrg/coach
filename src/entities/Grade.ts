import { Student } from './Student';

export interface Grade {
  id: string;
  year: number;
  students?: Student;
}
