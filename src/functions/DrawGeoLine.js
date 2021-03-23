export default function DrawGeoLine(logs, map) {
  map.getSource('route').setData({
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'LineString',
      'coordinates': logs
    }
  });
}
