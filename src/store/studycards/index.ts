import { useDispatch } from 'react-redux';

import { BaseSubject, Subject } from 'entities/Subject';
import { useMemo } from 'react';
import {
  changePage,
  clearSelectedSubject,
  clearSetIndex,
  clearStudyCards,
  copySetRequest,
  createSetRequest,
  createUnsorted,
  deleteSetRequest,
  followSetRequest,
  getAndCopyRequest,
  getDiscoverSetsBySubjectRequest,
  getDiscoverStudyCardSetsRequest,
  getGeneralKnowledgeBySubjectRequest,
  getGeneralKnowledgeSetsRequest,
  getLearningSetOverviewRequest,
  getLibrarySetsBySubjectIdRequest,
  getLibrarySetsBySubjectRequest,
  getLibraryStudyCardSetsRequest,
  getSessionCardsAllRequest,
  getSessionCardsByLevelRequest,
  getSetRequest,
  getUnsortedCardsRequest,
  likeSet,
  linkUnsorted,
  markCorrectRequest,
  markWrongRequest,
  removeFavoriteRequest,
  reportSetRequest,
  saveSetIndex,
  searchTagsRequest,
  selectNewSetSubject,
  selectStudyCardsSubject,
  setFavoriteRequest,
  shareSetRequest,
  unfollowSetRequest,
  unlikeSet,
  updateSetRequest,
  updateTimer,
} from './studycards.actions';
import { StudyCard, UnsortedStudyCard } from 'entities/StudyCard';
import { Grade } from 'entities/Grade';
import { LearningSetOverview, StudyCardSet } from '../../entities/StudyCardSet';

