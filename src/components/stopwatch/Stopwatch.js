import React, { Component } from "react";
import "./Stopwatch.css"

class Stopwatch extends Component {

  componentDidMount() {
    
  }

  render() {
    const seconds = this.props.exercise.elapsedTime;
    console.log("exercise", this.props.exercise.elapsedTime)
    
    return (
      <div className="stopwatch">
        <h5>Stopwatch</h5>
        <span className="stopwatch-time">{seconds}</span>
        <br />
        <button onClick={()=>this.props.handleStopwatch(this.props.index, this.props.time)}
        type="button" className="btn btn-secondary btn-sm stopwatch_button">
          {this.props.isRunning && (this.props.activeTimer === this.props.index) ? "Pause" : "Start"}
        </button>
        <button onClick={this.props.handleReset} 
        type="button" className="btn btn-secondary btn-sm stopwatch_button">Reset
       </button>
      </div>
    );
  }
}
 
export default Stopwatch;
