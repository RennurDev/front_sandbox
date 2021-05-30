import React, { Component } from 'react';
import {
    BottomNavigation,
    BottomNavigationAction,
} from '@material-ui/core';
//Icons
import PersonIcon from '@material-ui/icons/Person';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsIcon from '@material-ui/icons/Settings';

export default class Navigation extends Component {
    render() {
        return(
            <BottomNavigation value={ this.props.value } onChange={ this.props.handleNavChange }>
            <BottomNavigationAction label="Profile" value="Profile" icon={<PersonIcon />} />
            <BottomNavigationAction label="Tracks" value="Tracks" icon={<TimelineIcon />} />
            <BottomNavigationAction label="Setting" value="Setting" icon={<SettingsIcon />} />
            </BottomNavigation>
        )
        
    }
}
