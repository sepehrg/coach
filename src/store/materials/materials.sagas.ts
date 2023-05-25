import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import MaterialApi from 'services/materials.service';
import { startAction, stopAction } from 'store/loader/loader.actions';
import { showSnackbar } from 'store/snackbar/snackbar.actions';
import * as actions from './materials.actions';
import {
  CREATE_MATERIAL_FEEDBACK_REQUEST,
  CREATE_NEW_LINK_REQUEST,
  CreateMaterialFeedbackRequest,
  CreateNewLinkRequest,
  GET_MATERIALS_BY_SUBJECT_REQUEST,
  GET_MATERIALS_LINKS_REQUEST,
  GET_MATERIALS_TOPICS_REQUEST,
  GetMaterialBySubjectRequest,
  GetMaterialsLinksRequest,
  GetMaterialsTopicsRequest,
  CreateMaterialHistoryRequest,
  CREATE_MATERIAL_HISTORY_REQUEST,
  GetMaterialsHistoryRequest,
  GET_MATERIALS_HISTORY_REQUEST,
} from './materials.types';
import {
  Material,
  MaterialHistoryResponse,
  MaterialResponse,
  MaterialTopic,
} from 'entities/Material';
import { t } from 'i18next';
import { profileSelector } from 'store/auth/auth.selectors';
import _ from 'lodash-es';

function* getMaterialsBySubject({ payload, type }: GetMaterialBySubjectRequest) {
  yield put(startAction(type));
  try {
    const { grade: myGrade } = yield select(profileSelector);
    const materials: Material[] = yield call(MaterialApi.getMaterialsBySubjectId, payload);
    yield put(
      actions.getMaterialsSuccess(
        materials.filter((material: Material) => !!_.find(material.classes, { id: myGrade.id })),
      ),
    );
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Materials.Can not get materials'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* getMaterialsTopics({ payload, type }: GetMaterialsTopicsRequest) {
  yield put(startAction(type));
  try {
    const topics: MaterialTopic[] = yield call(MaterialApi.getTopics, payload);
    yield put(actions.getMaterialsTopicsSuccess(topics));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Materials.Can not get materials'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* getMaterialsLinks({ payload, type }: GetMaterialsLinksRequest) {
  yield put(startAction(type));
  try {
    const materials: MaterialResponse = yield call(MaterialApi.getLinks, payload);
    yield put(actions.getMaterialsLinksSuccess(materials));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Materials.Can not get materials'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* createMaterialFeedback({ payload, type }: CreateMaterialFeedbackRequest) {
  yield put(startAction(type));
  try {
    yield call(MaterialApi.createMaterialFeedback, payload.materialId, payload.isLiked);
  } catch (error) {
    yield put(showSnackbar({ type: 'error', message: t('Messages.Materials.Can not like') }));
  } finally {
    yield put(stopAction(type));
  }
}

function* createMaterialHistory({ payload, type }: CreateMaterialHistoryRequest) {
  yield put(startAction(type));
  try {
    yield call(MaterialApi.createMaterialHistory, payload.materialId);
  } catch (error) {
    yield put(showSnackbar({ type: 'error', message: t('Messages.Materials.Can save history') }));
  } finally {
    yield put(stopAction(type));
  }
}

function* getMaterialsHistory({ type, payload }: GetMaterialsHistoryRequest) {
  yield put(startAction(type));
  try {
    const history: MaterialHistoryResponse = yield call(MaterialApi.getMaterialHistory, payload);
    yield put(actions.getMaterialsHistorySuccess(history));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Materials.Can not get materials history'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* createNewLink({ payload, onSuccess, type }: CreateNewLinkRequest) {
  yield put(startAction(type));
  try {
    yield call(MaterialApi.createNewLink, payload.link, payload.description, payload.subject);
    yield onSuccess();
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Materials.Can not suggest link.'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

export default function* () {
  yield all([takeLatest(CREATE_MATERIAL_FEEDBACK_REQUEST, createMaterialFeedback)]);
  yield all([takeLatest(CREATE_MATERIAL_HISTORY_REQUEST, createMaterialHistory)]);
  yield all([takeLatest(GET_MATERIALS_BY_SUBJECT_REQUEST, getMaterialsBySubject)]);
  yield all([takeLatest(CREATE_NEW_LINK_REQUEST, createNewLink)]);
  yield all([takeLatest(GET_MATERIALS_TOPICS_REQUEST, getMaterialsTopics)]);
  yield all([takeLatest(GET_MATERIALS_LINKS_REQUEST, getMaterialsLinks)]);
  yield all([takeLatest(GET_MATERIALS_HISTORY_REQUEST, getMaterialsHistory)]);
}
