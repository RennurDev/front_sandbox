export default function ClearTrack(map, id) {
    try { //addSourceが非同期のため、addSourceの実行より先にgetSourceが呼ばれてしまうことがある。
      map.getSource(id).setData({
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': []
        }
      });
    } catch(e) {
      console.log(e)
    }
  }