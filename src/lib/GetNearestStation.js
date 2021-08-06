import axios from "axios";

export default async function GetNearestStation(lng, lat) {
  const url =
    "http://express.heartrails.com/api/json?method=getStations&x=" +
    lng +
    "&y=" +
    lat;
  try {
    const response = await axios.get(url);
    const name = response.data.response.station[0].name;
    const distance = response.data.response.station[0].distance;
    return { name: name, distance: distance };
  } catch (err) {
    alert(err);
    return "???";
  }
}
