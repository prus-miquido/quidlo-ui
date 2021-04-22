import React from 'react';
import Menu from './Menu';
import {shallow} from 'enzyme';

import MenuItem from './MenuItem';

import style from './Menu.style.scss';

const props = {
    items: []
};

test('Component is rendered', () => {
    const comp = shallow(
        <Menu {...props} />,
    );

    expect(comp.length).toEqual(1);
});

test('Class \'hidden\' is added', () => {
    const
        newProps = {...props, hidden: true},
        comp = shallow(
            <Menu {...newProps} />,
        );

    expect(comp.hasClass(style.hidden)).toEqual(true);
});

test('Proper amount of MenuItems is rendered', () => {
    const
        newProps = {...props, items: [{title: '1', link: ''},{title: '2', link: ''}]},
        comp = shallow(
            <Menu {...newProps} />,
        );

    expect(comp.find(MenuItem).length).toEqual(2);
});