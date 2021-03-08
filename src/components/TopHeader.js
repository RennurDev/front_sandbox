import React, { Component } from 'react';
// import "./App.css"

class TopHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameMode: '',
    }
  }
  render() {
    return (
      <div className="TopHeader">
        <h1>{this.state.gameMode}</h1>
        <p>hogehoghoge</p>
      </div>
    )
  }
}

export default TopHeader;
