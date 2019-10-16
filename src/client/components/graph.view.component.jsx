import React, { Component } from 'react';
import Axios from 'axios';

export default class GraphView extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }

  async componentDidMount() {
    try {
      const params = document.location.search;
      console.log(params);
      const res = await Axios.get(
        `/api/bandwidth_info${document.location.search}`
      );
      const data = await res.json();
      this.setState({ data });
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    return <div>{this.state.data}</div>;
  }
}
