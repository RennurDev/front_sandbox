import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  grid: {
    position: "relative",
    height: 30,
  },
});

class UserInfo extends Component {
  render() {
    const areaName=this.props.areaName
    const { classes } = this.props;
    return (
      <div>
        <Grid
          container
          alignContent="center"
          alignItems="center"
          justify="center"
        >
          <Grid className={classes.grid} item xs={7}>
            <div className="imgHeader">
              <img
                src={
                  process.env.PUBLIC_URL + "/PetampAreaNameBackground-02.svg"
                }
                alt="header"
              />
            </div>
            <Typography className="textLocation" align="center" gutterBottom>
              {areaName}
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(UserInfo);
