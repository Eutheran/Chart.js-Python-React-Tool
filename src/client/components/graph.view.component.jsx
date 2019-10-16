import React, { Component } from 'react';
import Axios from 'axios';
import { Line } from 'react-chartjs-2';

//build using class based components
export default class GraphView extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: 'Bytes To Server',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
          },
          {
            label: 'Bytes From Server',
            borderColor: 'rgb(55, 99, 232)',
            data: [5, 15, 25, 42, 50, 60, 75],
          },
        ],
      },
    };
  }

  // async componentDidMount() {
  //   //to set up a build and deploy URL for the future
  //   const url = 'http://127.0.0.1:5000/api/bandwidth_info';
  //   try {
  //     const params = document.location.search;
  //     const res = await Axios.get(`${url}${params}`);
  //     const data = res.data;
  //     this.setState({ data });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  render() {
    const { data } = this.state;
    return (
      <div className="graph-container">
        {data ? (
          <div>
            <Line data={data} />
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
