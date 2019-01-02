import firebase from 'firebase';
import axios from 'axios';
import {GET_APPOINTMENTS, SET_APPOINTMENT, CLEAR_APPOINTMENT, VIEW_APPOINTMENT, HIDE_APPOINTMENT, GET_STAFF, GET_MY_APPOINTMENTS, CREATE_STAFF} from './types';
import {generateUrl} from "./urlHelpers";

const firebaseKeys = {
  ...process.env
};

firebase.initializeApp(firebaseKeys);

const rootReference = firebase.database().ref("/");
const appointmentsReference = firebase.database().ref("/appointments");
//const setValue = [{day: "Mon", appointments: [{ name: "", time: ""}, { name: "", time: ""}, { name: "", time: ""}, {name: "Dow Jones", time: "11 AM"}]}, {day: "Tues", appointments: [{ name: "", time: ""}, { name: "", time: ""}, { name: "", time: ""}, { name: "", time: ""}]}, {day: "Wed", appointments: [{name: "", title: ""}, {name: "", title: ""}, {name: "", title: ""}, {name: "", title: ""}]}, {day: "Thu", appointments: [{ name: "", time: ""}, { name: "", time: ""}, {name: "Citi Group", time: "6 AM"}, { name: "", time: ""}]}, {day: "Fri", appointments: [{name: "Nasdaq", time: "7 PM"}, { name: "", time: ""}, { name: "", time: ""}, { name: "", time: ""}]}];

const parseAppointments = (data) => {
  const currenAppointments = data.filter((a) => {
    const time = new Date(a.time);
    const diff = new Date() - new Date(a.time);
    const days = diff/(1000*60*60*24);
    return days < 7;
  });
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const formattedAppointments = currenAppointments.map((a) => {
    const timeStamp = new Date(a.time);
    const day = days[(timeStamp.getDay() - 1)];
    const time = timeStamp.getHours() % 12 + (timeStamp.getHours()/12 == 1 ? 12 : 0) + (timeStamp.getHours()/12 >= 1 ? "PM" : "AM");
    return {name: (a.company ? a.company : "Booked!"), time, day, staff: a.staff_id, user: a.user_id};
  }).filter((a) => a.day);
  let week = [];

  days.forEach((d) => {
    const selected = formattedAppointments.filter((a) => a.day == d && a.day != undefined);
    let appointments = {};
    selected.forEach((s) => {
      appointments[s.staff] = s;
    });
    week.push({day: d, appointments});
  });
  return week;
}

export const getAppointments = () => {
  return function(dispatch){
    
    axios.get(generateUrl('/appointments', {})).then(({data}) => {
      const week = parseAppointments(data);
      dispatch({
        type: GET_APPOINTMENTS,
        payload: week
      });
    });
  }
}

export const getMyAppointments = (token, success, error) => {
  return function(dispatch){
    axios.get(generateUrl('/appointments/mine', {token})).then(({data}) => {
      if(!data.error){
        const week = parseAppointments(data);
        console.log("My Appointments",week);
        dispatch({
          type: GET_MY_APPOINTMENTS,
          payload: week
        });
        success();
      }else{
        error(e);
      }
    }).catch((e) => {
      error(e);
    });
  }
}

export const getStaff = (success, error) => {
  return function(dispatch){
    axios.get(generateUrl('/staff', {})).then(({data}) => {
      if(!data.error){
        dispatch({
          type: GET_STAFF,
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

export const viewAppointment = (appointment) => {
  return{
    type: VIEW_APPOINTMENT,
    payload: {...appointment, visible: true}
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

export const uploadAppointment = (appointment, token, success, error) => {
  return function(dispatch){
    const {day, member, company, time} = appointment;
    const dayDiff = (day+1)-new Date().getDay();
    const hourDiff = parseInt(time.split('PM')[0].split('AM')[0].trim()) - new Date().getHours() % 12 + (time.indexOf('PM') != -1 ? 0 : 12) + (parseInt(time.split('PM')[0].split('AM')[0].trim()) % 12 == 0 ? -12 : 0);
    const minuteDiff = new Date().getMinutes();
    const myDate = new Date().getTime() + dayDiff*1000*60*60*24 + hourDiff*1000*60*60 - minuteDiff*1000*60 - new Date().getTimezoneOffset()*60*1000; 
    axios.post(generateUrl('/appointments', {token, time: new Date(myDate).toISOString().slice(0, 19).replace('T', ' '), company, staff_id: member})).then(({data}) => {
      if(!data.error){
        dispatch({
          type: GET_APPOINTMENTS,
          payload: parseAppointments(data)
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


export const createStaff = (params, success, error) => {
  return function(dispatch){
    axios.post(generateUrl('/staff', params)).then(({data}) => {
      if(!data.error){
        dispatch({
          type: CREATE_STAFF,
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
