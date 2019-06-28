import React, { Component } from "react";
import DbManager from "../../modules/DbManager";

export default class WorkoutEditForm extends Component {
  // Set initial state
  state = {
    workoutName: "",
    user_Id: "",
    saveEnabled: false
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

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
          {/* <div className="form-group">
            <label htmlFor="client">Assign to client</label>
            <br />
            <select
              defaultValue=""
              name="client"
              id="clientId"
              onChange={this.handleFieldChange}
            >
              <option value="">Select a client</option>
              {this.props.workouts.map(c => (
                <option key={c.id} id={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div> */}
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
