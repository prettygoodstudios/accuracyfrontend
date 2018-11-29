import firebase from 'firebase';

import {GET_APPOINTMENTS, SET_APPOINTMENT, CLEAR_APPOINTMENT, VIEW_APPOINTMENT, HIDE_APPOINTMENT} from './types';
//import {firebaseKeys} from '../../apiKeys';
const firebaseKeys = {};

firebase.initializeApp(firebaseKeys);

const rootReference = firebase.database().ref("/");
const appointmentsReference = firebase.database().ref("/appointments");
//const setValue = [{day: "Mon", appointments: [{ name: "", time: ""}, { name: "", time: ""}, { name: "", time: ""}, {name: "Dow Jones", time: "11 AM"}]}, {day: "Tues", appointments: [{ name: "", time: ""}, { name: "", time: ""}, { name: "", time: ""}, { name: "", time: ""}]}, {day: "Wed", appointments: [{name: "", title: ""}, {name: "", title: ""}, {name: "", title: ""}, {name: "", title: ""}]}, {day: "Thu", appointments: [{ name: "", time: ""}, { name: "", time: ""}, {name: "Citi Group", time: "6 AM"}, { name: "", time: ""}]}, {day: "Fri", appointments: [{name: "Nasdaq", time: "7 PM"}, { name: "", time: ""}, { name: "", time: ""}, { name: "", time: ""}]}];

export const getAppointments = () => {
  return function(dispatch){
    appointmentsReference.once("value").then((snapshot) => {
      dispatch({
        type: GET_APPOINTMENTS,
        payload: Object.values(snapshot.toJSON())
      });
    });
    /*
    appointmentsReference.set(setValue).then(() => {
      return appointmentsReference.once("value");
    }).then((snapshot) => {
      console.log("MY Data", Object.values(snapshot.toJSON()));
      dispatch({
        type: GET_APPOINTMENTS,
        payload: Object.values(snapshot.toJSON())
      });
    });
    */
  }
}

export const viewAppointment = (day, member) => {
  return function(dispatch){
    const myAppointmentReference = firebase.database().ref(`/appointments/${day}/appointments/${member}`);
    myAppointmentReference.once("value").then((snapshot) => {
      dispatch({
        type: VIEW_APPOINTMENT,
        payload: {...snapshot.toJSON(), visible: true}
      });
    });
  }
}

export const hideAppointment = () => {
  return {
    type: HIDE_APPOINTMENT,
    payload: {
      name: "",
      time: "",
      visible: false
    }
  }
}

export const setAppointment = (day, member) => {
  return{
    type: SET_APPOINTMENT,
    payload: {
      day,
      member,
      visible: true
    }
  }
}

export const clearAppointment = () => {
  return{
    type: CLEAR_APPOINTMENT,
    payload: {
      day: 0,
      member: 0,
      visible: false
    }
  }
}

export const uploadAppointment = (appointment) => {
  return function(dispatch){
    const {day, member, company, time} = appointment;
    const myAppointmentReference = firebase.database().ref(`/appointments/${day}/appointments/${member}`);
    const myAppointment = {
      name: company,
      time
    }
    myAppointmentReference.set(myAppointment).then(() => {
      return appointmentsReference.once("value");
    }).then((snapshot) => {
      console.log("MY Data", Object.values(snapshot.toJSON()));
      dispatch(getAppointments());
    });
  }
}
