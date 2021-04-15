import React, { Component } from 'react';
import {
    BottomNavigation,
    BottomNavigationAction,
} from '@material-ui/core';
//Icons
import PersonIcon from '@material-ui/icons/Person';
import TimelineIcon from '@material-ui/icons/Timeline';

export default class Navigation extends Component {
    render() {
        return(
            <BottomNavigation value={ this.props.value } onChange={ this.props.handleChange }>
            <BottomNavigationAction label="Profile" value="Profile" icon={<PersonIcon />} />
            <BottomNavigationAction label="Logs" value="Logs" icon={<TimelineIcon />} />
            </BottomNavigation>
        )
        
    }
}