import React, { Component } from 'react'
import "./ExerciseList.css"
import ExerciseCard from './ExerciseCard';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class ExerciseList extends Component {

    componentDidMount() {
        console.log("componentDidMount -- ExerciseList");
        this.props.getExerciseList(this.props.match.params.workoutId);
    }

    render() {
        console.log("render -- ExerciseList")
        return (
            <React.Fragment>
            <ToastContainer className="toastContainer" />
            <div className="centerChildren">
                <button type="button"
                        className="btn btn-success btn-block"
                        onClick={() => {
                            this.props.history.push(`/workouts/${this.props.match.params.workoutId}/exercises/new`)}
                        }>
                    Add Exercise
                </button>
            </div>
            <article className="exercise">
                {
                    this.props.exercises.map(exercise =>
                        <ExerciseCard key={`exercises-${exercise.id}`}
                            exercise={exercise}
                            deleteExercise={this.props.deleteExercise}
                            history={this.props.history}
                            match={this.props.match}
                            workouts={this.props.workouts}
                            />
                    )
                }
            </article>
            <div className="centerChildren">
                <button
                className="btn btn-primary btn-block" 
                onClick={ () => this.props.getExerciseList(this.props.match.params.workoutId)}>
                    Load Exercises
                </button>
            </div>
            </React.Fragment>
        )
    }
}

export default ExerciseList