import React, { Component } from 'react'
import { Link } from "react-router-dom"
import './Exercise.css'

class ExerciseCard extends Component {

    componentDidMount() {
        console.log(`componentDidMount -- Animal ${this.props.exercise.id}`)
    }

    render() {
        console.log(`render -- Animal ${this.props.exercise.id}`)

        return (
            <React.Fragment>
                <div key={this.props.exercise.id} className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <div>{this.props.exercise.name}</div>
                            <div>{this.props.exercise.weight}</div>
                            <div>{this.props.exercise.reps}</div>
                            <div>{this.props.exercise.notes}</div>
                            <div>{this.props.exercise.time}</div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => {
                                    this.props.history.push(`/exercises/${this.props.exercise.id}/edit`);
                                }}
                                >
                                Edit
                            </button>

                            {
                                (this.props.hasOwnProperty("deleteExercise"))
                                    ? <button
                                        onClick={() => this.props.deleteExercise(this.props.exercise.id)}
                                        className="card-link">Delete</button>
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