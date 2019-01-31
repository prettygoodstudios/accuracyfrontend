import React, {Component} from "react";
import {connect} from 'react-redux';

import * as actions from "../../actions";

import Modal from "../widgets/modal";

const Member = (props) => {
  const {title, name, admin, id, setEditModal, profile_img} = props;
  return(
    <div className="team-wrapper__member">
      <div className="team-wrapper__member__img">
        <img src={profile_img ? profile_img : "https://s3-us-west-2.amazonaws.com/staticgeofocus/profile.png"}/>
      </div>
      <span className="team-wrapper__member__name">{name}</span>
      <span className="team-wrapper__member__title">{title}</span>
      {admin && <a onClick={() => setEditModal(true, {name, id, jobTitle: title, profile_img: profile_img})} className="team-wrapper__member__title button">Edit</a>}
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
        jobTitle: "",
        profileImg: ""
      },
      editModal: {
        show: false,
        name: "",
        jobTitle: "",
        profileImg: "",
        id: 0
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
      const {name, jobTitle, id, profile_img} = member;
      this.setState({
        editModal: {
          show: true,
          name,
          id,
          jobTitle,
          profileImg: profile_img
        }
      });
    }else{
      this.setState({
        editModal: {
          show: false,
          name: "",
          jobTitle: "",
          id: 0
        }
      });
    }
  }

  createStaff = () => {
    const {name, jobTitle, profileImg} = this.state.createModal;
    const params = {name, jobTitle, token: this.props.session, profileImg};
    this.props.createStaff(params, () => this.setState({createModal: {show: false, name: "", jobTitle: ""}}), () => alert("Error Creating Staff Member"));
  }

  editStaff = () => {
    const {id, name, jobTitle, profileImg} = this.state.editModal;
    const params = {id, name, jobTitle, token: this.props.session, profileImg};
    this.props.editStaff(params, () => this.setState({editModal: {show: false, name: "", jobTitle: ""}}), (e) => alert(e));
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
          <Modal dismissModal={() => this.setState({editModal: {show: false, name: "", jobTitle: ""}})} submitModal={this.editStaff}>
            <div className="team-create-modal">
              <h1>Edit Staff Member</h1>
              <label for="name" >Name</label>
              <input type="text" id="name" name="name" value={editModal.name} onChange={(t) => this.updateInput("edit", t)}></input>
              <label for="jobTitle">Job Title</label>
              <input type="text" id="jobTitle" name="jobTitle" value={editModal.jobTitle} onChange={(t) => this.updateInput("edit", t)}></input>
              <label for="profileImg">Profile Image</label>
              <input type="text" id="profileImg" name="profileImg" value={editModal.profileImg} onChange={(t) => this.updateInput("edit", t)}></input>
              <a onClick={() => this.props.deleteStaff({token: this.props.session, id: editModal.id}, () => this.editStaff(false), (e) => alert("Could not delete: "+e))} className="button">Delete</a>
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
              <label for="profileImg">Profile Image</label>
              <input type="text" id="profileImg" name="profileImg" value={createModal.profileImg} onChange={(t) => this.updateInput("create", t)}></input>
            </div>
          </Modal>

        }
        <div className="team-wrapper">
          {teamMembers && teamMembers.map((m, i) => {
            const {name, job_title, id, profile_img} = m
            return <Member name={name} id={id} title={job_title} profile_img={profile_img} admin={(user.role && user.role == "admin")}  key={i} setEditModal={this.setEditModal}/>
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
