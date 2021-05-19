export default function EncodeHistory(data) {
  if (data !== []) {
    try {
      const encoded_history = String(data).replace(/\[\[/g, '').replace(/\]\]/g, '').replace(/\],\[/g, ':')
      // lng,lat:lng,lat...の形式に変換
      return encoded_history
    } catch(e) {
      console.log(e)
    }
  } else {
    console.log("error happend while encoding history")
  }
}
