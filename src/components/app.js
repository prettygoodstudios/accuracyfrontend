import React, { Component } from 'react';

import Header from "./layout/header";
import CallToAction from "./layout/callToAction";
import Services from './layout/services';
import Team from './layout/team';
import Schedule from './layout/schedule';
import Reviews from './layout/reviews';

export default class App extends Component {
  render() {
    const items = [{title: "Services", element: "services"}, {title: "Story", element: "story"}, {title: "Team", element: "team"}, {title: "Schedule", element: "schedule"}, {title: "Reviews", element: "reviews"}];
    return (
      <div>
        <Header title="Accuracy" items={items}/>
        <CallToAction title="Our Precision & Accuracy" subtitle="Saves You $$$" />
        <div className="container">
          <p><span className="start-phrase">Our mission</span> is to save you time and money through our precise and accurate accounting services. We provide accounting services for small to medium sized companies. </p>
          <Services />
          <p id="story"><span className="start-phrase">Our story</span> we are a small accounting firm started by a couple of buds in Orem, UT.</p>
          <Team />
          <Schedule />
          <Reviews />
          <p>Vector Illustration by <a href="https://www.Vecteezy.com">www.vecteezy.com</a></p>
        </div>
      </div>
    );
  }
}
