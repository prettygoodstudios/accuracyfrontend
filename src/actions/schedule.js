import firebase from 'firebase';

import {GET_APPOINTMENTS} from './types';
import {firebaseKeys} from '../../apiKeys';


firebase.initializeApp(firebaseKeys);

const rootReference = firebase.database().ref("/");
const appointmentsReference = firebase.database().ref("/appointments");
const setValue = [{day: "Mon", appointments: [{ name: "", time: ""}, { name: "", time: ""}, { name: "", time: ""}, {name: "Dow Jones", time: "11 AM"}]}, {day: "Tues", appointments: [{ name: "", time: ""}, { name: "", time: ""}, { name: "", time: ""}, { name: "", time: ""}]}, {day: "Wed", appointments: [{name: "", title: ""}, {name: "", title: ""}, {name: "", title: ""}, {name: "", title: ""}]}, {day: "Thu", appointments: [{ name: "", time: ""}, { name: "", time: ""}, {name: "Citi Group", time: "6 AM"}, { name: "", time: ""}]}, {day: "Fri", appointments: [{name: "Nasdaq", time: "7 PM"}, { name: "", time: ""}, { name: "", time: ""}, { name: "", time: ""}]}];

export const getAppointments = () => {
  return function(dispatch){
    appointmentsReference.set(setValue).then(() => {
      return appointmentsReference.once("value");
    }).then((snapshot) => {
      console.log("MY Data", Object.values(snapshot.toJSON()));
      dispatch({
        type: GET_APPOINTMENTS,
        payload: Object.values(snapshot.toJSON())
      });
    });
  }
}

export const getAppointment = () => {

}
