export default function AnimateTrack(map, id, data) {
  const posOnTrack = (time) => {
    if (time) {
      //NOTE: tの初期化完了前に呼び出される場合, tが渡されないことがある.
      /* 大まかな処理: 動点はどの時間も, 点iから点i+1の線分上に位置する. そこで変数iでどの線分上に居るのかを定め, deltaでその線分の中でも点iからどの程度離れた位置に居るのかを定めている. */
      const i = parseInt(time) % data.length; //タイムスタンプの少数点以下を切り捨て, trackの配列の長さで剰余を計算. 一定時間間隔でiが更新され, data.length周期でサイクルする.
      const delta = time - parseInt(time); // 0 < delta < 1.
      const pos = [];
      if (i + 1 < data.length) {
        //i+1が存在する場合
        pos.push([
          (data[i + 1][0] - data[i][0]) * delta + data[i][0],
          (data[i + 1][1] - data[i][1]) * delta + data[i][1],
        ]);
      } else {
        //i+1が存在しない場合
        pos.push([data[i][0], data[i][1]]);
      }
      return {
        type: "Point",
        coordinates: [pos[0][0], pos[0][1]],
      };
    }
  };

  const animateMarker = (timestamp) => {
    map.getSource(id).setData(posOnTrack(timestamp / 300));

    // Request the next frame of the animation.
    requestAnimationFrame(animateMarker);
  };

  // Add a source and layer displaying a point which will be animated in a circle.
  map.addSource(id, {
    type: "geojson",
    data: posOnTrack(0),
  });

  map.addLayer({
    id: id,
    source: id,
    type: "circle",
    paint: {
      "circle-radius": 5,
      "circle-color": "#00a563",
    },
  });

  // Start the animation.
  animateMarker();
}
