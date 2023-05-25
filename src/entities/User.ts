import { School } from './School';
import { Grade } from './Grade';
import { Subject } from 'entities/Subject';

export enum UserRole {
  Student = 'Student',
  Admin = 'Admin',
  Teacher = 'Teacher',
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: UserRole;
  school: School;
  grade: Grade;
  birthDate: Date;
  subjects: Subject[];
  icon: { data: number[] } | null;
  stars?: number;
  native: boolean;
}
