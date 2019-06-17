import React, { Component } from "react";
import "./Exercise.css";

export default class WorkoutForm extends Component {
  // Set initial state
  state = {
    workoutName: "",
    user_Id: "",
    saveEnabled: false
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  }

  /*
        Local method for validation, creating animal object, and
        invoking the function reference passed from parent component
     */
  constructNewWorkout = evt => {
    evt.preventDefault()
    if (this.state.employee === "") {
      window.alert("Please select a caretaker");
    } else {
      const workout = {
        name: this.state.workoutName,
        // Make sure the employeeId is saved to the database as a number since it is a foreign key.
        // user_Id: parseInt(this.state.employeeId)
      }

      this.setState({ saveEnabled: true })

      // Create the workout and redirect user to workout list
      this.props.addWorkout(workout);
    }
  }

  render() {
    return (
      <React.Fragment>
        <form className="workoutForm">
          <div className="form-group">
            <label htmlFor="workoutName">Workout Name</label>
            <input
              type="text"
              required
              autoFocus
              className="form-control"
              onChange={this.handleFieldChange}
              id="workoutName"
              placeholder="Workout name"
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="employee">Assign to client</label>
            <br></br>
            <select
              defaultValue=""
              name="employee"
              id="employeeId"
              onChange={this.handleFieldChange}
            >
              <option value="">Select a client</option>
              {this.props.workouts.map(e => (
                <option key={e.id} id={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div> */}
          <button
            type="submit"
            onClick={this.constructNewWorkout}
            disabled={this.state.saveEnabled}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}