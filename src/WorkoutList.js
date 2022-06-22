import React from "react";
import "./App.css";
import WorkoutCard from "./WorkoutCard"

function WorkoutList ( { selectedAthlete, onLogSubmit, workouts, onLogDelete, athletes } ) {

    const sortWorkoutByDate = workouts.sort((a, b) => a.date > b.date ? 1 : a.date < b.date ? -1 : 0 )

    const filterWorkoutByAthlete = sortWorkoutByDate.filter((workout) => {
        if (selectedAthlete === "All") {
            return true
        } else if (workout.log_entries.find((entry) => entry.athlete_id === selectedAthlete.id)) {
            return workout
        } else {
            return false
        }
    })

    const workoutsToDisplay = filterWorkoutByAthlete.map((workout) => <WorkoutCard onLogSubmit={onLogSubmit} key={workout.id} workout={workout} selectedAthlete={selectedAthlete} onLogDelete={onLogDelete} athletes={athletes}/>)

    return (
        <div id="workout_list">
            {workoutsToDisplay}
        </div>
    )
}

export default WorkoutList