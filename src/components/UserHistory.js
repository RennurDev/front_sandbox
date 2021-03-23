import React from 'react';

class UserLocationHistory {
  constructor() {
    this.history = new Set(); // 重複したデータは保存できない
    this.last_location = undefined;
    this.min_duration = 2;
    this.max_history = 150;
    this.time_exceed = 3600;
  }

  _add(geolocate) {
    if (this._hasProperty(geolocate, 'timestamp')) {
      this.history.add(geolocate);
      this.last_location = geolocate;
    }
  }
  
}
