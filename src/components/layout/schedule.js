import React, {Component} from "react";
import {connect} from 'react-redux';

import * as actions from "../../actions";

const ScheduleSection = (props) => {
  const {day, section, appointments, getApointment} = props;
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
              <a href="#" className="schedule__section__apointment__book">Book</a>
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

  render(){
    const {appointments} = this.props;
    const days = [appointments.slice(0,2), appointments.slice(2, 5)];
    const staff = [{name: "John Doe"}, {name: "Sam Smith"}, {name: "Bryan Jones"}, {name: "Mike Taylor"}];
    return(
      <div>
        <p><span className="start-phrase">Our schedule</span> can be used to view and book free consulations for the current week with one of our friendly staff members.</p>
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
            return <ScheduleSection day={d.day} getApointment={(m) => this.getApointment(i, m)} appointments={d.appointments} section="1" key={i}/>
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
            return <ScheduleSection day={d.day} getApointment={(m) => this.getApointment(i+3, m)} appointments={d.appointments} section="2" key={i}/>
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
