import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
//Icon
import TimelineIcon from "@material-ui/icons/Timeline";

const styles = {
  root: {
    backgroundColor: "#00a563",
  },
};

export const Navigation = ({ selectedAct, setSelectedAct }) => {
  return (
    <BottomNavigation
      style={styles.root}
      value={selectedAct}
      onChange={(e, value) => {
        setSelectedAct(value);
      }}
    >
      <BottomNavigationAction
        label="Tracks"
        value="Tracks"
        icon={<TimelineIcon />}
      />
    </BottomNavigation>
  );
};
