import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import ExerciseList from "./exercise/ExerciseList";
import WorkoutList from "./workouts/WorkoutList";
import WorkoutEditForm from "./workouts/WorkoutEditForm";
import WorkoutForm from "./workouts/WorkoutForm";

import ExerciseDetail from "./exercise/ExerciseDetail";
// import WorkoutDetail from "./workouts/WorkoutDetail";

import DbManager from "../modules/DbManager";
import ExerciseForm from "./exercise/ExerciseForm";
import ExerciseEditForm from "./exercise/ExerciseEditForm";
import Login from "./auth/Login";
// import AuthRoute from "./auth/AuthRoute";

class ApplicationViews extends Component {
  state = {
    workouts: []
  };

  _redirectToWorkoutList = async () => {
    const workouts = await DbManager.getAllWorkouts();
    this.setState({ workouts: workouts });
    this.props.history.push("/workouts");
  };

  deleteWorkout = (id,) => {
    DbManager.deleteWorkout(id).then(()=>this.getAllWorkouts());
    this.props.history.push("/workouts");
  };

  _redirectToExerciseList = async (id) => {
    const newExercises = await DbManager.getExerciseList(id)
    this.setState({ exercises: newExercises });
    this.props.history.push(`/workouts/${id}/exercises/list`);
  };
  ////////////add functions
  addExercise = async (exercise, id) => {
    await DbManager.addExercise(exercise);
    this._redirectToExerciseList(id);
  };

  addWorkout = async workout => {
    await DbManager.addWorkout(workout);
    this._redirectToWorkoutList();
  };
  ///////////update functions
  updateExercise = async (exercise, workoutId) => {
    await DbManager.updateExercise(exercise);
    this._redirectToExerciseList(workoutId);
  };

  updateWorkout = async workout => {
    await DbManager.updateWorkout(workout);
    this._redirectToWorkoutList();
  };

  getAllExercises = async () => {
    this.setState({ exercises: await DbManager.getAllExercises() 
    });
  };

  getAllWorkouts = async () => {
    this.setState({ workouts: await DbManager.getAllWorkouts() });
  };

  componentDidUpdate() {
    DbManager.getAllExercises()
  }

  componentDidMount() {
    const newState = {};

    DbManager.getAllExercises()
      .then(exercises => (newState.exercises = exercises))
      .then(() => DbManager.getAllWorkouts())
      .then(workouts => (newState.workouts = workouts));
  }


  render() {
    // console.clear();
    return (
      <React.Fragment>
        <Route
          path="/exercises/:exerciseId(\d+)"
          render={props => {          
              const exercise = this.state.exercises.find(
                a => a.id === parseInt(props.match.params.exerciseId)
              ) || { id: 404, name: "404", breed: "Dog not found" };

              return (
                <ExerciseDetail
                  exercise={exercise}
                  deleteExercise={this.deleteExercise}
                />
              );
          }}
        />

        <Route
          path="/workouts/:workoutId(\d+)/exercises/:exerciseId(\d+)/edit"
          render={props => {
              return (
                <ExerciseEditForm
                  {...props}
                  updateExercise={this.updateExercise}
                  workouts={this.state.workouts}
                />
              );
          }}
        />

        <Route
          path="/workouts/:workoutId(\d+)/edit"
          render={props => {
              return (
                <WorkoutEditForm
                  {...props}
                  workouts={this.state.workouts}
                  updateWorkout={this.updateWorkout}
                />
              );
          }}
        />

        <Route
          path="/workouts/:workoutId(\d+)/exercises/list"
          render={props => {
              return (
                <ExerciseList
                  {...props}
                  workouts={this.state.workouts}
                  exercises={this.state.exercises}
                  updateWorkout={this.updateWorkout}
                  deleteExercise={this.deleteExercise}
                  getExerciseList={this.getExerciseList}
                  addExercise={this.addExercise}
                />
              );
          }}
        />

        <Route
          path="/workouts/:workoutId(\d+)/exercises/new"
          render={props => {
              return (
                <ExerciseForm
                  {...props}
                  addExercise={this.addExercise}
                  exercises={this.state.exercises}
                  workouts={this.state.workouts}
                />
              );
          }}
        />

        <Route
          path="/workout/new"
          render={props => {
              return (
                <WorkoutForm
                  {...props}
                  addWorkout={this.addWorkout}
                  workouts={this.state.workouts}
                />
              );
          }}
        />

        <Route
          exact
          path="/workouts"
          render={props => {
              return (
                <WorkoutList
                  {...props}
                  workouts={this.state.workouts}
                  deleteWorkout={this.deleteWorkout}
                  loadWorkouts={this.getAllWorkouts}
                />
              );
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);
