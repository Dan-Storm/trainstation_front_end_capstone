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
    this.setState({ workouts: workouts });
    this.props.history.push("/workouts");
  };

  _redirectToExerciseList = async (id) => {
    console.log("redirect to exercise list")
    const newExercises = await DbManager.getExerciseList(id)
    this.setState({ exercises: newExercises });
    // this.props.history.push(`/workouts/${id}/exercises/list`);
  };
  ////////////delete
  deleteExercise = (exerciseId, workoutId) => {
    DbManager.deleteExercise(exerciseId).then(()=>this._redirectToExerciseList(workoutId))
  };

  deleteWorkout = (id,) => {
    DbManager.deleteWorkout(id).then(()=>this.getAllWorkouts());
    this.props.history.push("/workouts");
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

  getExerciseList = async (id) => {
    this.setState({ exercises: await DbManager.getExerciseList(id) });
  }

  getAllWorkouts = async () => {
    this.setState({ workouts: await DbManager.getAllWorkouts() });
  };

  componentDidUpdate() {
    console.log("componentDidUpdate -- ApplicationViews");

    DbManager.getAllExercises()
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
          path="/workouts/:workoutId(\d+)/exercises/:exerciseId(\d+)/edit"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <ExerciseEditForm
                  {...props}
                  updateExercise={this.updateExercise}
                  workouts={this.state.workouts}
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
          path="/workouts/:workoutId(\d+)/exercises/list"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <ExerciseList
                  {...props}
                  workouts={this.state.workouts}
                  exercises={this.state.exercises}
                  updateWorkout={this.updateWorkout}
                  deleteExercise={this.deleteExercise}
                  getExerciseList={this.getExerciseList}
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
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);
