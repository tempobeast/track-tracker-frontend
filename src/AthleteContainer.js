import React, { useState, useEffect } from "react";
import "./App.css";
import WorkoutList from "./WorkoutList";
import AthleteList from "./AthleteList";
import CreateNewAthleteForm from './CreateNewAthleteForm';
import CreateNewWorkout from "./CreateNewWorkout";
import Nav from './Nav';
import { isCompositeComponent } from "react-dom/test-utils";

function AthleteContainer () {

    const [athletes, setAthletes] = useState([])
    const [selectedAthlete, setSelectedAthlete] = useState("All")
    const [workouts, setWorkouts] = useState([])
    const [workoutLogs, setWorkoutLogs] = useState([])
    const [addAthlete, setAddAthlete] = useState (false)
    const [addWorkout, setAddWorkout] = useState (false)

    useEffect(() => {
        fetch("http://localhost:9292/athletes")
        .then((res) => res.json())
        .then((data) => setAthletes(data))
    }, [])

    useEffect(() => {
        fetch("http://localhost:9292/workouts")
        .then((res) => res.json())
        .then((data) => setWorkouts(data))
    }, [])

    useEffect(() => {
        fetch("http://localhost:9292/log_entries")
        .then((res) => res.json())
        .then((data) => setWorkoutLogs(data))
    }, [])


    function onLogSubmit(formData) {
        fetch("http://localhost:9292/log_entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "athlete_id": formData.athlete_id,
                "workout_rating": formData.rating,
                "mileage": formData.mileage,
                "details": formData.details,
                "comments": formData.comments,
                "workout_id": formData.workout_id
            }),
        })
        .then((res) => res.json())
        .then((data) => setWorkoutLogs([...workoutLogs, data]))
    }

    function onLogDelete(id) {
        fetch(`http://localhost:9292/log_entries/${id}`, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then((deleteEntry) => {
            const newWorkoutLogs = workoutLogs.filter((entry) => entry.id !== deleteEntry.id);
            setWorkoutLogs(newWorkoutLogs)
        })
    }

    function onNewAthleteSubmit(formData) {
        fetch("http://localhost:9292/athletes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "name": formData.name,
                "age": formData.age
            })
        })
        .then ((res) => res.json())
        .then ((newAthlete) => {
            setAthletes([...athletes, newAthlete]);
        })
    }

    function onNewWorkoutSubmit(formData) {
        fetch("http://localhost:9292/workouts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "date": formData.date,
            "workout_type": formData.workoutType,
            "details": formData.details,
            "approx_duration": formData.approxDuration,
            "add_ons": formData.addOns
            })
        })
        .then((res) => res.json())
        .then((newWorkout) => setWorkouts([...workouts, newWorkout]))
    }

    function onAthletePatchSubmit(patchFormData) {
        fetch(`http://localhost:9292/athletes/${patchFormData.id}`, {
        method: "PATCH",
        headers:{ 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "name": patchFormData.name,
            "age": patchFormData.age,
        })
    })  .then((res) => res.json())
        .then((updatedAthlete) => {
            const newAthleteList = athletes.filter((athlete) => athlete.id !== patchFormData.id);
            setAthletes([...newAthleteList, updatedAthlete])
        })
    }

    function onAthleteDelete (toDeleteId) {
        fetch(`http://localhost:9292/athletes/${toDeleteId}`, {
            method: "DELETE",
        })
        .then((res) => res.json())
        .then((deletedAthlete) => {
            const newAthleteList = athletes.filter((athlete) => athlete.id !== deletedAthlete.id)
            setAthletes(newAthleteList)
        })
    }

    function onAddAthleteClick(e) {
        setAddAthlete(!addAthlete)
      }

    function onAddWorkoutClick(e) {
        setAddWorkout(!addWorkout)
    }

    function onAthleteClick(selectedId) {
        const selectedRunner = athletes.filter((athlete) => athlete.id.toString() === selectedId.toString())
        setSelectedAthlete(selectedRunner[0])
    }
    
    function onSelectAll(all) {
        setSelectedAthlete(all)
    }

    const displayAthlete = athletes.find((athlete) => athlete.id === selectedAthlete.id)
    

    return (
        <div id="athlete_container">
            <Nav onAddAthleteClick={onAddAthleteClick} onAddWorkoutClick={onAddWorkoutClick}/>
            {addAthlete ? <CreateNewAthleteForm setAddAthlete={setAddAthlete} onNewAthleteSubmit={onNewAthleteSubmit}/> : null}
            {addWorkout ? <CreateNewWorkout setAddWorkout={setAddWorkout} 
            onNewWorkoutSubmit={onNewWorkoutSubmit}
            /> : null}
            {selectedAthlete === "All" ? <h2>All Workouts</h2> : <h2>{displayAthlete.name}'s Workouts</h2>}
            <AthleteList athletes={athletes} onAthleteClick={onAthleteClick} onAthletePatchSubmit={onAthletePatchSubmit} onSelectAll={onSelectAll} onAthleteDelete={onAthleteDelete}/>
            <WorkoutList workouts={workouts} workoutLogs={workoutLogs} onLogSubmit={onLogSubmit} selectedAthlete={selectedAthlete} athletes={athletes} onLogDelete={onLogDelete}/>
        </div>
    )
}

export default AthleteContainer