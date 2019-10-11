import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as actions from "../../actions";

class Footer extends Component{

  render() {
    return(
      <div className="footer">
        <div className="footer__left-section">
          <img src="https://s3-us-west-2.amazonaws.com/staticgeofocus/textLogo.png" className="footer__left-section__title"/>
          <div className="footer__left-section__social">
            <a href="http://www.twitter.com/share?url=http://www.accuracy-accounting.herokuapp.com/"><i class="fab fa-twitter"></i></a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//accuracy-accounting.herokuapp.com"><i class="fab fa-facebook"></i></a>
            <a href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A//accuracy-accounting.herokuapp.com&title=Accuracy%20Accounting&summary=&source="><i class="fab fa-linkedin"></i></a>
          </div>
        </div>
        <div className="footer__middle-section">
          <h3>Contact Info</h3>
          <span>accuracy.acounting.info@gmail.com</span>
          <span>665 W Center Street, Orem, UT</span>
        </div>
        <div className="footer__right-section">
          <h3>More Links</h3>
          <Link to="/faq">FAQ</Link>
          <Link to="/legal">Legal</Link>
          { this.props.session == "" ?
            <a onClick={() => this.props.logInModal(true)}>Log In</a>
            :
            <a onClick={() => this.props.logOut()}>Log Out</a>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  const {session} = state.auth;
  return{
    session
  }
}

export default connect(mapStateToProps, actions)(Footer);
