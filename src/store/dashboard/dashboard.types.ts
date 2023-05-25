import { RecentlyActiveStudent, StudyProgressPayload } from 'entities/Student';
import { StudyProgressDay, StudyProgressResponse } from 'entities/Dashboard';

export const GET_CLASSMATES_REQUEST = 'GET_CLASSMATES_REQUEST';
export const GET_CLASSMATES_SUCCESS = 'GET_CLASSMATES_SUCCESS';
export const GET_STUDY_PROGRESS_REQUEST = 'GET_STUDY_PROGRESS_REQUEST';
export const GET_STUDY_PROGRESS_SUCCESS = 'GET_STUDY_PROGRESS_SUCCESS';

export interface DashboardState {
  classmates: RecentlyActiveStudent[] | null;
  progress: number | null;
  mintuesStudied: number | null;
  statistics?: StudyProgressDay[] | null;
  stars: number | null;
}

export interface getClassmatesRequest {
  type: typeof GET_CLASSMATES_REQUEST;
}

export interface getClassmatesSuccess {
  type: typeof GET_CLASSMATES_SUCCESS;
  payload: RecentlyActiveStudent[];
}

export interface getStudyProgressRequest {
  type: typeof GET_STUDY_PROGRESS_REQUEST;
  payload: StudyProgressPayload;
}

export interface getStudyProgressSuccess {
  type: typeof GET_STUDY_PROGRESS_SUCCESS;
  payload: StudyProgressResponse;
}

export type DashboardActionTypes =
  | getClassmatesRequest
  | getClassmatesSuccess
  | getStudyProgressRequest
  | getStudyProgressSuccess;
