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
    exercises: [],
    workouts: []
  };

  _redirectToWorkoutList = async () => {
    const workouts = await DbManager.getAllWorkouts();
    this.props.history.push("/workouts");
    this.setState({ workouts: workouts });
  };

  _redirectToExerciseList = async () => {
    const exercises = await DbManager.getAllExercises();
    this.props.history.push("/exercises");
    this.setState({ exercises: exercises });
  };
  ////////////delete
  deleteExercise = id => {
    DbManager.deleteExercise(id).then(this._redirectToExerciseList());
  };

  deleteWorkout = id => {
    DbManager.deleteWorkout(id).then(this._redirectToWorkoutList());
  };
  ////////////add functions
  addExercise = async exercise => {
    await DbManager.addExercise(exercise);
    this._redirectToExerciseList();
  };

  addWorkout = async workout => {
    await DbManager.addWorkout(workout);
    this.props.history.push("/workouts");
  };
  ///////////update functions
  updateExercise = async exercise => {
    await DbManager.updateExercise(exercise);
    this._redirectToExerciseList();
  };

  updateWorkout = async workout => {
    await DbManager.updateWorkout(workout);
    this._redirectToWorkoutList();
  };

  getAllExercises = async () => {
    this.setState({ exercises: await DbManager.getAllExercises() });
  };

  getAllWorkouts = async () => {
    this.setState({ workouts: await DbManager.getAllWorkouts() });
  };

  componentDidUpdate() {
    console.log("componentDidUpdate -- ApplicationViews");
  }

  componentDidMount() {
    console.log("componentDidMount -- ApplicationViews");
    const newState = {};

    DbManager.getAllExercises()
      .then(exercises => (newState.exercises = exercises))
      .then(() => DbManager.getAllWorkouts())
      .then(workouts => (newState.workouts = workouts));
  }

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  render() {
    // console.clear();
    console.log("render -- ApplicationViews");
    return (
      <React.Fragment>
        <Route path="/login" component={Login} />

        {/* <AuthRoute
          path="/exercises"
          Destination={ExerciseList}
          exercises={this.state.exercises}
          deleteExercise={this.deleteExercise}
          loadExercises={this.getAllExercises}
        /> */}

        {/* <AuthRoute
          path="/workouts"
          Destination={WorkoutList}
          exercises={this.state.exercises}
          workouts={this.state.workouts}
          deleteExercise={this.deleteExercise}
          loadWorkouts={this.getAllWorkouts}
        /> */}

        <Route
          path="/exercises/:exerciseId(\d+)"
          render={props => {
            if (this.isAuthenticated()) {
              const exercise = this.state.exercises.find(
                a => a.id === parseInt(props.match.params.exerciseId)
              ) || { id: 404, name: "404", breed: "Dog not found" };

              return (
                <ExerciseDetail
                  exercise={exercise}
                  deleteExercise={this.deleteExercise}
                />
              );
            } else {
              return <Login />;
            }
          }}
        />

        <Route
          path="/exercises/:exerciseId(\d+)/edit"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <ExerciseEditForm
                  {...props}
                  updateExercise={this.updateExercise}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

        <Route
          path="/workouts/:workoutId(\d+)/edit"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <WorkoutEditForm
                  {...props}
                  workouts={this.state.workouts}
                  updateWorkout={this.updateWorkout}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

        <Route
          path="/workouts/:workoutId(\d+)/exercises/edit"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <ExerciseList
                  {...props}
                  workouts={this.state.workouts}
                  exercises={this.state.exercises}
                  updateWorkout={this.updateWorkout}
                  loadExercises={this.getAllExercises}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

        <Route
          path="/workouts/:workoutId(\d+)/exercises/new"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <ExerciseForm
                  {...props}
                  addExercise={this.addExercise}
                  exercises={this.state.exercises}
                  workouts={this.state.workouts}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

        <Route
          path="/workout/new"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <WorkoutForm
                  {...props}
                  addWorkout={this.addWorkout}
                  workouts={this.state.workouts}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

        <Route
          exact
          path="/workouts"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <WorkoutList
                  {...props}
                  workouts={this.state.workouts}
                  deleteWorkout={this.deleteWorkout}
                  loadWorkouts={this.getAllWorkouts}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

        <Route
          exact
          path="/exercises"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <ExerciseList
                  {...props}
                  exercises={this.state.exercises}
                  // fireEmployee={this.fireEmployee}
                  loadExercises={this.getAllExercises}
                  deleteExercise={this.deleteExercise}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);
