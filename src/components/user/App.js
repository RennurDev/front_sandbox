import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import RequestAxios from "../../lib/RequestAxios";
import "../../App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      form: {
        id: "",
        name: "",
      },
    };
  }

  componentDidMount() {
    const url = "/users";
    var response = RequestAxios(url, "get");
    response.then((r) => {
      if (r.data.length >= 1) {
        this.setState({ lists: r.data });
      }
    });
  }

  handleChange(e, key) {
    let target = e.target;
    let value = target.value;
    let form = this.state.form;
    form[key] = value;

    this.setState({
      form: form,
    });
  }

  handleCreate() {
    // TODO: バックエンドでのUser作成機能完成後にコメントアウト
    // let response;
    // const url = "/users";
    // let body = {
    //   user: {
    //     name: this.state.form.name,
    //   },
    // };
    // response = RequestAxios(url, "post", body);
    // if (response) {
    //   console.log(response);
    // }
    this.props.handleUserLogin(5);
  }

  handleDestroy() {
    let response;
    let id = this.state.form.id;
    const url = "/users/" + id;
    response = RequestAxios(url, "delete");
    if (response) {
      console.log(response);
    }
  }

  render() {
    return (
      <div className="backgroundGreen">
        <img
          src={`${process.env.PUBLIC_URL}/signUpPetamp.png`}
          alt="signUpImg"
          className="Petamp"
        />
        <form noValidate autoComplete="off">
          <Grid container spacing={0} alignItems="center" justify="center">
            <Grid item xs={10}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        id="filled-basic"
                        label="Name"
                        variant="filled"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="filled-basic"
                        label="Password"
                        variant="filled"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid
                    container
                    spacing={0}
                    alignItems="center"
                    justify="center"
                  >
                    <Grid item xs={5}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Button
                            onClick={() => this.handleCreate()}
                            variant="contained"
                            color="secondary"
                            fullWidth={true}
                          >
                            はじめる
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            onClick={() => this.handleCreate()}
                            variant="contained"
                            fullWidth={true}
                          >
                            Login
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>

        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {this.state.lists.map((list) => {
                return (
                  <div>
                    <Grid container spaceing={0}>
                      <Grid item xs={6}>
                        {list.id}
                      </Grid>
                      <Grid item xs={3}>
                        {list.name}
                      </Grid>
                      <Grid item xs={3}>
                        {list.created_at}
                      </Grid>
                    </Grid>
                  </div>
                );
              })}
            </Grid>
            {/* 新規作成 */}
            <Grid item xs={9}>
              <TextField
                value={this.state.form.name}
                onChange={(e) => this.handleChange(e, "name")}
                fullWidth
                label="Name"
                color="primary"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                onClick={() => this.handleCreate()}
                variant="outlined"
                color="primary"
                fullWidth={true}
              >
                CREATE
              </Button>
            </Grid>
            {/* ユーザー削除 */}
            <Grid item xs={2}>
              <TextField
                value={this.state.form.id}
                onChange={(e) => this.handleChange(e, "id")}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                onClick={() => this.handleDestroy()}
                variant="outlined"
                color="secondary"
                fullWidth={true}
              >
                DELETE
              </Button>
            </Grid>
          </Grid>
        </form>
        <p>Forget Name?(sorry, but I can do nothing.)</p>
      </div>
    );
  }
}

export default App;
