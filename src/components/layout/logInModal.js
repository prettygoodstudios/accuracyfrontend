import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../../actions";

import Modal from "../widgets/modal.js";
import Error from "../widgets/error.js";

class LogInModal extends Component {
  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
      passwordConfirmation: "",
      company: "",
      logIn: true,
      error: ""
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
      password: "",
      passwordConfirmation: "",
      error: "",
      logIn: true
    });
    this.props.logInModal(false);
  }

  logIn = () => {
    const {email, password} = this.state;
    this.props.logIn(email, password, (u) => this.closeModal(), (e) => this.setState({error: e}));
  }

  createAccount = () => {
    const {email, password, passwordConfirmation, company} = this.state;
    if(password == passwordConfirmation){
      if(email.indexOf("@") != -1 && email.split("@")[1].indexOf(".") != -1){
        this.props.createUser(email, password, company, this.closeModal, (e) => this.setState({error: e}));
      }else{
        this.setState({error: "You must enter in a valid email."});
      }
    }else{
      this.setState({error: "Your password and password confirmation must match."});
    }
  }

  toggleLogin = (val) => {
    this.setState({
      logIn: val,
      email: "",
      password: "",
      passwordConfirmation: "",
      error: ""
    });
  }

  render(){
    const {email, password, passwordConfirmation, logIn, company, error} = this.state;
    return(
      <div>
        {this.props.show &&
          <Modal dismissModal={() => this.closeModal()} submitModal={logIn ? () => this.logIn() : () => this.createAccount()}>
            <div className="log-in-modal">
              { logIn ?
                <div>
                  <h1>Log In</h1>
                  <p>Loging in enables you to view and book consultations as well as leave reviews.</p>
                </div>
                :
                <div>
                  <h1>Create an Account</h1>
                  <p>An account is required to view and book consultations as well as leave reviews.</p>
                </div>
              }
              <label for="email">Email</label>
              <input type="text" name="email" id="email" value={email} onChange={(t) => this.updateInput("email", t)}/>
              <label for="password">Password</label>
              <input type="password" name="password" id="password" value={password} onChange={(t) => this.updateInput("password", t)}/>
              {
                !logIn &&
                  <div>
                    <label for="passwordConfirmation">Password Confirmation</label>
                    <input type="password" name="passwordConfirmation" id="passwordConfirmation" value={passwordConfirmation} onChange={(t) => this.updateInput("passwordConfirmation", t)}/>
                    <label for="company">Company/Entity Name</label>
                    <input type="text" name="company" id="company" value={company} onChange={(t) => this.updateInput("company", t)}/>
                  </div>
              }
              <center><Error error={error}/></center>
              <h3>Or</h3>
              {
                logIn ?
                  <a className="button" onClick={() => this.toggleLogin(false)}>Create An Account!</a>
                :
                  <a className="button" onClick={() => this.toggleLogin(true)}>Log In!</a>
              }
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
