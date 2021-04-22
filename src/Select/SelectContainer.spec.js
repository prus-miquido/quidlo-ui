import React from 'react';
import { shallowWithIntl } from '../../utils/intl-enzyme-test-helper.js';

import SelectContainer from './SelectContainer';

const props = {
    onSelect: () => {},
    options:[{
        label: 'Months',
        inputValue: 'Months',
        value: true,
        realValue: 'Months',
    }, {
        label: 'Weeks',
        inputValue: 'Weeks',
        value: false,
        realValue: 'Weeks',
    }, {
        label: 'Days',
        inputValue: 'Days',
        value: false,
        realValue: 'Days',
    }],
    label: "Type",
    intl: {}
};

test('Component is rendered', () => {
    const
        comp = shallowWithIntl(
            <SelectContainer {...props} />,
        ).first().shallow();

    expect(comp.length).toEqual(1);
});

test('Validator min is working', () => {
    const
        onSelect = jest.fn(),
        options = [{label: '1', realValue: 1, value: true}],
        newProps = {...props, onSelect, options, validationRules: {min: 2, max: 5, isRequired: true}},
        comp = shallowWithIntl(
            <SelectContainer {...newProps} />,
        ).first().shallow();

    expect(onSelect).toHaveBeenCalledWith({
        value: options,
        error: 'Value should contain at least 2 elements!'
    });
});

test('Validator max is working', () => {
    const
        onSelect = jest.fn(),
        options = [{label: '1', realValue: 1, value: true}, {label: '2', realValue: 2, value: true}],
        newProps = {...props, onSelect, options, validationRules: {min: 0, max: 1, isRequired: true}},
        comp = shallowWithIntl(
            <SelectContainer {...newProps} />,
        ).first().shallow();

    expect(onSelect).toHaveBeenCalledWith({
        value: options,
        error: 'Value should contain at most 1 elements!'
    });
});


test('Validator isRequired is working', () => {
    const
        onSelect = jest.fn(),
        options = [],
        newProps = {...props, onSelect, options, validationRules: {min: 0, max: 5, isRequired: true}},
        comp = shallowWithIntl(
            <SelectContainer {...newProps} />,
        ).first().shallow();

    expect(onSelect).toHaveBeenCalledWith({
        value: [],
        error: 'Field is required!'
    });
});

test('componentWillReceiveProps is changing state', () => {
    const
        onSelect = jest.fn(),
        options = [{label: '1', realValue: 1, value: true}, {label: '2', realValue: 2, value: true}],
        newProps = {...props, onSelect, options, validationRules: {min: 0, max: 5}},
        comp = shallowWithIntl(
            <SelectContainer {...newProps} />,
        );

    comp.setProps({
        options: [{label: '1', realValue: 1, value: true}, {label: '2', realValue: 2, value: true}]
    });

    expect(comp.state('options')).toEqual([{label: '1', realValue: 1, value: true}, {label: '2', realValue: 2, value: true}]);

    comp.setProps({
        options: [{label: '3', realValue: 3, value: true}, {label: '2', realValue: 2, value: true}]
    });

    expect(comp.state('options')).toEqual([{label: '3', realValue: 3, value: true}, {label: '2', realValue: 2, value: true}]);
});

test('selectHandler is changing state', () => {
    const
        onSelect = jest.fn(),
        options = [{label: '1', realValue: 1, value: true}, {label: '2', realValue: 2, value: true}],
        newProps = {...props, onSelect, options, validationRules: {min: 0, max: 5}},
        comp = shallowWithIntl(
            <SelectContainer {...newProps} />,
        );

    comp.instance().selectHandler([{label: '1', realValue: 1, value: false}, {label: '2', realValue: 2, value: true}]);

    expect(comp.state('options')).toEqual([{label: '1', realValue: 1, value: false}, {label: '2', realValue: 2, value: true}]);
});

test('selectAllHandler is select and deselect all', () => {
    const
        onSelect = jest.fn(),
        options = [{label: '1', realValue: 1, value: false}, {label: '2', realValue: 2, value: false}],
        newProps = {...props, onSelect, options, validationRules: {min: 0, max: 5}, allSelectable: true, multiselect: true},
        comp = shallowWithIntl(
            <SelectContainer {...newProps} />,
        );

    comp.instance().selectAllHandler();

    expect(comp.state('options')).toEqual([{label: '1', realValue: 1, value: true}, {label: '2', realValue: 2, value: true}]);

    comp.instance().selectAllHandler();

    expect(comp.state('options')).toEqual([{label: '1', realValue: 1, value: false}, {label: '2', realValue: 2, value: false}]);
});

test('toggleOptions is toggling active prop in state', () => {
    const
        onSelect = jest.fn(),
        options = [{label: '1', realValue: 1, value: false}, {label: '2', realValue: 2, value: false}],
        newProps = {...props, onSelect, options, validationRules: {min: 0, max: 5}},
        comp = shallowWithIntl(
            <SelectContainer {...newProps} />,
        );

    comp.instance().toggleOptions();

    expect(comp.state('active')).toEqual(true);

    comp.instance().toggleOptions();

    expect(comp.state('active')).toEqual(false);
});

test('searchHandler is changing state', () => {
    const
        onSelect = jest.fn(),
        onSearch = jest.fn(),
        options = [{label: 'aaaa', labelText: 'aaaa', realValue: 1, value: false}, {label: 111, labelText: '111', realValue: 2, value: false}],
        newProps = {...props, onSelect, options, validationRules: {min: 0, max: 5}, searchable: true},
        comp = shallowWithIntl(
            <SelectContainer {...newProps} />,
        );

    comp.instance().searchHandler({value: 'a'});

    expect(comp.state('options')).toEqual([{"hidden": false, "label": "aaaa", "labelText": "aaaa", "realValue": 1, "value": false}, {"hidden": true, "label": 111, "labelText": "111", "realValue": 2, "value": false}]);

    comp.setProps({
        onSearch
    });

    comp.instance().searchHandler({value: 'a'});

    expect(onSearch).toHaveBeenCalled();

});