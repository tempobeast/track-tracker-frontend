import React, {useState} from "react";
import "./App.css";

function CreateNewWorkout ({ setAddWorkout, onNewWorkoutSubmit }) {

    const [newWorkoutFormData, setNewWorkoutFormData] = useState({
        date: "",
        workoutType: "",
        details: "",
        approxDuration: "",
        addOns: ""
    })

    function handleFormChange(e) {
        setNewWorkoutFormData({...newWorkoutFormData,
            [e.target.name]: e.target.value
        })
    }

    function handleFormSubmit(e){
        e.preventDefault();
        onNewWorkoutSubmit(newWorkoutFormData);
        setAddWorkout(false);
    }

    return (
        <form onSubmit={handleFormSubmit} className="new_workout_form">
            <label htmlFor="date">
                date: 
                <input value={newWorkoutFormData.name} onChange={handleFormChange} type="date" name="date" />
            </label><br/>
            <label htmlFor="workout_type">
                workout type: 
                <input value={newWorkoutFormData.workoutType} onChange={handleFormChange} type="text" name="workoutType" />
            </label><br/>
            <label htmlFor="details">
            details: 
                <textarea value={newWorkoutFormData.details} onChange={handleFormChange} name="details" />
            </label><br/>
            <label htmlFor="add_ons">
            add ons: 
                <textarea value={newWorkoutFormData.addOns} onChange={handleFormChange} name="addOns" />
            </label><br/>
            <label htmlFor="approx_duration">
                approx. duration: 
                <input value={newWorkoutFormData.approxDuration} onChange={handleFormChange} type="number" name="approxDuration" />
            </label><br/>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default CreateNewWorkout