import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import GraphView from './components/graph.view.component';
import HomeView from './components/home.view.component';

export default class Router extends Component {
  render() {
    return (
      <div id="routePaths">
        <Route exact path="/" component={HomeView} />
        <Route path="/graph" component={GraphView} />
      </div>
    );
  }
}
