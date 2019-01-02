import React, {Component} from "react";
import {connect} from 'react-redux';

import * as actions from "../../actions";

import Modal from "../widgets/modal";

const Member = (props) => {
  const {title, name, admin, setEditModal} = props;
  return(
    <div className="team-wrapper__member">
      <img src="https://s3-us-west-2.amazonaws.com/staticgeofocus/profile.png"/>
      <span className="team-wrapper__member__name">{name}</span>
      <span className="team-wrapper__member__title">{title}</span>
      {admin && <a onClick={() => setEditModal(true, {name, jobTitle: title})} className="team-wrapper__member__title button">Edit</a>}
    </div>
  );
}

class Team extends Component{

  constructor(){
    super();
    this.state = {
      createModal: {
        show: false,
        name: "",
        jobTitle: ""
      },
      editModal: {
        show: false,
        name: "",
        jobTitle: ""
      }
    }
  }

  updateInput = (name, e) => {
    if(name == "edit"){
      let currentState = this.state.editModal;
      currentState[e.target.id] = e.target.value;
      this.setState({
        editModal: currentState
      });
    }else{
      let currentState = this.state.createModal;
      currentState[e.target.id] = e.target.value;
      this.setState({
        createModal: currentState
      });
    }
  }

  setEditModal = (show, member) => {
    if(show){
      const {name, jobTitle} = member;
      this.setState({
        editModal: {
          show: true,
          name,
          jobTitle
        }
      });
    }else{
      this.setState({
        editModal: {
          show: false,
          name: "",
          jobTitle: ""
        }
      });
    }
  }

  createStaff = () => {
    const {name, jobTitle} = this.state.createModal;
    const params = {name, jobTitle, token: this.props.session};
    this.props.createStaff(params, () => this.setState({createModal: {show: false, name: "", jobTitle: ""}}), () => alert("Error Creating Staff Member"));
  }

  render() {
    const teamMembers = this.props.staff;
    const {user} = this.props;
    const {createModal, editModal} = this.state;
    return(
      <div id="team">
        <p><span className="start-phrase">Our team</span> we have a skilled set of qualified friendly profesonials to meet your every need.</p>
        {user.role && user.role == "admin" && <center><a onClick={() => this.setState({createModal: {show: true, name: "", jobTitle: ""}})} className="button">Create a staff member!</a></center>}
        {editModal.show && 
          <Modal dismissModal={() => this.setState({editModal: {show: false, name: "", jobTitle: ""}})} submitModal={() => this.setState({editModal: false})}>
            <div className="team-create-modal">
              <h1>Edit Staff Member</h1>
              <label for="name" >Name</label>
              <input type="text" id="name" name="name" value={editModal.name} onChange={(t) => this.updateInput("edit", t)}></input>
              <label for="jobTitle">Job Title</label>
              <input type="text" id="jobTitle" name="jobTitle" value={editModal.jobTitle} onChange={(t) => this.updateInput("edit", t)}></input>
              <a onClick={() => alert("Deleting!")} className="button">Delete</a>
            </div>
          </Modal>
        }
        {createModal.show && 
          <Modal dismissModal={() => this.setState({createModal: {show: false, name: "", jobTitle: ""}})} submitModal={this.createStaff}>
            <div className="team-create-modal">
              <h1>Create A Staff Member!</h1>
              <label for="name" >Name</label>
              <input type="text" id="name" name="name" value={createModal.name} onChange={(t) => this.updateInput("create", t)}></input>
              <label for="jobTitle">Job Title</label>
              <input type="text" id="jobTitle" name="jobTitle" value={createModal.jobTitle} onChange={(t) => this.updateInput("create", t)}></input>
            </div>
          </Modal>

        }
        <div className="team-wrapper">
          {teamMembers && teamMembers.map((m, i) => {
            const {name, job_title} = m
            return <Member name={name} title={job_title} admin={(user.role && user.role == "admin")}  key={i} setEditModal={this.setEditModal}/>
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  const {staff} = state.schedule;
  const {user, session} = state.auth;
  return{
    staff,
    user,
    session
  }
}

export default connect(mapStateToProps, actions)(Team);
