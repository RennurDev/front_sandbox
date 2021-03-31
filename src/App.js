import React, { Component } from 'react';
import Header from './components/header/App';
import MapBox from './components/map/MapBox';
import Menu from './components/menu/App';
import './App.css'


class App extends Component {

  render(){
    return (
      <div>
        <Header></Header>
        <MapBox></MapBox>
        <Menu></Menu>
      </div>
    )
  }
}

export default App;
