import RequestAxios from "./RequestAxios";
import encodeTrack from "./EncodeTrack";

export default function PostTrack(data, id) {
  const encoded_data = encodeTrack(data);
  let body = {
    track: {
      data: encoded_data,
      user_id: id,
    },
  };
  const url = "/tracks";
  let response = RequestAxios(url, "post", body);
  response.then((r) => {
    if (r.data.length >= 1) {
    } else {
      console.log("error");
    }
  });
}
