import {GET_APPOINTMENTS, SET_APPOINTMENT} from "../actions/types";

const INIT_STATE = {
  appointments: [{day: "Mon", appointments: [{}, {}, {}, {}]}, {day: "Tues", appointments: [{}, {}, {}, {}]}, {day: "Wed", appointments: [{}, {}, {}, {}]}, {day: "Thu", appointments: [{}, {}, {}, {}]}, {day: "Fri", appointments: [{}, {}, {}, {}]}],
  newAppointmentModal: {
    day: 0,
    member: 0,
    visible: false
  }
}

export default function(state = INIT_STATE, action){
  switch (action.type) {
    case GET_APPOINTMENTS:
      return{
        ...state,
        appointments: action.payload
      }
    case SET_APPOINTMENT:
      return {
        ...state,
        newAppointmentModal: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
