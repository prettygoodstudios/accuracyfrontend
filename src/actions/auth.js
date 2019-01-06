import {LOG_IN, LOG_IN_MODAL, LOG_OUT, GET_USER} from "./types";
import {generateUrl} from "./urlHelpers";
import axios from "axios";

import {getMyAppointments} from "./schedule";

export const logInModal = (show) => {
  return {
    type: LOG_IN_MODAL,
    payload: show
  }
}

export const logIn = (email, password, success, error) => {
  return function(dispatch){
    axios.post(generateUrl('/users/session' ,{email, password})).then(({data}) => {
      if(!data.error){
        dispatch({
          type: LOG_IN,
          payload: data
        });
        dispatch(getUser(data.token, () => dispatch(getMyAppointments(data.token, success, error)), error));
      }else{
        error(data.error);
      }
    }).catch((e) => {
      error(e);
    });
  }
}

export const createUser = (email, password, success, error) => {
  return function(dispatch){
    axios.post(generateUrl('/users', {email, password})).then(({data}) => {
      if(!data.error){
        dispatch(logIn(email, password, success, error));
      }else{
        error(data.error);
      }
    }).catch((e) => {
      error(e);
    });
  }
}

export const getUser = (token, success, error) => {
  return function(dispatch){
    axios.get(generateUrl('/users', {token})).then(({data}) => {
      if(!data.error){
        dispatch({
          type: GET_USER,
          payload: data
        });
        success();
      }else{
        error(data.error);
      }
    }).catch((e) => {
      error(e);
    });
  }
}

export const logOut = () => {
  return {
    type: LOG_OUT,
    payload: ""
  }
}
