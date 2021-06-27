import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import {
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
} from "@material-ui/core";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import { withStyles } from "@material-ui/core/styles";

// import handleCurrentTrack from '../../../lib/HandleCurrentTrack';
//TODO: handleCurrentTrackを使用した実装に変更
import hideAllTracks from "../../../lib/HideAllTracks";
import drawTrack from "../../../lib/DrawTrack";

const styles = (theme) => ({
  root: {
    maxWidth: 360,
  },
  media: {
    height: 140,
  },
  actions: {
    height: 30,
  },
});

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track_id: "0", //Tracksタブで表示中のtrack_id
    };

    this.handleTrackChange = this.handleTrackChange.bind(this);
  }

  handleTrackChange(option) {
    if (this.props.track_num !== 0) {
      let new_track_id;
      if (option === "next") {
        new_track_id = (this.state.track_id + 1) % this.props.track_num;
      } else if (option === "prev") {
        new_track_id =
          (this.state.track_id - 1 + this.props.track_num) %
          this.props.track_num;
      } else {
        new_track_id = this.state.track_id;
      }
      this.setState(
        {
          track_id: new_track_id,
        },
        () => {
          let coordinates = this.props.tracks[this.state.track_id];
          let bounds = coordinates.reduce(function (bounds, coord) {
            return bounds.extend(coord);
          }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

          this.props.map.fitBounds(bounds, {
            padding: 20,
          });
          drawTrack(this.props.map, "single_track", coordinates);
        }
      );
    }
  }

  componentDidMount() {
    hideAllTracks(this.props.map, this.props.track_num);
    this.handleTrackChange();
  }

  render() {
    //参考： https://stackoverflow.com/questions/56554586/how-to-use-usestyle-to-style-class-component-in-material-ui
    const { classes } = this.props;
    const date = this.props.date
    const distance = this.props.distance
    const altitude = this.props.altitude

    return (
      <div>
        <Grid
          container
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
                  image={process.env.PUBLIC_URL + "/track_test.png"}
                >
                  <div>
                    <Typography
                      align="center"
                      color="textSecondary"
                      gutterBottom
                    >
                      {date}
                    </Typography>
                    <Typography align="center" variant="h5" component="h2">
                      {distance}
                    </Typography>
                    <Typography align="center" variant="h5" component="h2">
                      {altitude}
                    </Typography>
                  </div>
                </CardMedia>
              </CardContent>

              <CardActions disableSpacing className={classes.actions}>
                <Grid container alignItems="center" justify="center">
                  <Grid xs={12}>
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
              onClick={() => {
                this.handleTrackChange("prev");
              }}
            >
              prev
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth={true}
              onClick={() => {
                this.handleTrackChange("next");
              }}
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
    );
  }
}

export default withStyles(styles, { withTheme: true })(Track);
