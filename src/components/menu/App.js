import React, { Component } from 'react';
// import Profile from './nav/Profile';
// import Logs from './nav/Logs';

import ProfileContent from './content/Profile';
import LogsContent from './content/Logs';

import { //Grid,
        BottomNavigation,
        BottomNavigationAction,
 } from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';
import TimelineIcon from '@material-ui/icons/Timeline';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      value: '',
    }
  }
  
  render() {
    const { value } = this.state;
    const handleChange = (event, value) => {
      this.setState({ value });
    };
    return(
      <div>
        <BottomNavigation value={ value } onChange={handleChange}>
          <BottomNavigationAction label="Profile" value="Profile" icon={<PersonIcon />} />
          <BottomNavigationAction label="Logs" value="Logs" icon={<TimelineIcon />} />
        </BottomNavigation>

        {this.state.value === 'Profile' ? 
         <ProfileContent></ProfileContent>
         : 
         this.state.value === 'Logs' 
         ? <LogsContent></LogsContent> 
         : 
         null}
        
      </div>
    )
  }
}
