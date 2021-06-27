import React from 'react';
import Tracks from '../components/menu/content/Tracks';

export default {
    title: 'Petamp/Tracks',
    component: Tracks,
};

const Template = (args) => <Tracks {...args} />;

export const Primary = Template.bind({})
Primary.args = {
    track_num: 0,
    date : "2021.5.1.sat",
    distance : "1034",
    altitude : "35324",
};


export const Secondary = Template.bind({})
Secondary.args = {
    track_num: 0,
    date : "199/12/22",
    distance : "4444",
    altitude : "33434",
};