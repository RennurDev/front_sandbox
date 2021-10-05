import { useState, useEffect } from "react";
import { Header } from "./header";
import { Menu } from "./menu";
import { MapBox } from "./components/map/MapBox";
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
  const [tracks, setTracks] = useState([]);
  const [distance, setDistance] = useState(0);
  const [map, setMap] = useState();
  const [animationOverlap, setAnimationOverlap] = useState();
  const [appState, setAppState] = useState("beginApp");
  const [controlPointer, setControlPointer] = useState("");
  const [currentPos, setCurrentPos] = useState([{ lng: 0, lat: 0 }]);
  const [posHistory, setPosHistory] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCurrentPos(pos.coords.longitude, pos.coords.latitude);
    });
  }, []);

  useEffect(() => {
    let place = getPlaceName(currentPos.lng, currentPos.lat);
    place.then((p) => {
      setCurrentPlace(p);
    });
    let region = getRegionName(currentPos.lng, currentPos.lat);
    region.then((r) => {
      setCurrentRegion(r);
    });
  }, [currentPos]);

  useEffect(() => {
    if (appState === "beginApp") {
      setAnimationOverlap("inset");
      setControlPointer("");
    } else if (appState === "running") {
      setAnimationOverlap("scale-and-stop");
      setControlPointer("disablePointerEvents");
    } else if (appState === "finishRunning") {
      setAnimationOverlap("iris-out");
    }
  }, [appState]);

  return (
    <div style={styles.root}>
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
          <div className={controlPointer}>
            <ModalWindow />
            <Header currentPlace={currentPlace} />
            <MapBox
              currentUser={currentUser}
              tracks={tracks}
              currentPos={currentPos}
              distance={distance}
              appState={appState}
              posHistory={posHistory}
              setTracks={setTracks}
              setDistance={setDistance}
              setCurrentPos={setCurrentPos}
              setPosHistory={setPosHistory}
              setMap={setMap}
              setAppState={setAppState}
            />
            <Menu currentUser={currentUser} map={map} tracks={tracks} />
          </div>
        </div>
      </div>
    </div>
  );
};
