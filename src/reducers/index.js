import { combineReducers } from 'redux';

import schedule from './schedule';
import auth from "./auth";

const rootReducer = combineReducers({
  state: (state = {}) => state,
  schedule,
  auth
});

export default rootReducer;
