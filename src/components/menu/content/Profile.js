import React, { Component } from "react";

export default class Profile extends Component {
  render() {
    const current_user = this.props.current_user;
    return (
      <div>
        <p>I AM {current_user.name}</p>
      </div>
    );
  }
}
