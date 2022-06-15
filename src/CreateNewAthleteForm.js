import React, {useState} from "react";
import "./App.css";



function CreateNewAthleteForm ({ setAddAthlete, onNewAthleteSubmit }) {

    const [newAthleteFormData, setNewAthleteFormData] = useState({
        name: "",
        age: "",
    })

    function handleFormChange(e) {
        setNewAthleteFormData({...newAthleteFormData,
            [e.target.name]: e.target.value
        })
    }

    function handleFormSubmit(e){
        e.preventDefault();
        onNewAthleteSubmit(newAthleteFormData);
        setAddAthlete(false);
    }

    return (
        <form onSubmit={handleFormSubmit} className="new_comment">
            <label htmlFor="name">
                name: 
                <input value={newAthleteFormData.name} onChange={handleFormChange} type="text" name="name" />
            </label><br/>
            <label htmlFor="rating">
                age: 
                <input value={newAthleteFormData.age} onChange={handleFormChange} type="number" name="age" min="1" />
            </label><br/>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default CreateNewAthleteForm