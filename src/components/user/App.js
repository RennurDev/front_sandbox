import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

class App extends Component {

  render(){
    return (
      <div>
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField id="standard-basic" fullWidth label="Name" />
                </Grid>
                <Grid item xs={6}>
                    <Button variant="outlined" color="primary" fullWidth={true}>
                        SIGN UP
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="outlined" color="primary" fullWidth={true}>
                        SIGN IN
                    </Button>
                </Grid>
            </Grid>  
        </form>
        <p>Forget Name?(sorry, but I can do nothing.)</p>
      </div>
    )
  }
}

export default App;