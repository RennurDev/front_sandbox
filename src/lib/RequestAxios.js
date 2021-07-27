import axios from "axios";
const RAILS_API_ENDPOINT = process.env.REACT_APP_BACKEND_API_ENDPOINT;
export default async function RequestAxios(url, action, params) {
  if (action === "get") {
    try {
      const res = await axios.get(RAILS_API_ENDPOINT + url);
      return res;
    } catch (err) {
      const errorMessage = err || err.message;
      return errorMessage;
    }
  } else if (action === "post") {
    if (!params) {
      console.log("パラメータを追加してください");
    }
    try {
      const res = await axios.post(RAILS_API_ENDPOINT + url, params);
      return res;
    } catch (err) {
      const errorMessage = err.response || err.message;
      return errorMessage;
    }
  } else if (action === "put") {
    if (!params) {
      console.log("パラメータを追加してください");
    }
    try {
      const res = await axios.put(RAILS_API_ENDPOINT + url, params);
      return res;
    } catch (err) {
      const errorMessage = err.response || err.message;
      return errorMessage;
    }
  } else if (action === "delete") {
    try {
      const res = await axios.delete(RAILS_API_ENDPOINT + url);
      return res;
    } catch (err) {
      const errorMessage = err.response || err.message;
      return errorMessage;
    }
  } else {
    console.log("undefined action");
  }
}
