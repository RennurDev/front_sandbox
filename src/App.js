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
  const [distance, setDistance] = useState(0);
  const [map, setMap] = useState();
  const [animationOverlap, setAnimationOverlap] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [appState, setAppState] = useState("beginApp");
  const [currentPos, setCurrentPos] = useState([{ lng: 0, lat: 0 }]);
  const [posHistory, setPosHistory] = useState([]);

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
    /*ページ読み込み */
  }, []);

  useEffect(() => {
    if (appState === "beginApp") {
      setAnimationOverlap("inset");
    } else if (appState === "running") {
      setAnimationOverlap("scale-and-stop");
    } else if (appState === "finishRunning") {
      setAnimationOverlap("iris-out");
    }
  }, [appState]);

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
          <WrapContent
            currentRegion={currentRegion}
            currentPlace={currentPlace}
            currentPos={currentPos}
            distance={distance}
            appState={appState}
            posHistory={posHistory}
            setAppState={setAppState}
          />
          <div className={animationOverlap}>
            <ModalWindow />
            <Header currentPlace={currentPlace} />
            <MapBox
              currentUser={currentUser}
              tracks={tracks}
              trackNum={trackNum}
              map={map}
              distance={distance}
              appState={appState}
              posHistory={posHistory}
              setTracks={setTracks}
              setTrackNum={setTrackNum}
              setDistance={setDistance}
              setCurrentPos={setCurrentPos}
              setPosHistory={setPosHistory}
              setMap={setMap}
              setAppState={setAppState}
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
