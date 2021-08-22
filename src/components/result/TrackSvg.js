import projectMercator from "../../lib/ProjectMercator";
import "../../App.css";

const styles = {
  canvas: {
    display: "block",
  },
};

export const TrackSvg = (data, width, height) => {
  const projectedTrack = projectMercator(data, width, height); //本番環境設定
  //const projectedTrack = projectMercator(decodeTrack(data.data), width, height); //テスト時設定

  let dataString = "M " + projectedTrack[0][0] + " " + projectedTrack[0][1];
  for (let i = 1; i < projectedTrack.length; i++) {
    dataString += " L " + projectedTrack[i][0] + " " + projectedTrack[i][1];
  }

  return (
    <svg
      version="1.1"
      id="track"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width={width}
      height={height}
      xmlSpace="preserve"
      style={styles.canvas}
    >
      <g>
        <path className="path" d={dataString} />
      </g>
    </svg>
  );
};
