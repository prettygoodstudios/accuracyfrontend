import {GET_APPOINTMENTS} from "../actions/types";

const INIT_STATE = {
  appointments: [{day: "Mon", appointments: [{}, {}, {}, {}]}, {day: "Tues", appointments: [{}, {}, {}, {}]}, {day: "Wed", appointments: [{}, {}, {}, {}]}, {day: "Thu", appointments: [{}, {}, {}, {}]}, {day: "Fri", appointments: [{}, {}, {}, {}]}]
}

export default function(state = INIT_STATE, action){
  switch (action.type) {
    case GET_APPOINTMENTS:
      return{
        appointments: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
