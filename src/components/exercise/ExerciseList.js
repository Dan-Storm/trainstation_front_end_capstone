import React, { Component } from 'react'
import "./ExerciseList.css"
import ExerciseCard from './ExerciseCard';

class ExerciseList extends Component {

    state = {
        activeTimer: null
      };
  

    componentDidMount() {
        // console.log("componentDidMount -- ExerciseList");
        this.props.getExerciseList(this.props.match.params.workoutId);
    }

    startTimer(){
        
    }

    render() {
        // console.log("render -- ExerciseList")
        return (
            <React.Fragment>
            <div className="container">
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
                    this.props.exercises.map((exercise, index) =>
                        <ExerciseCard key={`exercises-${exercise.id}`}
                            exercise={exercise}
                            deleteExercise={this.props.deleteExercise}
                            history={this.props.history}
                            match={this.props.match}
                            workouts={this.props.workouts}
                            index={index}
                            />
                    )
                }
            </article>
            {/* <div className="centerChildren">
                <button
                className="btn btn-primary btn-block" 
                onClick={ () => this.props.getExerciseList(this.props.match.params.workoutId)}>
                    Load Exercises
                </button>
            </div> */}
            </React.Fragment>
        )
    }
}

export default ExerciseList