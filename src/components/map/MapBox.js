import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import drawTrack from '../../lib/DrawTrack';
import addTrackLayer from '../../lib/AddTrackLayer';
import clearTrack from '../../lib/ClearTrack';
import decodeTrack from '../../lib/DecodeTrack';
import encodeTrack from '../../lib/EncodeTrack';
import RecordTrigger from './RecordTrigger';
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
      area: '',
      isStarted: false,
      current_pos: {
        lng: 0,
        lat: 0,
      }
    }
    this.map = ''
    this.track = []
    this.previous_location = undefined
    //watchPositionの実行idを管理
    this.watch_id = -1

    this.onPosition = this.onPosition.bind(this);
    this.onClick = this.onClick.bind(this);
    this.setMap = this.setMap.bind(this);
  }

  _add(position) {
    this.track.push([position.coords.longitude, position.coords.latiude])
  }

  onPosition(position) {
    if(this.track.length === 0) {
      this.previous_location = position;
      this._add(position)
    } else {
      this.addPositionToTrack(position)
    }
    drawTrack(this.map, "current_track", this.track)
  }

  addPositionToTrack(position) {
    const min_duration = 2000 //ms
    const elapseTime = parseInt((position.timestamp - this.previous_location.timestamp))

    if (elapseTime > min_duration) {
      this._add(position) // 経過時間が設定した制限時間をこえたらヒストリ追加
      this.previous_location = position
    } else {
      return;
    }
  }

  getAllTracks(user_id) {
    const url = RAILS_API_ENDPOINT + '/users_tracks/' + user_id
    axios
      .get(url)
      .then((results) => {
          let data = results.data
          let decoded_data
          let track_num = data.length

          for(let i = 0; i < track_num; i++) {
            data[i].data = decodeTrack(data[i].data)
            addTrackLayer(this.map, "track_"+String(i), data[i].data);
          }

          this.props.handleTracksChange(data)
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
        // TODO: レスポンスが200な場合のみ 初期化するよう実装
        this.track = [];
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onClick() {
    let isStarted = this.state.isStarted
    if(isStarted) { 
      // Record時の処理
      if(this.track.length !== 0) {
        clearTrack(this.map, "current_track")
        this.postTrack(this.track)
      }
      navigator.geolocation.clearWatch(this.watch_id);
      this.setState({isStarted: !isStarted})
    } else { 
      // Start時の処理
      console.log(this.track)
      if (this.track.length === 0) {
        this.watch_id = navigator.geolocation.watchPosition(this.onPosition);
        this.setState({isStarted: !isStarted})
      }
    }
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
