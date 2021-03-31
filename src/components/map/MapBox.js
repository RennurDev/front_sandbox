import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import drawGeoLine from '../../lib/DrawGeoLine';
import initializeGeoLine from '../../lib/InitializeGeoLine';

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
      history: [],
      area: ''
    }
    this.history = []
    this.previous_location = undefined
    this.min_duration = 2

    this.onGeolocate = this.onGeolocate.bind(this) // これないと動かない
  }

  _hasProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop)
  }

  _add(geolocate) {
    if (this._hasProperty(geolocate, 'timestamp')) {
      console.log(geolocate)
      this.history.push([geolocate.coords.longitude, geolocate.coords.latitude])
    }
  }
  
  addGeolocate(geolocate) {
    const elapseTime = this.previous_location !== undefined ? parseInt((geolocate.timestamp - this.previous_location.timestamp)) : 0

    if (this.previous_location === undefined) {
      console.log(geolocate)
      this._add(geolocate) // 測り始め
      this.previous_location = geolocate;
    } else if (elapseTime > this.min_duration) {
      this._add(geolocate) // 経過時間が設定した制限時間をこえたらヒストリ追加
      this.previous_location = geolocate
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
  
  onGeolocate(position) {
    console.log(this.history.length);
    if(this.history.length === 0) {
      initializeGeoLine(this.map)
    }
    this.addGeolocate(position)
    drawGeoLine(this.history, this.map)
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
    this.map.remove()
  }
  
  render() {
     return (
        <div>
          <div className={'mapContainer'} ref={e => this.mapContainer = e}/>
        </div>
     )
  }
}
