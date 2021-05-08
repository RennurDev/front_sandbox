import React, { Component } from 'react';

import {
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
 } from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    maxWidth: 360,
  },
  media: {
    height: 140
  },
  actions: {
    height: 30
  }
});

export default function Tracks() {
  const classes=useStyles();
  return(
    <div>
      <Grid container 
        spacing={2}
        alignItems="center"
        justify="center"
        direction="column"
      >
        <Grid item xs={12}>
         <Card className={classes.root}>
            <CardContent>
              <CardMedia
                  className={classes.media}
                  image={process.env.PUBLIC_URL+"/track_test.png"}
              >
              <div>
                <Typography align="center" color="textSecondary" gutterBottom>
                2021.5.1.sat
                </Typography>
                <Typography align="center" variant="h5" component="h2">
                  DISTANCE 100.0km
                </Typography>
                <Typography align="center" variant="h5" component="h2">
                  ALTITUDE 300m
                </Typography>
              </div>
              </CardMedia> 
            </CardContent>

            <CardActions disableSpacing className={classes.actions}>
              <Grid container alignItems="center" justify="center">
                <Grid xs={0}>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                      </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
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
