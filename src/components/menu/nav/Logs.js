import React, { Component } from 'react';
import { Button } from '@material-ui/core';

export default class Logs extends Component {
  render() {
    return(
      <div>
        <Button color="primary" fullWidth={true}>
          logs
        </Button>
      </div>
    )
  }
}
