import React, { Component } from 'react';
import UserLocation from './UserLocation';

export default class App extends Component {
  render() {
    const areaName = "OHANOMIZU";
    return (
        <UserLocation areaName={areaName}>
        </UserLocation>
    ) 
  }
}