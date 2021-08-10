import hideTrackLayer from "./HideTrackLayer";

export default function HideAllTracks(map, track_num) {
  for (let i = 0; i < track_num; i++) {
    hideTrackLayer(map, "track_" + String(i));
  }
}
