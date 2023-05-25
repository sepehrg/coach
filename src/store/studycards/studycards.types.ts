import { BaseSubject, StudyCardsSubject, Subject } from 'entities/Subject';
import {
  GetTagsRequestPayload,
  LearningSetOverview,
  LibraryOverviewSuccessPayload,
  SetsBySubjectIdRequestPayload,
  SetsBySubjectRequestPayload,
  SetsBySubjectSuccessPayload,
  StudyCardSet,
} from 'entities/StudyCardSet';
import { Tag } from 'entities/Tag';
import { CopySetPayload, ReportSetPayload, StudyCard, UnsortedStudyCard } from 'entities/StudyCard';
import { Grade } from 'entities/Grade';

export const SELECT_NEW_SET_SUBJECT = 'SELECT_SUBJECT';
export const SELECT_STUDY_CARDS_SUBJECT = 'SELECT_LIBRARY_SUBJECT';
export const CLEAR_SELECTED_SUBJECT = 'CLEAR_SELECTED_SUBJECT';
export const GET_LIBRARY_STUDY_CARD_SETS_REQUEST = 'GET_LIBRARY_STUDY_CARD_SETS_REQUEST';
export const GET_LIBRARY_STUDY_CARD_SETS_SUCCESS = 'GET_LIBRARY_STUDY_CARD_SETS_SUCCESS';
export const GET_LIBRARY_SETS_BY_SUBJECT_REQUEST = 'GET_LIBRARY_SETS_BY_SUBJECT_REQUEST';
export const GET_LIBRARY_SETS_BY_SUBJECT_SUCCESS = 'GET_LIBRARY_SETS_BY_SUBJECT_SUCCESS';
export const GET_LIBRARY_SETS_BY_SUBJECT_ID_REQUEST = 'GET_LIBRARY_SETS_BY_SUBJECT_ID_REQUEST';
export const GET_LIBRARY_SETS_BY_SUBJECT_ID_SUCCESS = 'GET_LIBRARY_SETS_BY_SUBJECT_ID_SUCCESS';
export const CREATE_SET_REQUEST = 'CREATE_SET_REQUEST';
export const UPDATE_SET_REQUEST = 'UPDATE_SET_REQUEST';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const SEARCH_TAGS_REQUEST = 'SEARCH_TAGS_REQUEST';
export const SEARCH_TAGS_SUCCESS = 'SEARCH_TAGS_SUCCESS';
export const GET_DISCOVER_STUDY_CARD_SETS_REQUEST = 'GET_DISCOVER_STUDY_CARD_SETS_REQUEST';
export const GET_DISCOVER_STUDY_CARD_SETS_SUCCESS = 'GET_DISCOVER_STUDY_CARD_SETS_SUCCESS';
export const GET_DISCOVER_SETS_BY_SUBJECT_REQUEST = 'GET_DISCOVER_SETS_BY_SUBJECT_REQUEST';
export const GET_DISCOVER_SETS_BY_SUBJECT_SUCCESS = 'GET_DISCOVER_SETS_BY_SUBJECT_SUCCESS';
export const GET_SET_REQUEST = 'GET_SET_REQUEST';
export const GET_SET_SUCCESS = 'GET_SET_SUCCESS';
export const REPORT_SET_REQUEST = 'REPORT_SET_REQUEST';
export const COPY_SET_REQUEST = 'COPY_SET_REQUEST';
export const FOLLOW_SET_REQUEST = 'FOLLOW_SET_REQUEST';
export const UNFOLLOW_SET_REQUEST = 'UNFOLLOW_SET_REQUEST';
export const SHARE_SET_REQUEST = 'SHARE_SET_REQUEST';
export const DELETE_SET_REQUEST = 'DELETE_SET_REQUEST';
export const CLEAR_STUDY_CARDS = 'CLEAR_STUDY_CARDS';
export const GET_LEARNING_SET_OVERVIEW_REQUEST = 'GET_LEARNING_SET_OVERVIEW_REQUEST';
export const GET_LEARNING_SET_OVERVIEW_SUCCESS = 'GET_LEARNING_SET_OVERVIEW_SUCCESS';
export const GET_SESSION_CARDS_ALL_REQUEST = 'GET_SESSION_CARDS_ALL_REQUEST';
export const GET_SESSION_CARDS_ALL_SUCCESS = 'GET_SESSION_CARDS_ALL_SUCCESS';
export const GET_SESSION_CARDS_BY_LEVEL_REQUEST = 'GET_SESSION_CARDS_BY_LEVEL_REQUEST';
export const GET_SESSION_CARDS_BY_LEVEL_SUCCESS = 'GET_SESSION_CARDS_BY_LEVEL_SUCCESS';
export const SET_FAVORITE_REQUEST = 'SET_FAVORITE_SUCCESS';
export const REMOVE_FAVORITE_REQUEST = 'REMOVE_FAVORITE_SUCCESS';
export const MARK_CORRECT_CARD_REQUEST = 'MARK_CORRECT_CARD_REQUEST';
export const MARK_WRONG_CARD_REQUEST = 'MARK_WRONG_CARD_REQUEST';
export const GET_GENERAL_KNOWLEDGE_SETS_REQUEST = 'GET_GENERAL_KNOWLEDGE_SETS_REQUEST';
export const GET_GENERAL_KNOWLEDGE_SETS_SUCCESS = 'GET_GENERAL_KNOWLEDGE_SETS_SUCCESS';
export const GET_GENERAL_KNOWLEDGE_BY_SUBJECT_REQUEST = 'GET_GENERAL_KNOWLEDGE_BY_SUBJECT_REQUEST';
export const GET_GENERAL_KNOWLEDGE_BY_SUBJECT_SUCCESS = 'GET_GENERAL_KNOWLEDGE_BY_SUBJECT_SUCCESS';
export const LIKE_SET = 'LIKE_SET';
export const UNLIKE_SET = 'UNLIKE_SET';
export const CREATE_UNSORTED_REQUEST = 'CREATE_UNSORTED_REQUEST';
export const GET_UNSORTED_CARDS_REQUEST = 'GET_UNSORTED_CARDS_REQUEST';
export const GET_UNSORTED_CARDS_SUCCESS = 'GET_UNSORTED_CARDS_SUCCESS';
export const LINK_UNSORTED = 'LINK_UNSORTED';
export const SAVE_SET_INDEX = 'SAVE_SET_INDEX';
export const CLEAR_SET_INDEX = 'CLEAR_SET_INDEX';
export const CLEAR_SIDEBAR_SUBJECT = 'CLEAR_SIDEBAR_SUBJECT';
export const GET_AND_COPY_REQUEST = 'GET_AND_COPY_REQUEST';
export const UPDATE_TIMER = 'UPDATE_TIMER';

