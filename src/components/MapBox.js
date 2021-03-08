import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import '../App.css'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiaGF0YWtlNTExNTIyIiwiYSI6ImNrbTA5OHA2bDBxOGwycHE3aGc4NG0zMHcifQ.FzXi8T5KcCXCqMjGBTnV7A';

const geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true // 高精度な位置情報取得
  },
  trackUserLocation: true 
});

class MapBox extends Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9', // mapのスタイル指定
    })
    this.map.addControl(geolocate)
  }

  componentWillUnmount() {
    this.map.remove()
  }
  
  render() {
     return (
        // <div id='map'></div>
        <div>
          <div className={'mapContainer'} ref={e => this.mapContainer = e}/>
        </div>
     )
  }
}

export default MapBox;
