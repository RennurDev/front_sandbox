import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import clsx from 'clsx';


const useStyles = makeStyles({
  media: {
    height: 120,
  },
  relative: {
    position: 'relative'
  },
  absolute: {
    position: 'absolute',
    top: '20%',
    left: '20%',
  }
});

export default function Tracks() {
  const classes=useStyles();
  const imageClass= clsx(classes.media, classes.relative,)
  return(
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
         <Card>
            <CardContent>
                
                <CardMedia
                  className={imageClass}
                  image={process.env.PUBLIC_URL+"/track_test.png"}
                  title="Paella dish"
                >
                  <div className={classes.absolute}>
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
            <CardActions disableSpacing>
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
