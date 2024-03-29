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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import drawTrack from "../../../lib/DrawTrack";

const styles = {
  root: {
    maxWidth: 360,
  },
  media: {
    height: 140,
  },
  actions: {
    height: 30,
  },
};

export const Tracks = ({ tracks, map }) => {
  const [trackID, setTrackID] = useState(0);

  useEffect(() => {
    changeSelectedTrack(trackID, tracks, map);
  }, [trackID]);
  const changeSelectedTrack = (trackID, tracks, map) => {
    const trackNum = tracks.length;
    if (0 <= trackID) {
      let selectedCoords = tracks[trackID % trackNum];
      changeMapBound(selectedCoords, map);
    } else if (trackID < 0) {
      // NOTE: trackID が trackNum の倍数の場合でも期待の値を取得できる
      let selectedCoords = tracks[(trackNum + (trackID % trackNum)) % trackNum];
      changeMapBound(selectedCoords, map);
    }
  };

  const changeMapBound = (coords, map) => {
    // TODO: map 表示中に実行すると coords が undefined となるので,
    // 非同期処理に変更する
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
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth={true}
            onClick={() => setTrackID(trackID + 1)}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
