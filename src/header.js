import { UserLocation } from "./components/header/UserLocation";

export const Header = ({ currentLocation }) => {
  return (
    <div>
      <UserLocation currentLocation={currentLocation} />
    </div>
  );
};
