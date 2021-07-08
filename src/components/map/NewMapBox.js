import mapboxgl from "mapbox-gl";
import { RecordTrigger } from "./RecordTrigger";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const geolocateSetting = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true, // 高精度な位置情報取得
  },
  trackUserLocation: true, // ユーザの位置情報追跡
});

const styes = {
  root: {
    width: "100%",
    height: "87vh",
  },
};

export const MapBox = ({
  currentUser,
  tracks,
  trackD,
  trackNum,
  map,
  handleState,
}) => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentPosLng, setCurrentPosLng] = useState(0);
  const [currentPosLat, setCurrentPosLat] = useState(0);
  const [posHistory, setPosHistory] = useState([]);

  const initializePosition = (position) => {};

  useEffect(() => {
    const switchAction = () => {
      if (isStarted) {
        beginRecordPos();
      } else {
        endRecordPos();
      }
    };
  }, [isStarted]);

  const beginRecordPos = () => {
    HideAllTracks(map, tracks.length);
    ShowTrackLayer(map, "currentTrack");
    // NOTE: 初期点セット & 縮尺変更
    navigator.geolocation.getCurrentPosition((pos) => {
      posHistory.push([pos.coords.longitude], pos.coords.latitude);
      map.flyTo({
        center: posHistory[0],
        zoom: 15,
      });
    });
    // NOTE: ここから計測開始
    watchID = navigator.geolocation.watchPosition((pos) => {
      if (IsValidPosition(pos)) 
    });
  };

  const endRecordPos = () => {};
  return (
    <div>
      <div
        className={classes.root}
        ref={(e) => {
          mapContainer = e;
        }}
      >
        <RecordTrigger onClick={onClick} />
      </div>
    </div>
  );
};
