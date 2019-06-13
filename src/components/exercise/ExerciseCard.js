import React, { Component } from 'react'
import { Link } from "react-router-dom"
import './Exercise.css'

class ExerciseCard extends Component {

    componentDidMount() {
        console.log(`componentDidMount -- Exercise ${this.props.exercise.id}`)
    }

    render() {
        console.log(`render -- Exercise ${this.props.exercise.id}`)

        return (
            <React.Fragment>
                <div key={this.props.exercise.id} className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <div>
                            <h4>Exercise: {this.props.exercise.name}</h4>
                            </div>
                            <div>
                            <h4>Weight: {this.props.exercise.weight}</h4>
                            </div>
                            <div>
                            <h4>Reps: {this.props.exercise.reps}</h4>
                            </div>
                            <div>
                            <p>Notes: {this.props.exercise.notes}</p>
                            </div>
                            <div>
                            <p>Seconds: {this.props.exercise.time}</p>
                            </div>
                            <div>
                            <p>Workout Id: {this.props.match.params.workoutId} </p>
                            </div>
                            <button
                                type="button"
                                className="btn btn-warning btn-block"
                                onClick={() => {
                                    this.props.history.push(`/workouts/${this.props.match.params.workoutId}/exercises/${this.props.exercise.id}/edit`);
                                }}
                                >
                                Edit
                            </button>

                            {
                                (this.props.hasOwnProperty("deleteExercise"))
                                    ? <button
                                        onClick={() => this.props.deleteExercise(this.props.exercise.id)
                                            .then(() => this.props.history.push(`/workouts/${this.props.match.params.workoutId}/exercises/list`))}
                                        className="btn btn-danger btn-block">Delete</button>
                                    : null
                            }

                        </h5>
                    </div>
                    <Link className="nav-link" to={`/exercises/${this.props.exercise.id}`}>Details</Link>
                </div>

            </React.Fragment>
        )
    }
}

export default ExerciseCard