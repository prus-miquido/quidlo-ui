import React from 'react';
import {shallow} from 'enzyme';

import RadioButton from './RadioButton';

const props = {
    label: 'Months',
    value: true,
    onSelect: () => {},
    fieldId: 'report-time-Months'
};

test('Component is rendered', () => {
    const
        comp = shallow(
            <RadioButton {...props} />,
        );

    expect(comp.length).toEqual(1);
});

test('Class \'checked\' is added', () => {
    const
        comp = shallow(
        <RadioButton {...props} />,
    );

    expect(comp.find('.radioLabel').hasClass('checked')).toEqual(true);
});

test('Class \'dropdown\' is added', () => {
    const
        newProps = {...props, value: false, dropdownList: true},
        comp = shallow(
            <RadioButton {...newProps} />,
        );

    expect(comp.hasClass('dropdown')).toEqual(true);
});