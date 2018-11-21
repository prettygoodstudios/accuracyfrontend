import React, { Component } from 'react';

import Header from "./layout/header";
import CallToAction from "./layout/callToAction";

export default class App extends Component {
  render() {
    const items = [{title: "Services"}, {title: "Story"}, {title: "Team"}, {title: "Schedule"}, {title: "Reviews"}];
    return (
      <div>
        <Header title="Accuracy" items={items}/>
        <CallToAction title="Our Precision & Accuracy" subtitle="Saves You $$$" />
        <p>Vector Illustration by <a href="https://www.Vecteezy.com">www.vecteezy.com</a></p>
      </div>
    );
  }
}
