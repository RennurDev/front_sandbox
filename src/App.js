import React, { Component } from 'react';
import Header from './components/header/App';
import MapBox from './components/map/MapBox';
import Menu from './components/menu/App';
import './App.css'
import UserForm from './components/user/App'
import axios from 'axios';

const RAILS_API_ENDPOINT = process.env.REACT_APP_BACKEND_API_ENDPOINT

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current_user: {
        id: '',
        name: '',
      },
      form: {
        name: '',
      },
      track_num: '0', //全Track数
      tracks: '',
      map: '',
    }

    this.getCurrentUser = this.getCurrentUser.bind(this)
    this.handleMapCreate = this.handleMapCreate.bind(this)
    this.handleTracksChange = this.handleTracksChange.bind(this)
    this.handleProfileChange = this.handleProfileChange.bind(this)
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this)
  }

  getCurrentUser() {
    //TODO: device導入後, state.current_user.idを現在ログイン中のidで更新する処理を追記
    let id = this.state.current_user.id 
    const url = RAILS_API_ENDPOINT + '/users/'+ id
    axios
      .get(url)
      .then((results) => {
          const data = results.data
          this.setState({current_user: data})
          //formの情報の更新
          this.setState({form: {
            name: this.state.current_user.name,
          }
        })
      })
      .catch(
        (error) => {
          console.log(error)
      })
  }

  handleMapCreate(map) {
    this.setState({map: map});
  }

  handleTracksChange(tracks) {
    this.setState({
      tracks: tracks,
      track_num: tracks.length,
    });
  }

  //formの入力内容の変更を検知
  handleProfileChange(e, key) {
    let target = e.target
    let value = target.value
    let form = this.state.form
    form[key]=value

    this.setState({
      form: form
    })
  }
  
  //更新処理
  handleProfileUpdate() {
    let body = {
      user:{
        id: this.state.current_user.id,
        name: this.state.form.name
      }
    }
    let id = this.state.current_user.id
    const url = RAILS_API_ENDPOINT + '/users/'+ id
    axios
      .put(url, body)
      .then((results) => {
        this.setState({current_user: {
          name: this.state.form.name,
        }
      })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  componentDidMount() {
    //current_userの更新
  }


  render(){
    return (
        <div className="overflow-hidden">
          { this.state.current_user.id === '' ? <UserForm /> : 
          <div>
            <Header />
            <MapBox
              current_user = {this.state.current_user}
              track_id = {this.state.track_id}
              track_num = {this.state.track_num}
              map = {this.state.map}
              handleMapCreate = {this.handleMapCreate}
<<<<<<< HEAD
              handleTrackNumChange = {this.handleTrackNumChange}
            />
            <Menu 
=======
              handleTracksChange = {this.handleTracksChange}
              />
              <Menu 
>>>>>>> 82ac247adf1a4e551e790c136ba331bb6f5602ba
              current_user = {this.state.current_user}
              form = {this.state.form}
              map = {this.state.map}
              tracks = {this.state.tracks}
              track_num = {this.state.track_num}
              handleProfileChange = {this.handleProfileChange}
              handleProfileUpdate = {this.handleProfileUpdate}
            />
          </div>
          }
          
      </div>
    )
  }
}

export default App;
