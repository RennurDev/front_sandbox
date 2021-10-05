import { useEffect, useState } from "react";
import { Tracks } from "./components/menu/content/Tracks";
import { Navigation } from "./components/menu/nav/Navigation";
import { Grid } from "@material-ui/core";

import ShowAllTracks from "./lib/ShowAllTracks";
import HideAllTracks from "./lib/HideAllTracks";

const styles = {
  grid: {
    marginBottom: 30,
  },
};

export const Menu = ({ currentUser, map, tracks }) => {
  const [selectedAct, setSelectedAct] = useState();

  useEffect(() => {
    displayMapExeceptTracks(selectedAct);
  }, [selectedAct]);

  const displayMapExeceptTracks = (action) => {
    if (action === "Tracks") {
      HideAllTracks(map, tracks.length);
    } else {
      ShowAllTracks(map, tracks.length);
    }
  };

  const isTracks = selectedAct === "Tracks" ? true : false;
  return (
    <div>
      <Navigation selectedAct={selectedAct} setSelectedAct={setSelectedAct} />
      <Grid container justify="center" styles={styles.grid}>
        <Grid item xs={10}>
          {isTracks ? <Tracks tracks={tracks} map={map} /> : null}
        </Grid>
      </Grid>
    </div>
  );
};
