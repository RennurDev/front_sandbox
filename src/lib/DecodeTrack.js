export default function DecodeTrack(data) {
  if (data !== []) {
    try {
      const decoded_track = String(data).split(':').map(n => n.split(',').map(x => parseFloat(x)))
      // [[lng,lat],[lng,lat],...] の形式に変換
      return decoded_track
    } catch(e) {
      console.log(e)
    }
  } else {
    console.log("error happend while decoding track")
  }
}
