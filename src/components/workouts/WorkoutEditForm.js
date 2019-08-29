import React, { Component } from "react";
import DbManager from "../../modules/DbManager";

export default class WorkoutEditForm extends Component {
  // Set initial state
  state = {
    workoutName: "",
    user_Id: "",
    saveEnabled: false
  };

  // Update field as user enters data
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  // Update exercise and redirect back to exercise list
  updateExistingWorkout = evt => {
    evt.preventDefault();

    if (this.state.employee === "") {
      window.alert("Please select a caretaker");
    } else {
      const editedWorkout = {
        id: this.props.match.params.workoutId,
        name: this.state.workoutName,
      };

      this.props
        .updateWorkout(editedWorkout)
        .then(() => this.props.history.push("/workouts"));
    }
  };

  // Prepopulate the form with the existing data
  componentDidMount() {
    DbManager.getWorkout(this.props.match.params.workoutId).then(workout => {
      console.log(workout)
      this.setState({
        workoutName: workout.name,
        user_Id: workout.user_Id,
        saveEnabled: false
      });
    });
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
              value={this.state.workoutName}
            />
          </div>
          <button
            type="submit"
            onClick={this.updateExistingWorkout}
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
