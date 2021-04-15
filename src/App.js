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

class App extends Component {

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
              <Menu />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
