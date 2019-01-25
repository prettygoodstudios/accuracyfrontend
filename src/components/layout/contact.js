import React, {Component} from 'react';
import axios from "axios";

import Modal from '../widgets/modal';
import Error from "../widgets/error";

import { generateUrl } from '../../actions/urlHelpers';


class Contact extends Component {

  constructor(){
    super();
    this.state = {
      showEmailModal: false,
      email: "",
      error: ""
    }
  }

  toggleModal = () => {
    this.setState({
      showEmailModal: !this.state.showEmailModal,
      email: ""
    });
  }

  sendEmail = () => {
    const {email} = this.state;
    if(email.length >= 6){
      const response = grecaptcha.getResponse() != "";
      if(response){
        this.setState({error: ""});
        axios.post(generateUrl('/sendemail', {email})).then(() => {
          this.toggleModal();
        }).catch((e) => {
          this.toggleModal();
        });
      }else{
        this.setState({
          error: "You must prove you are a human."
        });
      }
    }else{
      this.setState({
        error: "Your message must be atleast six characters long."
      })
    }
  }

  updateEmail = (e) => {
    const email = e.target.value;
    this.setState({
      email
    });
  }

  render(){
    const {email, showEmailModal, error} = this.state;
    return(
      <div className="contact-wrapper" id="contact">
        {showEmailModal &&
          <Modal dismissModal={() => this.toggleModal()}>
            <h1 className="contact-modal">Email Sent!</h1>
          </Modal>
        }
        <h1>Contact</h1>
        <p>You can contact us at the following support email <span style={{wordBreak: "break-all"}}>accuracy.acounting.info@gmail.com</span></p>
        <div className="contact-wrapper__section-wrapper">
          <div className="contact-wrapper__section-wrapper__tweet-section">
            <span><i className="fas fa-envelope"></i> Send us an email</span>
            <textarea placeholder="Message" rows="5" value={email} onChange={(e) => this.updateEmail(e)}/>
            <center style={{marginTop: 10}}>
              <form action="?" method="POST">
                <div id="captcha-widget" class="g-recaptcha" data-sitekey="6Lc2nIwUAAAAALCAIsiSt6xByBfHutFKhPQWelrl"></div>
              </form>
            </center>
            <a onClick={this.sendEmail}><i className="fas fa-envelope"></i> Send</a>
            <center><Error error={error}/></center>
          </div>
          <div className="contact-wrapper__section-wrapper__map-section">
            <span><i className="fas fa-map-marked-alt"></i> 665 West Center Street</span>
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDeRKNH5CbjJ2s2d19a3WYR-lYQQ6b3eUU
                &q=665+West,Center+Street,Orem+UT" allowfullscreen>
            </iframe>
          </div>
        </div>
        <h1>Our Tweets</h1>
        <a className="twitter-timeline" href="https://twitter.com/AccuracyUt?ref_src=twsrc%5Etfw">Tweets by AccuracyUt</a>
        <h1>Leave us Feedback on Twitter</h1>
        <a href="https://twitter.com/intent/tweet?screen_name=AccuracyUt&ref_src=twsrc%5Etfw" class="twitter-mention-button" data-show-count="false">Tweet to @AccuracyUt</a>
      </div>
    );
  }
}

export default Contact;
