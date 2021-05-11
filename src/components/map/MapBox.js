import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import drawGeoLine from '../../lib/DrawGeoLine';
import initializeGeoLine from '../../lib/InitializeGeoLine';
import RecordTrigger from './RecordTrigger';
import axios from 'axios';

// アクセストークン
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ANOTHER_API_KEY;
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
    this.history = []
    this.previous_location = undefined
    this.min_duration = 2000 //ms
    //watchPositionの実行idを管理
    this.watch_id = -1

    this.onPosition = this.onPosition.bind(this)
    this.onClick = this.onClick.bind(this);
    this.setMap = this.setMap.bind(this);
  }

  _add(position) {
    this.history.push([position.coords.longitude, position.coords.latitude])
  }

  getTrack(id) {
    const url = RAILS_API_ENDPOINT + '/tracks/'+ id
    axios
      .get(url)
      .then((results) => {
          let data = results.data.data
          //各座標データが１要素として文字列で表現された配列の生成：
          //元データ：[[lng, lat],[lng, lat],[lng, lat]]
          //① 配列の先頭,末尾にある"[[","]]"の削除
          //② 途中にある"],["で文字列を分割
          let pattern = /\],\s*\[/;
          data = data.replace("[[", "").replace("]]", "").split(pattern)

          //表示用の配列を作成
          let old_history = []
          for(let i = 0; i < data.length; i++) {
            old_history.push(data[i].split(",").map(Number))
          }

          console.log(old_history)

          initializeGeoLine(this.map)
          drawGeoLine(old_history, this.map)
      })
      .catch(
        (error) => {
          console.log(error)
      })
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

  addPositionToHistory(position) {
    const elapseTime = parseInt((position.timestamp - this.previous_location.timestamp))

    if (elapseTime > this.min_duration) {
      this._add(position) // 経過時間が設定した制限時間をこえたらヒストリ追加
      this.previous_location = position
    } else {
      return;
    }
  }

  postHistory(data) {
    let body = {
      track:{
        data: String(data),
        user_id: this.props.current_user.id
      }
    }

    const url = RAILS_API_ENDPOINT + '/tracks'
    axios
      .post(url, body)
      .then((results) => {
        const data = results.data
        // TODO: レスポンスが200な場合のみ 初期化するよう実装
        this.history = [];
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onClick() {
    let isStarted = this.state.isStarted

    if(isStarted) { // Record時の処理
      if(this.history.length !== 0) {
        this.postHistory(this.history)
      }
      navigator.geolocation.clearWatch(this.watch_id);
      this.setState({isStarted: !isStarted})
    } else { // Start時の処理
      console.log(this.history)
      if (this.history.length === 0) {
        // 描画レイヤーの初期化
        initializeGeoLine(this.map);
        this.watch_id = navigator.geolocation.watchPosition(this.onPosition);
        this.setState({isStarted: !isStarted})
      }
    }
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
    this.map.on('load', function(){this.getTrack(this.props.track_id)}.bind(this))
  }

  componentDidMount() {
    const track_id = this.props.track_id
    navigator.geolocation.getCurrentPosition(this.setMap)
  }

  componentWillUnmount() {
    try {
      this.map.remove()
    } catch(e) { //mapのロードに失敗した場合の例外処理
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
