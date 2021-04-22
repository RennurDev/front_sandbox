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
        id: '2',
        name: 'hoge',
      },
      form: {
        name: '',
      },
    }

    this.handleProfileChange = this.handleProfileChange.bind(this)
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this)
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

    //formの情報の更新
    this.setState({form: {
        name: this.state.current_user.name,
      }
    })
  }


  render(){
    return (
      <div>
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
              <MapBox />
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
