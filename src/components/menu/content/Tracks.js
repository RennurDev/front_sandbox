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

import drawTrack from "../../../lib/DrawTrack";
import { TrackSvg } from "../../result/TrackSvg";

const styles = {
  root: {
    maxWidth: 360,
    height: 500,
  },
  media: {
    position: "absolute",
  },
  actions: {
    height: 30,
  },
};

export const Tracks = ({ tracks, map }) => {
  const [trackID, setTrackID] = useState(0);
  const [track, setTrack] = useState([]);
  const [svg, setSvg] = useState();

  useEffect(() => {
    const trackNum = tracks.length;
    if (0 <= trackID) {
      const selectedCoords = tracks[trackID % trackNum];
      setTrack(selectedCoords);
    } else if (trackID < 0) {
      // NOTE: trackID が trackNum の倍数の場合でも期待の値を取得できる
      const selectedCoords =
        tracks[(trackNum + (trackID % trackNum)) % trackNum];
      setTrack(selectedCoords);
    }
  }, [trackID]);

  useEffect(() => {
    // TODO: map 表示中に実行すると coords が undefined となるので,
    // 非同期処理に変更する
    let bounds = track.reduce((bounds, coord) => {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(track[0], track[0]));

    try {
      map.fitBounds(bounds, {
        padding: 20,
      });
      drawTrack(map, "single_track", track);
    } catch (e) {
      console.log(e);
    }

    try {
      setSvg(TrackSvg(track, 200, 140));
    } catch (e) {
      console.log(e);
    }
  }, [track]);

  return (
    <div>
      <Grid container spacing={2} style={styles.root}>
        <Grid style={styles.media} item xs={12}>
          <div>{svg}</div>
        </Grid>
        <Grid item xs={12}>
          <Typography color="textSecondary">2021.5.1.sat</Typography>
          <Typography align="center" variant="h5" component="h2">
            DISTANCE 100.0km
          </Typography>
          <Typography align="center" variant="h5" component="h2">
            ALTITUDE 300m
          </Typography>
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
