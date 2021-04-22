import React, { Component } from 'react';
import ProfileContent from './content/Profile';
import TracksContent from './content/Tracks';
import SettingContent from './content/Setting';
import Navigation from './nav/Navigation';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      value: '',
    }
  }
  
  render() {
    const { value } = this.state; //これ{}無いと動かん理由わからん
    const handleNavChange = (e, value) => {
      this.setState({ value });
    };
    const handleProfileChange = this.props.handleProfileChange
    const handleProfileUpdate = this.props.handleProfileUpdate
    const current_user = this.props.current_user
    const form = this.props.form
    console.log(this.props)
    return(
      <div>
        <Navigation value={ value } handleChange = { handleNavChange }/>

        {this.state.value === 'Profile' ? 
         <ProfileContent current_user = { current_user } />
         : 
         this.state.value === 'Tracks' ?
         <TracksContent></TracksContent> 
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
        
      </div>
    )
  }
}
