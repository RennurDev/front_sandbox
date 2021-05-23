import React, { Component } from 'react';
import Header from './components/header/App';
import MapBox from './components/map/MapBox';
import Menu from './components/menu/App';
import './App.css'
import UserForm from './components/user/App'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import axios from 'axios';

const RAILS_API_ENDPOINT = process.env.REACT_APP_BACKEND_API_ENDPOINT

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current_user: {
        id: '1',
        name: 'hoge',
      },
      form: {
        name: '',
      },
      track_id: '1'
    }

    this.getCurrentUser = this.getCurrentUser.bind(this)
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
    this.getCurrentUser();
  }


  render(){
    return (
      <div className="overflow-hidden">
        <Router>
          <ul>
            <li>
              <Link to='/home'>Home</Link>
            </li>
            <li>
              <Link to='/sign_up'>Sign up</Link>
            </li>
          </ul>
          <Switch>
            <Route path="/sign_up">
              <UserForm />
            </Route>
            <Route path="/home">
              <Header />
              <MapBox
              current_user = {this.state.current_user}
              track_id = {this.state.track_id}
              />
              <Menu 
              current_user = {this.state.current_user}
              form = {this.state.form}
              handleProfileChange = {this.handleProfileChange}
              handleProfileUpdate = {this.handleProfileUpdate}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
