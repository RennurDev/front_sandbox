export default function EncodeTrack(data) {
  if (data !== []) {
    try {
      const encoded_track = String(data).replace(/\[\[/g, '').replace(/\]\]/g, '').replace(/\],\[/g, ':')
      // lng,lat:lng,lat...の形式に変換
      return encoded_track
    } catch(e) {
      console.log(e)
    }
  } else {
    console.log("error happend while encoding track")
  }
}
