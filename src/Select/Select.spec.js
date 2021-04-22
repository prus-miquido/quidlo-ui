import React from 'react';
import { shallowWithIntl } from '../../utils/intl-enzyme-test-helper.js';

import Select from './Select';
import Checkboxes from './../Checkbox';
import RadioButtons from './../RadioButton';

const props = {
    active: true,
    onSearch: () => {},
    onSelect: () => {},
    onSelectAll: () => {},
    multiselect: false,
    options: [{
        value: true,
        label: 'Label'
    }],
    intl: {}
};

test('Component is rendered with .optionsContainer', () => {
    const
        comp = shallowWithIntl(
            <Select {...props} />,
        );

    expect(comp.dive().find('.optionsContainer').length).toEqual(1);
});

test('Component is rendered with RadioButtons', () => {
    const
        comp = shallowWithIntl(
            <Select {...props} />,
        );

    expect(comp.dive().find(RadioButtons).length).toEqual(1);
});

test('Component is rendered with Checkboxes', () => {
    const
        newProps = {
            ...props,
            multiselect: true,
        },
        comp = shallowWithIntl(
            <Select {...newProps} />,
        );
    expect(comp.dive().find(Checkboxes).length).toEqual(2);
});

test('Dropdown is not rendered', () => {
    const
        comp = shallowWithIntl(
            <Select {...props} active={false} />,
        );

    expect(comp.dive().find('.notActive').length).toEqual(1);
});