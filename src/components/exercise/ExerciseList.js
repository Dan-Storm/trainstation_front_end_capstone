import React, { Component } from "react";
import "./ExerciseList.css";
import ExerciseCard from "./ExerciseCard";
import DbManager from "../../modules/DbManager";
import { goToAnchor } from "react-scrollable-anchor";

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
    this.getTime();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  getExerciseList = async id => {
    const exercises = await DbManager.getExerciseList(id);
    const timeExercises = exercises.map(exercise => {
      exercise.elapsedTime = parseInt(exercise.time);
      return exercise;
    });
    this.setState({ exercises: timeExercises });
  };

  constructNewRest() {

      const rest = {
        name: "rest",
        weight: "rest",
        reps: "rest",
        notes: "rest",
        time: "15",
        workoutId: this.props.match.params.workoutId
      };

      // Create the exercise and redirect user to exercise list
      this.props.addExercise(rest, this.props.match.params.workoutId)
      .then(() => this.props.history.push(`/workouts/${this.props.match.params.workoutId}/exercises/list`))
  };

  _redirectToExerciseList = async id => {
    console.log("redirect to exercise list");
    const newExercises = await DbManager.getExerciseList(id);
    this.setState({ exercises: newExercises });
    this.props.history.push(`/workouts/${id}/exercises/list`);
  };
  ////////////delete
  deleteExercise = (exerciseId, workoutId) => {
    DbManager.deleteExercise(exerciseId).then(() =>
      this._redirectToExerciseList(workoutId)
    );
  };
  
  getTime = () => {
      let totalTime = 0
      this.state.exercises.forEach(exercise =>{
        totalTime += parseInt(exercise.time)
        return totalTime
    })
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
  }

  startTimer = async index => {
    await this.setState({ activeTimer: index });
  };

  startNextTimer = () => {
    this.setState({ activeTimer: this.state.activeTimer + 1 }, () => {
      goToAnchor(`section${this.state.activeTimer}`);
    });
    let msg = new SpeechSynthesisUtterance(`${this.state.exercises[this.state.activeTimer].name}`);
    msg.rate = .85;
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
    // reduce time by 1 second by creating a copy of the exercise object in state and overwriting the elapsed time every second.
    if (this.state.isRunning) {
      this.setState(prevState => {
        const exercisesCopy = [...prevState.exercises];
        exercisesCopy[prevState.activeTimer].elapsedTime -= 1;

        return {
          exercises: exercisesCopy
        };
      });
      //Timer audio and stop functionality
      if (
        this.state.exercises.length === this.state.activeTimer + 1 &&
        this.state.exercises[this.state.activeTimer].elapsedTime === 0
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
      } else if (
        this.state.exercises[this.state.activeTimer].elapsedTime === 2
      ) {
        const audio = new Audio(require("./pip_low.mp3"));
        audio.play();
      } else if (
        this.state.exercises[this.state.activeTimer].elapsedTime === 1
      ) {
        const audio = new Audio(require("./pip_low.mp3"));
        audio.play();
      }
    }
  };

  render() {
    // console.log("render -- ExerciseList")
    return (
      <React.Fragment>
        <div className="container">
          <div className="exerciseDisplay">
            <p>Total Time: {`${this.getTime()}`} </p>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push(
                `/workouts/${this.props.match.params.workoutId}/exercises/new`
              );
            }}
          >
            Add Exercise
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.constructNewRest()
            }}
          >
            Add Rest
          </button>
          </div>
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
      </React.Fragment>
    );
  }
}

export default ExerciseList;
