import React, {useState} from 'react';
import './App.css';
import Header from './Header'

import AthleteContainer from './AthleteContainer';


function App() {

  

  return (
    <div className='App'>
      <Header/>
      <AthleteContainer/>
      {/* <Calendar/> */}
    </div>
  );
}

export default App;
