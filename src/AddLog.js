import React, {useState} from "react";
import "./App.css";



function AddLog ({ onLogSubmit, workoutId, setLogWorkout, athletes }) {

    const [error, setError] = useState(false)
    const [formData, setFormData] = useState({
        athlete_id: "",
        rating: "",
        mileage: "",
        details: "",
        comments: "",
        workout_id: workoutId
    })

    function handleFormChange(e) {
        setFormData({...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleFormSubmit(e){
        e.preventDefault();
        const athleteIdArray = [];
        athletes.map((athlete) => athleteIdArray.push(athlete.id))
            if (athleteIdArray.includes(parseInt(formData.athlete_id))) {
                onLogSubmit(formData);
                setLogWorkout(false)
            } else {
                setLogWorkout(true)
                setError(true)
            }
    }

    return (
        <form onSubmit={handleFormSubmit} className="new_comment">
            <label htmlFor="athlete_id">
                athlete_id: 
                <input value={formData.athlete_id} onChange={handleFormChange} type="number" name="athlete_id" />
            </label><br/>
            {error ? <p style={{color: "red", backgroundColor: "yellow"}}>** invalid athlete id **</p> : null}
            <br/>
            <label htmlFor="rating">
                rating: 
                <input value={formData.rating} onChange={handleFormChange} type="number" name="rating" min="1" max="10"/>
            </label><br/>
            <label htmlFor="mileage">
                mileage: 
                <input value={formData.mileage} onChange={handleFormChange} type="number" name="mileage" min="0" step=".1" />
            </label><br/>
            <label htmlFor="details">
                details: 
                <textarea value={formData.details} onChange={handleFormChange} name="details"/>
            </label><br/>
            <label htmlFor="details">
                comments: 
                <textarea value={formData.comments} onChange={handleFormChange} name="comments"/>
            </label><br/>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default AddLog