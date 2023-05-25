import { CreateLessonSummaryRequest, LessonSummary } from 'entities/LessonSummary';
import { NavigateFunction } from 'react-router-dom';

export const CREATE_SUMMARY_REQUEST = 'CREATE_SUMMARY_REQUEST';
export const CREATE_SUMMARY_SUCCESS = 'CREATE_SUMMARY_SUCCESS';

export interface CreateSummaryRequest {
  type: typeof CREATE_SUMMARY_REQUEST;
  payload: { summary: CreateLessonSummaryRequest; navigate: NavigateFunction };
}

export interface CreateSummarySuccess {
  type: typeof CREATE_SUMMARY_SUCCESS;
  payload: LessonSummary;
}

export interface SummaryState {
  data: LessonSummary[];
}

export type SummaryActionType = CreateSummaryRequest | CreateSummarySuccess;
