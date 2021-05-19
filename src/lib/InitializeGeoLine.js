export default function InitializeGeoLine(map) {
  map.addSource(String(map._mapId), {
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
    'id': String(map._mapId),
    'type': 'line',
    'source': String(map._mapId),
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#888',
      'line-width': 8
    }
  });
}
