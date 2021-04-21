import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

const RAILS_API_ENDPOINT = process.env.REACT_APP_BACKEND_API_ENDPOINT

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      form: {
        id: '',
        name: '',
      }
    }
  }

  componentDidMount() { 
    axios
      .get(RAILS_API_ENDPOINT+'/users')
      .then((results) => {
        const data = results.data
        console.log(data)
        this.setState({lists: data})
        // this.setState({
        //   name: data.name,
        //   createdAt: data.created_at
        // })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleChange(e, key) {
    let target = e.target
    let value = target.value
    let form = this.state.form
    form[key]=value

    this.setState({
      form: form
    })
  }

  handleCreate() {
    let body = {user:{name: this.state.form.name}}
    console.log(body)
    axios
      .post(RAILS_API_ENDPOINT+'/users', body)
      .then((results) => {
        const data = results.data
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleUpdate() {
    let body = {
      user:{
        id: this.state.form.id,
        name: this.state.form.name
      }
    }
    let id = this.state.form.id
    const url = RAILS_API_ENDPOINT + '/users/'+ id
    console.log(url)
    axios
      .put(url, body)
      .then((results) => {
        const data = results.data
      })
      .catch((error) => {
        console.log(error)
      })
}
  render(){
    const {state} = this.state
    return (
      <div>
        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {this.state.lists.map((list) => {
                return (
                  <div>
                    <Grid container spaceing={0}>
                      <Grid item xs={4}>{list.id}</Grid>
                      <Grid item xs={4}>{list.name}</Grid>
                      <Grid item xs={4}>{list.created_at}</Grid>
                    </Grid>
                  </div>
                );
              })}
            </Grid>
            {/* 新規作成 */}
            <Grid item xs={9}>
              <TextField 
                value={this.state.form.name} 
                onChange={e=>this.handleChange(e, 'name')} fullWidth label="Name" 
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                onClick={() => this.handleCreate()} 
                variant="outlined"
                color="primary" fullWidth={true}
              >
                CREATE
              </Button>
            </Grid>
            {/* ユーザー編集 */}
            <Grid item xs={2}>
              <TextField value={this.state.form.id}
                onChange={e=>this.handleChange(e, 'id')} 
              />
            </Grid>
            <Grid item xs={7}>
              <TextField value={this.state.form.name}
                onChange={e=>this.handleChange(e, 'name')}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                onClick={()=>this.handleUpdate()}
                variant="outlined"
                color="secondary" fullWidth={true}
              >
                UPDATE
              </Button>
            </Grid>
          </Grid>
        </form>
        {state}
        <p>Forget Name?(sorry, but I can do nothing.)</p>
      </div>
    )
  }
}

export default App;
