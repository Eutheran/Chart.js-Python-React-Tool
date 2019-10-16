from flask import Flask, request, jsonify, flash
from bandwidths import BANDWIDTHS
from datetime import datetime
from math import floor

app = Flask(__name__)
app.config["DEBUG"] = True


# A route to return all data from the file
@app.route('/api/bandwidth_info', methods=['GET'])
def info_filter():
  # wont fire search without the device ID
    device_uuid = request.args['device_uuid']
    if bool(device_uuid) == True:

        end_time = request.args.get('end_time', type=int) or floor(
            datetime.now().timestamp())

        window_time = (request.args.get('window_time', type=int) or 60) * 10

        num_windows = request.args.get('num_windows', type=int) or 10

        start_time = end_time - (num_windows * window_time)
        # Building smaller dataset for performance optimization
        filtered_arr = []
        # Final Return Information
        result_arr = []

        for data_point in BANDWIDTHS:
            # skip if id doesnt match
            if data_point['device_id'] == device_uuid:
                # skip if outside our time search
                if data_point['timestamp'] > end_time or data_point['timestamp'] < start_time:
                    continue

                # add anything within our window
                filtered_arr.append(data_point)

        for window_idx in range(num_windows):
            time_chunk_start = start_time + (window_idx * window_time)
            time_chunk_end = time_chunk_start + window_time
            # total sent bytes within the viewing window for TS and FS
            bytes_ts = sum(
                [data['bytes_ts'] for data in filtered_arr if time_chunk_start <= data['timestamp'] < time_chunk_end])
            bytes_fs = sum(
                [data['bytes_fs'] for data in filtered_arr if time_chunk_start <= data['timestamp'] < time_chunk_end])
            result_arr.append({
                "time_start": time_chunk_start,
                "time_end": time_chunk_end,
                "bytes_ts": bytes_ts,
                "bytes_fs": bytes_fs
            })

        return jsonify(result_arr)
    else:
        return' Error: Need to input a valid device uuid'


app.run()
