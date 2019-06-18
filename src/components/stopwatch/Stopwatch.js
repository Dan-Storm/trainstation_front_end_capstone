import React, { Component } from "react";

class Stopwatch extends Component {
  state = {
    isRunning: false,
    elapsedTime: this.props.time,
    previousTime: 0,
    index: this.props.index
  };

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 100);
    console.log("index", this.state.index)
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick = () => {
    if (this.state.isRunning) {
      const now = Date.now();
      this.setState(prevState => ({
        previousTime: now,
        elapsedTime: prevState.elapsedTime - (now - this.state.previousTime)
      }));
      //when countdown finishes
      //play audio
      //reset isRunning bool
      //reset clock
      if (this.state.elapsedTime <= 1000) {
        const audio = new Audio(require("./pip_high.mp3"));
        audio.play();
        this.setState({ isRunning: false });
        this.handleReset();
      }  
      //play audio on 3, 2, 1...
      if (this.state.elapsedTime <= 4000 && this.state.elapsedTime >= 3900) {
        let audio = new Audio(require("./pip_low.mp3"));
        audio.play();
      }
      if (this.state.elapsedTime <= 3000 && this.state.elapsedTime >= 2900) {
        const audio = new Audio(require("./pip_low.mp3"));
        audio.play();
      } 
      if (this.state.elapsedTime <= 2000 && this.state.elapsedTime >= 1900) {
        const audio = new Audio(require("./pip_low.mp3"));
        audio.play();
      }
    }
  };

  handleStopwatch = () => {
    this.setState(prevState => ({
      isRunning: !prevState.isRunning
    }));
    if (!this.state.isRunning) {
      this.setState({ previousTime: Date.now() });
    }
  };

  handleReset = () => {
    this.setState({ elapsedTime: this.props.time });
  };

  render() {
    const seconds = Math.floor(this.state.elapsedTime / 1000);

    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <span className="stopwatch-time">{seconds}</span>
        <br />
        <button onClick={this.handleStopwatch}
        type="button" className="btn btn-secondary btn-sm">
          {this.state.isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={this.handleReset}
        type="button" className="btn btn-secondary btn-sm">Reset</button>
      </div>
    );
  }
}

export default Stopwatch;
