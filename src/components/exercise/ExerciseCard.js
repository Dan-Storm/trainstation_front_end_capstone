import React, { Component } from "react";
import "./Exercise.css";
import Stopwatch from "../stopwatch/Stopwatch";
import ScrollableAnchor from "react-scrollable-anchor";

class ExerciseCard extends Component {
  componentDidMount() {
    // console.log(`componentDidMount -- Exercise ${this.props.exercise.id}`)
  }

  render() {
    // console.log(`render -- Exercise ${this.props.exercise.id}`)

    return (
      <React.Fragment>
        <ScrollableAnchor id={`section${this.props.index}`}>
          <div key={this.props.exercise.id} className="card">
            <div className="card exercise-card">
              <h5 className="card-title">
                  <h4>Exercise: {this.props.exercise.name}</h4>
                  <hr />
                  <h5>Weight: {this.props.exercise.weight}</h5>
                  <hr />
                  <h5>Reps: {this.props.exercise.reps}</h5>
                  <hr />
                  <p>Notes: {this.props.exercise.notes}</p>
                  <hr />
                  <p>Seconds: {this.props.exercise.time}</p>
                  <hr />
                <div className="editDelete">
                    <hr></hr>
                <button
                  type="button"
                  className="btn btn-warning btn-sml"
                  onClick={() => {
                    this.props.history.push(
                      `/workouts/${
                        this.props.match.params.workoutId
                      }/exercises/${this.props.exercise.id}/edit`
                    );
                  }}
                >
                  Edit
                </button>

                {this.props.hasOwnProperty("deleteExercise") ? (
                  <button
                    onClick={() =>
                      this.props.deleteExercise(
                        this.props.exercise.id,
                        this.props.match.params.workoutId
                      )
                    }
                    className="btn btn-danger btn-sml"
                  >
                    Delete
                  </button>
                ) : null}
                </div>
                <div className="stopwatchCard">
                  <Stopwatch
                    index={this.props.index}
                    exercise={this.props.exercise}
                    startTimer={this.props.startTimer}
                    startNextTimer={this.props.startNextTimer}
                    handleStopwatch={this.props.handleStopwatch}
                    handleReset={this.props.handleReset}
                    activeTimer={this.props.activeTimer}
                    isRunning={this.props.isRunning}
                  />
                </div>
                {/* <div>
                            <p>Workout Id: {this.props.match.params.workoutId} </p>
                        </div> */}
              </h5>
            </div>
          </div>
        </ScrollableAnchor>
      </React.Fragment>
    );
  }
}

export default ExerciseCard;
