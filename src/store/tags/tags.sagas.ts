import { all, call, put, takeLatest } from 'redux-saga/effects';
import { startAction, stopAction } from '../loader/loader.actions';
import TagsApi from '../../services/tags.service';
import { showSnackbar } from '../snackbar/snackbar.actions';
import { t } from 'i18next';
import {
  GET_PLACEHOLDER_TAG_REQUEST,
  GET_TAGS_REQUEST,
  GetPlaceholderTagRequest,
  GetTagsRequest,
} from './tags.types';
import { getPlaceholderTagSuccess, getTagsSuccess } from './tags.actions';
import { Tag } from 'entities/Tag';

function* getPlaceholderTag({ type, payload }: GetPlaceholderTagRequest) {
  yield put(startAction(type));
  try {
    const tag: string[] = yield call(TagsApi.preSearchTag, payload);
    yield put(getPlaceholderTagSuccess(tag));
  } catch (e) {
    yield put(showSnackbar({ type: 'error', message: t('Messages.Something went wrong.') }));
  } finally {
    yield put(stopAction(type));
  }
}

function* getTagsByQuery({ type, payload }: GetTagsRequest) {
  yield put(startAction(type));
  try {
    const tag: Tag[] = yield call(TagsApi.getTagsByQuery, payload);
    yield put(getTagsSuccess(tag));
  } catch (e) {
    yield put(showSnackbar({ type: 'error', message: t('Messages.Something went wrong.') }));
  } finally {
    yield put(stopAction(type));
  }
}

export default function* () {
  yield all([takeLatest(GET_PLACEHOLDER_TAG_REQUEST, getPlaceholderTag)]);
  yield all([takeLatest(GET_TAGS_REQUEST, getTagsByQuery)]);
}
