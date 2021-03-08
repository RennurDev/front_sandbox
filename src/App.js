import React, { Component } from 'react';
import TopHeader from './components/TopHeader';
import StartButton from './components/StartButton';
import MapBox from './components/MapBox';
import './App.css'


class App extends Component {

  render(){
    return (
      <div>
        <div className="App">
          <TopHeader
          gameMode="RUNNING"
          >
          </TopHeader>
          <StartButton></StartButton>
        </div>
        <MapBox></MapBox>
      </div>
    )
  }
}

export default App;
