import React, { Component } from 'react';
import Axios from 'axios';
import { Line } from 'react-chartjs-2';

//build using class based components
export default class GraphView extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      graphData: null,
    };
  }
  async componentDidMount() {
    //to set up a build and deploy URL for the future
    const url = 'http://127.0.0.1:5000/api/bandwidth_info';
    try {
      const params = document.location.search;
      const res = await Axios.get(`${url}${params}`);
      const data = res.data;
      this.setState({ data });
      this.setGraphData();
    } catch (error) {
      console.error(error);
    }
  }

  setGraphData() {
    let timeEndArr = [];
    let bytesFsArr = [];
    let bytesTsArr = [];
    this.state.data.forEach(dataPoint => {
      timeEndArr.push(dataPoint.time_end);
      bytesFsArr.push(dataPoint.bytes_fs);
      bytesTsArr.push(dataPoint.bytes_ts);
    });

    this.setState({
      graphData: {
        //needs to be time_end
        labels: [...timeEndArr],
        datasets: [
          {
            label: 'Bytes To Server',
            borderColor: 'rgb(255, 99, 132)',
            //need to put bytes_ts data here
            data: [...bytesTsArr],
          },
          {
            label: 'Bytes From Server',
            borderColor: 'rgb(55, 99, 232)',
            //put bytes_fs data here
            data: [...bytesFsArr],
          },
        ],
      },
    });
  }

  render() {
    const { data, graphData } = this.state;

    return (
      <div className="graph-container">
        {data ? (
          <div>
            <Line data={graphData} />
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
