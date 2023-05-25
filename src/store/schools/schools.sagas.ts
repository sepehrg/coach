import { all, call, put, takeLatest } from 'redux-saga/effects';
import SchoolsApi from 'services/schools.service';
import { startAction, stopAction } from 'store/loader/loader.actions';
import { showSnackbar } from 'store/snackbar/snackbar.actions';
import * as actions from './schools.actions';
import { GET_SCHOOLS_REQUEST, GetSchoolsRequest } from './schools.types';
import { School } from 'entities';
import { t } from 'i18next';

export function* getSchools({ type }: GetSchoolsRequest) {
  yield put(startAction(type));
  try {
    const schools: School[] = yield call(SchoolsApi.getSchools);
    yield put(actions.getSchoolsSuccess(schools));
  } catch (error) {
    yield put(showSnackbar({ type: 'error', message: t('Messages.Schools.Can not get schools.') }));
  } finally {
    yield put(stopAction(type));
  }
}

export default function* () {
  yield all([takeLatest(GET_SCHOOLS_REQUEST, getSchools)]);
}
