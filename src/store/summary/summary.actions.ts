import { CreateLessonSummaryRequest, LessonSummary } from 'entities/LessonSummary';
import { CREATE_SUMMARY_REQUEST, CREATE_SUMMARY_SUCCESS, SummaryActionType } from './summary.types';
import { NavigateFunction } from 'react-router-dom';

export const createSummaryRequest = (
  summary: CreateLessonSummaryRequest,
  navigate: NavigateFunction,
): SummaryActionType => ({
  type: CREATE_SUMMARY_REQUEST,
  payload: { summary, navigate },
});

export const createSummarySuccess = (payload: LessonSummary): SummaryActionType => ({
  type: CREATE_SUMMARY_SUCCESS,
  payload,
});
