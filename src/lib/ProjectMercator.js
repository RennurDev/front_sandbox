export default function ProjectMercator(data, imgWidth, imgHeight) {
  //画像サイズ（width, height）を受け取り,
  if (data !== []) {
    const projectedData = [];
    let lng_min = data[0][0];
    let lng_max = data[0][0];
    let lat_min = data[0][1];
    let lat_max = data[0][1];
    let lamda;
    let scale;
    /* 開始点の座標 */
    let x, y;
    try {
      /*最大, 最小値およびlamdaの算出*/
      for (let i = 1; i < data.length; i++) {
        if (data[i][0] > lng_max) {
          lng_max = data[i][0];
        }
        if (data[i][0] < lng_min) {
          lng_min = data[i][0];
        }
        if (data[i][1] > lat_max) {
          lat_max = data[i][1];
        }
        if (data[i][1] < lat_min) {
          lat_min = data[i][1];
        }
      }

      lamda = (lng_min + lng_max) / 2;

      const trackWidth = ((lng_max - lng_min) * Math.PI) / 180;
      const trackHeight = Math.log(
        Math.tan(Math.PI * (0.25 + lat_max / 360)) /
          Math.tan(Math.PI * (0.25 + lat_min / 360))
      );

      //    console.log("trackWidth: " + trackWidth + " trackHeight: " + trackHeight);
      //console.log("imgWidth: " + imgWidth + " imgHeight: " + imgHeight);

      const trackRatio = trackHeight / trackWidth;
      const imgRatio = imgHeight / imgWidth;
      //      console.log("imgRatio: " + imgRatio + " trackRatio: " + trackRatio);

      if (trackRatio > imgRatio) {
        scale = imgHeight / trackHeight;
        x =
          (Math.PI * (lng_min - lamda)) / 180 -
          (imgWidth / scale - trackWidth) / 2;
        y = Math.log(Math.tan(Math.PI * (0.25 + lat_max / 360)));
      } else {
        scale = imgWidth / trackWidth;
        x = (Math.PI * (lng_min - lamda)) / 180;
        y = Math.log(Math.tan(Math.PI * (0.25 + lat_max / 360)));
        y =
          Math.log(Math.tan(Math.PI * (0.25 + lat_max / 360))) +
          (imgHeight / scale - trackHeight) / 2;
      }

      let pos_x, pos_y;

      for (let i = 0; i < data.length; i++) {
        pos_x = (Math.PI * (data[i][0] - lamda)) / 180 - x; //各座標から開始点を引いて図形を原点から描画する
        pos_y = y - Math.log(Math.tan(Math.PI * (0.25 + data[i][1] / 360))); //NOTE: canvasのy軸は下向きが正.
        projectedData.push([pos_x * scale, pos_y * scale]);
      }
      /* scale: x: x / (lng_max-lng_min) * scalor, x: y / (lat_max-lat_min) * scalor */
      return projectedData;
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("data is empty");
  }
}
