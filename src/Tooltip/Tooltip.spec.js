import React from 'react';
import Tooltip from './Tooltip';
import {shallow} from 'enzyme';

const
    props = {
        text: 'Dmmy text'
    };

test('Component is rendered', () => {
    const comp = shallow(
        <Tooltip {...props}>
            <div>Text</div>
        </Tooltip>,
    );

    expect(comp.length).toEqual(1);
});

test('Add class \'open\' on mouseEnter', () => {
    const comp = shallow(
        <Tooltip {...props}>
            <div>Text</div>
        </Tooltip>,
    );

    comp.find('.wrapper').simulate('mouseEnter');

    expect(comp.state('open')).toEqual(true);
});

test('Remove class \'open\' on mouseLeave', () => {
    const comp = shallow(
        <Tooltip {...props}>
            <div>Text</div>
        </Tooltip>,
    );

    comp.find('.wrapper').simulate('mouseLeave');

    expect(comp.state('open')).toEqual(false);
});