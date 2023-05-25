import { User } from './User';
import { Grade } from './Grade';
import { School } from './index';

export interface Student extends User {
  grade: Grade;
  school: School;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface RecentlyActiveStudent {
  firstName: string;
  icon: string;
  lastSeenAt: Date;
}

export interface StudyProgressPayload {
  startDate: string;
  endDate: string;
}
