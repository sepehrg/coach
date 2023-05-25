import { all, takeLatest } from 'redux-saga/effects';
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
  NavigateGoBack,
  NavigateToChooseTimer,
  NavigateToCreateGroup,
  NavigateToGeneralKnowledge,
  NavigateToInformTeacherAction,
  NavigateToLearningSet,
  NavigateToLoginAction,
  NavigateToRegisterAction,
  NavigateToRegisterAdditionalAction,
  NavigateToStartLearningAction,
  NavigateToStudyCards,
  NavigateToStudyCardsCreate,
  NavigateToStudyCardsDiscover,
  NavigateToStudyCardsEditSet,
  NavigateToStudyCardsLibrarySet,
  NavigateToStudyCardsSession,
  NavigateToStudyCardsSet,
  NavigateToStudyLessonAction,
  NavigateToSubjectTopics,
  NavigateToSummaryAction,
} from './router.types';

function goBack({ payload }: NavigateGoBack) {
  try {
    payload(-1);
  } catch (e) {
    console.error(e);
  }
}

function navigateToLogin({ payload }: NavigateToLoginAction) {
  try {
    payload('/login');
  } catch (e) {
    console.error(e);
  }
}

function navigateToRegister({ payload }: NavigateToRegisterAction) {
  try {
    payload('/register');
  } catch (e) {
    console.error(e);
  }
}

function navigateToRegisterAdditional({ payload }: NavigateToRegisterAdditionalAction) {
  try {
    payload('/register/additional');
  } catch (e) {
    console.error(e);
  }
}

function navigateToFocusTime({ payload }: NavigateToRegisterAction) {
  try {
    payload('/focus-time');
  } catch (e) {
    console.error(e);
  }
}

function navigateToStudyDiary({ payload }: NavigateToRegisterAction) {
  try {
    payload('/study-diary');
  } catch (e) {
    console.error(e);
  }
}

function navigateToSubjectTopics({ payload }: NavigateToSubjectTopics) {
  try {
    payload.navigate(`/subject/${payload.subjectId}`);
  } catch (e) {
    console.error(e);
  }
}

function navigateToChooseTimer({ payload }: NavigateToChooseTimer) {
  try {
    payload.navigate(`/choose-timer/${payload.topicId}`);
  } catch (e) {
    console.error(e);
  }
}

function navigateToStudyLesson({ payload }: NavigateToStudyLessonAction) {
  try {
    payload.navigate('/study-individual', {
      state: {
        count: payload.duration,
        subjectId: payload.subjectId,
        lessonId: payload.lessonId,
        goal: payload.goal,
      },
    });
  } catch (e) {
    console.error(e);
  }
}

function navigateToSummary({ payload }: NavigateToSummaryAction) {
  try {
    payload.navigate('/summary', {
      state: {
        lessonId: payload.lessonId,
        fromStudy: true,
      },
    });
  } catch (e) {
    console.error(e);
  }
}

function navigateToStartLearning({ payload }: NavigateToStartLearningAction) {
  try {
    payload('/start-learning');
  } catch (e) {
    console.error(e);
  }
}

function navigateToInformTeacher({ payload }: NavigateToInformTeacherAction) {
  try {
    payload('/inform-teacher');
  } catch (e) {
    console.error(e);
  }
}

function navigateToCreateGroup({ payload }: NavigateToCreateGroup) {
  try {
    payload.navigate('/create-group', { state: payload.stateForHistory });
  } catch (e) {
    console.error(e);
  }
}

function navigateToStudyCardsCreate({ payload }: NavigateToStudyCardsCreate) {
  try {
    if (payload.subjectId) payload.navigate(`/study-cards-create?subjectId=${payload.subjectId}`);
    else payload.navigate('/study-cards-create');
  } catch (e) {
    console.error(e);
  }
}

function navigateToStudyCards({ payload }: NavigateToStudyCards) {
  try {
    payload('/study-cards');
  } catch (e) {
    console.error(e);
  }
}

function navigateToStudyCardsDiscover({ payload }: NavigateToStudyCardsDiscover) {
  try {
    payload('/study-cards-discover');
  } catch (e) {
    console.error(e);
  }
}

