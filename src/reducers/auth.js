import {LOG_IN, LOG_IN_MODAL, LOG_OUT} from "../actions/types.js";

const INIT_STATE = {
  session: "",
  modal: false
}

export default function(state = INIT_STATE, action){
  switch (action.type) {
    case LOG_OUT:
    case LOG_IN:
      return{
        ...state,
        session: action.payload
      }
    case LOG_IN_MODAL:
      return{
        ...state,
        modal: action.payload
      }
    default:
      return{
        ...state
      }
  }
}
