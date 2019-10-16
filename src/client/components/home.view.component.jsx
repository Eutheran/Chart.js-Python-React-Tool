import React, { useState, useEffect } from 'react';
import Axios from 'axios';

//example of using hooks and state as opposed to class based components
export default function HomeView() {
  const [serverStatus, setStatus] = useState(
    'Offline, please navigate to your server/routes folder and initialize your py server: python3 api.py in terminal'
  );

  useEffect(() => {
    async function fetchData() {
      const result = await Axios('http://127.0.0.1:5000/');
      console.log(result);
      setStatus(result.data);
    }
    fetchData();
  });
  return (
    <div>
      <div>
        <h1>All Information From Bandwidths</h1>
        <p> Server is: {serverStatus}</p>
        {serverStatus === 'Online' ? (
          <div>
            <p>Please navigate to /graph and don't forget your queries:</p>
            <ul>device_uuid</ul>
            <ul>end_time</ul>
            <ul>window_time</ul>
            <ul>num_windows</ul>{' '}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
