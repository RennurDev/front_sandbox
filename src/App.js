import React, { Component } from "react";
import Header from "./components/header/App";
import MapBox from "./components/map/MapBox";
import { Menu } from "./menu";
import "./App.css";
import UserForm from "./components/user/App";
import RequestAxios from "./lib/RequestAxios";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    overflow: "hidden",
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: {
        id: "",
        name: "",
      },
      current_location: "",
      form: {
        name: "",
      },
      track_num: "0", //全Track数
      tracks: [],
      map: "",
    };
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this); //TODO: 認証機能が完成すると不要になるかもしれない
    this.handleState = this.handleState.bind(this);
  }

  getCurrentUser() {
    //TODO: device導入後, state.current_user.idを現在ログイン中のidで更新する処理を追記
    let id = this.state.current_user.id;
    const url = "/users/" + id;
    let response = RequestAxios(url, "get");
    response.then((r) => {
      this.setState({ current_user: r });
      this.setState({
        name: this.state.current_user.name,
      });
    });
  }

  handleState(name, data) {
    this.setState({ [name]: data });
  }

  handleUserLogin(id) {
    //TODO: 認証機能が完成すると不要になるかもしれない
    this.setState({
      current_user: {
        id: id,
      },
    });
  }

  // TODO: User API 実装後に修正
  // //formの入力内容の変更を検知
  // handleProfileChange(e, key) {
  //   let target = e.target;
  //   let value = target.value;
  //   let form = this.state.form;
  //   form[key] = value;

  //   this.setState({
  //     form: form,
  //   });
  // }

  // //更新処理
  // handleProfileUpdate() {
  //   let body = {
  //     user: {
  //       id: this.state.current_user.id,
  //       name: this.state.form.name,
  //     },
  //   };
  //   let id = this.state.current_user.id;
  //   const url = "/users/" + id;
  //   let response = RequestAxios(url, "put", body);
  //   response.then((r) => {
  //     this.setState({
  //       current_user: {
  //         name: this.state.form.name,
  //       },
  //     });
  //   });
  // }

  componentDidMount() {}

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.state.current_user.id === "" ? (
          <UserForm handleUserLogin={this.handleUserLogin} />
        ) : (
          <div>
            <Header current_location={this.state.current_location} />
            <MapBox
              currentUser={this.state.current_user}
              tracks={this.state.tracks}
              trackID={this.state.track_id}
              trackNum={this.state.track_num}
              map={this.state.map}
              handleState={this.handleState}
            />
            <Menu
              currentUser={this.state.current_user}
              map={this.state.map}
              tracks={this.state.tracks}
              trackNum={this.state.track_num}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
