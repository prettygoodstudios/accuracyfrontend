import {GET_APPOINTMENTS, SET_APPOINTMENT, CLEAR_APPOINTMENT, VIEW_APPOINTMENT, HIDE_APPOINTMENT, GET_STAFF} from "../actions/types";

const INIT_STATE = {
  appointments: [{day: "Mon", appointments: [{}, {}, {}, {}]}, {day: "Tues", appointments: [{}, {}, {}, {}]}, {day: "Wed", appointments: [{}, {}, {}, {}]}, {day: "Thu", appointments: [{}, {}, {}, {}]}, {day: "Fri", appointments: [{}, {}, {}, {}]}],
  newAppointmentModal: {
    day: 0,
    member: 0,
    visible: false
  },
  viewAppointmentModal: {
    name: "",
    time: "",
    visible: false
  },
  staff: []
}

export default function(state = INIT_STATE, action){
  switch (action.type) {
    case GET_APPOINTMENTS:
      return{
        ...state,
        appointments: action.payload
      }
    case CLEAR_APPOINTMENT:
    case SET_APPOINTMENT:
      return {
        ...state,
        newAppointmentModal: action.payload
      }
    case HIDE_APPOINTMENT:
    case VIEW_APPOINTMENT:
      return{
        ...state,
        viewAppointmentModal: action.payload
      }
    case GET_STAFF:
      return{
        ...state,
        staff: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
