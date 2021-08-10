export default function IsValidPosition(prev_pos, pos) {
  const min_duration = 2000; //ms
  alert("elapseTime: " + parseInt(pos.timestamp - prev_pos.timestamp));

  const elapseTime = parseInt(pos.timestamp - prev_pos.timestamp);

  if (elapseTime > min_duration) {
    return true;
  } else {
    return false;
  }
}
