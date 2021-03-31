import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

export default class UserInfo extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <p>TAIKI NAKAMURA</p>
          </Grid>
        </Grid>
        
      </div>
    )
  }
}
