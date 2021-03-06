import React, {Component} from "react";
import {connect} from 'react-redux';

import * as actions from "../../actions";

import Modal from "../widgets/modal";
import Error from "../widgets/error";

const ScheduleSection = (props) => {
  const {day, section, appointments, getApointment, setApointment, staff, user, dayMonth} = props;
  return(
    <div className={`schedule__section schedule__section-day-${section}`}>
      <div className="schedule__section__day">
        {day}
        <span>{dayMonth}</span>
      </div>
      { staff.map((s, i) => {
        if(appointments[s.id] && user.id && (appointments[s.id].user === user.id || user.role === "admin")){
          const {name, time, id} = appointments[s.id];
          return(
            <div className="schedule__section__apointment" key={i}>
               <a onClick={() => getApointment({name, time, id})} className="schedule__section__apointment__more-info">
                 <span className="schedule__section__apointment__name">{name}</span>
                 <span className="schedule__section__apointment__time">{time}</span>
                 <span className="schedule__section__apointment__time">Click For More Info</span>
               </a>
             </div>
           );
        }else if(!appointments[s.id]){
          return(
            <a onClick={() => setApointment(s.id)} className="schedule__section__apointment__book">
              <span className="schedule__section__apointment__book__title">Book</span>
              <span className="schedule__section__apointment__book__description">Click To Book</span>
            </a>
          );
        }else{
          return (
            <div className="schedule__section__apointment" key={i}>
              <a className="schedule__section__apointment__more-info">
                <span className="schedule__section__apointment__name">Booked!</span>
              </a>
            </div>
          );
        }
      })}
    </div>
  );
}

class Schedule extends Component{

  constructor(){
    super();
    this.state = {
      appointmentCompany: "",
      appointmentTime: "",
      error: ""
    }
  }

  componentDidMount(){
    this.props.getAppointments();
    this.props.getStaff(() => this.props.setScroll(), () => this.props.setScroll());
  }

  getApointment = (appointment) => {
    this.props.viewAppointment(appointment);
  }


  setApointment = (day, member, id) => {
    if(this.props.session == ""){
      this.props.logInModal(true);
    }else{
      this.props.setAppointment(day, member, id);
    }
  }

  clearAppointment = () => {
    this.props.clearAppointment();
    this.setState({
      appointmentCompany: "",
      appointmentTime: "",
      error: ""
    });
  }

  updateInput = (type, e) => {
    const value = e.target.value;
    if(type == "company"){
      this.setState({
        appointmentCompany: value
      });
    }else{
      this.setState({
        appointmentTime: value
      });
    }
  }

  uploadAppointment = () => {
    const {newAppointmentModal} = this.props;
    const {day, member} = newAppointmentModal;
    const {appointmentCompany, appointmentTime} = this.state;
    const myAppointment = {
      day,
      member,
      time: appointmentTime,
      company: appointmentCompany
    }
    if(appointmentCompany != "" && appointmentTime != ""){
      if(appointmentCompany.length > 20){
        this.setState({error: "Your company/entity name can not exceed twenty characters."});
      }else{
        this.props.uploadAppointment(myAppointment, this.props.session, () => console.log("success!"), (e) => alert("It failed", e));
        this.clearAppointment();
      }
    }else{
      this.setState({error: "You must enter in a company/entity name and time."});
    }
  }

  deleteAppointment = (params) => {
    this.props.deleteAppointment(params, () => this.props.hideAppointment(), (e) => this.setState({error: e.toString()}));
  }

  render(){
    const {appointments, newAppointmentModal, clearAppointment, viewAppointmentModal, hideAppointment, staff, user} = this.props;
    const {appointmentCompany, appointmentTime, error} = this.state;
    const days = [appointments.slice(0,3), appointments.slice(3, 5)];
    //const staff = [{name: "John Doe"}, {name: "Sam Smith"}, {name: "Bryan Jones"}, {name: "Mike Taylor"}];
    return(
      <div id="schedule">
        <p><span className="start-phrase">Our schedule</span> can be used to view and book free consulations for the current week with one of our friendly staff members.</p>
        { newAppointmentModal.visible &&
          <Modal dismissModal={() => this.clearAppointment()} submitModal={() => this.uploadAppointment()}>
            <div className="set-appointment-modal">
              <p>Fill out this form to book a free consultation.</p>
              <label for="company">Company/Entity Name *</label>
              <input type="text" id="company" name="company" value={appointmentCompany} onChange={(t) => this.updateInput("company", t)}/>
              <label for="time">Select Time *</label>
              <select name="time" id="time" value={appointmentTime} onChange={(t) => this.updateInput("time", t)}>
                <option value="" disabled selected>Select a Time</option>
                <option>11 AM</option>
                <option>12 PM</option>
                <option>1 PM</option>
              </select>
              <center><Error error={error}/></center>
            </div>
          </Modal>
        }
        { viewAppointmentModal.visible &&
          <Modal dismissModal={() => hideAppointment()}>
            <div className="view-appointment-modal">
              <p>{viewAppointmentModal.name} has an appointment at {viewAppointmentModal.time}.</p>
              <a onClick={() => this.deleteAppointment({token: this.props.session, id: viewAppointmentModal.id})} className="button">Cancel Appointment</a>
              <center><Error error={error}/></center>
            </div>
          </Modal>
        }
        <div className="schedule">
          <div className="schedule__section schedule__staff">
            <div className="schedule__section__day">
              Staff
            </div>
            {staff.map((s, i) => {
              return (
                <div className="schedule__staff__member" key={i}>
                  {s.name}
                </div>
              )
            })}
          </div>
          { staff && days[0].map((d, i) => {
            return <ScheduleSection staff={staff} dayMonth={d.dayMonth} user={user} day={d.day} getApointment={(m) => this.getApointment(m)} setApointment={(m) => this.setApointment(i, m)} appointments={d.appointments} section="1" key={i}/>
          })
          }
          <div className="schedule__section schedule__staff schedule__staff-2">
            <div className="schedule__section__day">
              Staff
            </div>
            {staff.map((s, i) => {
              return (
                <div className="schedule__staff__member" key={i}>
                  {s.name}
                </div>
              )
            })}
          </div>
          { staff && days[1].map((d, i) => {
            return <ScheduleSection day={d.day} dayMonth={d.dayMonth} user={user} staff={staff} getApointment={(m) => this.getApointment(m)} setApointment={(m) => this.setApointment(i+3, m)} appointments={d.appointments} section="2" key={i}/>
          })
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {appointments, newAppointmentModal, viewAppointmentModal, staff} = state.schedule;
  const {session, user} = state.auth;
  return{
    appointments,
    newAppointmentModal,
    viewAppointmentModal,
    staff,
    session,
    user
  }
}

export default connect(mapStateToProps, actions)(Schedule);
