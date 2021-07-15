import { Grid, Typography } from "@material-ui/core";
const styles = {
  grid: {
    position: "relative",
    height: 30,
  },
};

export const UserLocation = ({ current_location }) => {
  return (
    <div>
      <Grid
        container
        alignContent="center"
        alignItems="center"
        justify="center"
      >
        <Grid style={styles.grid} item xs={7}>
          <div className="imgHeader">
            <img
              src={process.env.PUBLIC_URL + "/PetampAreaNameBackground-02.svg"}
              alt="header"
            />
          </div>
          <Typography className="textLocation" align="center" gutterBottom>
            {current_location}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
