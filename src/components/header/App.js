import { UserLocation } from './UserLocation';

export const Header = ({ current_location }) => {
  return (
    <div>
      <UserLocation
        current_location={current_location}
      />
    </div>
  )
}
