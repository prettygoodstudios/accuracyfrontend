import { combineReducers } from 'redux';

import schedule from './schedule';

const rootReducer = combineReducers({
  state: (state = {}) => state,
  schedule
});

export default rootReducer;
