import React from 'react';
import {shallow} from 'enzyme';
import { Link } from 'react-router-dom';

import Button from './Button';

const props = {
    text: "Button"
};

test('Component is rendered', () => {
    const button = shallow(
        <Button {...props} />,
    );

    expect(button.length).toEqual(1);
});

test('Class \'disabled\' is added', () => {
    const
        newProps = {...props, disabled: true, icon: 'project'},
        button = shallow(
            <Button {...newProps} />,
        );

    expect(button.hasClass('disabled')).toEqual(true);
});

test('<A> version of button is rendered', () => {
    const
        newProps = {...props, disabled: true, shadow: true, href: '/', icon: 'project'},
        button = shallow(
            <Button {...newProps} />,
        );

    expect(button.find(Link).length).toEqual(1);
});

test('Class \'shadow\' is added', () => {
    const
        newProps = {...props, shadow: true},
        button = shallow(
            <Button {...newProps} />,
        );

    expect(button.hasClass('shadow')).toEqual(true);
});