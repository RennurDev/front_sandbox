import { useEffect, useState } from "react";
import getNearestStation from "../../lib/GetNearestStation";
import { Result } from "../result/Result.js";
const styles = {
  root: {
    position: "absolute",
    top: "50%",
    width: "100vw",
    margin: "auto",
    color: "white",
    textAlign: "center",
  },
  text: {
    fontFamily: "Kanit",
  },
  input: {
    fontFamily: "Kanit",
    color: "white",
    margin: "0 auto",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
  },
  upper: {
    textAlign: "center",
    position: "absolute",
    width: "100vw",
    top: "-40vh",
  },
  lower: {
    textAlign: "center",
    position: "absolute",
    width: "100vw",
    top: "25vh",
  },
};

export const WrapContent = ({
  currentRegion,
  distance,
  appState,
  setAppState,
  currentPlace,
  currentPos,
  posHistory,
}) => {
  const [displayDistance, setDisplayDistance] = useState(0);
  const [station, setStation] = useState([{ name: "", distance: "" }]);
  useEffect(() => {
    const nearestStation = getNearestStation(currentPos.lng, currentPos.lat);
    nearestStation.then((s) => {
      if (station.distance !== s.distance) {
        //変更があった場合のみsetStationを呼ぶ
        setStation(s);
      }
    });
  }, [currentPos]);
  useEffect(() => {
    const dist = Math.floor(distance / 100) / 10; //小数点第２位以下切り捨て
    if (displayDistance !== dist) {
      //変更があった場合のみsetDistanceを呼ぶ
      setDisplayDistance(dist);
    }
  }, [distance]);
  const Content = () => {
    //TODO: 要素を追加
    if (appState === "beginApp") {
      return (
        <div className="bg-wrap" style={styles.lower}>
          <span className="slide-in" style={styles.text}>
            {currentRegion}
          </span>
        </div>
      );
    } else if (appState === "running") {
      return (
        <div>
          <div style={styles.upper}>
            <h1 className="bg-wrap">
              <span style={styles.text}>{currentPlace}</span>
            </h1>
            <p className="bg-wrap">
              {station.distance !== "" ? (
                <span style={styles.text}>
                  {station.name}駅まで{station.distance}
                </span>
              ) : (
                <span />
              )}
            </p>
          </div>
          <div style={styles.lower}>
            <h1 className="bg-wrap">
              <span style={styles.text}>
                {displayDistance}
                km
              </span>
            </h1>
            <div className="bg-wrap">
              <input
                type="submit"
                value="FINISH RECORD"
                style={styles.input}
                onClick={() => {
                  setAppState("finishRunning");
                }}
              />
            </div>
          </div>
        </div>
      );
    } else if (appState === "finishRunning") {
      return <Result posHistory={posHistory} />;
    } else {
      return <div />;
    }
  };
  return (
    <div style={styles.root}>
      <Content />
    </div>
  );
};
