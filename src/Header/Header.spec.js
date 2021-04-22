import React from 'react';
import {shallow} from 'enzyme';

import Header from './Header';
import {Icon} from '..';

const props = {
    title: "Title"
};

test('Component is rendered', () => {
    const comp = shallow(
        <Header {...props} />,
    );

    expect(comp.length).toEqual(1);
});

test('Icon is rendered', () => {
    const
        newProps = {...props, icon: 'project'},
        comp = shallow(
            <Header {...newProps} />,
        );

    expect(comp.find(Icon).length).toEqual(1);
});