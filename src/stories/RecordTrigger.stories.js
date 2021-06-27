import React from 'react';

import RecordTrigger from '../components/map/RecordTrigger';



export default {
  title: 'Petamp/RecordButton',
  component: RecordTrigger,
//   argTypes: {
//     backgroundColor: { control: 'color' },
//   },
};

const Template = (args) => <RecordTrigger {...args} />;
export const Primary = Template.bind({})
Primary.args = {
    btnContent: "START",
    btnColor: 'Primary',
    onClick: undefined,
  };

export const Stop = Template.bind({})
Stop.args = {
    btnContent: "STOP",
    btnColor: 'Secondary',
    onClick: undefined,
  };