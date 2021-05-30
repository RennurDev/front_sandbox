export default function AddTrackLayer(map, id, track=[]) {
  map.addSource(id, {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': track
      }
    }
  });
  map.addLayer({
    'id': id,
    'type': 'line',
    'source': id,
    'layout': {
      'line-join': 'round',
      'line-cap': 'round' ,
    },
    'paint': {
      'line-color': '#888',
      'line-width': 8,
    }
  });
}
