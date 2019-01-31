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
        <p><span className="start-phrase">Our mission</span> is to save you time and money through our precise and accurate accounting services. By providing exceptional tax, accounting, and consulting services Accuracy helps you find the perfect solution to your business's diverse needs. We specialize in providing accounting services to entrepreneurs, but we also serve small to medium sized companies as well. Our top priority is to provide our clients with the financial expertise required to drive their inspirations, ideas, and businesses.</p>
        <div className="large-icon-well">
          <i class="fas fa-hand-holding-usd large-icon"></i>
        </div>
        <Services />
        <div id="story">
          <p><span className="start-phrase">Our story</span> started in January of 2018. We were founded by a small group of experienced accountants who wanted to make a difference in the local community. We have more than 60 years of combined experience in the accounting services industry. Our founder, David Smith, left his position as the Chief Auditor at one of Utah’s premier accounting firms in order to start Accuracy. He brought along some of his colleagues, who also happened to be seasoned accountants, in order to help him with his new venture of providing accounting services to small businesses, and since then Accuracy has expanded to serve the needs of medium sized businesses as well.</p>
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
