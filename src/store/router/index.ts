import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import {
  goBack,
  navigateToChooseTimer,
  navigateToCreateGroup,
  navigateToFocusTime,
  navigateToGeneralKnowledge,
  navigateToInformTeacher,
  navigateToLearningSet,
  navigateToLogin,
  navigateToRegister,
  navigateToRegisterAdditional,
  navigateToStartLearning,
  navigateToStudyCards,
  navigateToStudyCardsCreate,
  navigateToStudyCardsDiscover,
  navigateToStudyCardsEditSet,
  navigateToStudyCardsLibrarySet,
  navigateToStudyCardsSession,
  navigateToStudyCardsSet,
  navigateToStudyDiary,
  navigateToSubjectTopics,
  navigateToSummary,
} from './router.actions';
import { useMemo } from 'react';
import { StudyCard } from 'entities/StudyCard';

const useRouterActions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMemo(
    () => ({
      goBack: () => {
        dispatch(goBack(navigate));
      },
      navigateToLogin: () => {
        dispatch(navigateToLogin(navigate));
      },
      navigateToRegister: () => {
        dispatch(navigateToRegister(navigate));
      },
      navigateToRegisterAdditional: () => {
        dispatch(navigateToRegisterAdditional(navigate));
      },
      navigateToFocusTime: () => {
        dispatch(navigateToFocusTime(navigate));
      },
      navigateToStudyDiary: () => {
        dispatch(navigateToStudyDiary(navigate));
      },
      navigateToSubjectTopics: (subjectId: string) => {
        dispatch(navigateToSubjectTopics({ subjectId, navigate }));
      },
      navigateToChooseTimer: (topicId: string) => {
        dispatch(navigateToChooseTimer({ navigate, topicId }));
      },
      navigateToSummary: (lessonId: string) => {
        dispatch(navigateToSummary({ lessonId, navigate }));
      },
      navigateToStartLearning: () => {
        dispatch(navigateToStartLearning(navigate));
      },
      navigateToInformTeacher: () => {
        dispatch(navigateToInformTeacher(navigate));
      },
      navigateToCreateGroup: (stateForNavigate: { topicId: string; duration: 15 | 25 }) => {
        dispatch(navigateToCreateGroup({ navigate, stateForNavigate }));
      },
      navigateToStudyCards: () => {
        dispatch(navigateToStudyCards(navigate));
      },
      navigateToStudyCardsCreate: (subjectId?: string) => {
        dispatch(navigateToStudyCardsCreate({ navigate, subjectId }));
      },
      navigateToStudyCardsDiscover: () => {
        dispatch(navigateToStudyCardsDiscover(navigate));
      },
      navigateToStudyCardsSet: (setId: string) => {
        dispatch(navigateToStudyCardsSet({ navigate, setId }));
      },
      navigateToStudyCardsEditSet: (setId: string) => {
        dispatch(navigateToStudyCardsEditSet({ navigate, setId }));
      },
      navigateToStudyCardsLibrarySet: (setId: string) => {
        dispatch(navigateToStudyCardsLibrarySet({ navigate, setId }));
      },
      navigateToLearningSet: (
        setId: string,
        setTitle: string,
        subjectTitle: string,
        withTimer = false,
      ) => {
        dispatch(navigateToLearningSet({ navigate, setId, setTitle, subjectTitle, withTimer }));
      },
      navigateToStudyCardsSession: (
        cards: StudyCard[],
        setId: string,
        setTitle: string,
        subjectTitle: string,
      ) => {
        dispatch(navigateToStudyCardsSession({ navigate, setId, cards, setTitle, subjectTitle }));
      },
      navigateToGeneralKnowledge: () => {
        dispatch(navigateToGeneralKnowledge(navigate));
      },
    }),
    [dispatch, navigate],
  );
};

export default useRouterActions;
