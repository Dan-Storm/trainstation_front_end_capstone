import Settings from "./Settings";

export default {
    get(id) {
        return fetch(`${Settings.remoteURL}/exercises/${id}`).then(e => e.json());
    },
    delete(id) {
        return fetch(`${Settings.remoteURL}/exercises/${id}`, {
            "method": "DELETE"
        }).then(e => e.json());
    },
    getAll() {
        return fetch(`${Settings.remoteURL}/exercises`).then(e => e.json());
    },
    addExercise(newAnimal) {
        return fetch(`${Settings.remoteURL}/exercises`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newAnimal)
        }).then(data => data.json())
    },
    addWorkout(newWorkout) {
      return fetch(`${Settings.remoteURL}/workouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newWorkout)
      }).then(data => data.json())
    },
    getWorkout(id) {
      return fetch(`${Settings.remoteURL}/workouts/workoutId/${id}`).then(e => e.json());
    },
    getAllWorkouts() {
      return fetch(`${Settings.remoteURL}/workouts`).then(e => e.json());
    },
    updateExercise(editedAnimal) {
        return fetch(`${Settings.remoteURL}/exercises/${editedAnimal.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedAnimal)
        }).then(data => data.json());
    }
};
