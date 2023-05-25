import { Topic } from 'entities/Topic';
import {
  CLEAR_SELECTED_TOPIC,
  GET_RECENT_TOPICS_REQUEST,
  GET_TOPIC_BY_ID_REQUEST,
  GET_TOPICS_BY_NAME_REQUEST,
  GET_TOPICS_BY_SUBJECT_REQUEST,
  GET_TOPICS_REQUEST,
  GET_TOPICS_SUCCESS,
  RESET_TOPICS,
  SELECT_TOPIC,
  CHOOSE_TOPIC,
  CLEAR_CHOSEN_TOPIC,
  TopicActionTypes,
} from './topics.types';

export const getTopicsRequest = (): TopicActionTypes => ({
  type: GET_TOPICS_REQUEST,
});

export const getTopicsBySubjectRequest = (payload: string): TopicActionTypes => ({
  type: GET_TOPICS_BY_SUBJECT_REQUEST,
  payload,
});

export const getTopicsByNameRequest = (payload: string): TopicActionTypes => ({
  type: GET_TOPICS_BY_NAME_REQUEST,
  payload,
});

export const getTopicByIdRequest = (payload: string): TopicActionTypes => ({
  type: GET_TOPIC_BY_ID_REQUEST,
  payload,
});

export const getRecentTopicsRequest = (): TopicActionTypes => ({
  type: GET_RECENT_TOPICS_REQUEST,
});

export const getTopicsSuccess = (payload: Topic[]): TopicActionTypes => ({
  type: GET_TOPICS_SUCCESS,
  payload,
});

export const selectTopic = (payload: Topic): TopicActionTypes => ({
  type: SELECT_TOPIC,
  payload,
});

export const chooseTopic = (payload: string): TopicActionTypes => ({
  type: CHOOSE_TOPIC,
  payload,
});

export const clearSelectedTopic = (): TopicActionTypes => ({
  type: CLEAR_SELECTED_TOPIC,
});

export const clearChosenTopic = (): TopicActionTypes => ({
  type: CLEAR_CHOSEN_TOPIC,
});

export const resetTopics = (): TopicActionTypes => ({
  type: RESET_TOPICS,
});
