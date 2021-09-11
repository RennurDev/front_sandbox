export default function DecodeTrack(data) {
  if (data !== []) {
    try {
      const a = String(data)
        .split(":")
        .map((n) => n.split(",").map((x) => parseFloat(x)));
      // [[lng,lat],[lng,lat],...] の形式に変換
      const decoded_track = [];
      for (let i = 0; i < a.length; i++) {
        decoded_track.push([a[i][0], a[i][1]]);
      }
      return decoded_track;
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("error happend while decoding track");
  }
}
