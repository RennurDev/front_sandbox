import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import RecordTrigger from './RecordTrigger';
import drawTrack from '../../lib/DrawTrack';
import addTrackLayer from '../../lib/AddTrackLayer';
import clearTrack from '../../lib/ClearTrack';
import decodeTrack from '../../lib/DecodeTrack';
import encodeTrack from '../../lib/EncodeTrack';
import calcDistance from '../../lib/CalcDistance';
import axios from 'axios';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
// アクセストークン
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
const RAILS_API_ENDPOINT = process.env.REACT_APP_BACKEND_API_ENDPOINT

const geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true // 高精度な位置情報取得
  },
  trackUserLocation: true // ユーザの位置情報追跡
});

export default class MapBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isStarted: false,
      current_pos: {
        lng: 0,
        lat: 0,
      }
    }
    this.map = ''
    this.track = []
    this.previous_position = undefined
    //watchPositionの実行idを管理
    this.watch_id = -1
    this.distance = 0

    this.onClick = this.onClick.bind(this);
    this.setMap = this.setMap.bind(this);
    this.beginRecordTrack = this.beginRecordTrack.bind(this);
    this.endRecordTrack = this.endRecordTrack.bind(this);
    this.initializePosition = this.initializePosition.bind(this);
    this.onPosition = this.onPosition.bind(this);
  }

  beginRecordTrack() {
    this.track = []
    this.distance = 0
    /* WARNING: 以下二行はいずれも非同期. 前後した場合はエラーが生じる. */
    //初期化
    navigator.geolocation.getCurrentPosition(this.initializePosition);
    //それ以降
    this.watch_id = navigator.geolocation.watchPosition(this.onPosition);
  }

  endRecordTrack(track) {
    alert(this.distance)
    navigator.geolocation.clearWatch(this.watch_id);
    clearTrack(this.map, "current_track") //DISCUSS: hideTrackに置き換えてclearTrackを無くせる？
    
    if(this.distance > 50) {
      this.postTrack(track)
      let new_tracks = this.props.tracks
      new_tracks.push(track)
      addTrackLayer(this.map, this.props.track_num + 1, track);
      this.props.handleTracksChange(new_tracks)

      alert('distance(>50): ' + this.distance )
    } else {
      alert('not saved distance(<50): ' + this.distance )
    }
  }

  initializePosition(position) {
    this.previous_position = position;
    this.track.push([position.coords.longitude, position.coords.latitude]);
    drawTrack(this.map, "current_track", this.track);
  }

  onPosition(position) {
    try {
    const min_duration = 2000 //ms
    const elapseTime = parseInt((position.timestamp - this.previous_position.timestamp))

    if (elapseTime > min_duration) {
      this.distance += calcDistance(this.previous_position, position)
      this.track.push([position.coords.longitude, position.coords.latitude])
      this.previous_position = position
      drawTrack(this.map, "current_track", this.track);
    }
  } catch(e) {
    alert(e);
  }
  }

  getAllTracks(user_id) {
    const url = RAILS_API_ENDPOINT + '/users_tracks/' + user_id
    axios
      .get(url)
      .then((results) => {
          let data = results.data
          let tracks = []

          for(let i = 0; i < data.length; i++) {
            tracks.push(decodeTrack(data[i].data))
            addTrackLayer(this.map, "track_"+String(i), tracks[i])
          }

          this.props.handleTracksChange(tracks)
      })
      .catch(
        (error) => {
          console.log(error)
      })
  }

  // PostTrack
  postTrack(data) {
    const encoded_data = encodeTrack(data)
    let body = {
      track:{
        data: encoded_data,
        user_id: this.props.current_user.id
      }
    }

    const url = RAILS_API_ENDPOINT + '/tracks'
    axios
      .post(url, body)
      .then((results) => {
        const data = results.data
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onClick() {
    let isStarted = this.state.isStarted
    if(isStarted) { 
      // Recordの処理
      this.endRecordTrack(this.track);
    } else { 
      // Start時の処理
      this.beginRecordTrack();
    }
    this.setState({isStarted: !isStarted})
  }

  setMap(position){ 
    // 現在地設定
    this.setState({
      current_pos: {
        lng: position.coords.longitude,
        lat: position.coords.latitude,
      }
    })
    let map = new mapboxgl.Map({
      container: this.mapContainer,
      center: [this.state.current_pos.lng, this.state.current_pos.lat],
      style: 'mapbox://styles/mapbox/dark-v9', // mapのスタイル指定
      zoom: 12
      
    })

    this.props.handleMapCreate(map)

    this.map = this.props.map

    this.map.addControl(geolocate);
    this.map.on('load', function() {
      this.getAllTracks(this.props.current_user.id)

      // 記録用のレイヤーの追加
      addTrackLayer(this.map, "current_track")

      //Next, Prev用のレイヤーの追加
      addTrackLayer(this.map, "single_track")
      
      }.bind(this)
    )
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.setMap)
  }

  componentWillUnmount() {
    try {
      this.map.remove()
    } catch(e) {
      console.log(e)
    }
  }
  
  render() {
    let isStarted = this.state.isStarted
    const btnContent = isStarted ? 'RECORD' : 'START'
    const btnColor = !isStarted ? 'primary' : 'secondary'
    const onClick = this.onClick
    return (
        <div>
          <div className={'mapContainer'} ref={e => this.mapContainer = e}/>
          <RecordTrigger 
            onClick={onClick}
            btnContent={btnContent}
            btnColor={btnColor}
          >
          </RecordTrigger>
        </div>
     )
  }
}
