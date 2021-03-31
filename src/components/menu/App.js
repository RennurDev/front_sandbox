import React, { Component } from 'react';
import Profile from './nav/Profile';
import Logs from './nav/Logs';

import ProfileContent from './content/Profile';
import LogsContent from './content/Logs';

export default class App extends Component {
  render() {
    return(
      <div>
        <Profile></Profile>
        <Logs></Logs>

        <ProfileContent></ProfileContent>  
        <LogsContent></LogsContent>
      </div>
    )
  }
}
