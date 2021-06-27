import React from 'react';
import  UserLocation from '../components/header/UserLocation';

export default {
    title: 'Petamp/UserLocation',
    component: UserLocation,
};

const Template = (args) => <UserLocation {...args} />;
export const Primary = Template.bind({})
Primary.args = {
    current_location: "OCHANOMIZU"
};