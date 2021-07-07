import { UserLocation } from './components/header/UserLocation';

export const Header = ({ current_location }) => {
  return (
    <div>
      <UserLocation
        current_location={current_location}
      />
    </div>
  )
}