export const useStudycardsActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      dispatchSelectNewSetSubject: (subject: Subject) => {
        dispatch(selectNewSetSubject(subject));
      },
      dispatchSelectStudyCardsSubject: (subject: BaseSubject) => {
        dispatch(selectStudyCardsSubject(subject));
      },
      dispatchGetLibraryStudyCardSets: () => {
        dispatch(getLibraryStudyCardSetsRequest());
      },
      dispatchGetLibrarySetsBySubject: (
        subject: BaseSubject,
        searchTerm?: string,
        page?: number,
        limit?: number,
      ) => {
        dispatch(getLibrarySetsBySubjectRequest({ subject, searchTerm, page, limit }));
      },
      dispatchGetLibrarySetsBySubjectId: (
        subjectId: string,
        searchTerm?: string,
        page?: number,
        limit?: number,
      ) => {
        dispatch(getLibrarySetsBySubjectIdRequest({ subjectId, searchTerm, page, limit }));
      },
      dispatchGetDiscoverStudyCardSets: () => {
        dispatch(getDiscoverStudyCardSetsRequest());
      },
      dispatchGetDiscoverSetsBySubject: (
        subject: BaseSubject,
        searchTerm?: string,
        page?: number,
        limit?: number,
      ) => {
        dispatch(getDiscoverSetsBySubjectRequest({ subject, searchTerm, page, limit }));
      },
      dispatchCreateSet: (set: StudyCardSet, onSuccess: () => void) => {
        dispatch(createSetRequest({ set, onSuccess }));
      },
      dispatchGetSet: (id: string) => {
        dispatch(getSetRequest({ id }));
      },
      dispatchSearchTags: (name: string, subjectId?: string) => {
        dispatch(searchTagsRequest({ name, subjectId }));
      },
      changePage: (newPage: number) => {
        dispatch(changePage(newPage));
      },
      dispatchReportSet: (
        id: string,
        category: string,
        onSuccess: () => void,
        comments?: string,
      ) => {
        dispatch(reportSetRequest({ data: { id, category, comments }, onSuccess }));
      },
      dispatchCopySet: (id: string, studyCards: StudyCard[], onSuccess: () => void) => {
        dispatch(copySetRequest({ data: { id, studyCards }, onSuccess }));
      },
      dispatchDeleteSet: (id: string, onSuccess: () => void) => {
        dispatch(deleteSetRequest({ id, onSuccess }));
      },
      dispatchFollowSet: (id: string, onSuccess: () => void) => {
        dispatch(followSetRequest({ id, onSuccess }));
      },
      dispatchUnfollowSet: (id: string, onSuccess: () => void) => {
        dispatch(unfollowSetRequest({ id, onSuccess }));
      },
      dispatchShareSet: (id: string, onSuccess: () => void) => {
        dispatch(shareSetRequest({ id, onSuccess }));
      },
      dispatchGetLearningSet: (id: string) => {
        dispatch(getLearningSetOverviewRequest({ id }));
      },
      dispatchGetSessionCardsAll: (id: string, onSuccess: () => void, maxCards?: number) => {
        dispatch(getSessionCardsAllRequest({ id, onSuccess, maxCards }));
      },
      dispatchGetSessionCardsByLevel: (
        id: string,
        level: keyof LearningSetOverview,
        onSuccess: () => void,
        maxCards?: number,
      ) => {
        dispatch(getSessionCardsByLevelRequest({ id, level, onSuccess, maxCards }));
      },
      dispatchSetFavorite: (id: string, onSuccess: () => void) => {
        dispatch(setFavoriteRequest({ id, onSuccess }));
      },
      dispatchRemoveFavorite: (id: string, onSuccess: () => void) => {
        dispatch(removeFavoriteRequest({ id, onSuccess }));
      },
      dispatchMarkCorrect: (cardId: string, onSuccess: () => void) => {
        dispatch(markCorrectRequest({ cardId, onSuccess }));
      },
      dispatchMarkWrong: (cardId: string, onSuccess: () => void) => {
        dispatch(markWrongRequest({ cardId, onSuccess }));
      },
      dispatchGetGeneralKnowledgeSets: (grades: Grade[]) => {
        dispatch(getGeneralKnowledgeSetsRequest({ grades }));
      },
      dispatchGetGeneralKnowledgeBySubject: (
        subject: BaseSubject,
        searchTerm?: string,
        page?: number,
        limit?: number,
        grades?: Grade[],
      ) => {
        dispatch(getGeneralKnowledgeBySubjectRequest({ subject, searchTerm, page, limit, grades }));
      },

      dispatchLikeSet: (setId: string, onSuccess: () => void) => {
        dispatch(likeSet({ setId, onSuccess }));
      },
      dispatchUnlikeSet: (setId: string, onSuccess: () => void) => {
        dispatch(unlikeSet({ setId, onSuccess }));
      },
      dispatchUpdateSet: (set: StudyCardSet, onSuccess: () => void) => {
        dispatch(updateSetRequest({ set, onSuccess }));
      },
      dispatchCreateUnsorted: (question: string, answer: string, onSuccess: () => void) => {
        dispatch(createUnsorted({ question, answer, onSuccess }));
      },
      dispatchGetUnsorted: () => {
        dispatch(getUnsortedCardsRequest());
      },
      dispatchLinkUnsorted: (
        setId: string,
        studyCard: UnsortedStudyCard,
        onSuccess: () => void,
      ) => {
        dispatch(linkUnsorted({ setId, studyCard, onSuccess }));
      },
      dispatchSaveSetIndex: (setIndex: number) => {
        dispatch(saveSetIndex({ index: setIndex }));
      },
      dispatchClearStudyCards: () => {
        dispatch(clearStudyCards());
      },
      dispatchClearSetIndex: () => {
        dispatch(clearSetIndex());
      },
      dispatchClearSelectedSubject: () => {
        dispatch(clearSelectedSubject());
      },
      dispatchGetAndCopy: (setId: string, onSuccess: () => void) => {
        dispatch(getAndCopyRequest({ setId, onSuccess }));
      },
      updateTimer: (timer: number) => {
        dispatch(updateTimer({ timer }));
      },
    }),
    [dispatch],
  );
};
