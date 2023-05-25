import { StudyCard } from 'entities/StudyCard';
import { NavigateFunction } from 'react-router-dom';

export const NAVIGATE_TO_LOGIN = 'NAVIGATE_TO_LOGIN';
export const NAVIGATE_TO_REGISTER = 'NAVIGATE_TO_REGISTER';
export const NAVIGATE_TO_REGISTER_ADDITIONAL = 'NAVIGATE_TO_REGISTER_ADDITIONAL';
export const NAVIGATE_TO_FOCUS_TIME = 'NAVIGATE_TO_FOCUS_TIME';
export const NAVIGATE_TO_STUDY_DIARY = 'NAVIGATE_TO_STUDY_DIARY';
export const NAVIGATE_GO_BACK = 'NAVIGATE_GO_BACK';
export const NAVIGATE_TO_SUBJECT_TOPICS = 'NAVIGATE_TO_SUBJECT_TOPICS';
export const NAVIGATE_TO_CHOOSE_TIMER = 'NAVIGATE_TO_CHOOSE_TIMER';
export const NAVIGATE_TO_STUDY_LESSON = 'NAVIGATE_TO_STUDY_LESSON';
export const NAVIGATE_TO_SUMMARY = 'NAVIGATE_TO_SUMMARY';
export const NAVIGATE_TO_START_LEARNING = 'NAVIGATE_TO_START_LEARNING';
export const NAVIGATE_TO_INFORM_TEACHER = 'NAVIGATE_TO_INFORM_TEACHER';
export const NAVIGATE_TO_CREATE_GROUP = 'NAVIGATE_TO_CREATE_GROUP';
export const NAVIGATE_TO_STUDY_CARDS = 'NAVIGATE_TO_STUDY_CARDS';
export const NAVIGATE_TO_STUDY_CARDS_CREATE = 'NAVIGATE_TO_STUDY_CARDS_CREATE';
export const NAVIGATE_TO_STUDY_CARDS_DISCOVER = 'NAVIGATE_TO_STUDY_CARDS_DISCOVER';
export const NAVIGATE_TO_STUDY_CARDS_SET = 'NAVIGATE_TO_STUDY_CARDS_SET';
export const NAVIGATE_TO_STUDY_CARDS_EDIT_SET = 'NAVIGATE_TO_STUDY_CARDS_EDIT_SET';
export const NAVIGATE_TO_STUDY_CARDS_LIBRARY_SET = 'NAVIGATE_TO_STUDY_CARDS_LIBRARY_SET';
export const NAVIGATE_TO_LEARNING_SET = 'NAVIGATE_TO_LEARNING_SET';
export const NAVIGATE_TO_STUDY_CARDS_SESSION = 'NAVIGATE_TO_STUDY_CARDS_SESSION';
export const NAVIGATE_TO_STUDY_CARDS_GENERAL_KNOWLEDGE =
  'NAVIGATE_TO_STUDY_CARDS_GENERAL_KNOWLEDGE';

export interface NavigateToLoginAction {
  type: typeof NAVIGATE_TO_LOGIN;
  payload: NavigateFunction;
}

export interface NavigateToRegisterAction {
  type: typeof NAVIGATE_TO_REGISTER;
  payload: NavigateFunction;
}

export interface NavigateToStartLearningAction {
  type: typeof NAVIGATE_TO_START_LEARNING;
  payload: NavigateFunction;
}

export interface NavigateToSummaryAction {
  type: typeof NAVIGATE_TO_SUMMARY;
  payload: { navigate: NavigateFunction; lessonId: string };
}

export interface NavigateToInformTeacherAction {
  type: typeof NAVIGATE_TO_INFORM_TEACHER;
  payload: NavigateFunction;
}

export interface NavigateToStudyLessonAction {
  type: typeof NAVIGATE_TO_STUDY_LESSON;
  payload: {
    navigate: NavigateFunction;
    lessonId: string;
    subjectId: string;
    duration: 15 | 25;
    goal: string;
  };
}

export interface NavigateToChooseTimer {
  type: typeof NAVIGATE_TO_CHOOSE_TIMER;
  payload: {
    navigate: NavigateFunction;
    topicId: string;
  };
}

export interface NavigateToRegisterAdditionalAction {
  type: typeof NAVIGATE_TO_REGISTER_ADDITIONAL;
  payload: NavigateFunction;
}

export interface NavigateToFocusTimeAction {
  type: typeof NAVIGATE_TO_FOCUS_TIME;
  payload: NavigateFunction;
}

export interface NavigateToStudyDiary {
  type: typeof NAVIGATE_TO_STUDY_DIARY;
  payload: NavigateFunction;
}

export interface NavigateGoBack {
  type: typeof NAVIGATE_GO_BACK;
  payload: NavigateFunction;
}

export interface NavigateToSubjectTopics {
  type: typeof NAVIGATE_TO_SUBJECT_TOPICS;
  payload: {
    navigate: NavigateFunction;
    subjectId: string;
  };
}

export interface NavigateToCreateGroup {
  type: typeof NAVIGATE_TO_CREATE_GROUP;
  payload: { navigate: NavigateFunction; stateForHistory: { topicId: string; duration: 15 | 25 } };
}

export interface NavigateToStudyCards {
  type: typeof NAVIGATE_TO_STUDY_CARDS;
  payload: NavigateFunction;
}

export interface NavigateToStudyCardsCreate {
  type: typeof NAVIGATE_TO_STUDY_CARDS_CREATE;
  payload: { navigate: NavigateFunction; subjectId?: string };
}

export interface NavigateToStudyCardsDiscover {
  type: typeof NAVIGATE_TO_STUDY_CARDS_DISCOVER;
  payload: NavigateFunction;
}

export interface NavigateToStudyCardsSet {
  type: typeof NAVIGATE_TO_STUDY_CARDS_SET;
  payload: { navigate: NavigateFunction; setId: string };
}

export interface NavigateToStudyCardsEditSet {
  type: typeof NAVIGATE_TO_STUDY_CARDS_EDIT_SET;
  payload: { navigate: NavigateFunction; setId: string };
}

export interface NavigateToStudyCardsLibrarySet {
  type: typeof NAVIGATE_TO_STUDY_CARDS_LIBRARY_SET;
  payload: { navigate: NavigateFunction; setId: string };
}

export interface NavigateToLearningSet {
  type: typeof NAVIGATE_TO_LEARNING_SET;
  payload: {
    navigate: NavigateFunction;
    setId: string;
    setTitle: string;
    subjectTitle: string;
    withTimer: boolean;
  };
}

export interface NavigateToStudyCardsSession {
  type: typeof NAVIGATE_TO_STUDY_CARDS_SESSION;
  payload: {
    navigate: NavigateFunction;
    setId: string;
    cards: StudyCard[];
    setTitle: string;
    subjectTitle: string;
  };
}

export interface NavigateToGeneralKnowledge {
  type: typeof NAVIGATE_TO_STUDY_CARDS_GENERAL_KNOWLEDGE;
  payload: NavigateFunction;
}
