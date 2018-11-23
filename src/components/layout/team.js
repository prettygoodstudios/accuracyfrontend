import React from "react";

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

const Team = (props) => {
  const teamMembers = [{name: "John Doe", title: "Bookeeper"}, {name: "Sam Smith", title: "Tax Consultant"}, {name: "Bryan Jones", title: "Payroll Specialist"}, {name: "Mike Taylor", title: "Chief Auditor"}];
  return(
    <div>
      <p><span className="start-phrase">Our team</span> we have a skilled set of qualified friendly profesonials to meet your every need.</p>
      <div className="team-wrapper">
        {teamMembers.map((m, i) => {
          const {name, title} = m
          return <Member name={name} title={title}  key={i}/>
        })}
      </div>
    </div>
  );
}

export default Team;
