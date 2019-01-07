import { combineReducers } from 'redux';

import schedule from './schedule';
import auth from "./auth";
import reviews from "./reviews";

const rootReducer = combineReducers({
  state: (state = {}) => state,
  schedule,
  auth,
  reviews
});

export default rootReducer;
