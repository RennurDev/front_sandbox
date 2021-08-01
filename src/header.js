import { UserLocation } from "./components/header/UserLocation";

export const Header = ({ currentPlace }) => {
  return (
    <div>
      <UserLocation currentPlace={currentPlace} />
    </div>
  );
};
