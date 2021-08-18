export default function AnimateTrack(map, id, data) {
  const pointOfTrack = (i) => {
    try {
      return {
        type: "Point",
        coordinates: [data[i][0], data[i][1]],
      };
    } catch (e) {
      console.log(e);
    }
  };

  let i = 0;

  const animateMarker = (timestamp) => {
    // Update the data to a new position based on the animation timestamp. The
    // divisor in the expression `timestamp / 1000` controls the animation speed.
    i = parseInt(timestamp / 100) % data.length;
    map.getSource(id).setData(pointOfTrack(i));

    // Request the next frame of the animation.
    requestAnimationFrame(animateMarker);
  };

  // Add a source and layer displaying a point which will be animated in a circle.
  map.addSource(id, {
    type: "geojson",
    data: pointOfTrack(0),
  });

  map.addLayer({
    id: id,
    source: id,
    type: "circle",
    paint: {
      "circle-radius": 5,
      "circle-color": "#007cbf",
    },
  });

  // Start the animation.
  animateMarker();
}
