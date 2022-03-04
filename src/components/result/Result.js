import { Grid } from "@material-ui/core";
import "../../App.css";
import { TrackSvg } from "./TrackSvg";
/*  test時設定 */
// import data from "../../trackData.json";
// import decodeTrack from "../../lib/DecodeTrack";

const styles = {
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
  svg: { textAlign: "center", marginTop: "-50%" },
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

  //WARN: 本番環境ではTrackSvgに渡すdataはposHistoryにすること.

  return (
    <div>
      <div style={styles.svg}>
        <Grid container spacing={2}>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <div>
              {TrackSvg(
                posHistory,
                window.innerWidth * 0.6,
                window.innerHeight * 0.4
              )}
            </div>
          </Grid>
        </Grid>
      </div>
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
        <Grid container spacing={2} justify="flex-end" >
          <Grid item xs={6}>
            <p style="text-align:right"> 
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
