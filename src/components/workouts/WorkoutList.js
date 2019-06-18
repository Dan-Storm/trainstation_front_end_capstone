import React, { Component } from 'react'
import "./WorkoutList.css"
import WorkoutCard from './WorkoutCard';

class WorkoutList extends Component {

    componentDidMount() {
        console.log("componentDidMount -- WorkoutList")
        this.props.loadWorkouts()
    }

    constructNewWorkout = evt => {
        evt.preventDefault();
        if (this.state.employee === "") {
          window.alert("Please select a caretaker");
        } else {
          const workout = {
            name: this.state.exerciseName,
            user_id: this.state.user_id
          };
    
          this.setState({ saveEnabled: true });
    
          // Create the exercise and redirect user to exercise list
          this.props.addWorkout(workout);
        }
      };

    render() {
        console.log("render -- WorkoutList")
        return (
            <React.Fragment>
            <div className="centerChildren">
                <button type="button"
                        className="btn btn-success btn-block"
                        onClick={() => {
                            this.props.history.push("/workout/new")}
                        }>
                    Create New Workout
                </button>
            </div>
            <article className="workout">
                {
                    this.props.workouts.map(workout =>
                        <WorkoutCard key={`workouts-${workout.id}`}
                            workout={workout}
                            deleteWorkout={this.props.deleteWorkout}
                            history={this.props.history}
                            />
                    )
                }
            </article>
            {/* <div className="centerChildren">
                <button 
                className="btn btn-primary btn-block" 
                onClick={ () => this.props.loadWorkouts() }>
                    Load Workouts
                </button>
            </div> */}
            </React.Fragment>
        )
    }
}

export default WorkoutList