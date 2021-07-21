import { useState } from "react";
import { Header } from "./header";
import { Menu } from "./menu";
import MapBox from "./components/map/MapBox";
import "./App.css";
import UserForm from "./components/user/App";

const styles = (theme) => ({
  root: {
    overflow: "hidden",
  },
});

export const App = () => {
  const [currentUser, setCurrentUser] = useState([{
    id: "",
    name: "",
  }]);
  const [currentLocation, setCurrentLocation] = useState("");
  const [form, setForm] = useState([{
    name: "",
  }]);
  const [trackNum, setTrackNum] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [map, setMap] = useState("");

  return (
    <div className={styles.root}>
      {this.state.current_user.id === "" ? (
        <UserForm handleUserLogin={this.handleUserLogin} />
      ) : (
        <div>
          <Header current_location={currentLocation} />
          <MapBox
            current_user={currentUser}
            tracks={tracks}
            track_num={trackNum}
            map={map}
          />
          <Menu
            currentUser={currentUser}
            map={map}
            tracks={tracks}
            trackNum={trackNum}
          />
        </div>
      )}
    </div>
  );
}
