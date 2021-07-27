
    super(props);
    this.state = {
      lists: [],
      form: {
        id: "",
        name: "",
      },
    };
  }

  componentDidMount() {
    const url = "/users";
    var response = RequestAxios(url, "get");
    response.then((r) => {
      if (r.status) {
        if (r.data.length >= 1 && r.status === 200) {
          this.setState({ lists: r.data });
        } else {
          console.log("軌跡データがありません");
        }
      } else {
        console.log("ERROR:" + r);
      }
    });
  }

  handleChange(e, key) {
    let target = e.target;
    let value = target.value;
    let form = this.state.form;
    form[key] = value;

    this.setState({
      form: form,
    });
  }

  handleCreate() {
    // TODO: バックエンドでのUser作成機能完成後にコメントアウト
    // let response;
    // const url = "/users";
    // let body = {
    //   user: {
    //     name: this.state.form.name,
    //   },
    // };
    // response = RequestAxios(url, "post", body);
    // if (response) {
    //   console.log(response);
    // }
    this.props.handleUserLogin(5);
  }

  handleDestroy() {
    let id = this.state.form.id;
    const url = "/users/" + id;
    let response = RequestAxios(url, "delete");
    response.then((r) => {
      if (r.stasus) {
        console.log(r.data);
      } else {
        console.log("[ERROR]" + r);
      }
    });
  }

  render() {
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
                            onClick={() => this.handleCreate()}
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
}

export default App;
