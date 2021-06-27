import React, { Component } from 'react';
import UserLocation from './UserLocation';

export default class App extends Component {
  render() {
    const areaName = "OHANOMIZU";
    return (
      <div>
        <UserLocation
          current_location={this.props.current_location}
        />
      </div>
    )
  }
}