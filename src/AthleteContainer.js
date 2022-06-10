import React, { useState, useEffect } from "react";
import "./App.css";
import WorkoutList from "./WorkoutList";
import AthleteList from "./AthleteList";
import CreateNewAthleteForm from './CreateNewAthleteForm';
import CreateNewWorkout from "./CreateNewWorkout";
import Nav from './Nav';

function AthleteContainer () {

    const [athletes, setAthletes] = useState([])
    const [selectedAthlete, setSelectedAthlete] = useState("All")
    const [workouts, setWorkouts] = useState([])
    const [workoutLogs, setWorkoutLogs] = useState([])
    const [addAthlete, setAddAthlete] = useState (false)
    const [addWorkout, setAddWorkout] = useState (false)

    console.log(athletes)

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
        .then((newLog) => {
            const workoutArray = workouts.filter((workout) => workout.id !== newLog.workout_id )
            const workoutToUpdate = workouts.find((workout) => workout.id === newLog.workout_id )
            workoutToUpdate.log_entries = [...workoutToUpdate.log_entries, newLog]
            setWorkouts([...workoutArray, workoutToUpdate])
            const athleteArray = athletes.filter((athlete) => athlete.id !== newLog.athlete_id)
            const athleteToUpdate = athletes.find((athlete) => athlete.id === newLog.athlete_id)
            athleteToUpdate.log_entries = [...athleteToUpdate.log_entries, newLog]
            setAthletes([...athleteArray, athleteToUpdate])
        })
    }

    function onLogDelete(entryId, workoutId) {
        fetch(`http://localhost:9292/log_entries/${entryId}`, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then((deleteEntry) => {
            const workoutArray = workouts.filter((workout) => workout.id !== workoutId)
            const workoutToUpdate = workouts.find((workout) => workout.id === workoutId)
            const updatedLogs = workoutToUpdate.log_entries.filter((entry) => entry.id !== deleteEntry.id);
            workoutToUpdate.log_entries = updatedLogs
            setWorkouts([...workoutArray, workoutToUpdate])
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

// need to remove workoutLogs and adjust to athletes or workouts

    function onAthleteDelete (toDeleteId) {
        fetch(`http://localhost:9292/athletes/${toDeleteId}`, {
            method: "DELETE",
        })
        .then((res) => res.json())
        .then((deletedAthlete) => {
            const newAthleteList = athletes.filter((athlete) => athlete.id !== deletedAthlete.id);
            setAthletes(newAthleteList);
            const newWorkoutLogs = workoutLogs.filter((log) => log.athlete_id !== deletedAthlete.id)
            setWorkoutLogs(newWorkoutLogs)
            setSelectedAthlete("All")
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
            <AthleteList athletes={athletes} onAthleteClick={onAthleteClick} onAthletePatchSubmit={onAthletePatchSubmit} onSelectAll={onSelectAll} onAthleteDelete={onAthleteDelete} selectedAthlete={selectedAthlete} setSelectedAthlete={setSelectedAthlete}/>
            <WorkoutList workouts={workouts} onLogSubmit={onLogSubmit} selectedAthlete={selectedAthlete} athletes={athletes} onLogDelete={onLogDelete}/>
        </div>
    )
}

export default AthleteContainer