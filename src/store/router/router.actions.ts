import {
  NAVIGATE_GO_BACK,
  NAVIGATE_TO_CHOOSE_TIMER,
  NAVIGATE_TO_CREATE_GROUP,
  NAVIGATE_TO_FOCUS_TIME,
  NAVIGATE_TO_INFORM_TEACHER,
  NAVIGATE_TO_LEARNING_SET,
  NAVIGATE_TO_LOGIN,
  NAVIGATE_TO_REGISTER,
  NAVIGATE_TO_REGISTER_ADDITIONAL,
  NAVIGATE_TO_START_LEARNING,
  NAVIGATE_TO_STUDY_CARDS,
  NAVIGATE_TO_STUDY_CARDS_CREATE,
  NAVIGATE_TO_STUDY_CARDS_DISCOVER,
  NAVIGATE_TO_STUDY_CARDS_EDIT_SET,
  NAVIGATE_TO_STUDY_CARDS_GENERAL_KNOWLEDGE,
  NAVIGATE_TO_STUDY_CARDS_LIBRARY_SET,
  NAVIGATE_TO_STUDY_CARDS_SESSION,
  NAVIGATE_TO_STUDY_CARDS_SET,
  NAVIGATE_TO_STUDY_DIARY,
  NAVIGATE_TO_STUDY_LESSON,
  NAVIGATE_TO_SUBJECT_TOPICS,
  NAVIGATE_TO_SUMMARY,
} from './router.types';
import { StudyCard } from 'entities/StudyCard';
import { NavigateFunction } from 'react-router-dom';

export const navigateToLogin = (payload: NavigateFunction) => ({
  type: NAVIGATE_TO_LOGIN,
  payload,
});

export const navigateToStudyLesson = (payload: {
  navigate: NavigateFunction;
  lessonId: string;
  subjectId: string;
  duration: number;
  goal: string;
}) => ({
  type: NAVIGATE_TO_STUDY_LESSON,
  payload,
});

export const navigateToRegister = (payload: NavigateFunction) => ({
  type: NAVIGATE_TO_REGISTER,
  payload,
});

export const navigateToStartLearning = (payload: NavigateFunction) => ({
  type: NAVIGATE_TO_START_LEARNING,
  payload,
});

export const navigateToSummary = (payload: { navigate: NavigateFunction; lessonId: string }) => ({
  type: NAVIGATE_TO_SUMMARY,
  payload,
});

export const navigateToChooseTimer = (payload: {
  navigate: NavigateFunction;
  topicId: string;
}) => ({
  type: NAVIGATE_TO_CHOOSE_TIMER,
  payload,
});

export const navigateToRegisterAdditional = (payload: NavigateFunction) => ({
  type: NAVIGATE_TO_REGISTER_ADDITIONAL,
  payload,
});

export const navigateToFocusTime = (payload: NavigateFunction) => ({
  type: NAVIGATE_TO_FOCUS_TIME,
  payload,
});

export const navigateToStudyDiary = (payload: NavigateFunction) => ({
  type: NAVIGATE_TO_STUDY_DIARY,
  payload,
});

export const goBack = (payload: NavigateFunction) => ({
  type: NAVIGATE_GO_BACK,
  payload,
});

export const navigateToSubjectTopics = (payload: {
  navigate: NavigateFunction;
  subjectId: string;
}) => ({
  type: NAVIGATE_TO_SUBJECT_TOPICS,
  payload,
});

export const navigateToInformTeacher = (payload: NavigateFunction) => ({
  type: NAVIGATE_TO_INFORM_TEACHER,
  payload,
});

export const navigateToCreateGroup = (payload: {
  navigate: NavigateFunction;
  stateForNavigate: { topicId: string; duration: 15 | 25 };
}) => ({
  type: NAVIGATE_TO_CREATE_GROUP,
  payload,
});

export const navigateToStudyCards = (payload: NavigateFunction) => ({
  type: NAVIGATE_TO_STUDY_CARDS,
  payload,
});

export const navigateToStudyCardsCreate = (payload: {
  navigate: NavigateFunction;
  subjectId?: string;
}) => ({
  type: NAVIGATE_TO_STUDY_CARDS_CREATE,
  payload,
});

export const navigateToStudyCardsDiscover = (payload: NavigateFunction) => ({
  type: NAVIGATE_TO_STUDY_CARDS_DISCOVER,
  payload,
});

export const navigateToStudyCardsSet = (payload: {
  navigate: NavigateFunction;
  setId: string;
}) => ({
  type: NAVIGATE_TO_STUDY_CARDS_SET,
  payload,
});

export const navigateToStudyCardsEditSet = (payload: {
  navigate: NavigateFunction;
  setId: string;
}) => ({
  type: NAVIGATE_TO_STUDY_CARDS_EDIT_SET,
  payload,
});

export const navigateToStudyCardsLibrarySet = (payload: {
  navigate: NavigateFunction;
  setId: string;
}) => ({
  type: NAVIGATE_TO_STUDY_CARDS_LIBRARY_SET,
  payload,
});

export const navigateToLearningSet = (payload: {
  navigate: NavigateFunction;
  setId: string;
  setTitle: string;
  subjectTitle: string;
  withTimer: boolean;
}) => ({
  type: NAVIGATE_TO_LEARNING_SET,
  payload,
});

export const navigateToStudyCardsSession = (payload: {
  navigate: NavigateFunction;
  setId: string;
  cards: StudyCard[];
  setTitle: string;
  subjectTitle: string;
}) => ({
  type: NAVIGATE_TO_STUDY_CARDS_SESSION,
  payload,
});

export const navigateToGeneralKnowledge = (payload: NavigateFunction) => ({
  type: NAVIGATE_TO_STUDY_CARDS_GENERAL_KNOWLEDGE,
  payload,
});
