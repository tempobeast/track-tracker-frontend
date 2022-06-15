import React, {useState} from "react";
import "./App.css";
import PatchAthlete from "./PatchAthlete";



function AthleteCard ({ athlete, handleClick, handleEditAthleteClick, onAthletePatchSubmit, onAthleteDelete, selectedAthlete, setSelectedAthlete }) {

    const [updateAthlete, setUpdateAthlete] = useState(false)

    const {id, name, age, workouts} = athlete

    function handleEditAthleteClick(e) {
        setUpdateAthlete(!updateAthlete)
    }

    function handleDeleteAthleteClick(e) {
        onAthleteDelete(id)
    }
    

    return (
        <div className="athlete_card">
            <p className="athlete_name"  id={id} onClick={handleClick}>{name}</p>
            {(selectedAthlete.id === id) 
            ?
            <div className="athlete_details">
                <p className="athlete_id">id: {id}</p>
                <p className="athlete_age">age: {age}</p>
                <button className="athlete_edit_button" onClick={handleEditAthleteClick}> ✍🏽</button>
                <button className="athlete_delete_button" onClick={handleDeleteAthleteClick}> x</button>
                {updateAthlete ? <PatchAthlete  id={id} name={name} age={age} onAthletePatchSubmit={onAthletePatchSubmit} setUpdateAthlete={setUpdateAthlete}/> : null}
            </div>
            : null 
            }
        </div>
    )
}

export default AthleteCard