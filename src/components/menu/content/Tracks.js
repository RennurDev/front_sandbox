import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@material-ui/core";

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

export const Tracks = ({ trackNum, tracks, map }) => {
  const [trackID, setTrackID] = useState(0);
  useEffect(() => {
    hideAllTracks(map, trackNum);
    changeSelectedTrack(trackID, trackNum, tracks, map);
  }, [trackID]);

  const changeSelectedTrack = (trackID, trackNum, tracks, map) => {
    if (trackID >= 0 && trackID < trackNum) {
      let selectedCoords = tracks[trackID];
      changeMapBound(selectedCoords, map);
    } else if (trackID < 0) {
      let selectedCoords = tracks[trackNum + (trackID % trackNum)];
      changeMapBound(selectedCoords, map);
    } else if (trackNum <= trackID) {
      let selectedCoords = tracks[trackID % trackNum];
      changeMapBound(selectedCoords, map);
    }
  };

  const changeMapBound = (coords, map) => {
    let bounds = coords.reduce((bounds, coord) => {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coords[0], coords[0]));

    try {
      map.fitBounds(bounds, {
        padding: 20,
      });
      drawTrack(map, "single_track", coords);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card className={styles.root}>
            <CardContent>
              <CardMedia
                className={styles.media}
                image={process.env.PUBLIC_URL + "/track_test.png"}
              >
                <Typography color="textSecondary">2021.5.1.sat</Typography>
                <Typography align="center" variant="h5" component="h2">
                  DISTANCE 100.0km
                </Typography>
                <Typography align="center" variant="h5" component="h2">
                  ALTITUDE 300m
                </Typography>
              </CardMedia>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth={true}
            onClick={() => setTrackID(trackID - 1)}
          >
            prev
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth={true}
            onClick={() => setTrackID(trackID + 1)}
          >
            next
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
