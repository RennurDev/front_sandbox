import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    position: "absolute",
    width: "100vw",
    zIndex: 2,
    bottom: -2,
  },
  text: {
    padding: 0,
  },
});

class RecordTrigger extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={0}
          alignContent="center"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={4} className={classes.grid}>
            <Button
              className={classes.text}
              onClick={() => this.props.onClick()}
            >
              <img
                className="imgRecordButton"
                src={process.env.PUBLIC_URL + "/imgRecordButton.svg"}
                alt="petampButton"
              />
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RecordTrigger);
