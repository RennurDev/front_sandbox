import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

const RAILS_API_ENDPOINT = process.env.REACT_APP_BACKEND_API_ENDPOINT

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      createdAt: '',
    }
  }

  componentDidMount() { 
    axios
      .get(RAILS_API_ENDPOINT+'/users/1')
      .then((results) => {
        const data = results.data
        this.setState({
          name: data.name,
          createdAt: data.created_at
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render(){
    const { name, createdAt } = this.state;
    return (
      <div>
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <p>first user name is {name}</p>
                  <p>created at {createdAt}</p>
                </Grid>
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
