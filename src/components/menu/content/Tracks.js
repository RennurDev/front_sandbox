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
import { withStyles } from "@material-ui/core/styles";

// import handleCurrentTrack from '../../../lib/HandleCurrentTrack'; //TODO: handleCurrentTrackを使用した実装に変更
import showTrackLayer from '../../../lib/ShowTrackLayer';
import hideTrackLayer from '../../../lib/HideTrackLayer';
import hideAllTracks from '../../../lib/HideAllTracks';

const styles = theme => ({
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

class Track extends Component {

  constructor(props) {
    super(props)
    this.state = {
      track_id : '0'//Tracksタブで表示中のtrack_id
    }
  }

  componentDidMount() {
    hideAllTracks(this.props.map, this.props.track_num)
    showTrackLayer(this.props.map, 'track_'+this.state.track_id)
    console.log('hoge')
  }

  render() {
      //参考： https://stackoverflow.com/questions/56554586/how-to-use-usestyle-to-style-class-component-in-material-ui
      const { classes } = this.props;
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
            <Button
              variant="outlined"
              color="primary"
              fullWidth={true}
              onClick = {
                () => {
                  hideTrackLayer(this.props.map, 'track_'+this.state.track_id)
                  this.setState({
                    track_id: (this.state.track_id - 1 + this.props.track_num) % this.props.track_num
                  }, () => {showTrackLayer(this.props.map, 'track_'+this.state.track_id)})
                }
              }
            >
              prev
            </Button>
          </Grid>

          <Grid item xs={6}>
          <Button
              variant="outlined"
              color="primary"
              fullWidth={true}
              onClick = {
                () => {
                  hideTrackLayer(this.props.map, 'track_'+this.state.track_id)
                  this.setState({
                    track_id: (this.state.track_id + 1 + this.props.track_num) % this.props.track_num
                  }, () => {showTrackLayer(this.props.map, 'track_'+this.state.track_id)})
                }
              }
            >
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

export default withStyles(styles, { withTheme: true })(Track);
