import { useRef, useEffect, useState } from "react";
import { RecordTrigger } from "./RecordTrigger";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
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

export const MapBox = ({
  currentUser,
  tracks,
  map,
  distance,
  currentPos,
  setCurrentPos,
  appState,
  setTracks,
  setTrackNum,
  setMap,
  setAppState,
  setDistance,
}) => {
  const [posHistory, setPosHistory] = useState([]);
  const [watchId, setWatchId] = useState(-1);
  const mapContainer = useRef(null);

  const beginRecordTrack = () => {
    let prevPos;
    setPosHistory([]);
    hideAllTracks(map, tracks.length);
    showTrackLayer(map, "current_track");
    setDistance(0);

    const id = navigator.geolocation.watchPosition((position) => {
      alert(
        "calledWatchPos: " +
          position.coords.longitude +
          ", " +
          position.coords.latitude
      );
      if (!prevPos) {
        //初期化
        alert(
          "initialized: " +
            position.coords.longitude +
            ", " +
            position.coords.latitude
        );
        prevPos = position;
        setCurrentPos({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
        map.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 15,
        });
      } else {
        if (isValidPosition(prevPos, position)) {
          setCurrentPos({
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          });
          setDistance(distance + calcDistance(prevPos, position));
          prevPos = position;
        }
      }
    });

    setWatchId(id);
  };

  const endRecordTrack = (track) => {
    navigator.geolocation.clearWatch(watchId);
    hideTrackLayer(map, "current_track");

    if (distance >= 50) {
      let new_tracks = tracks;
      new_tracks.push(track);
      addTrackLayer(map, "track_" + String(new_tracks.length - 1), track); //NOTE: track_layerに用いているidは0スタートなので,全トラック数-1を常に用いる
      setTracks(new_tracks);
      setTrackNum(new_tracks.length);
      postTrack(track);

      alert("distance: " + distance);
    } else {
      alert("not saved distance(<50): " + distance);
    }
    showAllTracks(map, tracks.length);
    setDistance(0);
  };

  const getAllTracks = (userId) => {
    const url = "/users_tracks/" + userId;
    let response = RequestAxios(url, "get");
    response.then((r) => {
      if (r.data.length >= 1) {
        for (let i = 0; i < r.data.length; i++) {
          tracks.push(decodeTrack(r.data[i].data));
          addTrackLayer(map, "track_" + String(i), tracks[i]);
        }
        setTracks(tracks);
        setTrackNum(tracks.length);
      }
    });
  };

  // PostTrack
  const postTrack = (data) => {
    const encoded_data = encodeTrack(data);
    let body = {
      track: {
        data: encoded_data,
        user_id: currentUser.id,
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
  };

  useEffect(() => {
    /* ComponentDidmount */
    navigator.geolocation.getCurrentPosition((position) => {
      const c_lng = position.coords.longitude;
      const c_lat = position.coords.latitude;
      // 現在地設定
      setCurrentPos({
        lng: c_lng,
        lat: c_lat,
      });

      map = new mapboxgl.Map({
        container: mapContainer.current,
        center: [c_lng, c_lat],
        style: "mapbox://styles/mapbox/dark-v9", // mapのスタイル指定
        zoom: 12,
      });
      setMap(map);
      map.addControl(geolocate);
      map.on("load", function () {
        getAllTracks(currentUser.id);

        // 記録用のレイヤーの追加
        addTrackLayer(map, "current_track");

        //Next, Prev用のレイヤーの追加
        addTrackLayer(map, "single_track");
      });
    });
    return () => {
      try {
        map.remove();
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  useEffect(() => {
    //TODO: appStateを監視するuseEffectを一元化したい
    if (appState === "running") {
      beginRecordTrack();
    } else if (appState === "finishRunning") {
      endRecordTrack(posHistory);
    }
  }, [appState]);

  useEffect(() => {
    alert("calledCurrentPos");
    if (appState === "running") {
      setPosHistory(
        posHistory.push([currentPos.longitude, currentPos.latitude])
      );
    }
  }, [currentPos]);

  useEffect(() => {
    if (appState === "running") {
      alert("calledPosHistory");
      if (posHistory) {
        alert(posHistory);
        drawTrack(map, "current_track", posHistory);
      }
    }
  }, [posHistory]);

  return (
    <div>
      <div style={styles.root} ref={mapContainer}>
        <RecordTrigger
          onClick={() => {
            setAppState("running");
          }}
        />
      </div>
    </div>
  );
};
