import React, { Component } from 'react';
import { Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';

export default class RecordTrigger extends Component {

  render() {
    return (
      <div>
        <Button fullWidth={true} 
                onClick={() => this.props.onClick()}>
          <Grid container alignItems="center" justify="center">
            <Grid xs={4}>
              <img src={process.env.PUBLIC_URL+"/RecordPetamp-03.svg"}  alt="アイコン" />
            </Grid>
          </Grid>
        </Button>
      </div>
    )
  }
}
