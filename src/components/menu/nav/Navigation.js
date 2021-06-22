import React, { Component } from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
//Icons
import PersonIcon from "@material-ui/icons/Person";
import TimelineIcon from "@material-ui/icons/Timeline";
import SettingsIcon from "@material-ui/icons/Settings";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    backgroundColor: "#00a563",
  },
});

class Navigation extends Component {
  render() {
    const { classes } = this.props;

    return (
      <BottomNavigation
        className={classes.root}
        value={this.props.value}
        onChange={this.props.handleNavChange}
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
}

export default withStyles(styles, { withTheme: true })(Navigation);
