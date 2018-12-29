import React, {Component} from "react";
import {connect} from 'react-redux';

import * as actions from "../../actions";

const Member = (props) => {
  const {title, name} = props;
  return(
    <div className="team-wrapper__member">
      <img src="https://s3-us-west-2.amazonaws.com/staticgeofocus/profile.png"/>
      <span className="team-wrapper__member__name">{name}</span>
      <span className="team-wrapper__member__title">{title}</span>
    </div>
  );
}

class Team extends Component{
  render() {
    const teamMembers = this.props.staff;
    return(
      <div id="team">
        <p><span className="start-phrase">Our team</span> we have a skilled set of qualified friendly profesonials to meet your every need.</p>
        <div className="team-wrapper">
          {teamMembers && teamMembers.map((m, i) => {
            const {name, job_title} = m
            return <Member name={name} title={job_title}  key={i}/>
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  const {staff} = state.schedule;
  return{
    staff
  }
}

export default connect(mapStateToProps, actions)(Team);
