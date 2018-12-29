import {LOG_IN, LOG_IN_MODAL, LOG_OUT, GET_USER} from "../actions/types.js";

const INIT_STATE = {
  session: "",
  modal: false,
  user: {}
}

export default function(state = INIT_STATE, action){
  switch (action.type) {
    case LOG_OUT:
      return{
        ...state,
        session: "",
        user: {}
      }
    case LOG_IN:
      return{
        ...state,
        session: action.payload.token
      }
    case LOG_IN_MODAL:
      return{
        ...state,
        modal: action.payload
      }
    case GET_USER:
      return{
        ...state,
        user: {
          ...action.payload
        }
      }
    default:
      return{
        ...state
      }
  }
}
