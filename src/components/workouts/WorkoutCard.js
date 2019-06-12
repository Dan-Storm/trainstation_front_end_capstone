import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Exercise.css";

class WorkoutCard extends Component {
  componentDidMount() {
    console.log(`componentDidMount -- Workout ${this.props.workout.id}`);
  }

  render() {
    console.log(`render -- Workout ${this.props.workout.id}`);

    return (
      <React.Fragment>
        <div key={this.props.workout.id} className="card">
          <div className="card-body">
            <h5 className="card-title">
              <div>
                <h3>Workout ID: {this.props.workout.id}</h3>
              </div>
              <div>
                <h5>User ID: {this.props.workout.user_id}</h5>
              </div>
              <div>{this.props.workout.name}</div>
              <div className="centerChildren">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    this.props.history.push(`/workouts/${this.props.workout.id}/exercises/list`);
                  }}
                >
                  Exercises
                </button>
              </div>
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
            </h5>
          </div>
          <Link className="nav-link" to={`/workouts/${this.props.workout.id}`}>
            Details
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default WorkoutCard;
