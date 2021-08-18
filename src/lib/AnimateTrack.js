export default function AnimateTrack(map, id, data) {
  const posOnTrack = (t) => {
    try {
      const i = parseInt(t) % data.length;
      const delta = t - parseInt(t);
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
    } catch (e) {
      console.log(e);
    }
  };

  const animateMarker = (timestamp) => {
    map.getSource(id).setData(posOnTrack(timestamp / 100));

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
