import { TextField, Button, Grid } from "@material-ui/core";

export const Setting = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Edit Profile</h1>
        </Grid>
        <Grid item xs={9}>
          <TextField fullWidth={true} />
        </Grid>
        <Grid item xs={3}>
          <Button variant="outlined" color="primary" fullWidth={true}>
            Update
          </Button>
        </Grid>
        <Grid item xs={12}>
          <h1>Logout</h1>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" color="secondary" fullWidth={true}>
            LOGOUT
          </Button>
        </Grid>
        <Grid item xs={12}>
          <h1>Delete Account</h1>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" color="secondary" fullWidth={true}>
            DELETE
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
