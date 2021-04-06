import React, { Component } from 'react';
import { Button } from '@material-ui/core'

export default class RecordTrigger extends Component {
  // constructor(props){
  //   super(props);
  // }

  render() {
    const btnContent = this.props.btnContent;
    const btnColor = this.props.btnColor;
    return (
      <div>
        <Button color={btnColor} 
                fullWidth={true} 
                onClick={() => this.props.onClick()}>
          {btnContent}
        </Button>
      </div>
    )
  }
}
