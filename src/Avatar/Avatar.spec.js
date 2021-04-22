import React from 'react';
import {shallow} from 'enzyme';

import Avatar from './Avatar';

const props = {
    firstName: "Doe",
    lastName: "Doe"
};

test('Component is rendered in picture version', () => {
    const comp = shallow(
        <Avatar {...props} />,
    );

    expect(comp.hasClass('signature')).toEqual(true);
});

test('Component is rendered in signature version', () => {
    const
        newProps = {...props, picture: 'https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg'},
        comp = shallow(
            <Avatar {...newProps} />,
        );

    expect(comp.hasClass('picture')).toEqual(true);
});
