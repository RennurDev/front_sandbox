import axios from "axios";

export default async function HandleCurrentTrack(lng, lat) {
  const location = lng+","+lat;
  const access_token = process.env.REACT_APP_MAPBOX_API_KEY;
  const options = "types=locality";
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+location+".json?"+options+"&access_token="+access_token;
  try {
    const res = await axios.get(url)
    return res
  } catch(err) {
    return err
  }
}
