import { Topic } from 'entities/Topic';

export const GET_TOPICS_REQUEST = 'GET_TOPICS_REQUEST';
export const GET_TOPICS_SUCCESS = 'GET_TOPICS_SUCCESS';
export const GET_TOPIC_BY_ID_REQUEST = 'GET_TOPIC_BY_ID_REQUEST';
export const GET_TOPICS_BY_SUBJECT_REQUEST = 'GET_TOPICS_BY_SUBJECT_REQUEST';
export const GET_TOPICS_BY_NAME_REQUEST = 'GET_TOPICS_BY_NAME_REQUEST';
export const GET_RECENT_TOPICS_REQUEST = 'GET_RECENT_TOPICS_REQUEST';
export const SELECT_TOPIC = 'TOPICS_SELECT_TOPIC';
export const CHOOSE_TOPIC = 'CHOOSE_TOPIC';
export const CLEAR_SELECTED_TOPIC = 'TOPICS_CLEAR_SELECTED_TOPIC';
export const CLEAR_CHOSEN_TOPIC = 'TOPICS_CLEAR_CHOSEN_TOPIC';
export const RESET_TOPICS = 'TOPICS_RESET_TOPICS';

export interface TopicState {
  data: Topic[];
  selectedItem: Topic | null;
  chosenTopic: string | null;
  searchData: Topic[];
}

export interface GetTopicsRequest {
  type: typeof GET_TOPICS_REQUEST;
}

export interface GetTopicsBySubjectRequest {
  type: typeof GET_TOPICS_BY_SUBJECT_REQUEST;
  payload: string;
}

export interface GetTopicsByNameRequest {
  type: typeof GET_TOPICS_BY_NAME_REQUEST;
  payload: string;
}
export interface GetRecentTopicsRequest {
  type: typeof GET_RECENT_TOPICS_REQUEST;
}

export interface GetTopicByIdRequest {
  type: typeof GET_TOPIC_BY_ID_REQUEST;
  payload: string;
}

export interface GetTopicsSuccess {
  type: typeof GET_TOPICS_SUCCESS;
  payload: Topic[];
}

export interface SelectTopicAction {
  type: typeof SELECT_TOPIC;
  payload: Topic;
}
export interface ChooseTopicAction {
  type: typeof CHOOSE_TOPIC;
  payload: string;
}

export interface ClearSelectedTopic {
  type: typeof CLEAR_SELECTED_TOPIC;
}

export interface ClearChosenTopic {
  type: typeof CLEAR_CHOSEN_TOPIC;
}

export interface ResetTopicsAction {
  type: typeof RESET_TOPICS;
}

export type TopicActionTypes =
  | GetTopicsRequest
  | GetTopicsSuccess
  | SelectTopicAction
  | ChooseTopicAction
  | ClearSelectedTopic
  | ClearChosenTopic
  | ResetTopicsAction
  | GetTopicsBySubjectRequest
  | GetTopicsByNameRequest
  | GetTopicByIdRequest
  | GetRecentTopicsRequest;
