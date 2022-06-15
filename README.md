# Track Tracker App 

Track Tracker is a React based app, supported by a Ruby back end. The app allows a coach to create workouts and athletes. The athlete then "checks-in" to the workout by completing a training log entry. The app was created with the create-react-app and the backend uses Ruby Active Record and Sinatra gems. 

## Features

The coach can add new athlete data, including name and age. 

The coach can add workouts for the athletes to complete with data including the workout type, any specific distances and times, any supplementary exercises and the approximate duration of the workout. 

The athlete can then complete a workout log entry that includes the completed mileage, workout details, any comments and an overall rating of the exercise.

Each athlete that logs a workout is added to the tally in the bottom left corner of the workout card and the average workout rating is calculated so that the coach can evaluate the effectiveness and enjoyment of the workout.

## Future Features

In the future there will be two separate interfaces, one for the coach and one for each athlete. The current view is the coaches view. The athletes will have login credentials and will be able to view their own completed workouts, as well as those they are expected to complete. They will be able to view their weekly, monthly and yearly mileage totals and track their improvements over time. 

## Running the server 

To run the server locally from the backend directory:  

```bundle install```

```bundle exec rake server```

To run the app from the frontend directory:

```npm install```

```npm start```

