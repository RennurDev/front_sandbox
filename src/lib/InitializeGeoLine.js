export default function InitializeGeoLine(map) {
  try { //既にSource, Layerが作成されていた場合の処理。
      map.removeLayer('route');
      map.removeSource('route');
  } catch(e) {}

  map.addSource('route', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': []
      }
    }
  });
  map.addLayer({
    'id': 'route',
    'type': 'line',
    'source': 'route',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#888',
      'line-width': 4
    }
  });
}
