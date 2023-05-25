import { useDispatch } from 'react-redux';
import {
  clearSelectedTopic,
  getRecentTopicsRequest,
  getTopicByIdRequest,
  getTopicsRequest,
  getTopicsBySubjectRequest,
  resetTopics,
  selectTopic,
  chooseTopic,
  clearChosenTopic,
} from './topic.actions';
import { Topic } from 'entities/Topic';
import { useMemo } from 'react';

export const useTopicActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => ({
      get: () => {
        dispatch(getTopicsRequest());
      },
      getRecent: () => {
        dispatch(getRecentTopicsRequest());
      },
      getById: (topicId: string) => {
        dispatch(getTopicByIdRequest(topicId));
      },
      getBySubject: (subjectId: string) => {
        dispatch(getTopicsBySubjectRequest(subjectId));
      },
      selectItem: (topic: Topic) => {
        dispatch(selectTopic(topic));
      },
      chooseTopic: (topic: string) => {
        dispatch(chooseTopic(topic));
      },
      clearChosenTopic: () => {
        dispatch(clearChosenTopic());
      },
      clearSelectedItem: () => {
        dispatch(clearSelectedTopic());
      },
      reset: () => {
        dispatch(resetTopics());
      },
    }),
    [dispatch],
  );
};
