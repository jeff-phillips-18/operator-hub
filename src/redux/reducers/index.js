import { combineReducers } from 'redux';
import { operatorsReducer } from './operatorsReducer';

const reducers = {
  operators: operatorsReducer
};

const reduxReducers = combineReducers(reducers);

export { reduxReducers, reducers };

export default reduxReducers;
