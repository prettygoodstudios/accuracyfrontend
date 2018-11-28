import React, {Component} from 'react';

class Contact extends Component {
  render(){
    return(
      <div className="contact-wrapper" id="contact">
        <h1>Contact</h1>
        <p>You can contact us at the following support email accuracy.support@gmail.com</p>
        <div className="contact-wrapper__section-wrapper">
          <div className="contact-wrapper__section-wrapper__tweet-section">
            <h3><i class="fab fa-twitter"></i> Tweet Us</h3>
            <textarea rows="5"/>
            <a><i class="fab fa-twitter"></i> Tweet</a>
          </div>
          <div className="contact-wrapper__section-wrapper__map-section">
            <span><i class="fas fa-map-marked-alt"></i> 665 West Center Street</span>
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDeRKNH5CbjJ2s2d19a3WYR-lYQQ6b3eUU
                &q=665+West,Center+Street,Orem+UT" allowfullscreen>
            </iframe>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
