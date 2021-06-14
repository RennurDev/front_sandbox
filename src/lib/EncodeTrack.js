export default function EncodeTrack(data) {
  if (data !== []) {
    try {
      let encoded_track = ""
      for(let i=0; i<data.length-1; i++) {
        encoded_track += data[i]+":"
      }
      encoded_track += data[data.length-1]
      // lng,lat:lng,lat...の形式に変換
      return encoded_track
    } catch(e) {
      console.log(e)
    }
  } else {
    console.log("error happend while encoding track")
  }
}