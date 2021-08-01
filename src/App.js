import { useState, useEffect } from "react";
import { Header } from "./header";
import { Menu } from "./menu";
import { MapBox } from "./components/map/MapBox";
import { UserForm } from "./components/user/App";
import { WrapContent } from "./components/wrap/WrapContent";
import getRegionName from "./lib/GetRegionName";
import getPlaceName from "./lib/GetPlaceName";
import { ModalWindow } from "./components/modal/ModalWindow";
import "./App.css";

const styles = {
  root: {
    overflow: "hidden",
  },
  text: {
    position: "absolute",
    top: "calc(50% + 25vh)",
    width: "100vw",
    textAlign: "center",
    margin: "auto",
    color: "white",
  },
};

export const App = () => {
  const [currentUser, setCurrentUser] = useState([
    {
      id: "",
      name: "",
    },
  ]);
  const [currentPlace, setCurrentPlace] = useState();
  const [currentRegion, setCurrentRegion] = useState();
  const [trackNum, setTrackNum] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [map, setMap] = useState();

  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      let place = getPlaceName(pos.coords.longitude, pos.coords.latitude);
      place.then((p) => {
        setCurrentPlace(p);
      });
      let region = getRegionName(pos.coords.longitude, pos.coords.latitude);
      region.then((r) => {
        setCurrentRegion(r);
      });
    });
  }, []);

  useEffect(() => {
    if (currentUser.id) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [currentUser.id]);

  return (
    <div className={styles.root}>
      {isLoggedIn ? (
        <div>
          <div style={styles.text}>
            <WrapContent currentRegion={currentRegion} />
          </div>
          <div className="inset">
            <ModalWindow />
            <Header currentPlace={currentPlace} />
            <MapBox
              currentUser={currentUser}
              tracks={tracks}
              trackNum={trackNum}
              map={map}
              setTracks={setTracks}
              setTrackNum={setTrackNum}
              setMap={setMap}
            />
            <Menu
              currentUser={currentUser}
              map={map}
              tracks={tracks}
              trackNum={trackNum}
            />
          </div>
        </div>
      ) : (
        <UserForm setCurrentUser={setCurrentUser} />
      )}
    </div>
  );
};
