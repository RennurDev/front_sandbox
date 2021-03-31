import React, { Component } from 'react';
import Profile from './nav/Profile';
import Logs from './nav/Logs';

import ProfileContent from './content/Profile';
import LogsContent from './content/Logs';

import Grid from '@material-ui/core/Grid';

export default class App extends Component {
  render() {
    return(
      <div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Profile></Profile>
          </Grid>
          <Grid item xs={6}>
            <Logs></Logs>
          </Grid>
        </Grid>


        <ProfileContent></ProfileContent>  
        <LogsContent></LogsContent>
      </div>
    )
  }
}
