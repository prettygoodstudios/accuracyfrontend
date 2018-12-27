import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../../actions";

import Modal from "../widgets/modal.js";

class LogInModal extends Component {
  constructor(){
    super();
    this.state = {
      email: "",
      password: ""
    }
  }

  updateInput = (field, text) => {
    let tempState = {}
    tempState[field] = text.target.value;
    this.setState({
      ...tempState
    });
  }

  closeModal = () => {
    this.setState({
      email: "",
      password: ""
    });
    this.props.logInModal(false);
  }

  logIn = () => {
    const {email, password} = this.state;
    this.props.logIn(email, password, (u) => this.closeModal(), (e) => alert(e));
  }

  render(){
    const {email, password} = this.state;
    return(
      <div>
        {this.props.show &&
          <Modal dismissModal={() => this.closeModal()} submitModal={() => this.logIn()}>
            <div className="log-in-modal">
              <h1>Log In</h1>
              <p>Loging in enables you to view and book consultations as well as leave reviews.</p>
              <label for="email">Email</label>
              <input type="text" name="email" id="email" value={email} onChange={(t) => this.updateInput("email", t)}/>
              <label for="password">Password</label>
              <input type="password" name="password" id="password" value={password} onChange={(t) => this.updateInput("password", t)}/>
            </div>
          </Modal>
        }
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    show: state.auth.modal
  }
}

export default connect(mapStateToProps, actions)(LogInModal);
