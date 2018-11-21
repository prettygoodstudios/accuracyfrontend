import React, { Component } from 'react';

import Header from "./layout/header";

export default class App extends Component {
  render() {
    const items = [{title: "Services"}, {title: "Story"}, {title: "Team"}, {title: "Schedule"}, {title: "Reviews"}];
    return (
      <div>
        <Header title="Accuracy" items={items}/>
      </div>
    );
  }
}