export interface StudyCardsState {
  newSetSubject: Subject | null;
  selectedSubject: BaseSubject | null;
  sets: StudyCardSet[] | null;
  setsSubjects: StudyCardsSubject[] | null;
  unsortedCount: number;
  unsortedCards: UnsortedStudyCard[] | null;
  tags: Tag[] | undefined;
  page: number;
  total: number;
  pageCount: number;
  setData: StudyCardSet | null;
  learningSetOverview: LearningSetOverview | null;
  sessionData: StudyCard[] | null;
  setIndex: number | null;
  timer: number;
}

export interface SelectNewSetSubject {
  type: typeof SELECT_NEW_SET_SUBJECT;
  payload: Subject;
}

export interface SelectStudyCardsSubject {
  type: typeof SELECT_STUDY_CARDS_SUBJECT;
  payload: BaseSubject;
}

export interface GetLibraryStudyCardSetsRequest {
  type: typeof GET_LIBRARY_STUDY_CARD_SETS_REQUEST;
}

export interface GetLibraryStudyCardSetsSuccess {
  type: typeof GET_LIBRARY_STUDY_CARD_SETS_SUCCESS;
  payload: LibraryOverviewSuccessPayload;
}

export interface GetLibrarySetsBySubjectRequest {
  type: typeof GET_LIBRARY_SETS_BY_SUBJECT_REQUEST;
  payload: SetsBySubjectRequestPayload;
}

export interface GetLibrarySetsBySubjectIdRequest {
  type: typeof GET_LIBRARY_SETS_BY_SUBJECT_ID_REQUEST;
  payload: SetsBySubjectIdRequestPayload;
}

export interface GetLibrarySetsBySubjectSuccess {
  type: typeof GET_LIBRARY_SETS_BY_SUBJECT_SUCCESS;
  payload: SetsBySubjectSuccessPayload;
}

export interface CreateSetRequest {
  type: typeof CREATE_SET_REQUEST;
  payload: { set: StudyCardSet; onSuccess: () => void };
}

