import React, { Component } from "react";
import "./ExerciseList.css";
import ExerciseCard from "./ExerciseCard";
import DbManager from "../../modules/DbManager";

class ExerciseList extends Component {
  state = {
    activeTimer: null,
    exercises: [],
    isRunning: false,
    previousTime: 0,
    elapsedTime: null,
  };

  componentDidMount() {
    // console.log("componentDidMount -- ExerciseList");
    this.getExerciseList(this.props.match.params.workoutId);
    this.intervalID = setInterval(() => this.tick(), 100);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  getExerciseList = async id => {
    this.setState({ exercises: await DbManager.getExerciseList(id)});
    this.state.exercises.map((exercises)=> exercises.elapsedTime = exercises.time)};

  startTimer = async (index) => {
    await this.setState({ activeTimer: index });
    console.log(this.state.activeTimer);
  };

  startNextTimer = index => {
    this.setState({ activeTimer: index + 1 }, () => {
      console.log(this.state.activeTimer);
    });
  };

  //toggle the isRunning boolean in state
  handleStopwatch = (index) => {
    this.setState(prevState => ({
      isRunning: !prevState.isRunning
    }));
    if (!this.state.isRunning) {
      this.setState({ previousTime: Date.now() });
    }
    this.startTimer(index);
  };
  //resets the time
  handleReset = () => {
    this.setState({ elapsedTime: this.state.exercises[this.state.activeTimer].elapsedTime });
  };

  tick = () => {
    if (this.state.isRunning) {
      const now = Date.now();
      this.setState( prevState => ({
        previousTime: now,
        elapsedTime: prevState.exercises[this.state.activeTimer].elapsedTime - (now - this.state.previousTime)
      }));
      //when countdown finishes
      //play audio
      //reset isRunning bool
      //reset clock
    //   if (this.props.time <= 1000) {
    //     const audio = new Audio(require("./pip_high.mp3"));
    //     audio.play();
    //     this.setState({ isRunning: false });
    //     this.handleReset();
    //     this.props.startNextTimer(this.props.index)
    //   }  
    //   //play audio on 3, 2, 1...
    //   if (this.props.time <= 4000 && this.state.elapsedTime >= 3900) {
    //     let audio = new Audio(require("./pip_low.mp3"));
    //     audio.play();
    //   }
    //   if (this.props.time <= 3000 && this.state.elapsedTime >= 2900) {
    //     const audio = new Audio(require("./pip_low.mp3"));
    //     audio.play();
    //   } 
    //   if (this.props.time <= 2000 && this.state.elapsedTime >= 1900) {
    //     const audio = new Audio(require("./pip_low.mp3"));
    //     audio.play();
    //   }
    }
  };

  render() {
    // console.log("render -- ExerciseList")
    return (
      <React.Fragment>
        <div className="container">
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={() => {
              this.props.history.push(
                `/workouts/${this.props.match.params.workoutId}/exercises/new`
              );
            }}
          >
            Add Exercise
          </button>
        </div>
        <article className="exercise">
          {this.state.exercises.map((exercise, index) => (
            <ExerciseCard
              key={`exercises-${exercise.id}`}
              exercise={exercise}
              deleteExercise={this.props.deleteExercise}
              history={this.props.history}
              match={this.props.match}
              workouts={this.props.workouts}
              index={index}
              startTimer={this.startTimer}
              startNextTimer={this.startNextTimer}
              handleStopwatch={this.handleStopwatch}
              handleReset={this.handleReset}
              activeTimer={this.state.activeTimer}
              isRunning={this.state.isRunning}
            />
          ))}
        </article>
        {/* <div className="centerChildren">
                <button
                className="btn btn-primary btn-block" 
                onClick={ () => this.props.getExerciseList(this.props.match.params.workoutId)}>
                    Load Exercises
                </button>
            </div> */}
      </React.Fragment>
    );
  }
}

export default ExerciseList;
