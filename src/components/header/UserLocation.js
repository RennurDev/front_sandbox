import { Grid, Typography } from "@material-ui/core";
const styles = {
  grid: {
    position: "relative",
    height: 30,
  },
  textLocation: {
    color: "white",
    position: "absolute",
    width: "100%",
    top: 40,
    zIndex: 2,
  },
  headerImg: {
    position: "absolute",
    top: 30,
    width: "100%",
    height: 50,
    zIndex: 1,
  },
};

export const UserLocation = ({ currentLocation }) => {
  return (
    <div>
      <Grid
        container
        alignContent="center"
        alignItems="center"
        justify="center"
      >
        <Grid style={styles.grid} item xs={7}>
          <div style={styles.headerImg}>
            <img
              src={process.env.PUBLIC_URL + "/PetampAreaNameBackground-02.svg"}
              alt="header"
            />
          </div>
          <Typography
            style={styles.textLocation}
            className="textLocation"
            align="center"
            gutterBottom
          >
            {currentLocation}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
