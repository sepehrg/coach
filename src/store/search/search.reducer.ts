import { produce } from 'immer';
import {
  CLEAR_SEARCH,
  SEARCH_SUCCESS,
  SearchActionsType,
  SearchState,
  SET_SEARCH_QUERY,
} from 'store/search/search.types';

const initialState: SearchState = {
  query: '',
  result: [],
};

const SearchReducer = (state = initialState, action: SearchActionsType) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_SEARCH_QUERY:
        draft.query = action.payload;
        break;
      case SEARCH_SUCCESS:
        draft.result = action.payload;
        break;
      case CLEAR_SEARCH:
        draft.result = initialState.result;
        draft.query = initialState.query;
        break;
    }
  });

export default SearchReducer;
