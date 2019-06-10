import React, { Component } from "react";
import "./Exercise.css";

export default class ExerciseForm extends Component {
  // Set initial state
  state = {
    exerciseName: "",
    weight: "",
    reps: "",
    notes: "",
    time: "",
    saveEnabled: false
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  /*
        Local method for validation, creating animal object, and
        invoking the function reference passed from parent component
     */
  constructNewExercise = evt => {
    evt.preventDefault();
    if (this.state.employee === "") {
      window.alert("Please select a caretaker");
    } else {
      const exercise = {
        name: this.state.exerciseName,
        weight: this.state.weight,
        reps: this.state.reps,
        notes: this.state.notes,
        time: this.state.time
      };

      this.setState({ saveEnabled: true });

      // Create the exercise and redirect user to exercise list
      this.props.addExercise(exercise);
    }
  };

  render() {
    return (
      <React.Fragment>
        <form className="ExerciseForm">
          <div className="form-group">
            <label htmlFor="exerciseName">Exercise Name</label>
            <input
              type="text"
              required
              autoFocus
              className="form-control"
              onChange={this.handleFieldChange}
              id="exerciseName"
              placeholder="Exercise Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="weight"
              placeholder="Weight"
            />
          </div>
          <div className="form-group">
            <label htmlFor="reps">Reps</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="reps"
              placeholder="Reps"
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="notes"
              placeholder="Notes..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time In Seconds</label>
            <br />
            <select
              defaultValue=""
              name="time"
              id="time"
              onChange={this.handleFieldChange}
            >
              <option value="">10</option>
              <option value="">15</option>
              <option value="">20</option>
              <option value="">25</option>
              <option value="">30</option>
              <option value="">40</option>
              <option value="">45</option>
              <option value="">60</option>
              <option value="">120</option>
              <option value="">180</option>
            </select>
          </div>
          <button
            type="submit"
            onClick={this.constructNewExercise}
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
