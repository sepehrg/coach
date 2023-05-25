import { all, call, put, takeLatest } from 'redux-saga/effects';
import { startAction, stopAction } from '../loader/loader.actions';
import StudyCardSetsApi from 'services/studycardsets.service';
import * as actions from '../studycards/studycards.actions';
import { showSnackbar } from '../snackbar/snackbar.actions';
import {
  COPY_SET_REQUEST,
  CopyRequest,
  CREATE_SET_REQUEST,
  CREATE_UNSORTED_REQUEST,
  CreateSetRequest,
  CreateUnsorted,
  DELETE_SET_REQUEST,
  DeleteSetRequest,
  FOLLOW_SET_REQUEST,
  FollowSetRequest,
  GET_AND_COPY_REQUEST,
  GET_DISCOVER_SETS_BY_SUBJECT_REQUEST,
  GET_DISCOVER_STUDY_CARD_SETS_REQUEST,
  GET_GENERAL_KNOWLEDGE_BY_SUBJECT_REQUEST,
  GET_GENERAL_KNOWLEDGE_SETS_REQUEST,
  GET_LEARNING_SET_OVERVIEW_REQUEST,
  GET_LIBRARY_SETS_BY_SUBJECT_REQUEST,
  GET_LIBRARY_STUDY_CARD_SETS_REQUEST,
  GET_SESSION_CARDS_ALL_REQUEST,
  GET_SESSION_CARDS_BY_LEVEL_REQUEST,
  GET_SET_REQUEST,
  GET_UNSORTED_CARDS_REQUEST,
  GetAndCopyRequest,
  GetDiscoverSetsBySubjectRequest,
  GetDiscoverStudyCardSetsRequest,
  GetGeneralKnowledgeBySubjectRequest,
  GetGeneralKnowledgeSetsRequest,
  GetLearningSetOverviewRequest,
  GetLibrarySetsBySubjectRequest,
  GetLibraryStudyCardSetsRequest,
  GetSessionCardsAllRequest,
  GetSessionCardsByLevelRequest,
  GetSetRequest,
  GetUnsortedCardsRequest,
  LIKE_SET,
  LikeSet,
  LINK_UNSORTED,
  LinkUnsorted,
  MARK_CORRECT_CARD_REQUEST,
  MARK_WRONG_CARD_REQUEST,
  MarkCorrectCardRequest,
  REMOVE_FAVORITE_REQUEST,
  RemoveFavoriteRequest,
  REPORT_SET_REQUEST,
  ReportSetRequest,
  SEARCH_TAGS_REQUEST,
  SearchTagsRequest,
  SET_FAVORITE_REQUEST,
  SetFavoriteRequest,
  SHARE_SET_REQUEST,
  ShareSetRequest,
  UNFOLLOW_SET_REQUEST,
  UnfollowSetRequest,
  UNLIKE_SET,
  UnlikeSet,
  UPDATE_SET_REQUEST,
  UpdateSetRequest,
  GetLibrarySetsBySubjectIdRequest,
  GET_LIBRARY_SETS_BY_SUBJECT_ID_REQUEST,
} from './studycards.types';
import { StudyCardsSubject } from 'entities/Subject';
import {
  LearningSetOverview,
  LibraryOverviewSuccessPayload,
  SetsBySubjectSuccessPayload,
  StudyCardSet,
} from 'entities/StudyCardSet';
import { Tag } from 'entities/Tag';
import { StudyCard, UnsortedStudyCard } from 'entities/StudyCard';
import { t } from 'i18next';

