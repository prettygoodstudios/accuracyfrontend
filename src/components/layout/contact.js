import React, {Component} from 'react';

import Modal from '../widgets/modal';

class Contact extends Component {

  constructor(){
    super();
    this.state = {
      showEmailModal: false
    }
  }

  toggleModal = () => {
    this.setState({
      showEmailModal: !this.state.showEmailModal
    });
  }

  sendEmail = () => {
    window.setTimeout(() => this.toggleModal(), 200+Math.floor(Math.random()*1000));
  }

  render(){
    return(
      <div className="contact-wrapper" id="contact">
        {this.state.showEmailModal &&
          <Modal dismissModal={() => this.toggleModal()}>
            <h1 className="contact-modal">Email Sent!</h1>
          </Modal>
        }
        <h1>Contact</h1>
        <p>You can contact us at the following support email <span style={{wordBreak: "break-all"}}>accuracy.acounting.info@gmail.com</span></p>
        <div className="contact-wrapper__section-wrapper">
          <div className="contact-wrapper__section-wrapper__tweet-section">
            <span><i className="fas fa-envelope"></i> Send us an email</span>
            <textarea placeholder="Message" rows="5"/>
            <a onClick={this.sendEmail}><i className="fas fa-envelope"></i> Send</a>
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
