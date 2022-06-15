import React, {useState} from "react";
import "./App.css";



function PatchAthlete ({ id, name, age, setUpdateAthlete, onAthletePatchSubmit }) {

    const [patchFormData, setPatchFormData] = useState({
        name: "",
        age: "", 
        id: id,
    })

    function handleFormChange(e) {
       setPatchFormData({...patchFormData,
        [e.target.name]: e.target.value})
    }

    function handleAthletePatchSubmit(e) {
        e.preventDefault()
        onAthletePatchSubmit(patchFormData)
        setUpdateAthlete(false)
    }

    return (
        <form onSubmit={handleAthletePatchSubmit} className="patch_athlete">
            <label htmlFor="name">
                name: 
                <input value={patchFormData.name} placeholder={name} onChange={handleFormChange} type="text" name="name" />
            </label><br/>
            <label htmlFor="age">
                age: 
                <input value={patchFormData.age} placeholder={age} onChange={handleFormChange} type="number" name="age" min="1" />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default PatchAthlete