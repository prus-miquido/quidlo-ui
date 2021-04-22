import React from 'react';
import Icon from './Icon';
import {shallow} from 'enzyme';

test('Component is rendered', () => {
    const icon = shallow(
        <Icon icon="project" />,
    );

    expect(icon.length).toEqual(1);
});