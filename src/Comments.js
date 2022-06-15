import React, {useState} from "react";
import "./App.css";
import AddLog from "./AddLog";

function Comments( { onLogSubmit, workoutLogEntries, workoutId, onLogDelete, athletes} ) {

    const [logWorkout, setLogWorkout] = useState(false)

    function handleLogWorkoutClick(e) {
        setLogWorkout(!logWorkout)
    }

    const displayLog = workoutLogEntries.map((entry) => {
        
        function handleEntryDeleteClick(e) {
            onLogDelete(entry.id, workoutId)
        }
        
        return (
            <div id="comment" key={entry.id}>
                <h4>{entry.athlete.name}</h4>
                <p>workout rating: {entry.workout_rating}</p>
                <p>{entry.details}</p>
                <em>{entry.comments}</em>
                <p>{`${entry.created_at.slice(5, 10)}-${entry.created_at.slice(2,4)}`}</p>
                <p>mileage: {entry.mileage}</p>
                <button onClick={handleEntryDeleteClick}> remove entry </button>
            </div>
        )
    }) 

return (
    <div id="comment_container">
        {displayLog}
        <button onClick={handleLogWorkoutClick}>{!logWorkout ? "log this workout" : "close"}</button>
        {logWorkout ? <AddLog setLogWorkout={setLogWorkout} athletes={athletes} onLogSubmit={onLogSubmit} workoutId={workoutId}/> : null}
    </div>
  )
}
export default Comments