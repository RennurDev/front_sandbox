export default function DecodeHistory(data) {
  if (data !== []) {
    try {
      const decoded_history = String(data).split(':').map(n => n.split(',').map(x => parseFloat(x)))
      // [[lng,lat],[lng,lat],...] の形式に変換
      return decoded_history
    } catch(e) {
      console.log(e)
    }
  } else {
    console.log("error happend while decoding history")
  }
}
