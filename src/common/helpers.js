import * as _ from 'lodash-es';

const noop = Function.prototype;

const setStateProp = (prop, data, options) => {
  const { state = {}, initialState = {}, reset = true } = options;
  const obj = { ...state };

  if (!state[prop]) {
    console.error(`Error: Property ${prop} does not exist within the passed state.`, state);
  }

  if (reset && !initialState[prop]) {
    console.warn(`Warning: Property ${prop} does not exist within the passed initialState.`, initialState);
  }

  if (reset) {
    obj[prop] = {
      ...state[prop],
      ...initialState[prop],
      ...data
    };
  } else {
    obj[prop] = {
      ...state[prop],
      ...data
    };
  }

  return obj;
};

const getErrorMessageFromResults = results => {
  const responseData = _.get(results, 'response.data', results.message);

  if (typeof responseData === 'string') {
    return responseData;
  }

  const getMessages = messageObject =>
    _.map(messageObject, next => {
      if (_.isString(next)) {
        return next;
      }
      if (_.isArray(next)) {
        return getMessages(next);
      }
      return 'Unknown error';
    });

  return _.join(getMessages(responseData), '\n');
};

const FULFILLED_ACTION = base => `${base}_FULFILLED`;

const PENDING_ACTION = base => `${base}_PENDING`;

const REJECTED_ACTION = base => `${base}_REJECTED`;

export const helpers = {
  noop,
  setStateProp,
  getErrorMessageFromResults,
  FULFILLED_ACTION,
  PENDING_ACTION,
  REJECTED_ACTION
};

export default helpers;