function navigateToStudyCardsSet({ payload }: NavigateToStudyCardsSet) {
  try {
    payload.navigate(`/study-cards-discover/${payload.setId}`);
  } catch (e) {
    console.error(e);
  }
}

function navigateToStudyCardsEditSet({ payload }: NavigateToStudyCardsEditSet) {
  try {
    payload.navigate(`/study-cards-edit/${payload.setId}`);
  } catch (e) {
    console.error(e);
  }
}

function navigateToStudyCardsLibrarySet({ payload }: NavigateToStudyCardsLibrarySet) {
  try {
    payload.navigate(`/study-cards/${payload.setId}`);
  } catch (e) {
    console.error(e);
  }
}

function navigateToLearningSet({ payload }: NavigateToLearningSet) {
  try {
    payload.navigate(`/study-cards-learn/overview/${payload.setId}`, {
      state: {
        setTitle: payload.setTitle,
        subjectTitle: payload.subjectTitle,
        withTimer: payload.withTimer,
      },
    });
  } catch (e) {
    console.error(e);
  }
}

function navigateToStudyCardsSession({ payload }: NavigateToStudyCardsSession) {
  try {
    payload.navigate('/study-cards-learn/session', {
      state: {
        cards: payload.cards,
        setTitle: payload.setTitle,
        subjectTitle: payload.subjectTitle,
        setId: payload.setId,
      },
    });
  } catch (e) {
    console.error(e);
  }
}

function navigateToGeneralKnowledge({ payload }: NavigateToGeneralKnowledge) {
  try {
    payload('/study-cards-general-knowledge');
  } catch (e) {
    console.error(e);
  }
}

export default function* () {
  yield all([
    takeLatest(NAVIGATE_GO_BACK, goBack),
    takeLatest(NAVIGATE_TO_LOGIN, navigateToLogin),
    takeLatest(NAVIGATE_TO_REGISTER, navigateToRegister),
    takeLatest(NAVIGATE_TO_REGISTER_ADDITIONAL, navigateToRegisterAdditional),
    takeLatest(NAVIGATE_TO_FOCUS_TIME, navigateToFocusTime),
    takeLatest(NAVIGATE_TO_STUDY_DIARY, navigateToStudyDiary),
    takeLatest(NAVIGATE_TO_SUBJECT_TOPICS, navigateToSubjectTopics),
    takeLatest(NAVIGATE_TO_CHOOSE_TIMER, navigateToChooseTimer),
    takeLatest(NAVIGATE_TO_STUDY_LESSON, navigateToStudyLesson),
    takeLatest(NAVIGATE_TO_SUMMARY, navigateToSummary),
    takeLatest(NAVIGATE_TO_START_LEARNING, navigateToStartLearning),
    takeLatest(NAVIGATE_TO_INFORM_TEACHER, navigateToInformTeacher),
    takeLatest(NAVIGATE_TO_CREATE_GROUP, navigateToCreateGroup),
    takeLatest(NAVIGATE_TO_STUDY_CARDS, navigateToStudyCards),
    takeLatest(NAVIGATE_TO_STUDY_CARDS_CREATE, navigateToStudyCardsCreate),
    takeLatest(NAVIGATE_TO_STUDY_CARDS_DISCOVER, navigateToStudyCardsDiscover),
    takeLatest(NAVIGATE_TO_STUDY_CARDS_SET, navigateToStudyCardsSet),
    takeLatest(NAVIGATE_TO_STUDY_CARDS_EDIT_SET, navigateToStudyCardsEditSet),
    takeLatest(NAVIGATE_TO_STUDY_CARDS_LIBRARY_SET, navigateToStudyCardsLibrarySet),
    takeLatest(NAVIGATE_TO_LEARNING_SET, navigateToLearningSet),
    takeLatest(NAVIGATE_TO_STUDY_CARDS_SESSION, navigateToStudyCardsSession),
    takeLatest(NAVIGATE_TO_STUDY_CARDS_GENERAL_KNOWLEDGE, navigateToGeneralKnowledge),
  ]);
}
