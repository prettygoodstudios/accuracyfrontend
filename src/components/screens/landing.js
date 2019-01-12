import React from 'react';

import CallToAction from "../layout/callToAction";
import Services from '../layout/services';
import Team from '../layout/team';
import Schedule from '../layout/schedule';
import Reviews from '../layout/reviews';
import Contact from '../layout/contact';

const LandingPage = (props) => {
  const items = [{title: "Services", element: "services"}, {title: "Story", element: "story"}, {title: "Team", element: "team"}, {title: "Schedule", element: "schedule"}, {title: "Reviews", element: "reviews"}, {title: "Contact", element: "contact"}];
  return (
    <div>
      <CallToAction title={<span className="title-container"><span>Our Precision &</span><img src='https://s3-us-west-2.amazonaws.com/staticgeofocus/darkTextLogo.png' /></span>} subtitle={<span className="call-to-action__title-wrapper__subtitle"><span>Saves You</span><span className="call-to-action__title-wrapper__subtitle__space">&nbsp;</span><img src="https://s3-us-west-2.amazonaws.com/staticgeofocus/Bill.png" /></span>} />
      <div className="container">
        <p><span className="start-phrase">Our mission</span> is to save you time and money through our precise and accurate accounting services. We provide accounting services for small to medium sized companies. </p>
        <div className="large-icon-well">
          <i class="fas fa-hand-holding-usd large-icon"></i>
        </div>
        <Services />
        <div id="story">
          <p><span className="start-phrase">Our story</span> we are a small accounting firm that was founded in 1992 by several freshly graduated accountants, who happened to be friends in college. We started by providing services for small businesses and entrepeneurs but we have since expanded to serve the needs of medium sized businesses.</p>
          <div className="large-icon-well"><i class="fas fa-book-open large-icon"></i></div>
        </div>
        <Team />
        <Schedule />
        <Reviews />
        <Contact />
      </div>
    </div>
  );
}

export default LandingPage;
