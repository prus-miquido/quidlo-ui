import React from 'react';
import {shallow} from 'enzyme';

import Pill from './Pill';

const props = {
    text: "Text"
};

test('Component is rendered', () => {
    const comp = shallow(
        <Pill {...props} />,
    );

    expect(comp.length).toEqual(1);
});

test('Class \'small\' is added', () => {
    const
        newProps = {...props, size: 'small'},
        comp = shallow(
            <Pill {...newProps} />,
        );

    expect(comp.hasClass('size-small')).toEqual(true);
});

test('Class \'large\' is added', () => {
    const
        newProps = {...props, size: 'large'},
        comp = shallow(
            <Pill {...newProps} />,
        );

    expect(comp.hasClass('size-large')).toEqual(true);
});