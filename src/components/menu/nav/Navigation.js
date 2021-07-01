import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
//Icons
import PersonIcon from "@material-ui/icons/Person";
import TimelineIcon from "@material-ui/icons/Timeline";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#00a563",
  },
});

export const Navigation = (value, handleNavChange) => {
  const classes = useStyles();
  return (
    <BottomNavigation
      className={classes.root}
      value={value}
      onChange={handleNavChange}
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
};
