import { BaseSubject, StudyCardsSubject, Subject } from 'entities/Subject';
import {
  CHANGE_PAGE,
  CLEAR_SELECTED_SUBJECT,
  CLEAR_SET_INDEX,
  CLEAR_SIDEBAR_SUBJECT,
  CLEAR_STUDY_CARDS,
  COPY_SET_REQUEST,
  CREATE_SET_REQUEST,
  CREATE_UNSORTED_REQUEST,
  DELETE_SET_REQUEST,
  FOLLOW_SET_REQUEST,
  GET_AND_COPY_REQUEST,
  GET_DISCOVER_SETS_BY_SUBJECT_REQUEST,
  GET_DISCOVER_SETS_BY_SUBJECT_SUCCESS,
  GET_DISCOVER_STUDY_CARD_SETS_REQUEST,
  GET_DISCOVER_STUDY_CARD_SETS_SUCCESS,
  GET_GENERAL_KNOWLEDGE_BY_SUBJECT_REQUEST,
  GET_GENERAL_KNOWLEDGE_BY_SUBJECT_SUCCESS,
  GET_GENERAL_KNOWLEDGE_SETS_REQUEST,
  GET_GENERAL_KNOWLEDGE_SETS_SUCCESS,
  GET_LEARNING_SET_OVERVIEW_REQUEST,
  GET_LEARNING_SET_OVERVIEW_SUCCESS,
  GET_LIBRARY_SETS_BY_SUBJECT_ID_REQUEST,
  GET_LIBRARY_SETS_BY_SUBJECT_REQUEST,
  GET_LIBRARY_SETS_BY_SUBJECT_SUCCESS,
  GET_LIBRARY_STUDY_CARD_SETS_REQUEST,
  GET_LIBRARY_STUDY_CARD_SETS_SUCCESS,
  GET_SESSION_CARDS_ALL_REQUEST,
  GET_SESSION_CARDS_ALL_SUCCESS,
  GET_SESSION_CARDS_BY_LEVEL_REQUEST,
  GET_SESSION_CARDS_BY_LEVEL_SUCCESS,
  GET_SET_REQUEST,
  GET_SET_SUCCESS,
  GET_UNSORTED_CARDS_REQUEST,
  GET_UNSORTED_CARDS_SUCCESS,
  LIKE_SET,
  LINK_UNSORTED,
  MARK_CORRECT_CARD_REQUEST,
  MARK_WRONG_CARD_REQUEST,
  REMOVE_FAVORITE_REQUEST,
  REPORT_SET_REQUEST,
  SAVE_SET_INDEX,
  SEARCH_TAGS_REQUEST,
  SEARCH_TAGS_SUCCESS,
  SELECT_NEW_SET_SUBJECT,
  SELECT_STUDY_CARDS_SUBJECT,
  SET_FAVORITE_REQUEST,
  SHARE_SET_REQUEST,
  StudyCardsActionTypes,
  UNFOLLOW_SET_REQUEST,
  UNLIKE_SET,
  UPDATE_SET_REQUEST,
  UPDATE_TIMER,
} from './studycards.types';
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

export const selectNewSetSubject = (payload: Subject): StudyCardsActionTypes => ({
  type: SELECT_NEW_SET_SUBJECT,
  payload,
});

export const selectStudyCardsSubject = (payload: BaseSubject): StudyCardsActionTypes => ({
  type: SELECT_STUDY_CARDS_SUBJECT,
  payload,
});

export const getLibraryStudyCardSetsRequest = (): StudyCardsActionTypes => ({
  type: GET_LIBRARY_STUDY_CARD_SETS_REQUEST,
});

export const getLibraryStudyCardSetsSuccess = (
  payload: LibraryOverviewSuccessPayload,
): StudyCardsActionTypes => ({
  type: GET_LIBRARY_STUDY_CARD_SETS_SUCCESS,
  payload,
});

export const getLibrarySetsBySubjectRequest = (
  payload: SetsBySubjectRequestPayload,
): StudyCardsActionTypes => ({
  type: GET_LIBRARY_SETS_BY_SUBJECT_REQUEST,
  payload,
});

export const getLibrarySetsBySubjectIdRequest = (
  payload: SetsBySubjectIdRequestPayload,
): StudyCardsActionTypes => ({
  type: GET_LIBRARY_SETS_BY_SUBJECT_ID_REQUEST,
  payload,
});

