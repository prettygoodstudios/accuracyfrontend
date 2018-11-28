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
      <CallToAction title="Our Precision & Accuracy" subtitle="Saves You $$$" />
      <div className="container">
        <p><span className="start-phrase">Our mission</span> is to save you time and money through our precise and accurate accounting services. We provide accounting services for small to medium sized companies. </p>
        <Services />
        <p id="story"><span className="start-phrase">Our story</span> we are a small accounting firm started by a couple of buds in Orem, UT.</p>
        <Team />
        <Schedule />
        <Reviews />
        <Contact />
      </div>
    </div>
  );
}

export default LandingPage;
