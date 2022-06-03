import React from 'react';
import './App.css';
import Header from './Header'
import Nav from './Nav'
import AthleteContainer from './AthleteContainer';

function App() {

  return (
    <div className='App'>
      <Header/>
      <Nav/>
      <AthleteContainer/>
      {/* <Calendar/> */}
    </div>
  );
}

export default App;
