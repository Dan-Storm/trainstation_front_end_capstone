import React, { Component } from "react";

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
        Method for, creating workout object, and
        calling the addWorkout function passed from ApplicationViews
     */
  constructNewWorkout = evt => {
    evt.preventDefault()
    if (this.state.employee === "") {
      window.alert("Please select a caretaker");
    } else {
      const workout = {
        name: this.state.workoutName,
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
          <button
            type="submit"
            onClick={this.constructNewWorkout}
            disabled={this.state.saveEnabled}
            className="btn workoutBtn"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}