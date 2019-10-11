import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./layout/header";
import Footer from './layout/footer';

import LandingPage from "./screens/landing";
import FAQ from './screens/faq';
import Legal from './screens/legal';
import LogInModal from './layout/logInModal';



export default class App extends Component {

  render() {
    const items = [{title: "Services", element: "services"}, {title: "Story", element: "story"}, {title: "Team", element: "team"}, {title: "Schedule", element: "schedule"}, {title: "Reviews", element: "reviews"}, {title: "Contact", element: "contact"}];
    return (
      <div>
        <Router>
          <div>
            <div className="push">
              <Header title={<img src="https://s3-us-west-2.amazonaws.com/staticgeofocus/textLogo.png" className="header__title__image"/>} items={items}/>
              <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/faq" component={FAQ}/>
                <Route exact path="/legal" component={Legal}/>
              </Switch>
            </div>
            <LogInModal/>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}
