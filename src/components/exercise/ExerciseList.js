import React, { Component } from "react";
import "./ExerciseList.css";
import ExerciseCard from "./ExerciseCard";
import DbManager from "../../modules/DbManager";
import { goToAnchor } from 'react-scrollable-anchor'

class ExerciseList extends Component {
  state = {
    activeTimer: null,
    exercises: [],
    isRunning: false,
    elapsedTime: null
  };

  componentDidMount() {
    // console.log("componentDidMount -- ExerciseList");
    this.getExerciseList(this.props.match.params.workoutId);
    this.intervalID = setInterval(() => this.tick(), 1000);

}
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  getExerciseList = async id => {
    const exercises = await DbManager.getExerciseList(id)
    const timeExercises = exercises.map(exercise => {
        exercise.elapsedTime = parseInt(exercise.time)
    return exercise })
    this.setState({ exercises : timeExercises }
    );
  };

  _redirectToExerciseList = async (id) => {
    console.log("redirect to exercise list")
    const newExercises = await DbManager.getExerciseList(id)
    this.setState({ exercises: newExercises });
    this.props.history.push(`/workouts/${id}/exercises/list`);
  };
  ////////////delete
  deleteExercise = (exerciseId, workoutId) => {
    DbManager.deleteExercise(exerciseId).then(()=>this._redirectToExerciseList(workoutId))
  };

  startTimer = async index => {
    await this.setState({ activeTimer: index });
    console.log(this.state.activeTimer); 
  };

  startNextTimer = () => {
    this.setState({ activeTimer: this.state.activeTimer + 1 }, () => {
      console.log(this.state.activeTimer);
      goToAnchor(`section${this.state.activeTimer}`)
    });
    var msg = new SpeechSynthesisUtterance(`Your Next Exercise is ${this.state.exercises[this.state.activeTimer].name}`);
    window.speechSynthesis.speak(msg);
  };

  //toggle the isRunning boolean in state
  handleStopwatch = index => {
    this.setState(prevState => ({
      isRunning: !prevState.isRunning
    }));
    this.startTimer(index);
  };
  //resets the time
  handleReset = () => {
    this.setState(prevState => {
      let exercisesCopy = [...prevState.exercises];
      exercisesCopy[prevState.activeTimer].elapsedTime =
        exercisesCopy[prevState.activeTimer].time;

      return {
        exercises: exercisesCopy
      };
    });
  };

  tick = () => {
    if (this.state.isRunning) {
      this.setState(prevState => {
        const exercisesCopy = [...prevState.exercises];
        exercisesCopy[prevState.activeTimer].elapsedTime -= 1;

        return {
          exercises: exercisesCopy
        };
      });

      if (
        this.state.exercises.length === ((this.state.activeTimer) +1) && this.state.exercises[this.state.activeTimer].elapsedTime === 0
      ) {
        const audio = new Audio(require("./cheer.mp3"));
        audio.play();
        this.setState({ isRunning: false });
        this.handleReset();
      }
      //   when countdown finishes
      //   play audio
      //   reset isRunning bool
      //   reset clock
      else if (this.state.exercises[this.state.activeTimer].elapsedTime <= 0) {
        const audio = new Audio(require("./pip_high.mp3"));
        audio.play();
        // this.setState({ isRunning: false });
        this.handleReset();
        this.startNextTimer();
      }
      //play audio on 3, 2, 1...
      else if (this.state.exercises[this.state.activeTimer].elapsedTime === 3) {
        let audio = new Audio(require("./pip_low.mp3"));
        audio.play();
        console.log("3");
      }
      else if (this.state.exercises[this.state.activeTimer].elapsedTime === 2) {
        const audio = new Audio(require("./pip_low.mp3"));
        audio.play();
        console.log("2");
      }
      else if (this.state.exercises[this.state.activeTimer].elapsedTime === 1) {
        const audio = new Audio(require("./pip_low.mp3"));
        audio.play();
        console.log("1");
      }
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
              deleteExercise={this.deleteExercise}
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
