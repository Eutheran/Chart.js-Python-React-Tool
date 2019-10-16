import React, { Component } from 'react';
import Axios from 'axios';
import Chart from 'chart.js';

export default class GraphView extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }

  async componentDidMount() {
    //to set up a build and deploy URL for the future
    const url = 'http://127.0.0.1:5000/api/bandwidth_info';
    try {
      const params = document.location.search;
      console.log(params, url);
      const res = await Axios.get(`${url}${params}`);
      const data = res.data;
      this.setState({ data });
      console.log(this.state.data);
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    const { data } = this.state;
    return (
      <div className="graph-container">
        {data ? (
          <div>
            <canvas id="line-chart" width="800" height="450"></canvas>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
