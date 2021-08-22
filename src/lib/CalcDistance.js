export default function CalcDistance(pos_prev, pos_current) {
  const pi = Math.PI;
  const lng_p = (pos_prev.coords.longitude / 180) * pi;
  const lat_p = (pos_prev.coords.latitude / 180) * pi;
  const lng_c = (pos_current.coords.longitude / 180) * pi;
  const lat_c = (pos_current.coords.latitude / 180) * pi;

  const dx = lng_c - lng_p;
  const dy = lat_c - lat_p;
  const p = (lat_c + lat_p) / 2;
  const Rx = 6378137; //WGS84に基づく長半径
  const E = 0.08181919; //離心率
  const W = Math.sqrt(1 - E ** 2 * Math.sin(p) ** 2);
  const N = Rx / W;
  const M = (Rx * (1 - E ** 2)) / W ** 3;

  return Math.sqrt((dy * M) ** 2 + (dx * N * Math.cos(p)) ** 2);
  //   6371 *
  //   Math.acos(
  //     Math.cos((lat_c / 180) * pi) *
  //       Math.cos(((lng_p - lng_c) / 180) * pi) *
  //       Math.cos((lat_p / 180) * pi) +
  //       Math.sin((lat_c / 180) * pi) * Math.sin((lat_p / 180) * pi)
  //   ) *
  //   1000
}
