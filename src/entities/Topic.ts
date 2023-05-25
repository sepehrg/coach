import { Material } from './Material';
import { Grade } from './Grade';
import { Subject } from './Subject';

export interface Topic {
  id: string;
  name: string;
  subject: Subject;
  minGrade: Grade;
  maxGrade: Grade;
  materials: Material[];
}

export interface CreateTopicRequest {
  name: string;
  subject: string;
  minGrade: string;
  maxGrade: string;
  materials: Material[];
}
