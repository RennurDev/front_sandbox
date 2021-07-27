import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
//Icons
import PersonIcon from "@material-ui/icons/Person";
import TimelineIcon from "@material-ui/icons/Timeline";
import SettingsIcon from "@material-ui/icons/Settings";

const styles = {
  root: {
    backgroundColor: "#00a563",
  },
};

export const Navigation = ({selectedAct, setSelectedAct}) => {
  return (
    <BottomNavigation
      style={styles.root}
      value={selectedAct}
      onChange={(e, value) => {
        setSelectedAct(value);
      }}
    >
      <BottomNavigationAction
        label="Profile"
        value="Profile"
        icon={<PersonIcon />}
      />
      <BottomNavigationAction
        label="Tracks"
        value="Tracks"
        icon={<TimelineIcon />}
      />
      <BottomNavigationAction
        label="Setting"
        value="Setting"
        icon={<SettingsIcon />}
      />
    </BottomNavigation>
  );
}
