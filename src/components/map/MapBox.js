import { useRef, useEffect, useState } from "react";
import { RecordTrigger } from "./RecordTrigger";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import getPlaceName from "../../lib/GetPlaceName";
import drawTrack from "../../lib/DrawTrack";
import addTrackLayer from "../../lib/AddTrackLayer";
import decodeTrack from "../../lib/DecodeTrack";
import encodeTrack from "../../lib/EncodeTrack";
import showTrackLayer from "../../lib/ShowTrackLayer";
import hideTrackLayer from "../../lib/HideTrackLayer";
import hideAllTracks from "../../lib/HideAllTracks";
import showAllTracks from "../../lib/ShowAllTracks";
import isValidPosition from "../../lib/IsValidPosition";
import calcDistance from "../../lib/CalcDistance";
import RequestAxios from "../../lib/RequestAxios";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
// アクセストークン
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true, // 高精度な位置情報取得
  },
  trackUserLocation: true, // ユーザの位置情報追跡
});

const styles = {
  root: {
    width: "100%",
    height: "87vh",
  },
};

export const MapBox = ({current_user, tracks, map, handleState}) => {

  const [isStarted, setIsStarted] = useState(false);
  const [currentPos, setCurrentPos] = useState([{ lng: 0, lat: 0 }])
  const [posHistory, setPosHistory] = useState([]);
  const [watchId, setWatchId] = useState(-1);
  const [distance, setDistance] = useState(0);
  const mapContainer = useRef(null);

  const beginRecordTrack = () => {
    let prevPos;
    let currentDistance = 0;
    const currentPosHistory = [];
    setPosHistory([]);
    hideAllTracks(map, tracks.length);
    showTrackLayer(map, "current_track");
    //初期化
    navigator.geolocation.getCurrentPosition((position) => {
      prevPos = position;
      currentPosHistory.push([position.coords.longitude, position.coords.latitude])
      setPosHistory(currentPosHistory);
      map.flyTo({
        center: [position.coords.longitude, position.coords.latitude],
        zoom: 15,
      });
    });

    const id = navigator.geolocation.watchPosition(
      (position) => {
        if (isValidPosition(prevPos, position)) {
          currentDistance += calcDistance(prevPos, position);
          currentPosHistory.push([position.coords.longitude, position.coords.latitude]);
          setDistance(currentDistance);
          setPosHistory(currentPosHistory);
          prevPos = position;
        }

        drawTrack(map, "current_track", currentPosHistory);
      }
    );
    setWatchId(id);
  }

  const endRecordTrack = (track) => {
    console.log(watchId);
    navigator.geolocation.clearWatch(watchId);
    hideTrackLayer(map, "current_track");

    if (distance >= 50) {
      let new_tracks = tracks;
      new_tracks.push(track);
      addTrackLayer(map, "track_" + String(new_tracks.length - 1), track); //NOTE: track_layerに用いているidは0スタートなので,全トラック数-1を常に用いる
      handleState("tracks", new_tracks);
      handleState("track_num", new_tracks.length);
      postTrack(track);

      alert("distance: " + distance);
    } else {
      alert("not saved distance(<50): " + distance);
    }
    showAllTracks(map, tracks.length);
  }

  const getAllTracks = (user_id) => {
    const url = "/users_tracks/" + user_id;
    let response = RequestAxios(url, "get");
    response.then((r) => {
      if (r.data.length >= 1) {
        for (let i = 0; i < r.data.length; i++) {
          tracks.push(decodeTrack(r.data[i].data));
          addTrackLayer(map, "track_" + String(i), tracks[i]);
        }
        handleState("tracks", tracks);
        handleState("track_num", tracks.length);
      }
    });
  }

  // PostTrack
  const postTrack = (data) => {
    const encoded_data = encodeTrack(data);
    let body = {
      track: {
        data: encoded_data,
        user_id: current_user.id,
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

  const setMap = (position) => {
    const c_lng = position.coords.longitude;
    const c_lat = position.coords.latitude;
    // 現在地設定
    setCurrentPos({
        lng: c_lng,
        lat: c_lat
    });

    let currentPlaceName = getPlaceName(c_lng, c_lat);
    currentPlaceName
      .then((p) => {
        handleState("current_location", p);
      });

    map = new mapboxgl.Map({
      container: mapContainer.current,
      center: [c_lng, c_lat],
      style: "mapbox://styles/mapbox/dark-v9", // mapのスタイル指定
      zoom: 12,
    });

    handleState("map", map);
    map.addControl(geolocate);
    map.on(
      "load",
      function () {
        getAllTracks(current_user.id);

        // 記録用のレイヤーの追加
        addTrackLayer(map, "current_track");

        //Next, Prev用のレイヤーの追加
        addTrackLayer(map, "single_track");
      }
    );
  }

  const isFirstRender = useRef(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setMap);
    isFirstRender.current = true;
    return () => {
      try {
        map.remove();
      } catch (e) {
        console.log(e);
      }
    };
  }, [])

  useEffect(() => {
    if(isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      if (isStarted) {
        beginRecordTrack();
      } else {
        endRecordTrack(posHistory);
      }
    }
  }, [isStarted])

  return (
    <div>
      <div style={ styles.root } ref={ mapContainer }>
        <RecordTrigger onClick={ () => setIsStarted(!isStarted) } />
      </div>
    </div>
  );
}
