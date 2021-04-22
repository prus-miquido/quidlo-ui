import React from 'react';
import {shallow} from 'enzyme';

import Tag from './Tag';
import Avatar from '../Avatar';

const props = {
    text: "Doe"
};

test('Component is rendered in picture version', () => {
    const comp = shallow(
        <Tag {...props} />,
    );

    expect(comp.length).toEqual(1);
});

test('Prop function onRemove is fired on cross icon click', () => {
    const
        f = jest.fn(),
        newProps = {...props, onRemove: f},
        comp = shallow(
            <Tag {...newProps} />,
        );

    comp.find('.remove').simulate('click');

    expect(f).toHaveBeenCalled();
});

test('Large class is added', () => {
    const
        newProps = {...props, avatar: (<Avatar firstName="John" lastName="Doe" />)},
        comp = shallow(
            <Tag {...newProps} />,
        );

    expect(comp.hasClass('size-large')).toEqual(true);
});

test('Styles are added to colored type of Tag', () => {
    const
        newProps = {...props, type: 'colored', color: '#ddd'},
        comp = shallow(
            <Tag {...newProps} />,
        );
    let compStyle = comp.props().style;

    expect(compStyle.color).toEqual('#ddd');
});