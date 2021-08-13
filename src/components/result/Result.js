import projectMercator from "../../lib/ProjectMercator";
import "../../App.css";

const styles = {
  root: {
    position: "absolute",
  },
  canvas: {
    display: "block",
    margin: "-80% auto 0",
  },
  text: {
    textAlign: "center",
    fontFamily: "Kanit",
    color: "white",
    position: "absolute",
    top: "-20vh",
    left: 0,
    right: 0,
    margin: "auto",
  },
};

export const Result = ({ posHistory, distance, currentRegion }) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const projectedTrack = projectMercator(posHistory, 50);

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
        viewBox="-10 -10 65 300"
        xmlSpace="preserve"
        style={styles.canvas}
      >
        <g>
          <path className="path" d={dataString} />
        </g>
      </svg>
      <div style={styles.text}>
        <h1>{currentRegion}</h1>
        <p>
          ALTITUDE: 0 m<br />
          DISTANCE: {Math.floor(distance / 100) / 10} km
          <br />
          {year}.{month}.{day}
          <br />
        </p>
        <p>FINISH &gt;</p>
      </div>
    </div>
  );
};
