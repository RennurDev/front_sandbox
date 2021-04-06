import React, { Component } from 'react';
import Profile from './nav/Profile';
import Logs from './nav/Logs';

import ProfileContent from './content/Profile';
import LogsContent from './content/Logs';

import Grid from '@material-ui/core/Grid';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectedContent: '',
    }
  }
  
  render() {
    let {selectedContent} = this.state;
    const selectProfile = () => this.setState({selectedContent: 'Profile'})
    const selectLogs = () => this.setState({selectedContent: 'Logs'})
    return(
      <div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div onClick={selectProfile}>
              <Profile></Profile>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div onClick={selectLogs}>
              <Logs></Logs>
            </div>
          </Grid>
        </Grid>

        {selectedContent === 'Profile' ? 
         <ProfileContent></ProfileContent>
         : 
         selectedContent === 'Logs' 
         ? <LogsContent></LogsContent> 
         : 
         null}
      </div>
    )
  }
}
