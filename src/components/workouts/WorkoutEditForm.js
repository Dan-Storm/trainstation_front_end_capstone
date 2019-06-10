import React, { Component } from "react"
import DbManager from "../../modules/DbManager"

export default class WorkoutEditForm extends Component {
    // Set initial state
    state = {
      animalName: "",
      breed: "",
      employeeId: ""
    }


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
          name: this.state.animalName,
          breed: this.state.breed,
          employeeId: parseInt(this.state.employeeId)
        };

        this.props.updateExercise(editedAnimal)
            .then(() => this.props.history.push("/animals"))
    }
  }

    componentDidMount() {
      DbManager.get(this.props.match.params.animalId)
      .then(animal => {
        this.setState({
          animalName: animal.name,
          breed: animal.breed,
          employeeId: animal.employeeId
        });
      });
    }


    render() {
      return (
        <React.Fragment>
          <form className="animalForm">
            <div className="form-group">
              <label htmlFor="animalName">Animal name</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="animalName"
                value = {this.state.animalName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="breed">Breed</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="breed"
                value = {this.state.breed}
              />
            </div>
            <div className="form-group">
              <label htmlFor="employee">Assign to caretaker</label>
              <select
                name="employee"
                id="employeeId"
                onChange={this.handleFieldChange}
                value = {this.state.employeeId}
              >
                <option value="">Select a client</option>
                {this.props.workouts.map(c => (
                  <option key={c.id} id={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
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