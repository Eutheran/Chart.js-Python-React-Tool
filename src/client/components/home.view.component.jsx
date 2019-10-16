import React from 'react';

export default function HomeView() {
  return (
    <div>
      <h1>All Information From Bandwidths</h1>
      <p>
        Let's take a look at some interesting data. Please go to
        /bandwidth_graph and don't forget your queries:
      </p>
      <ul>
        <ul>device_uuid</ul>
        <ul>end_time</ul>
        <ul>window_time</ul>
        <ul>num_windows</ul>
      </ul>
    </div>
  );
}
