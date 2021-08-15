import projectMercator from "../../lib/ProjectMercator";
import { Grid } from "@material-ui/core";
import "../../App.css";
/*  testData: テスト時はこの場所にjsonファイルを追加すること */
import data from "./yamanotesen.json";
import decodeTrack from "../../lib/DecodeTrack";

const styles = {
  root: {
    position: "absolute",
  },
  canvas: {
    display: "block",
    margin: "-80% auto 0",
  },
  text: {
    fontFamily: "Kanit",
    color: "white",
    position: "fixed",
    top: "5vh",
    left: 0,
    right: 0,
    margin: "auto",
  },
  region: {
    fontFamily: "Kanit",
    color: "white",
    position: "fixed",
    textAlign: "right",
    top: "70vh",
    left: 0,
    right: 0,
    margin: "auto",
  },
  img: {
    display: "block",
    width: "20vw",
  },
  bottom: {
    fontFamily: "Kanit",
    color: "black",
    position: "fixed",
    top: "90vh",
    left: 0,
    right: 0,
    margin: "auto",
  },
  input: {
    fontFamily: "Kanit",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: 16,
  },
};

export const Result = ({
  posHistory,
  distance,
  currentRegion,
  setAppState,
}) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  //const projectedTrack = projectMercator(posHistory, 50);
  const projectedTrack = projectMercator(decodeTrack(data.data), 50);

  let dataString = "M " + projectedTrack[0][0] + " " + projectedTrack[0][1];
  for (let i = 1; i < projectedTrack.length; i++) {
    dataString += " L " + projectedTrack[i][0] + " " + projectedTrack[i][1];
  }

  return (
    <div>
      <svg
        version="1.1"
        id="track"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="80vw"
        viewBox="-10 -10 65 120"
        xmlSpace="preserve"
        style={styles.canvas}
      >
        <g style={styles.container}>
          <path className="path" d={dataString} />
        </g>
      </svg>
      <div style={styles.text}>
        <Grid container spacing={2}>
          <Grid item xs={1} />
          <Grid item xs={8}>
            <h3>
              ALTITUDE : 0m
              <br />
              DISTANCE : {Math.floor(distance / 100) / 10}km
              <br />
              {year}.{month}.{day}
              <br />
            </h3>
          </Grid>
        </Grid>
      </div>
      <div style={styles.region}>
        <Grid container spacing={2}>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <img
              style={styles.img}
              src={process.env.PUBLIC_URL + "/petampEye.svg"}
              alt="petampButton"
            />
          </Grid>
          <Grid item xs={5}>
            <h1>{currentRegion}</h1>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </div>
      <div style={styles.bottom}>
        <Grid container spacing={2}>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <p>SHARE</p>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <p>
              <input
                type="submit"
                value="FINISH >"
                style={styles.input}
                onClick={() => {
                  setAppState("beginApp");
                }}
              />
            </p>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
