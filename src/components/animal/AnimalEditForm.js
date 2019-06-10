import React, { Component } from "react"
import AnimalManager from "../../modules/AnimalManager"

export default class AnimalEditForm extends Component {
    // Set initial state
    state = {
      exerciseName: "",
      name: "",
      weight: "",
      reps: "",
      notes: "",
      time: 0,
      saveEnabled: false
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingAnimal = evt => {
      evt.preventDefault()

      if (this.state.employee === "") {
        window.alert("Please select a caretaker");
      } else {
        const editedAnimal = {
          id: this.props.match.params.animalId,
          name: this.state.exerciseName,
          weight: this.state.weight,
          reps: this.state.reps,
          notes: this.state.notes,
          time: this.state.time
        };

        this.props.updateAnimal(editedAnimal)
            .then(() => this.props.history.push("/exercises"))
    }
  }

    componentDidMount() {
      AnimalManager.get(this.props.match.params.animalId)
      .then(animal => {
        this.setState({
          exerciseName: animal.name,
          name: animal.name,
          weight: animal.weight,
          reps: animal.reps,
          notes: animal.notes,
          time: animal.time
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
            <select
              defaultValue={this.state.time}
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
              onClick={this.updateExistingAnimal}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </React.Fragment>
      );
    }
}