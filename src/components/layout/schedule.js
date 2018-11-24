import React, {Component} from "react";
import {connect} from 'react-redux';

import * as actions from "../../actions";

import Modal from "../widgets/modal";

const ScheduleSection = (props) => {
  const {day, section, appointments, getApointment, setApointment} = props;
  console.log(appointments);
  return(
    <div className={`schedule__section schedule__section-day-${section}`}>
      <div className="schedule__section__day">
      {day}
      </div>
      { Object.values(appointments).map((a, i) => {
        const {name, time} = a;
        return (
          <div className="schedule__section__apointment" key={i}>
            { a.name ?
              <a onClick={() => getApointment(i)} className="schedule__section__apointment__more-info">
                <span className="schedule__section__apointment__name">{name}</span>
                <span className="schedule__section__apointment__time">{time}</span>
                <span className="schedule__section__apointment__time">Click For More Info</span>
              </a>
              :
              <a onClick={() => setApointment(i)} className="schedule__section__apointment__book">Book</a>
            }
          </div>
        )
      })}
    </div>
  );
}

class Schedule extends Component{

  componentDidMount(){
    this.props.getAppointments();
  }

  getApointment = (day, member) => {
    alert(`It is day ${day} with ${member}`)
  }

  setApointment = (day, member) => {
    this.props.setAppointment(day, member);
  }

  render(){
    const {appointments} = this.props;
    const days = [appointments.slice(0,3), appointments.slice(3, 5)];
    const staff = [{name: "John Doe"}, {name: "Sam Smith"}, {name: "Bryan Jones"}, {name: "Mike Taylor"}];
    return(
      <div>
        <p><span className="start-phrase">Our schedule</span> can be used to view and book free consulations for the current week with one of our friendly staff members.</p>
        <Modal dismissModal={() => alert("Dismissing Modal")} submitModal={() => alert("Submitting")}>
          <div className="set-appointment-modal">
            <p>Fill out this form to book a free consultation.</p>
            <label for="company">Company/Entity Name *</label>
            <input type="text" id="company" name="company"/>
            <label for="time">Select Time *</label>
            <select name="time" id="time">
              <option>11 AM</option>
              <option>12 PM</option>
              <option>1 PM</option>
            </select>
          </div>
        </Modal>
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
          { days[0].map((d, i) => {
            return <ScheduleSection day={d.day} getApointment={(m) => this.getApointment(i, m)} setApointment={(m) => this.setApointment(i, m)} appointments={d.appointments} section="1" key={i}/>
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
          { days[1].map((d, i) => {
            return <ScheduleSection day={d.day} getApointment={(m) => this.getApointment(i+3, m)} setApointment={(m) => this.setApointment(i+3, m)} appointments={d.appointments} section="2" key={i}/>
          })
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {appointments} = state.schedule;
  return{
    appointments
  }
}

export default connect(mapStateToProps, actions)(Schedule);
