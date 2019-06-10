import React, { Component } from 'react'
import "./WorkoutList.css"
import WorkoutCard from './WorkoutCard';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class WorkoutList extends Component {

    componentDidMount() {
        console.log("componentDidMount -- WorkoutList")
    }

    

    render() {
        console.log("render -- WorkoutList")
        return (
            <React.Fragment>
            <ToastContainer className="toastContainer" />
            <div className="centerChildren">
                <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push(`/workouts/${this.props.workouts.id}/edit`);}
                        }>
                    Create New Workout
                </button>
            </div>
            <article className="workouts">
                {
                    this.props.workouts.map(workout =>
                        <WorkoutCard key={`workouts-${workout.id}`}
                            workout={workout}
                            deleteExercise={this.props.deleteExercise}
                            history={this.props.history}
                            />
                    )
                }
            </article>
            <div className="centerChildren">
                <button onClick={ () => this.props.loadWorkouts() }>
                    Reload Workouts
                </button>
            </div>
            </React.Fragment>
        )
    }
}

export default WorkoutList