export interface UpdateSetRequest {
  type: typeof UPDATE_SET_REQUEST;
  payload: { set: StudyCardSet; onSuccess: () => void };
}

export interface GetSetRequest {
  type: typeof GET_SET_REQUEST;
  payload: { id: string };
}

export interface GetSetSuccess {
  type: typeof GET_SET_SUCCESS;
  payload: StudyCardSet;
}

export interface SearchTagsRequest {
  type: typeof SEARCH_TAGS_REQUEST;
  payload: GetTagsRequestPayload;
}

export interface SearchTagsSuccess {
  type: typeof SEARCH_TAGS_SUCCESS;
  payload: Tag[];
}

export interface ClearSelectedSubject {
  type: typeof CLEAR_SELECTED_SUBJECT;
}

export interface ClearStudyCards {
  type: typeof CLEAR_STUDY_CARDS;
}

export interface ChangePage {
  type: typeof CHANGE_PAGE;
  payload: number;
}

export interface GetDiscoverStudyCardSetsRequest {
  type: typeof GET_DISCOVER_STUDY_CARD_SETS_REQUEST;
}

export interface GetDiscoverStudyCardSetsSuccess {
  type: typeof GET_DISCOVER_STUDY_CARD_SETS_SUCCESS;
  payload: StudyCardsSubject[];
}

export interface GetDiscoverSetsBySubjectRequest {
  type: typeof GET_DISCOVER_SETS_BY_SUBJECT_REQUEST;
  payload: SetsBySubjectRequestPayload;
}

export interface GetDiscoverSetsBySubjectSuccess {
  type: typeof GET_DISCOVER_SETS_BY_SUBJECT_SUCCESS;
  payload: SetsBySubjectSuccessPayload;
}

export interface ReportSetRequest {
  type: typeof REPORT_SET_REQUEST;
  payload: { data: ReportSetPayload; onSuccess: () => void };
}

export interface CopyRequest {
  type: typeof COPY_SET_REQUEST;
  payload: { data: CopySetPayload; onSuccess: () => void };
}

export interface FollowSetRequest {
  type: typeof FOLLOW_SET_REQUEST;
  payload: { id: string; onSuccess: () => void };
}

export interface UnfollowSetRequest {
  type: typeof UNFOLLOW_SET_REQUEST;
  payload: { id: string; onSuccess: () => void };
}

export interface ShareSetRequest {
  type: typeof SHARE_SET_REQUEST;
  payload: { id: string; onSuccess: () => void };
}

export interface DeleteSetRequest {
  type: typeof DELETE_SET_REQUEST;
  payload: { id: string; onSuccess: () => void };
}

export interface GetLearningSetOverviewRequest {
  type: typeof GET_LEARNING_SET_OVERVIEW_REQUEST;
  payload: { id: string };
}

export interface GetLearningSetOverviewSuccess {
  type: typeof GET_LEARNING_SET_OVERVIEW_SUCCESS;
  payload: LearningSetOverview;
}

export interface GetSessionCardsAllRequest {
  type: typeof GET_SESSION_CARDS_ALL_REQUEST;
  payload: { id: string; onSuccess: () => void; maxCards?: number };
}

export interface GetSessionCardsAllSuccess {
  type: typeof GET_SESSION_CARDS_ALL_SUCCESS;
  payload: StudyCard[];
}

export interface GetSessionCardsByLevelRequest {
  type: typeof GET_SESSION_CARDS_BY_LEVEL_REQUEST;
  payload: {
    id: string;
    level: keyof LearningSetOverview;
    maxCards?: number;
    onSuccess: () => void;
  };
}

export interface GetSessionCardsByLevelSuccess {
  type: typeof GET_SESSION_CARDS_BY_LEVEL_SUCCESS;
  payload: StudyCard[];
}

export interface SetFavoriteRequest {
  type: typeof SET_FAVORITE_REQUEST;
  payload: { id: string; onSuccess: () => void };
}

export interface RemoveFavoriteRequest {
  type: typeof REMOVE_FAVORITE_REQUEST;
  payload: { id: string; onSuccess: () => void };
}

export interface MarkCorrectCardRequest {
  type: typeof MARK_CORRECT_CARD_REQUEST;
  payload: { cardId: string; onSuccess: () => void };
}

