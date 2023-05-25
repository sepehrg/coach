import { CREATE_SUMMARY_SUCCESS, SummaryActionType, SummaryState } from './summary.types';
import { produce } from 'immer';

const initialState: SummaryState = {
  data: [],
};

const SummaryReducer = (state = initialState, action: SummaryActionType) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CREATE_SUMMARY_SUCCESS:
        draft.data.push(action.payload);
        break;
    }
  });

export default SummaryReducer;
