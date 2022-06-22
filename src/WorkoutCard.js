import React, {useState} from "react";
import "./App.css";
import Comments from "./Comments"

function WorkoutCard ({ workout, onLogSubmit, onLogDelete, athletes }) {

    const [viewComment, setViewComment] = useState(false)

    function handleViewCommentClick(e) {
        setViewComment(!viewComment)
    }

    const {workout_type, date, details, approx_duration, add_ons} = workout

    const averageWorkoutRating = workout.log_entries.reduce(function(acc, entry) {return acc + entry.workout_rating}, 0)/workout.log_entries.length;

    return (
        <div className="workout_card">
            <h4 className="workout_date">{date}</h4>
            <h3 className="workout_type">{workout_type}</h3>
            <p className="workout_approx_duration">~Duration: {approx_duration} min</p>
            <h4 className="workout_details">Workout Details: {details}</h4>
            <p className="workout_add_ons">Additional work: {add_ons}</p>
            <p className="athlete_count">🏃🏽‍♂️ {workout.log_entries.length}</p>
            <button className="workout_log_button" onClick={handleViewCommentClick}>{viewComment ? "close workout logs" : "view workout logs"}</button>
            {averageWorkoutRating > 0 ? <p className="workout_average_rating">avg. rating {averageWorkoutRating.toFixed(2)}</p> : null}
            {viewComment ? <Comments workoutId={workout.id} workoutLogEntries={workout.log_entries} onLogSubmit={onLogSubmit} athletes={athletes} onLogDelete={onLogDelete}/> : null}            
        </div>
    )
}

export default WorkoutCard