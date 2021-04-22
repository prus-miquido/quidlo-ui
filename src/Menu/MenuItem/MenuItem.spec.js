import React from 'react';
import MenuItem from './MenuItem';
import {shallow} from 'enzyme';

const props = {
    title: '',
    link: 'http://cos.com'
};

test('Component is rendered', () => {
    const comp = shallow(
        <MenuItem {...props} />,
    );

    expect(comp.length).toEqual(1);
});

test('Class \'active\' is added', () => {
    const
        newProps = {...props, active: true},
        comp = shallow(
            <MenuItem {...newProps} />,
        );

    expect(comp.hasClass('active')).toEqual(true);
});

test('MouseEnter and MouseLeave will trigger hover func', () => {
    const
        hover = jest.fn(),
        newProps = {...props, active: true},
        comp = shallow(
            <MenuItem {...newProps} />,
        );

    comp.instance().hover = hover;
    comp.simulate('mouseEnter');
    comp.simulate('mouseLeave');

    expect(hover).toHaveBeenCalledTimes(2);
});

test('Hover method mutate state of component', () => {
    const
        newProps = {...props},
        comp = shallow(
            <MenuItem {...newProps} />,
        ),
        instance = comp.instance();


    instance.hover(true);

    expect(instance.state.hovered).toEqual(true);
});