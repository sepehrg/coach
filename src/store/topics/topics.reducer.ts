import { produce } from 'immer';
import {
  CLEAR_SELECTED_TOPIC,
  GET_TOPICS_SUCCESS,
  RESET_TOPICS,
  SELECT_TOPIC,
  CHOOSE_TOPIC,
  TopicActionTypes,
  TopicState,
  CLEAR_CHOSEN_TOPIC,
} from './topics.types';

const initialState: TopicState = {
  data: [],
  selectedItem: null,
  chosenTopic: null,
  searchData: [],
};

const TopicsReducer = (state = initialState, action: TopicActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_TOPICS_SUCCESS:
        draft.data = action.payload;
        break;
      case SELECT_TOPIC:
        draft.selectedItem = action.payload;
        break;
      case CHOOSE_TOPIC:
        draft.chosenTopic = action.payload;
        break;
      case CLEAR_SELECTED_TOPIC:
        draft.selectedItem = initialState.selectedItem;
        break;
      case CLEAR_CHOSEN_TOPIC:
        draft.chosenTopic = initialState.chosenTopic;
        break;
      case RESET_TOPICS:
        draft.selectedItem = initialState.selectedItem;
        draft.data = initialState.data;
        draft.chosenTopic = initialState.chosenTopic;
        break;
    }
  });

export default TopicsReducer;
