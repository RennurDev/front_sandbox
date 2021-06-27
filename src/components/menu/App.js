import React, { Component } from 'react';
import ProfileContent from './content/Profile';
import TracksContent from './content/Tracks';
import SettingContent from './content/Setting';
import Navigation from './nav/Navigation';
import showAllTracks from '../../lib/ShowAllTracks';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    marginBottom: 30,
  },
});

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      value: '',
    }
    this.date= "2021/2/3"
    this.distance= "123245"
    this.altitude= "6789"
  }
  
  render() {
    const { value } = this.state; //これ{}無いと動かん理由わからん
    const { classes } = this.props;
    const handleNavChange = (e, value) => {
      this.setState({ value },
                    () => {
                      let map = this.props.map
                      let track_num = this.props.track_num

                      if(this.state.value !== 'Tracks') {
                        showAllTracks(map, track_num)
                      }
                    });
      
    };
    const handleProfileChange = this.props.handleProfileChange
    const handleProfileUpdate = this.props.handleProfileUpdate
    const current_user = this.props.current_user
    const form = this.props.form

    return(
      <div>
        <Navigation value={ value } handleNavChange = { handleNavChange }/>
        <Grid
          container
          spacing={0}
          alignContent="center" 
          alignItems="center"
          justify="center"
          className={ classes.root }
        >
          <Grid item xs={10}>
            {this.state.value === 'Profile' ? 
            <ProfileContent current_user = { current_user } />
            : 
            this.state.value === 'Tracks' ?
            <TracksContent
            map = {this.props.map}
            tracks = {this.props.tracks}
            track_num = {this.props.track_num}
            date = {this.date}
            distance = {this.distance}
              altitude = {this.altitude} /> 
            :
            this.state.value === 'Setting' ?
            <SettingContent
            current_user = { current_user }
            form = { form }
            handleChange = { handleProfileChange }
            handleUpdate = { handleProfileUpdate }/>
            :
            null
            }
          </Grid>
        </Grid>
        
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(App);

