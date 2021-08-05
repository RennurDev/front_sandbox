import axios from "axios";

export default async function GetRegionName(lng, lat) {
  const location = lng + "," + lat;
  const access_token = process.env.REACT_APP_MAPBOX_API_KEY;
  const options = "types=region";
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    location +
    ".json?" +
    options +
    "&access_token=" +
    access_token;
  try {
    const response = await axios.get(url);
    return response.data.features[0].text.split(" ")[0].toUpperCase();
  } catch (err) {
    console.log(err);
    return "???";
  }
}
