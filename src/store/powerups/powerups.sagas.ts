import {
  GetPowerupsRequest,
  CreatePowerupRequest,
  EditPowerupRequest,
  DeletePowerupRequest,
  GET_POWERUPS_REQUEST,
  CREATE_POWERUP_REQUEST,
  EDIT_POWERUP_REQUEST,
  DELETE_POWERUP_REQUEST,
  GetBreakPowerupRequest,
  GET_BREAK_POWERUP_REQUEST,
} from 'store/powerups/powerups.types';
import { put, call, all, takeLatest } from 'redux-saga/effects';
import { startAction, stopAction } from 'store/loader/loader.actions';
import PowerupsApi from 'services/powerups.service';
import { Powerup } from 'entities/Powerup';
import {
  getPowerupsSuccess,
  createPowerupSuccess,
  editPowerupSuccess,
  deletePowerupSuccess,
  getBreakPowerupSuccess,
} from 'store/powerups/powerups.actions';
import { message } from 'antd';
import _ from 'lodash-es';

function* getPowerups({ type }: GetPowerupsRequest) {
  yield put(startAction(type));
  try {
    const powerups: Powerup[] = yield call(PowerupsApi.getPowerups);
    yield put(getPowerupsSuccess(powerups));
  } catch (e) {
    message.error('Can not get powerups now');
  } finally {
    yield put(stopAction(type));
  }
}

function* getBreakPowerup({ type }: GetBreakPowerupRequest) {
  yield put(startAction(type));
  try {
    const powerups: Powerup[] = yield call(PowerupsApi.getPowerups);
    yield put(getBreakPowerupSuccess(yield powerups[_.random(powerups.length - 1)]));
  } catch (e) {
    message.error('Can not get break powerup now');
  } finally {
    yield put(stopAction(type));
  }
}

function* createPowerup({ type, payload }: CreatePowerupRequest) {
  yield put(startAction(type));
  try {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('advice', payload.advice);
    formData.append('icon', payload.icon);
    const powerup: Powerup = yield call(PowerupsApi.createPowerup, formData);
    yield put(createPowerupSuccess(powerup));
  } catch (e) {
    message.error('Can not create powerup now');
  } finally {
    yield put(stopAction(type));
  }
}

function* editPowerup({ type, payload }: EditPowerupRequest) {
  yield put(startAction(type));
  try {
    const powerup: Powerup = yield call(PowerupsApi.editPowerup, payload);
    yield put(editPowerupSuccess(powerup));
  } catch (e) {
    message.error('Can not edit powerup now');
  } finally {
    yield put(stopAction(type));
  }
}

function* deletePowerup({ type, payload }: DeletePowerupRequest) {
  yield put(startAction(type));
  try {
    yield call(PowerupsApi.deletePowerup, payload);
    yield put(deletePowerupSuccess(payload));
  } catch (e) {
    message.error('Can not delete powerup now');
  } finally {
    yield put(stopAction(type));
  }
}

export default function* () {
  yield all([
    takeLatest(GET_POWERUPS_REQUEST, getPowerups),
    takeLatest(CREATE_POWERUP_REQUEST, createPowerup),
    takeLatest(EDIT_POWERUP_REQUEST, editPowerup),
    takeLatest(DELETE_POWERUP_REQUEST, deletePowerup),
    takeLatest(GET_BREAK_POWERUP_REQUEST, getBreakPowerup),
  ]);
}
