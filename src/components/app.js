import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./layout/header";
import Footer from './layout/footer';

import LandingPage from "./screens/landing";
import FAQ from './screens/faq';
import Legal from './screens/legal';


export default class App extends Component {
  render() {
    const items = [{title: "Services", element: "services"}, {title: "Story", element: "story"}, {title: "Team", element: "team"}, {title: "Schedule", element: "schedule"}, {title: "Reviews", element: "reviews"}, {title: "Contact", element: "contact"}];
    return (
      <div>
        <div className="push">
          <Header title="Accuracy" items={items}/>
          <Router>
            <Switch>
              <Route exact path="/" component={LandingPage}/>
              <Route exact path="/faq" component={FAQ}/>
              <Route exact path="/legal" component={Legal}/>
            </Switch>
          </Router>
        </div>
        <Footer />
      </div>
    );
  }
}
