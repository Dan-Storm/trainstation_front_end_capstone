import React, { Component } from "react";
import "./Stopwatch.css"

class Stopwatch extends Component {

  render() {
    const seconds = Math.floor(this.props.time / 1000);

    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <span className="stopwatch-time">{seconds}</span>
        <br />
        <button onClick={()=>this.props.handleStopwatch(this.props.index, this.props.time)}
        type="button" className="btn btn-secondary btn-sm">
          {this.props.isRunning && (this.props.activeTimer === this.props.index) ? "Pause" : "Start"}
        </button>
        <button onClick={this.props.handleReset}
        type="button" className="btn btn-secondary btn-sm">Reset</button>
      </div>
    );
  }
}
 
export default Stopwatch;
