import React, { Component } from 'react';

import Header from "./layout/header";
import CallToAction from "./layout/callToAction";
import Services from './layout/services';
import Team from './layout/team';

export default class App extends Component {
  render() {
    const items = [{title: "Services"}, {title: "Story"}, {title: "Team"}, {title: "Schedule"}, {title: "Reviews"}];
    return (
      <div>
        <Header title="Accuracy" items={items}/>
        <CallToAction title="Our Precision & Accuracy" subtitle="Saves You $$$" />
        <div class="container">
          <p><span className="start-phrase">Our mission</span> is to save you time and money through our precise and accurate accounting services. We provide accounting services for small to medium sized companies. </p>
          <Services />
          <Team />
          <p>Vector Illustration by <a href="https://www.Vecteezy.com">www.vecteezy.com</a></p>
        </div>
      </div>
    );
  }
}
