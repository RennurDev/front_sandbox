import axios from "axios";

export default async function GetPlaceName(lng, lat) {
  const location = lng + "," + lat;
  const access_token = process.env.REACT_APP_MAPBOX_API_KEY;
  //NOTE: responseは狭い地域順に返ってくるので, 地域名を取得する場合はresponse.data.features[0].text
  const options = "types=locality,place,region";
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    location +
    ".json?" +
    options +
    "&access_token=" +
    access_token;
  try {
    const response = await axios.get(url);
    return response.data.features[0].text;
  } catch (err) {
    console.log(err);
    return "???";
  }
}
