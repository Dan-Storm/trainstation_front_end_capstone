import React, { Component } from "react"
import DbManager from "../../modules/DbManager"

export default class ExerciseEditForm extends Component {
    // Set initial state
    state = {
      exerciseName: "",
      name: "",
      weight: "",
      reps: "",
      notes: "",
      time: NaN,
      workoutId: "",
      saveEnabled: false
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingExercise = evt => {
      evt.preventDefault()

      if (this.state.employee === "") {
        window.alert("Please select a caretaker");
      } else {
        const editedExercise = {
          id: this.props.match.params.exerciseId,
          name: this.state.exerciseName,
          weight: this.state.weight,
          reps: this.state.reps,
          notes: this.state.notes,
          time: this.state.time,
        };

        this.props.updateExercise(editedExercise, this.props.match.params.workoutId)
            .then(() => this.props.history.push(`/workouts/${this.props.match.params.workoutId}/exercises/list`))
    }
  }

    componentDidMount() {
      DbManager.getExercise(this.props.match.params.exerciseId)
      .then(exercise => {
        this.setState({
          exerciseName: exercise.name,
          name: exercise.name,
          weight: exercise.weight,
          reps: exercise.reps,
          notes: exercise.notes,
          time: exercise.time,
          workoutId: this.props.match.params.workoutId
        });
      });

      DbManager.getWorkout(this.props.workouts.id).then(workout => {
        this.setState({
          workoutId: workout.id,
        });
      });
    }


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
              value={this.state.exerciseName}            
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
              value={this.state.weight}            
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
              value={this.state.reps}            
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
              value={this.state.notes}
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time In Seconds</label>
            <br />
            <select className="timeSelect btn btn-primary"
              value= {parseInt(this.state.time)}
              name="time"
              id="time"
              onChange={this.handleFieldChange}
            >
              <option value="7">7</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="45">45</option>
              <option value="60">60</option>
              <option value="120">120</option>
              <option value="180">180</option>
            </select>
          </div>
            <button
              type="submit"
              onClick={this.updateExistingExercise}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </React.Fragment>
      );
    }
}