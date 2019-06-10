import React, { Component } from 'react'
import { Link } from "react-router-dom"
import './Exercise.css'

class WorkoutCard extends Component {

    componentDidMount() {
        console.log(`componentDidMount -- Workout ${this.props.workout.id}`)
    }

    render() {
        console.log(`render -- Workout ${this.props.workout.id}`)

        return (
            <React.Fragment>
                <div key={this.props.workout.id} className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <div>{this.props.workout.id}</div>
                            <div>{this.props.workout.user_id}</div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => {
                                    this.props.history.push(`/workouts/${this.props.workout.id}/edit`);
                                }}
                                >
                                Edit
                            </button>

                            {
                                (this.props.hasOwnProperty("deleteExercise"))
                                    ? <button
                                        onClick={() => this.props.deleteWorkout(this.props.workout.id)}
                                        className="card-link">Delete</button>
                                    : null
                            }

                        </h5>
                    </div>
                    <Link className="nav-link" to={`/workouts/${this.props.workout.id}`}>Details</Link>
                </div>

            </React.Fragment>
        )
    }
}

export default WorkoutCard