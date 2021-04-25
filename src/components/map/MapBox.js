import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import drawGeoLine from '../../lib/DrawGeoLine';
import initializeGeoLine from '../../lib/InitializeGeoLine';
import RecordTrigger from './RecordTrigger';

// アクセストークン
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ANOTHER_API_KEY;

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
    }
    this.history = []
    this.previous_location = undefined
    this.min_duration = 2

    this.onPosition = this.onPosition.bind(this)
    this.onClick = this.onClick.bind(this);
  }

  _add(position) {
    this.history.push([position.coords.longitude, position.coords.latitude])
  }

  onPosition(position) {
    console.log("watched")
    if(this.history.length === 0) {
      this.previous_location = position;
      this._add(position)
    } else {
      this.addPositionToHistory(position)
    }

    drawGeoLine(this.history, this.map)
  }
  
  addGeolocate(geolocate) {
    const elapseTime = this.state.isStarted !== false ? parseInt((geolocate.timestamp - this.previous_location.timestamp)) : 0

  addPositionToHistory(position) {
    
    const elapseTime = parseInt((position.timestamp - this.previous_location.timestamp)/1000)
    //console.log(elapseTime)
    //console.log(this.min_duration)

    if (elapseTime > this.min_duration) {
      this._add(position) // 経過時間が設定した制限時間をこえたらヒストリ追加
      this.previous_location = position
    } else {
      return;
    }
  }

  getUserTrack() {
    const t = []
    for (const item of this.history) {
      t.push([item.coords.longitude, item.coords.latitude])
    }
    return t
  }

  onClick() {
    let isStarted = this.state.isStarted
    console.log(isStarted);

    if(isStarted) { //Record時の処理
      navigator.geolocation.clearWatch(this.watch_id);
      //responseが帰ってきたらhistoryを初期化
      if (true) {
        this.history = []
      }
    } else { //Start時の処理
      //ここで描画レイヤーの初期化
      initializeGeoLine(this.map);
      //console.log(this.history);
      this.watch_id = navigator.geolocation.watchPosition(this.onPosition);
    }

  setMap(position){ // 現在地取得
    this.setState({
      current_pos: {
        lng: position.coords.longitude,
        lat: position.coords.latitude,
      }
    })
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      center: [this.state.current_pos.lng, this.state.current_pos.lat],
      style: 'mapbox://styles/mapbox/streets-v9', // mapのスタイル指定
      zoom: 16
    })

    this.map.addControl(geolocate);
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      center: [-96, 37.8],
      style: 'mapbox://styles/mapbox/streets-v9', // mapのスタイル指定
      zoom: 8 // おそらく
    })
 
    this.map.addControl(geolocate);
    geolocate.on('geolocate', this.onGeolocate);
  }

  componentWillUnmount() {
    try {
      this.map.remove()
    } catch(e) {//mapのロードに失敗した場合の例外処理
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
