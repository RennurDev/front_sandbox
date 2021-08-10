export default function CalcDistance(pos_prev, pos_current) {
  const pi = Math.PI;
  const lng_p = pos_prev.coords.longitude;
  const lat_p = pos_prev.coords.latitude;
  const lng_c = pos_current.coords.longitude;
  const lat_c = pos_current.coords.latitude;

  /*地球を半径6371kmの球体と仮定. 距離[m]=6371[km]*(２地点のなす角[rad])*1000 */
  return (
    6371 *
    Math.acos(
      Math.cos((lat_c / 180) * pi) *
        Math.cos(((lng_p - lng_c) / 180) * pi) *
        Math.cos((lat_p / 180) * pi) +
        Math.sin((lat_c / 180) * pi) * Math.sin((lat_p / 180) * pi)
    ) *
    1000
  );
}
