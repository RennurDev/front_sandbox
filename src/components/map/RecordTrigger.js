import { Button, Grid } from "@material-ui/core";

const styles = {
  root: {
    position: "absolute",
    width: "100vw",
    zIndex: 2,
    bottom: -2,
  },
  text: {
    width: "100%",
    padding: 0,
  },
  recordButtonImg: {
    width: "100%",
  },
};

export const RecordTrigger = ({ onClick }) => {
  return (
    <div style={styles.root}>
      <Grid
        container
        spacing={0}
        alignContent="center"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={4} md={1}>
          <Button style={styles.text} onClick={onClick}>
            <img
              style={styles.recordButtonImg}
              src={process.env.PUBLIC_URL + "/imgRecordButton.svg"}
              alt="petampButton"
            />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
