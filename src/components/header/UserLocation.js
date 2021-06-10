import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default class UserInfo extends Component {
  render() {
    return (
     <div>
       <Grid container alignContent="center" alignItems="center" justify="center">
          <Grid item xs={12}>
            <div className="BackgroundAreaName">
              <Grid container alignItems="center" justify="center">
                  <Grid xs={7}>
                    <img src={process.env.PUBLIC_URL+"/PetampAreaNameBackground-02.svg"}  alt="アイコン" />
                  </Grid>
              </Grid>
            </div>
          </Grid>
       </Grid>
      <Grid container alignContent="center" alignItems="center" justify="center">
        <Grid item xs={12}>
          <div className="areaName">
            <Typography className="textWhite" align="center" gutterBottom>
              BUNKYO
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
    )
  }
}
