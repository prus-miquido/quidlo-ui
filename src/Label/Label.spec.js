import React from 'react';
import {shallow} from 'enzyme';

import Label from './Label';
import Icon from '../Icon';

const props = {
    icon: 'type',
    text: 'Type',
};

test('Component is rendered', () => {
    const
        comp = shallow(
            <Label {...props} />,
        );

    expect(comp.length).toEqual(1);
});

test('Component is rendered with small icon', () => {
    const
        newProps = {...props, size: 'small'},
        comp = shallow(
            <Label {...newProps} />,
        );

    expect(comp.find(Icon).props().size).toEqual('small');
});
