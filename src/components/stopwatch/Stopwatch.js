import React, { Component } from "react";
import "./Stopwatch.css";

class Stopwatch extends Component {
  componentDidMount() {}

  // Since elapsedTime decrements, the parsed countdown display will also decrement
  parseTime = () => {
    let totalTime = this.props.exercise.elapsedTime;
    let hrs = ~~(totalTime / 3600);
    let mins = ~~((totalTime % 3600) / 60);
    let secs = ~~totalTime % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  };

  render() {
    return (
      <div className="stopwatch">
        <h4>Stopwatch</h4>
        <span className="stopwatch-time">
          {
            // Add the fading css effect when is running is true
            <h1 className={`${this.props.isRunning ? "fade" : ""}`}>
              {this.parseTime()}
            </h1>
          }
        </span>
        <br />
        <button
        // Button toggles start and pause and passes index and time to handleStopwatch
        // in ExerciseList.js
          onClick={() =>
            this.props.handleStopwatch(this.props.index, this.props.time)
          }
          type="button"
          className="btn btn-secondary btn-sm stopwatch_button start"
        >
          {this.props.isRunning && this.props.activeTimer === this.props.index
            ? "Pause"
            : "Start"}
        </button>
        <button
          // Call handleReset function in ExerciseList.js
          disabled={this.props.activeTimer === null}
          onClick={this.props.handleReset}
          type="button"
          className={`${"btn btn-secondary btn-sm stopwatch_button reset"}`}
        >
          Reset
        </button>
      </div>
    );
  }
}

export default Stopwatch;
