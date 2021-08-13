import { useState, useEffect } from "react";
import projectMercator from "../../lib/ProjectMercator";

const styles = {
  canvas: {
    display: "block",
    margin: "20vh auto 0",
  },
  text: {
    textAlign: "center",
    fontFamily: "Kanit",
    color: "white",
    position: "absolute",
    top: "25vh",
    left: 0,
    right: 0,
    margin: "auto",
  },
};

export const Result = ({ posHistory }) => {
  const [context, setContext] = useState();

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    canvas.width = 250;
    canvas.height = 500;
    const canvasContext = canvas.getContext("2d");
    setContext(canvasContext);
  }, []);

  useEffect(() => {
    if (context !== null) {
      const projectedTrack = projectMercator(posHistory, 220);

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
        <h1>TOKYO</h1>
        <p>
          ALTITUDE: 3.4 m<br />
          DISTANCE: 7.44 km
          <br />
          2021.08.08
          <br />
        </p>
        <p>FINISH &gt;</p>
      </div>
    </div>
  );
};
