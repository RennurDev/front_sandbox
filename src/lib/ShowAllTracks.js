import showTrackLayer from "./ShowTrackLayer";

export default function HideAllTracks(map, track_num) {

    for (let i = 0; i < track_num; i++) {
        showTrackLayer(map, "track_"+String(i));
    }
}
