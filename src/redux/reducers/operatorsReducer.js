import { helpers } from '../../common/helpers';
import { operatorConstants } from '../constants';

const initialState = {
  operators: {
    error: false,
    errorMessage: '',
    pending: false,
    fulfilled: false,
    operators: []
  },
  operator: {
    error: false,
    errorMessage: '',
    pending: false,
    fulfilled: false,
    operator: {}
  }
};

const operatorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case helpers.REJECTED_ACTION(operatorConstants.GET_OPERATORS):
      return helpers.setStateProp(
        'operators',
        {
          pending: false,
          error: action.error,
          errorMessage: helpers.getErrorMessageFromResults(action.payload)
        },
        {
          state,
          initialState
        }
      );

    case helpers.PENDING_ACTION(operatorConstants.GET_OPERATORS):
      return helpers.setStateProp(
        'operators',
        {
          pending: true,
          operators: []
        },
        {
          state,
          initialState
        }
      );

    case helpers.FULFILLED_ACTION(operatorConstants.GET_OPERATORS):
      return helpers.setStateProp(
        'operators',
        {
          operators: action.payload,
          pending: false,
          fulfilled: true
        },
        {
          state,
          initialState
        }
      );

    default:
      return state;
  }
};

operatorsReducer.initialState = initialState;

export { initialState, operatorsReducer };

export default operatorsReducer;