export interface MarkWrongCardRequest {
  type: typeof MARK_WRONG_CARD_REQUEST;
  payload: { cardId: string; onSuccess: () => void };
}

export interface GetGeneralKnowledgeSetsRequest {
  type: typeof GET_GENERAL_KNOWLEDGE_SETS_REQUEST;
  payload: { grades: Grade[] };
}

export interface GetGeneralKnowledgeSetsSuccess {
  type: typeof GET_GENERAL_KNOWLEDGE_SETS_SUCCESS;
  payload: StudyCardsSubject[];
}

export interface GetGeneralKnowledgeBySubjectRequest {
  type: typeof GET_GENERAL_KNOWLEDGE_BY_SUBJECT_REQUEST;
  payload: SetsBySubjectRequestPayload;
}

export interface GetGeneralKnowledgeBySubjectSuccess {
  type: typeof GET_GENERAL_KNOWLEDGE_BY_SUBJECT_SUCCESS;
  payload: SetsBySubjectSuccessPayload;
}

export interface LikeSet {
  type: typeof LIKE_SET;
  payload: { setId: string; onSuccess: () => void };
}

export interface UnlikeSet {
  type: typeof UNLIKE_SET;
  payload: { setId: string; onSuccess: () => void };
}

export interface CreateUnsorted {
  type: typeof CREATE_UNSORTED_REQUEST;
  payload: { question: string; answer: string; onSuccess: () => void };
}

export interface GetUnsortedCardsRequest {
  type: typeof GET_UNSORTED_CARDS_REQUEST;
}

export interface GetUnsortedCardsSuccess {
  type: typeof GET_UNSORTED_CARDS_SUCCESS;
  payload: UnsortedStudyCard[];
}

export interface LinkUnsorted {
  type: typeof LINK_UNSORTED;
  payload: { setId: string; studyCard: UnsortedStudyCard; onSuccess: () => void };
}

export interface SaveSetIndex {
  type: typeof SAVE_SET_INDEX;
  payload: { index: number };
}

export interface ClearSetIndex {
  type: typeof CLEAR_SET_INDEX;
}

export interface ClearSidebarSubject {
  type: typeof CLEAR_SIDEBAR_SUBJECT;
}

export interface GetAndCopyRequest {
  type: typeof GET_AND_COPY_REQUEST;
  payload: { setId: string; onSuccess: () => void };
}

export interface UpdateTimer {
  type: typeof UPDATE_TIMER;
  payload: { timer: number };
}

export type StudyCardsActionTypes =
  | SelectNewSetSubject
  | ClearSelectedSubject
  | GetLibraryStudyCardSetsRequest
  | GetLibraryStudyCardSetsSuccess
  | GetLibrarySetsBySubjectRequest
  | GetLibrarySetsBySubjectSuccess
  | GetLibrarySetsBySubjectIdRequest
  | SelectStudyCardsSubject
  | SearchTagsRequest
  | SearchTagsSuccess
  | CreateSetRequest
  | GetDiscoverStudyCardSetsRequest
  | GetDiscoverStudyCardSetsSuccess
  | GetDiscoverSetsBySubjectRequest
  | GetDiscoverSetsBySubjectSuccess
  | ChangePage
  | GetSetRequest
  | GetSetSuccess
  | ReportSetRequest
  | CopyRequest
  | ClearStudyCards
  | DeleteSetRequest
  | FollowSetRequest
  | UnfollowSetRequest
  | ShareSetRequest
  | GetLearningSetOverviewRequest
  | GetLearningSetOverviewSuccess
  | GetSessionCardsAllRequest
  | GetSessionCardsAllSuccess
  | GetSessionCardsByLevelRequest
  | GetSessionCardsByLevelSuccess
  | SetFavoriteRequest
  | RemoveFavoriteRequest
  | MarkCorrectCardRequest
  | MarkWrongCardRequest
  | GetGeneralKnowledgeSetsRequest
  | GetGeneralKnowledgeSetsSuccess
  | GetGeneralKnowledgeBySubjectRequest
  | GetGeneralKnowledgeBySubjectSuccess
  | LikeSet
  | UnlikeSet
  | UpdateSetRequest
  | CreateUnsorted
  | GetUnsortedCardsRequest
  | GetUnsortedCardsSuccess
  | LinkUnsorted
  | SaveSetIndex
  | ClearSetIndex
  | ClearSidebarSubject
  | GetAndCopyRequest
  | UpdateTimer;
