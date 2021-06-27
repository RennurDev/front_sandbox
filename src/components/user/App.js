import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import "../../App.css";

const RAILS_API_ENDPOINT = process.env.REACT_APP_BACKEND_API_ENDPOINT;

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
    axios
      .get(RAILS_API_ENDPOINT + "/users")
      .then((results) => {
        const data = results.data;
        this.setState({ lists: data });
      })
      .catch((error) => {
        console.log(error);
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
    let body = {
      user: {
        name: this.state.form.name,
      },
    };
    const url = RAILS_API_ENDPOINT + "/users";
    axios
      .post(url, body)
      .then((results) => {
        const data = results.data;
      })
      .catch((error) => {
        console.log(error);
      });

    this.props.handleUserLogin(5);
  }

  handleDestroy() {
    let body = {
      user: {
        id: this.state.form.id,
      },
    };
    let id = this.state.form.id;
    const url = RAILS_API_ENDPOINT + "/users/" + id;
    axios
      .delete(url, body)
      .then((results) => {
        const data = results.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/signUpPetamp.png`}
          className="signUpPetamp"
          alt="signUp"
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
                    <Grid item xs={6}>
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
      </div>
    );
  }
}

export default App;
