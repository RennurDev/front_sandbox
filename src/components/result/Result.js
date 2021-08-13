import { useState, useEffect } from "react";
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
  const [context, setContext] = useState();
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth * 0.9;
    canvas.height = 500;
    const canvasContext = canvas.getContext("2d");
    setContext(canvasContext);
  }, []);

  useEffect(() => {
    if (context) {
      const projectedTrack = projectMercator(
        posHistory,
        window.innerWidth * 0.8
      );

      context.lineWidth = 5;
      context.strokeStyle = "white";
      context.lineJoin = "round";
      context.beginPath();
      /* NOTE: canvas境界付近で描画したい軌跡が見切れてしまうのを防ぐために7px移動させている.
      しかしこの7という数字は線幅に依存するため今後修正が必要. */
      context.moveTo(projectedTrack[0][0] + 7, projectedTrack[0][1] + 7);

      for (let i = 1; i < projectedTrack.length; i++) {
        context.lineTo(projectedTrack[i][0] + 7, projectedTrack[i][1] + 7);
      }

      context.stroke();
    }
  }, [context]);

  return (
    <div>
      <canvas id="canvas" style={styles.canvas} />
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
