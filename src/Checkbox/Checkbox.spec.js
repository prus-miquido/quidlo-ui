import React from 'react';
import {shallow} from 'enzyme';

import Checkbox from './Checkbox';

const props = {
    label: 'Months',
    value: true,
    onSelect: () => {},
    fieldId: 'report-time-Months'
};

test('Component is rendered', () => {
    const
        comp = shallow(
            <Checkbox {...props} />,
        );

    expect(comp.length).toEqual(1);
});

test('Component is rendered with class "checked"', () => {
    const
        comp = shallow(
            <Checkbox {...props} />,
        );

    expect(comp.hasClass('checked')).toEqual(true);
});

test('Component is rendered with class "dropdownAll"', () => {
    const
        newProps = {...props, dropdownList: 'all'},
        comp = shallow(
            <Checkbox {...newProps} />,
        );

    expect(comp.hasClass('checked')).toEqual(true);
});

test('Component is rendered with class "dropdown"', () => {
    const
        newProps = {...props, dropdownList: 'options'},
        comp = shallow(
            <Checkbox {...newProps} />,
        );

    expect(comp.hasClass('checked')).toEqual(true);
});

test('Prop function onSelect is called', () => {
    const
        f = jest.fn(),
        newProps = {...props, onSelect: f, value: false},
        comp = shallow(
            <Checkbox {...newProps} />,
        );

    comp.find('[type="checkbox"]').simulate('change', {target: {value: newProps.value}});

    expect(f).toHaveBeenCalled();
});
