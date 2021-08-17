import { TextField, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const styles = {
  signUpImg: {
    width: "300px",
    display: "block",
    margin: "0 auto",
    height: "70%",
  },
};

export const UserForm = ({ setCurrentUser }) => {
  const handleCreate = () => {
    // TODO: バックエンドでのUser作成機能完成後にコメントアウト
    // let response;
    // const url = "/users";
    // let body = {
    //   user: {
    //     name: form.name,
    //   },
    // };
    // response = RequestAxios(url, "post", body);
    // if (response) {
    //   console.log(response);
    // }
    setCurrentUser({ id: 5 });
  };

  return (
    <div>
      <img
        src={`${process.env.PUBLIC_URL}/signUpPetamp.png`}
        style={styles.signUpImg}
        alt="signUp"
      />
      <form noValidate autoComplete="off">
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item xs={10}>
            <Grid container spacing={3} alignItems="center" justify="center">
              <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-basic"
                      label="Name"
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-basic"
                      label="Password"
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid
                  container
                  spacing={0}
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={6}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Button
                          onClick={() => handleCreate()}
                          variant="contained"
                          color="secondary"
                          fullWidth={true}
                        >
                          はじめる
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          onClick={() => this.handleCreate()}
                          variant="contained"
                          fullWidth={true}
                        >
                          Login
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
