import React, { useState, useEffect } from "react";
import "./App.css";
import WorkoutList from "./WorkoutList";
import AthleteList from "./AthleteList";
import CreateNewAthleteForm from './CreateNewAthleteForm';
import CreateNewWorkout from "./CreateNewWorkout";
import Nav from './Nav';

function AthleteContainer () {

    const [athletes, setAthletes] = useState([])
    const [selectedAthlete, setSelectedAthlete] = useState("")
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

    function onAddAthleteClick(e) {
        setAddAthlete(!addAthlete)
      }

    function onAddWorkoutClick(e) {
        setAddWorkout(!addWorkout)
    }

    return (
        <div id="athlete_container">
            <Nav onAddAthleteClick={onAddAthleteClick} onAddWorkoutClick={onAddWorkoutClick}/>
            {addAthlete ? <CreateNewAthleteForm setAddAthlete={setAddAthlete} onNewAthleteSubmit={onNewAthleteSubmit}/> : null}
            {addWorkout ? <CreateNewWorkout setAddWorkout={setAddWorkout} 
            onNewWorkoutSubmit={onNewWorkoutSubmit}
            /> : null}
            <AthleteList athletes={athletes} setSelectedAthlete={setSelectedAthlete}/>
            <WorkoutList workouts={workouts} workoutLogs={workoutLogs} onLogSubmit={onLogSubmit} selectedAthlete={athletes[selectedAthlete - 1]} athletes={athletes} onLogDelete={onLogDelete}/>
        </div>
    )
}

export default AthleteContainer