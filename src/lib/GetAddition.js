export default function GetAddition(position) {
  const tmp = [];
  if (position.coords.altitude) {
    tmp.push(position.coords.altitude);
  } else {
    tmp.push("N");
  }
  if (position.coords.accuracy) {
    tmp.push(position.coords.accuracy);
  } else {
    tmp.push("N");
  }
  if (position.coords.altitudeAccuracy) {
    tmp.push(position.coords.altitudeAccuracy);
  } else {
    tmp.push("N");
  }
  if (position.coords.speed) {
    tmp.push(position.coords.speed);
  } else {
    tmp.push("N");
  }
  if (position.timestamp) {
    tmp.push(position.timestamp);
  } else {
    tmp.push("N");
  }

  return tmp;
}
