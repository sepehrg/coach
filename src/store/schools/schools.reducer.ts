import { produce } from 'immer';
import { SchoolsActionsType, SchoolsState, GET_SCHOOLS_SUCCESS } from './schools.types';

const initialState: SchoolsState = {
  data: [],
};

const SchoolsReducer = (state = initialState, action: SchoolsActionsType) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_SCHOOLS_SUCCESS:
        draft.data = action.payload;
        break;
    }
  });

export default SchoolsReducer;
