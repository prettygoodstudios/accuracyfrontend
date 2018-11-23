import React, {Component} from "react";

const ScheduleSection = (props) => {
  const {day, section} = props;
  return(
    <div className={`schedule__section schedule__section-day-${section}`}>
      <div className="schedule__section__day">
      {day}
      </div>
    </div>
  );
}

class Schedule extends Component{

  render(){
    const days = [[{day: "Mon"}, {day: "Tues"}, {day: "Wed"}], [{day: "Thu"}, {day: "Fri"}]];
    const staff = [{name: "John Doe"}, {name: "Sam Smith"}, {name: "Bryan Jones"}, {name: "Mike Taylor"}];
    return(
      <div>
        <p><span className="start-phrase">Our scheule</span> can be used to view and book free consulations for the current week with one of our friendly staff members.</p>
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
            return <ScheduleSection day={d.day} section="1" key={i}/>
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
            return <ScheduleSection day={d.day} section="2" key={i}/>
          })
          }
        </div>
      </div>
    );
  }
}

export default Schedule;
