export default function HandleCurrentTrack(map, id) { //指定されたidに対応するsourceからgeojson形式のdataを取得して、'current_track'レイヤーにデータを投げる関数

    try { //addSourceが非同期のため、addSourceの実行より先にgetSourceが呼ばれてしまうことがある。
        let src = map.getSource('track_'+id)
        console.log(src)
        //TODO: srcからgeojsonのみ取り出す
      } catch(e) {
        console.log(e)
      }
}