export const getLibrarySetsBySubjectSuccess = (
  payload: SetsBySubjectSuccessPayload,
): StudyCardsActionTypes => ({
  type: GET_LIBRARY_SETS_BY_SUBJECT_SUCCESS,
  payload,
});

export const createSetRequest = (payload: {
  set: StudyCardSet;
  onSuccess: () => void;
}): StudyCardsActionTypes => ({
  type: CREATE_SET_REQUEST,
  payload,
});

export const updateSetRequest = (payload: {
  set: StudyCardSet;
  onSuccess: () => void;
}): StudyCardsActionTypes => ({
  type: UPDATE_SET_REQUEST,
  payload,
});

export const getSetRequest = (payload: { id: string }): StudyCardsActionTypes => ({
  type: GET_SET_REQUEST,
  payload,
});

export const getSetSuccess = (payload: StudyCardSet): StudyCardsActionTypes => ({
  type: GET_SET_SUCCESS,
  payload,
});

export const searchTagsRequest = (payload: GetTagsRequestPayload): StudyCardsActionTypes => ({
  type: SEARCH_TAGS_REQUEST,
  payload,
});

export const searchTagsSuccess = (payload: Tag[]): StudyCardsActionTypes => ({
  type: SEARCH_TAGS_SUCCESS,
  payload,
});

export const clearSelectedSubject = (): StudyCardsActionTypes => ({
  type: CLEAR_SELECTED_SUBJECT,
});

export const changePage = (payload: number): StudyCardsActionTypes => ({
  type: CHANGE_PAGE,
  payload,
});

export const getDiscoverStudyCardSetsRequest = (): StudyCardsActionTypes => ({
  type: GET_DISCOVER_STUDY_CARD_SETS_REQUEST,
});

export const getDiscoverStudyCardSetsSuccess = (
  payload: StudyCardsSubject[],
): StudyCardsActionTypes => ({
  type: GET_DISCOVER_STUDY_CARD_SETS_SUCCESS,
  payload,
});

export const getDiscoverSetsBySubjectRequest = (
  payload: SetsBySubjectRequestPayload,
): StudyCardsActionTypes => ({
  type: GET_DISCOVER_SETS_BY_SUBJECT_REQUEST,
  payload,
});

export const getDiscoverSetsBySubjectSuccess = (
  payload: SetsBySubjectSuccessPayload,
): StudyCardsActionTypes => ({
  type: GET_DISCOVER_SETS_BY_SUBJECT_SUCCESS,
  payload,
});

export const reportSetRequest = (payload: {
  data: ReportSetPayload;
  onSuccess: () => void;
}): StudyCardsActionTypes => ({
  type: REPORT_SET_REQUEST,
  payload,
});

export const copySetRequest = (payload: {
  data: CopySetPayload;
  onSuccess: () => void;
}): StudyCardsActionTypes => ({
  type: COPY_SET_REQUEST,
  payload,
});

export const deleteSetRequest = (payload: {
  id: string;
  onSuccess: () => void;
}): StudyCardsActionTypes => ({
  type: DELETE_SET_REQUEST,
  payload,
});

export const followSetRequest = (payload: {
  id: string;
  onSuccess: () => void;
}): StudyCardsActionTypes => ({
  type: FOLLOW_SET_REQUEST,
  payload,
});

export const unfollowSetRequest = (payload: {
  id: string;
  onSuccess: () => void;
}): StudyCardsActionTypes => ({
  type: UNFOLLOW_SET_REQUEST,
  payload,
});

export const shareSetRequest = (payload: {
  id: string;
  onSuccess: () => void;
}): StudyCardsActionTypes => ({
  type: SHARE_SET_REQUEST,
  payload,
});

export const clearStudyCards = (): StudyCardsActionTypes => ({
  type: CLEAR_STUDY_CARDS,
});

export const getLearningSetOverviewRequest = (payload: { id: string }): StudyCardsActionTypes => ({
  type: GET_LEARNING_SET_OVERVIEW_REQUEST,
  payload,
});

export const getLearningSetOverviewSuccess = (
  payload: LearningSetOverview,
): StudyCardsActionTypes => ({
  type: GET_LEARNING_SET_OVERVIEW_SUCCESS,
  payload,
});

export const getSessionCardsAllRequest = (payload: {
  id: string;
  onSuccess: () => void;
  maxCards?: number;
}): StudyCardsActionTypes => ({
  type: GET_SESSION_CARDS_ALL_REQUEST,
  payload,
});

