import Settings from "./Settings";

export default {
  getExercise(id) {
    return fetch(`${Settings.remoteURL}/exercises/${id}`).then(e => e.json());
  },
  getExerciseList(id) {
    return fetch(`${Settings.remoteURL}/exercises/${id}`).then(e => e.json());
  },
  getWorkout(id) {
    return fetch(`${Settings.remoteURL}/workouts/${id}`).then(w => w.json());
  },
  deleteExercise(id) {
    return fetch(`${Settings.remoteURL}/exercises/${id}`, {
      method: "DELETE"
    }).then(e => e.json());
  },
  deleteWorkout(id) {
    return fetch(`${Settings.remoteURL}/workouts/${id}`, {
      method: "DELETE"
    }).then(e => e.json());
  },
  getAllExercises() {
    return fetch(`${Settings.remoteURL}/exercises`).then(e => e.json());
  },
  getAllWorkouts() {
    return fetch(`${Settings.remoteURL}/workouts`).then(w => w.json());
  },
  addExercise(newExercise) {
    return fetch(`${Settings.remoteURL}/exercises`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newExercise)
    }).then(data => data.json());
  },
  addWorkout(newWorkout) {
    return fetch(`${Settings.remoteURL}/workouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newWorkout)
    }).then(data => data.json());
  },
  updateExercise(editedExercise) {
    return fetch(`${Settings.remoteURL}/exercises/${editedExercise.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedExercise)
    }).then(data => data.json());
  },
  updateWorkout(editedWorkout) {
    return fetch(`${Settings.remoteURL}/workouts/${editedWorkout.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedWorkout)
    }).then(data => data.json());
  }
};
