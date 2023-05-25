import { User } from './User';
import { Subject } from 'entities/Subject';
import { Grade } from 'entities/Grade';

export enum MaterialLearningTypes {
  Video = 'Video',
  Exercise = 'Exercise',
  Interactive = 'Interactive',
  Article = 'Article',
  Other = 'Other',
}

export enum MaterialSourceTypes {
  YOUTUBE = 'Youtube',
  WIKIPEDIA = 'Wikipedia',
  SERLO = 'Serlo',
  KAPIERT = 'Kapiert',
  KHAN = 'Khan Academy',
  SCHLAUKOPF = 'Schlaukopf',
  MATHE = 'Mathe-Trainer',
  ERKLART = 'Gut-Erklärt',
  EASY = 'Easy-Deutsch',
  SOFA = 'Sofa-Tutor',
  LEVRAI = 'Levrai',
  PLANET = 'Planet-Wissen',
}

export interface Material {
  id: string;
  name: string;
  link: string;
  sourceType: MaterialSourceTypes;
  learningType: MaterialLearningTypes;
  subject: Subject;
  feedback: MaterialFeedback[];
  tags: string[];
  classes: Grade[];
  iframe: boolean;
}

export interface SelectedMaterial {
  material: LikedMaterial;
  index: number;
}

export interface LikedMaterial {
  id: string;
  name: string;
  link: string;
  tags: string[];
  sourceType: MaterialSourceTypes;
  learningType: MaterialLearningTypes;
  subject: Subject;
  isLiked?: boolean;
  iframe?: boolean;
  isCustom: boolean;
}

export interface MaterialCategory {
  custom?: MaterialLink[];
  notCustom?: MaterialLink[];
}

export interface MaterialFeedback {
  id: string;
  materialId: string;
  student: User;
  isLiked: boolean;
}

export interface NewLinkRequest {
  subject: string;
  link: string;
  description: string;
}

export interface MaterialTopic {
  id: string;
  topic: string;
}

export interface MaterialResponse {
  materials: MaterialLink[];
  relatedTags?: RelatedTag[];
}

export interface MaterialLink {
  id: string;
  name: string;
  link: string;
  topic: string;
  sourceType: string;
  learningType: MaterialLearningTypes;
  iframe: boolean;
  isCustom: boolean;
  tags: string[];
  isLiked?: boolean;
}

export interface RelatedTag {
  tag: string;
  count: string;
}

export interface MaterialsTopicsPayload {
  tagId: string;
  subjectId: string;
  gradeId: string;
}

export interface MaterialsLinksPayload {
  subjectId: string;
  gradeId: string;
  tagName: string;
  relatedTags?: boolean;
  filterTag?: string;
}

export interface MaterialsHistoryPayload {
  subjectId: string;
  page: number;
  limit: number;
}

export interface MaterialHistory {
  id: string;
  name: string;
  link: string;
  topic: string;
  sourceType: string;
  learningType: MaterialLearningTypes;
  iframe: boolean;
  isCustom: boolean;
  tags: string[];
  date: Date;
}

export interface MaterialHistoryResponse {
  materialHistory: MaterialHistory[];
  page: number;
  total: number;
  pageCount: number;
}
