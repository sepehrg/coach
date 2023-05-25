import { RootState } from '../rootReducer';
import { createSelector } from 'reselect';
import { TopicState } from './topics.types';

export const topicsSelector = (state: RootState) => state.topics;
export const topicsDataSelector = createSelector(topicsSelector, (state) => state.data);
export const selectedTopicSelector = createSelector(
  topicsSelector,
  (topics: TopicState) => topics.selectedItem,
);
export const chosenTopicSelector = createSelector(
  topicsSelector,
  (topics: TopicState) => topics.chosenTopic,
);
