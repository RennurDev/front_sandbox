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
      'line-color': '#E7211A',
      'line-width': 2,
    }
  });
}
