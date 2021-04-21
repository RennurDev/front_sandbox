export default function DrawGeoLine(logs, map) {
  try { //addSourceが非同期のため、addSourceの実行より先にgetSourceが呼ばれてしまうことがある。
    map.getSource('route').setData({
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': logs
      }
    });
  } catch(e) {}
}
