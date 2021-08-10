export default function EncodeTrack(data) {
  if (data !== []) {
    let encoded_track = ""; //NOTE: 空文字を代入しておかないとundefinedという文字列が生じる(hatake511522/front_sandbox/#96)
    for (let i = 0; i < data.length - 1; i++) {
      if (data[i]) {
        encoded_track += data[i] + ":";
      }
    }
    encoded_track += data[data.length - 1];
    // lng,lat:lng,lat...の形式に変換
    return encoded_track;
  } else {
    console.log("error happend while encoding track");
  }
}
