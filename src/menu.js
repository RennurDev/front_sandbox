import { useEffect, useState } from "react";
import { Profile } from "./components/menu/content/Profile";
import { Tracks } from "./components/menu/content/Tracks";
import { Setting } from "./components/menu/content/Setting";
import { Navigation } from "./components/menu/nav/Navigation";
import { Grid } from "@material-ui/core";

import ShowAllTracks from "./lib/ShowAllTracks";
import HideAllTracks from "./lib/HideAllTracks";

const styles = {
  grid: {
    marginBottom: 30,
  },
};

export const Menu = ({ currentUser, map, tracks, trackNum }) => {
  const [selectedAct, setSelectedAct] = useState();

  useEffect(() => {
    displayMapExeceptTracks(selectedAct);
  }, [selectedAct]);

  const displayMapExeceptTracks = (action) => {
    if (action === "Tracks") {
      HideAllTracks(map, trackNum);
    } else {
      ShowAllTracks(map, trackNum);
    }
  };

  const isProfile = selectedAct === "Profile" ? true : false;
  const isTracks = selectedAct === "Tracks" ? true : false;
  const isSetting = selectedAct === "Setting" ? true : false;
  return (
    <div>
      <Navigation selectedAct={selectedAct} setSelectedAct={setSelectedAct} />
      <Grid container justify="center" styles={styles.grid}>
        <Grid item xs={10}>
          {isProfile ? <Profile currentUser={currentUser} /> : null}
          {isTracks ? (
            <Tracks trackNum={trackNum} tracks={tracks} map={map} />
          ) : null}
          {/* TODO: User API 完成後に 引数追加 */}
          {isSetting ? <Setting /> : null}
        </Grid>
      </Grid>
    </div>
  );
};
