import React, { Component } from "react";
import Stopwatch from "../stopwatch/Stopwatch";
import ScrollableAnchor from "react-scrollable-anchor";

class ExerciseCard extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <React.Fragment>
        <ScrollableAnchor id={`section${this.props.index}`}>
          <div key={this.props.exercise.id} className="card">
            <div className="card exercise-card">
                  <h3>Exercise: {this.props.exercise.name}</h3>
                  <h4>Weight: {this.props.exercise.weight}</h4>
                  <h4>Reps: {this.props.exercise.reps}</h4>
                  <p>Notes: {this.props.exercise.notes}</p>
                  <p>Seconds: {this.props.exercise.time}</p>
                <div className="editDelete">
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
            </div>
          </div>
        </ScrollableAnchor>
      </React.Fragment>
    );
  }
}

export default ExerciseCard;