export const getSessionCardsAllSuccess = (payload: StudyCard[]): StudyCardsActionTypes => ({
  type: GET_SESSION_CARDS_ALL_SUCCESS,
  payload,
});

export const getSessionCardsByLevelRequest = (payload: {
  id: string;
  level: keyof LearningSetOverview;
  onSuccess: () => void;
  maxCards?: number;
}): StudyCardsActionTypes => ({
  type: GET_SESSION_CARDS_BY_LEVEL_REQUEST,
  payload,
});

export const getSessionCardsByLevelSuccess = (payload: StudyCard[]): StudyCardsActionTypes => ({
  type: GET_SESSION_CARDS_BY_LEVEL_SUCCESS,
  payload,
});

export const setFavoriteRequest = (payload: {
  id: string;
  onSuccess: () => void;
}): StudyCardsActionTypes => ({
  type: SET_FAVORITE_REQUEST,
  payload,
});

export const removeFavoriteRequest = (payload: {
  id: string;
  onSuccess: () => void;
}): StudyCardsActionTypes => ({
  type: REMOVE_FAVORITE_REQUEST,
  payload,
});

export const markCorrectRequest = (payload: {
  cardId: string;
  onSuccess: () => void;
}): StudyCardsActionTypes => ({
  type: MARK_CORRECT_CARD_REQUEST,
  payload,
});

export const markWrongRequest = (payload: {
  cardId: string;
  onSuccess: () => void;
}): StudyCardsActionTypes => ({
  type: MARK_WRONG_CARD_REQUEST,
  payload,
});

export const getGeneralKnowledgeSetsRequest = (payload: {
  grades: Grade[];
}): StudyCardsActionTypes => ({
  type: GET_GENERAL_KNOWLEDGE_SETS_REQUEST,
  payload,
});

export const getGeneralKnowledgeSetsSuccess = (
  payload: StudyCardsSubject[],
): StudyCardsActionTypes => ({
  type: GET_GENERAL_KNOWLEDGE_SETS_SUCCESS,
  payload,
});

export const getGeneralKnowledgeBySubjectRequest = (
  payload: SetsBySubjectRequestPayload,
): StudyCardsActionTypes => ({
  type: GET_GENERAL_KNOWLEDGE_BY_SUBJECT_REQUEST,
  payload,
});

export const getGeneralKnowledgeBySubjectSuccess = (
  payload: SetsBySubjectSuccessPayload,
): StudyCardsActionTypes => ({
  type: GET_GENERAL_KNOWLEDGE_BY_SUBJECT_SUCCESS,
  payload,
});

export const likeSet = (payload: {
  setId: string;
  onSuccess: () => void;
}): StudyCardsActionTypes => ({
  type: LIKE_SET,
  payload,
});

export const unlikeSet = (payload: {
  setId: string;
  onSuccess: () => void;
}): StudyCardsActionTypes => ({
  type: UNLIKE_SET,
  payload,
});

export const createUnsorted = (payload: {
  question: string;
  answer: string;
  onSuccess: () => void;
}): StudyCardsActionTypes => ({
  type: CREATE_UNSORTED_REQUEST,
  payload,
});

export const getUnsortedCardsRequest = (): StudyCardsActionTypes => ({
  type: GET_UNSORTED_CARDS_REQUEST,
});

export const getUnsortedCardsSuccess = (payload: UnsortedStudyCard[]): StudyCardsActionTypes => ({
  type: GET_UNSORTED_CARDS_SUCCESS,
  payload,
});

export const linkUnsorted = (payload: {
  setId: string;
  studyCard: UnsortedStudyCard;
  onSuccess: () => void;
}): StudyCardsActionTypes => ({
  type: LINK_UNSORTED,
  payload,
});

export const saveSetIndex = (payload: { index: number }): StudyCardsActionTypes => ({
  type: SAVE_SET_INDEX,
  payload,
});

export const clearSetIndex = (): StudyCardsActionTypes => ({
  type: CLEAR_SET_INDEX,
});

export const clearSidebarSubjcet = (): StudyCardsActionTypes => ({
  type: CLEAR_SIDEBAR_SUBJECT,
});

export const getAndCopyRequest = (payload: {
  setId: string;
  onSuccess: () => void;
}): StudyCardsActionTypes => ({
  type: GET_AND_COPY_REQUEST,
  payload,
});

export const updateTimer = (payload: { timer: number }): StudyCardsActionTypes => ({
  type: UPDATE_TIMER,
  payload,
});
