import React from 'react';

const Footer = (props) => {
  return(
    <div className="footer">
      <div className="footer__left-section">
        <h1>Accuracy</h1>
        <div className="footer__left-section__social">
          <a href="http://www.twitter.com/share?url=http://www.google.com/"><i class="fab fa-twitter"></i></a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//google.com"><i class="fab fa-facebook"></i></a>
          <a href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A//google.com&title=Accuracy%20Accounting&summary=&source="><i class="fab fa-linkedin"></i></a>
        </div>
      </div>
      <div className="footer__middle-section">
        <h3>Contact Info</h3>
        <span>accuracy.acounting.info@gmail.com</span>
        <span>665 W Center Street, Orem, UT</span>
      </div>
      <div className="footer__right-section">
        <h3>More Links</h3>
        <a href="/faq">FAQ</a>
        <a href="/legal">Legal</a>
      </div>
    </div>
  );
}

export default Footer;
