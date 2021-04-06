import React, { Component } from 'react';
import { Button } from '@material-ui/core';

export default class Profile extends Component {
  render() {
    return(
      <div>
        <Button color="secondary" fullWidth={true}>
          profile
        </Button>
      </div>
    )
  }
}
