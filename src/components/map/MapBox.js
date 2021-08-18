import { useRef, useEffect, useState } from "react";
import { RecordTrigger } from "./RecordTrigger";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import drawTrack from "../../lib/DrawTrack";
import addTrackLayer from "../../lib/AddTrackLayer";
import decodeTrack from "../../lib/DecodeTrack";
import postTrack from "../../lib/PostTrack";
import showTrackLayer from "../../lib/ShowTrackLayer";
import hideTrackLayer from "../../lib/HideTrackLayer";
import hideAllTracks from "../../lib/HideAllTracks";
import showAllTracks from "../../lib/ShowAllTracks";
import isValidPosition from "../../lib/IsValidPosition";
import calcDistance from "../../lib/CalcDistance";
import RequestAxios from "../../lib/RequestAxios";
import animateTrack from "../../lib/AnimateTrack";

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
  distance,
  currentPos,
  posHistory,
  setCurrentPos,
  setPosHistory,
  appState,
  setTracks,
  setMap,
  setAppState,
  setDistance,
}) => {
  const watchId = useRef();
  const mapContainer = useRef();
  const map = useRef();

  const beginRecordTrack = () => {
    let prevPos;
    let dist = 0;
    setPosHistory([]);
    hideAllTracks(map.current, tracks.length);
    showTrackLayer(map.current, "current_track");
    setDistance(0);

    watchId.current = navigator.geolocation.watchPosition((position) => {
      if (!prevPos) {
        //初期化
        prevPos = position;
        setCurrentPos({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
        map.current.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 15,
        });
      } else {
        if (isValidPosition(prevPos, position)) {
          setCurrentPos({
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          });
          console.log(dist);
          dist += calcDistance(prevPos, position);
          setDistance(dist);
          prevPos = position;
        }
      }
    });
  };

  const endRecordTrack = () => {
    navigator.geolocation.clearWatch(watchId.current);
    hideTrackLayer(map.current, "current_track");

    if (distance >= 50) {
      const new_tracks = tracks;
      new_tracks.push(posHistory);
      addTrackLayer(
        map.current,
        "track_" + String(new_tracks.length - 1),
        posHistory
      ); //NOTE: track_layerに用いているidは0スタートなので,全トラック数-1を常に用いる
      setTracks(new_tracks);
      postTrack(posHistory, currentUser.id);

      // alert("distance: " + distance);
    } else {
      // alert("not saved distance(<50): " + distance);
    }
    showAllTracks(map.current, tracks.length);
  };

  const getAllTracks = (userId) => {
    const url = "/users_tracks/" + userId;
    let response = RequestAxios(url, "get");
    response.then((r) => {
      if (r.data.length >= 1) {
        for (let i = 0; i < r.data.length; i++) {
          tracks.push(decodeTrack(r.data[i].data));
          // addTrackLayer(map.current, "track_" + String(i), tracks[i]);
          animateTrack(map.current, "anime_" + String(i), tracks[i]);
        }
        setTracks(tracks);
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

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        center: [c_lng, c_lat],
        style: "mapbox://styles/mapbox/dark-v9", // mapのスタイル指定
        zoom: 12,
      });
      setMap(map.current);
      map.current.on("load", function () {
        map.current.addControl(geolocate);
        getAllTracks(currentUser.id);

        // 記録用のレイヤーの追加
        addTrackLayer(map.current, "current_track");

        //Next, Prev用のレイヤーの追加
        addTrackLayer(map.current, "single_track");
      });
    });
    return () => {
      try {
        map.current.remove();
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  useEffect(() => {
    //TODO: appStateを監視するuseEffectを一元化: Redux?
    if (appState === "running") {
      beginRecordTrack();
    } else if (appState === "finishRunning") {
      endRecordTrack();
    }
  }, [appState]);

  useEffect(() => {
    if (appState === "running") {
      setPosHistory([...posHistory, [currentPos.lng, currentPos.lat]]);
    }
  }, [currentPos]);

  useEffect(() => {
    if (appState === "running") {
      if (posHistory) {
        drawTrack(map.current, "current_track", posHistory);
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
