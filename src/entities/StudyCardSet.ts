import { StudyCard } from './StudyCard';
import { BaseSubject, StudyCardsSubject } from './Subject';
import { Grade } from './Grade';

export interface StudyCardSet {
  title: string;
  isPrivate: boolean;
  studyCardTags: StudyCardTag[];
  studyCards: StudyCard[] | any;
  subject?: {
    id: string;
    name?: string;
  };
  owner: {
    id: string;
    firstName?: string;
    lastName?: string;
    icon?: string;
  };
  grade?: {
    year?: number;
    id: string;
  };
  id: string;
  isShared?: boolean;
  isFavorite?: boolean;
  isLiked?: boolean;
  isFollowed?: boolean;
  isOwner?: boolean;
  likesCount: number;
}

export interface StudyCardTag {
  id: string;
  name: string;
}

export interface SetsBySubjectRequestPayload {
  subject: BaseSubject;
  searchTerm?: string;
  page?: number;
  limit?: number;
  grades?: Grade[];
}

export interface SetsBySubjectIdRequestPayload {
  subjectId: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
  grades?: Grade[];
}

export interface SetsBySubjectSuccessPayload {
  pageCount: number;
  total: number;
  count: number;
  data: StudyCardSet[];
  page: number;
}

export interface GetTagsRequestPayload {
  name: string;
  subjectId?: string;
}

export interface LearningSetOverview {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  progress: number;
  isOwner: boolean;
}

export interface LibraryOverviewSuccessPayload {
  subjectCount: StudyCardsSubject[];
  unsortedCount: number;
}
