import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import RequestAxios from "../../lib/RequestAxios";
import "../../App.css";

export const UserForm = ({ setCurrentUser }) => {
  const [form, setForm] = useState([{
    name: "",
    password: "",
  }]);

  // handleChange(e, key) {
  //   let target = e.target;
  //   let value = target.value;
  //   form[key] = value;


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
    setCurrentUser({id: 5});
  }

  return (
    <div className="backgroundGreen">
      <img
        src={`${process.env.PUBLIC_URL}/signUpPetamp.png`}
        className="signUpPetamp"
        alt="signUp"
      />
      <form noValidate autoComplete="off">
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item xs={10}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-basic"
                      label="Name"
                      variant="filled"
                      fullWidth
                      onChange={() => setForm({name: ""})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-basic"
                      label="Password"
                      variant="filled"
                      fullWidth
                      onChange={() => setForm({password: ""})}
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
}
