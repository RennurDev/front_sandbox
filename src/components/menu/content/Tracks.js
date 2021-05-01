import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

export default class Tracks extends Component {
  render() {
    return(
      <div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button variant="outlined" color="primary" fullWidth={true}>
              prev
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button variant="outlined" color="primary" fullWidth={true}>
              next
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button variant="outlined" color="secondary" fullWidth={true}>
              delete
            </Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}
