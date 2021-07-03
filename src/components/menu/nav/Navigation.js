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

export function Navigation(props) {
  function handleActChange(value) {
    //NOTE:  we invoke the callback with the new value
    props.onChange(value);
  }
  const classes = useStyles();
  return (
    <BottomNavigation
      className={classes.root}
      value={props.value}
      onChange={(e, value) => {
        handleActChange(value);
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
