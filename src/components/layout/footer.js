import React from 'react';

const Footer = (props) => {
  return(
    <div className="footer">
      <div className="footer__left-section">
        <h1>Accuracy</h1>
        <div className="footer__left-section__social">
          <a><i class="fab fa-twitter"></i></a>
          <a><i class="fab fa-facebook"></i></a>
          <a><i class="fab fa-reddit"></i></a>
        </div>
      </div>
      <div className="footer__middle-section">
        <h3>Contact Info</h3>
        <span>accuracy.acounting.info@gmail.com</span>
        <span>665 W Center Street, Orem, UT</span>
      </div>
      <div className="footer__right-section">
        <h3>More Links</h3>
        <a>FAQ</a>
        <a>Legal</a>
      </div>
    </div>
  );
}

export default Footer;
