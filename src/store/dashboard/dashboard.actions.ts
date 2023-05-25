import {
  DashboardActionTypes,
  GET_CLASSMATES_REQUEST,
  GET_CLASSMATES_SUCCESS,
  GET_STUDY_PROGRESS_REQUEST,
  GET_STUDY_PROGRESS_SUCCESS,
} from './dashboard.types';
import { RecentlyActiveStudent, StudyProgressPayload } from 'entities/Student';
import { StudyProgressResponse } from 'entities/Dashboard';

export const getClassmatesRequest = (): DashboardActionTypes => ({
  type: GET_CLASSMATES_REQUEST,
});

export const getClassmatesSuccess = (payload: RecentlyActiveStudent[]): DashboardActionTypes => ({
  type: GET_CLASSMATES_SUCCESS,
  payload,
});

export const getStudyProgressRequest = (payload: StudyProgressPayload): DashboardActionTypes => ({
  type: GET_STUDY_PROGRESS_REQUEST,
  payload,
});

export const getStudyProgressSuccess = (payload: StudyProgressResponse): DashboardActionTypes => ({
  type: GET_STUDY_PROGRESS_SUCCESS,
  payload,
});