function* getLibraryStudyCardsSets({ type }: GetLibraryStudyCardSetsRequest) {
  yield put(startAction(type));
  try {
    const response: LibraryOverviewSuccessPayload = yield call(StudyCardSetsApi.getLibrarySets);
    yield put(actions.getLibraryStudyCardSetsSuccess(response));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot get sets'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* getLibrarySetsBySubject({ type, payload }: GetLibrarySetsBySubjectRequest) {
  yield put(startAction(type));
  try {
    const response: SetsBySubjectSuccessPayload = yield call(
      StudyCardSetsApi.getLibrarySetsBySubject,
      payload,
    );
    yield put(actions.getLibrarySetsBySubjectSuccess(response));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot get sets by subject'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* getLibrarySetsBySubjectId({ type, payload }: GetLibrarySetsBySubjectIdRequest) {
  yield put(startAction(type));
  try {
    const response: SetsBySubjectSuccessPayload = yield call(
      StudyCardSetsApi.getLibrarySetsBySubjectId,
      payload,
    );
    yield put(actions.getLibrarySetsBySubjectSuccess(response));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot get sets by subject'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* getDiscoverStudyCardsSets({ type }: GetDiscoverStudyCardSetsRequest) {
  yield put(startAction(type));
  try {
    const response: StudyCardsSubject[] = yield call(StudyCardSetsApi.getDiscoverSets);
    yield put(actions.getDiscoverStudyCardSetsSuccess(response));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot get sets'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* getDiscoverSetsBySubject({ type, payload }: GetDiscoverSetsBySubjectRequest) {
  yield put(startAction(type));
  try {
    const response: SetsBySubjectSuccessPayload = yield call(
      StudyCardSetsApi.getDiscoverSetsBySubject,
      payload,
    );
    yield put(actions.getDiscoverSetsBySubjectSuccess(response));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot get sets by subject'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* getSet({ type, payload }: GetSetRequest) {
  yield put(startAction(type));
  try {
    const response: StudyCardSet = yield call(StudyCardSetsApi.getSet, payload);
    yield put(actions.getSetSuccess(response));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot get details'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* createSet({ type, payload }: CreateSetRequest) {
  yield put(startAction(type));
  try {
    yield call(StudyCardSetsApi.createSet, payload.set);
    yield call(payload.onSuccess);
    yield put(showSnackbar({ type: 'success', message: t('Study Cards.Notifications.Created') }));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot create'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* updateSet({ type, payload }: UpdateSetRequest) {
  yield put(startAction(type));
  try {
    yield call(StudyCardSetsApi.updateSet, payload.set);
    yield call(payload.onSuccess);
    yield put(showSnackbar({ type: 'success', message: t('Study Cards.Notifications.Updated') }));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot update'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* searchTags({ type, payload }: SearchTagsRequest) {
  yield put(startAction(type));
  try {
    const response: Tag[] = yield call(StudyCardSetsApi.getTagsByName, payload);
    yield put(actions.searchTagsSuccess(response));
  } catch (error) {
    yield put(
      showSnackbar({ type: 'error', message: t('Study Cards.Notifications.Search error') }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* reportSet({ type, payload }: ReportSetRequest) {
  yield put(startAction(type));
  try {
    yield call(StudyCardSetsApi.reportSet, payload.data);
    yield call(payload.onSuccess);
    yield put(showSnackbar({ type: 'success', message: t('Study Cards.Notifications.Reported') }));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot report'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* copySet({ type, payload }: CopyRequest) {
  yield put(startAction(type));
  try {
    yield call(StudyCardSetsApi.copySet, payload.data);
    yield call(payload.onSuccess);
    yield put(showSnackbar({ type: 'success', message: t('Study Cards.Notifications.Copied') }));
  } catch (error) {
    yield put(showSnackbar({ type: 'error', message: t('Study Cards.Notifications.Cannot copy') }));
  } finally {
    yield put(stopAction(type));
  }
}

function* deleteSet({ type, payload }: DeleteSetRequest) {
  yield put(startAction(type));
  try {
    yield call(StudyCardSetsApi.deleteSet, payload);
    yield call(payload.onSuccess);
    yield put(showSnackbar({ type: 'success', message: t('Study Cards.Notifications.Deleted') }));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot delete'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* followSet({ type, payload }: FollowSetRequest) {
  yield put(startAction(type));
  try {
    yield call(StudyCardSetsApi.followSet, payload);
    yield call(payload.onSuccess);
    yield put(showSnackbar({ type: 'success', message: t('Study Cards.Notifications.Followed') }));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot follow'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* unfollowSet({ type, payload }: UnfollowSetRequest) {
  yield put(startAction(type));
  try {
    yield call(StudyCardSetsApi.unfollowSet, payload);
    yield call(payload.onSuccess);
    yield put(
      showSnackbar({ type: 'success', message: t('Study Cards.Notifications.Unfollowed') }),
    );
  } catch (error) {
    yield put(showSnackbar({ type: 'error', message: 'Cannot unfollow set' }));
  } finally {
    yield put(stopAction(type));
  }
}

function* shareSet({ type, payload }: ShareSetRequest) {
  yield put(startAction(type));
  try {
    yield call(StudyCardSetsApi.shareSet, payload);
    yield call(payload.onSuccess);
    yield put(
      showSnackbar({
        type: 'success',
        message: t('Study Cards.Notifications.Link copied'),
      }),
    );
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot copy link'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* getLearningSetOverview({ type, payload }: GetLearningSetOverviewRequest) {
  yield put(startAction(type));
  try {
    const response: LearningSetOverview = yield call(StudyCardSetsApi.getStudySetOverview, payload);
    yield put(actions.getLearningSetOverviewSuccess(response));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot get set'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* getSessionCardsAll({ type, payload }: GetSessionCardsAllRequest) {
  yield put(startAction(type));
  try {
    const response: StudyCard[] = yield call(StudyCardSetsApi.getSessionCardsAll, payload);
    yield put(actions.getSessionCardsAllSuccess(response));
    yield call(payload.onSuccess);
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot get cards'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* getSessionCardsByLevel({ type, payload }: GetSessionCardsByLevelRequest) {
  yield put(startAction(type));
  try {
    const response: StudyCard[] = yield call(StudyCardSetsApi.getSessionCardsByLevel, payload);
    yield put(actions.getSessionCardsByLevelSuccess(response));
    yield call(payload.onSuccess);
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot get cards'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* setFavorite({ type, payload }: SetFavoriteRequest) {
  yield put(startAction(type));
  try {
    yield call(StudyCardSetsApi.favorite, payload);
    yield call(payload.onSuccess);
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Mark favorite error'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* removeFavorite({ type, payload }: RemoveFavoriteRequest) {
  yield put(startAction(type));
  try {
    yield call(StudyCardSetsApi.unfavorite, payload);
    yield call(payload.onSuccess);
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Unmark favorite error'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* markCorrectCard({ type, payload }: MarkCorrectCardRequest) {
  yield put(startAction(type));
  try {
    yield call(StudyCardSetsApi.correct, payload);
    yield call(payload.onSuccess);
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Correct error'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* markWrongCard({ type, payload }: MarkCorrectCardRequest) {
  yield put(startAction(type));
  try {
    yield call(StudyCardSetsApi.wrong, payload);
    yield call(payload.onSuccess);
  } catch (error) {
    yield put(showSnackbar({ type: 'error', message: t('Study Cards.Notifications.Wrong error') }));
  } finally {
    yield put(stopAction(type));
  }
}

function* getGeneralKnowledgeSets({ payload, type }: GetGeneralKnowledgeSetsRequest) {
  yield put(startAction(type));
  try {
    const response: StudyCardsSubject[] = yield call(
      StudyCardSetsApi.getGeneralKnowledgeSets,
      payload,
    );
    yield put(actions.getGeneralKnowledgeSetsSuccess(response));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot get sets'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* getGeneralKnowledgeSetsBySubject({ type, payload }: GetGeneralKnowledgeBySubjectRequest) {
  yield put(startAction(type));
  try {
    const response: SetsBySubjectSuccessPayload = yield call(
      StudyCardSetsApi.getGeneralKnowledgeSetsBySubject,
      payload,
    );
    yield put(actions.getGeneralKnowledgeBySubjectSuccess(response));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot get sets by subject'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* likeSet({ type, payload }: LikeSet) {
  yield put(startAction(type));
  try {
    yield call(StudyCardSetsApi.like, payload);
    yield call(payload.onSuccess);
  } catch (error) {
    yield put(showSnackbar({ type: 'error', message: t('Study Cards.Notifications.Cannot like') }));
  } finally {
    yield put(stopAction(type));
  }
}

function* unlikeSet({ type, payload }: UnlikeSet) {
  yield put(startAction(type));
  try {
    yield call(StudyCardSetsApi.unlike, payload);
    yield call(payload.onSuccess);
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot unlike'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* createUnsorted({ type, payload }: CreateUnsorted) {
  yield put(startAction(type));
  try {
    yield call(StudyCardSetsApi.createUnsortedCard, {
      question: payload.question,
      answer: payload.answer,
    });
    yield put(
      showSnackbar({
        type: 'success',
        message: t('Study Cards.Notifications.Card created'),
      }),
    );
    yield call(payload.onSuccess);
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot create card'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* getUnsortedCards({ type }: GetUnsortedCardsRequest) {
  yield put(startAction(type));
  try {
    const response: UnsortedStudyCard[] = yield call(StudyCardSetsApi.getUnsorted);
    yield put(actions.getUnsortedCardsSuccess(response));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot get cards'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* linkUnsorted({ type, payload }: LinkUnsorted) {
  yield put(startAction(type));
  try {
    yield call(StudyCardSetsApi.linkUnsorted, payload);
    yield put(
      showSnackbar({
        type: 'success',
        message: t('Study Cards.Notifications.Added to set'),
      }),
    );
    yield call(payload.onSuccess);
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Cards.Notifications.Cannot add to set'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* getSetAndCopy({ type, payload }: GetAndCopyRequest) {
  yield put(startAction(type));
  try {
    const response: StudyCardSet = yield call(StudyCardSetsApi.getSet, { id: payload.setId });
    yield call(StudyCardSetsApi.copySet, { id: payload.setId, studyCards: response.studyCards });
    yield call(payload.onSuccess);
    yield put(showSnackbar({ type: 'success', message: t('Study Cards.Notifications.Copied') }));
  } catch (error) {
    yield put(showSnackbar({ type: 'error', message: t('Study Cards.Notifications.Cannot copy') }));
  } finally {
    yield put(stopAction(type));
  }
}

export default function* () {
  yield all([
    takeLatest(GET_LIBRARY_STUDY_CARD_SETS_REQUEST, getLibraryStudyCardsSets),
    takeLatest(GET_LIBRARY_SETS_BY_SUBJECT_REQUEST, getLibrarySetsBySubject),
    takeLatest(GET_LIBRARY_SETS_BY_SUBJECT_ID_REQUEST, getLibrarySetsBySubjectId),
    takeLatest(CREATE_SET_REQUEST, createSet),
    takeLatest(SEARCH_TAGS_REQUEST, searchTags),
    takeLatest(GET_DISCOVER_STUDY_CARD_SETS_REQUEST, getDiscoverStudyCardsSets),
    takeLatest(GET_DISCOVER_SETS_BY_SUBJECT_REQUEST, getDiscoverSetsBySubject),
    takeLatest(GET_SET_REQUEST, getSet),
    takeLatest(REPORT_SET_REQUEST, reportSet),
    takeLatest(COPY_SET_REQUEST, copySet),
    takeLatest(DELETE_SET_REQUEST, deleteSet),
    takeLatest(FOLLOW_SET_REQUEST, followSet),
    takeLatest(UNFOLLOW_SET_REQUEST, unfollowSet),
    takeLatest(SHARE_SET_REQUEST, shareSet),
    takeLatest(GET_LEARNING_SET_OVERVIEW_REQUEST, getLearningSetOverview),
    takeLatest(GET_SESSION_CARDS_ALL_REQUEST, getSessionCardsAll),
    takeLatest(GET_SESSION_CARDS_BY_LEVEL_REQUEST, getSessionCardsByLevel),
    takeLatest(SET_FAVORITE_REQUEST, setFavorite),
    takeLatest(REMOVE_FAVORITE_REQUEST, removeFavorite),
    takeLatest(MARK_CORRECT_CARD_REQUEST, markCorrectCard),
    takeLatest(MARK_WRONG_CARD_REQUEST, markWrongCard),
    takeLatest(GET_GENERAL_KNOWLEDGE_SETS_REQUEST, getGeneralKnowledgeSets),
    takeLatest(GET_GENERAL_KNOWLEDGE_BY_SUBJECT_REQUEST, getGeneralKnowledgeSetsBySubject),
    takeLatest(LIKE_SET, likeSet),
    takeLatest(UNLIKE_SET, unlikeSet),
    takeLatest(UPDATE_SET_REQUEST, updateSet),
    takeLatest(CREATE_UNSORTED_REQUEST, createUnsorted),
    takeLatest(GET_UNSORTED_CARDS_REQUEST, getUnsortedCards),
    takeLatest(LINK_UNSORTED, linkUnsorted),
    takeLatest(GET_AND_COPY_REQUEST, getSetAndCopy),
  ]);
}
