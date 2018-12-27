import {LOG_IN, LOG_IN_MODAL, LOG_OUT} from "./types";
import {generateUrl} from "./urlHelpers";
import axios from "axios";

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
        success(data);
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
