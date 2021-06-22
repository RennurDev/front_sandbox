import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";

export default class Setting extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>Edit Profile</h1>
          </Grid>
          <Grid item xs={9}>
            <TextField
              value={this.props.form.name}
              onChange={(e) => this.props.handleChange(e, "name")}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth={true}
              onClick={this.props.handleUpdate}
            >
              Update
            </Button>
          </Grid>
          <Grid item xs={12}>
            <h1>Logout</h1>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" color="secondary" fullWidth={true}>
              LOGOUT
            </Button>
          </Grid>
          <Grid item xs={12}>
            <h1>Delete Account</h1>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" color="secondary" fullWidth={true}>
              DELETE
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
