import React, { Component } from "react";

class WorkoutCard extends Component {
  componentDidMount() {
  }

  render() {

    return (
      <React.Fragment>
        <div key={this.props.workout.id} className="card">
          <div className="workoutCard">
              <h3>{this.props.workout.name}</h3>
              {/*
                <h5>User ID: {this.props.workout.user_id}</h5>
               */}
              {/* <p>Workout ID: {this.props.workout.id}</p> */}
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => {
                  this.props.history.push(
                    `/workouts/${this.props.workout.id}/exercises/list`
                  );
                }}
              >
                View Workout
              </button>
              <button
                type="button"
                className="btn btn-warning btn-block"
                onClick={() => {
                  this.props.history.push(
                    `/workouts/${this.props.workout.id}/edit`
                  );
                }}
              >
                Edit
              </button>

              {this.props.hasOwnProperty("deleteWorkout") ? (
                <button
                  onClick={() =>
                    this.props.deleteWorkout(this.props.workout.id)
                  }
                  className="btn btn-danger btn-block"
                >
                  Delete
                </button>
              ) : null}
          </div>
          {/* <Link className="nav-link" to={`/workouts/${this.props.workout.id}`}>
            Details
          </Link> */}
        </div>
      </React.Fragment>
    );
  }
}

export default WorkoutCard;