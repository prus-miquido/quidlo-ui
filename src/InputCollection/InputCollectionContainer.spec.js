import React from 'react';
import { shallowWithIntl } from '../../utils/intl-enzyme-test-helper.js';

import InputCollectionContainer from './InputCollectionContainer';

    const
        props = {
            label: '',
            value: [],
            onChange: () => {},
            name: 'test-input-comp',
            error: '',
            validationRules: {},
            intl: {}
        };

test('Component is rendered', async () => {
    const
        onChange = jest.fn(),
        newProps = {...props, onChange, value: ['sadsad'], validationRules: {isRequired: true}},
        comp = shallowWithIntl(
            <InputCollectionContainer {...newProps} />,
        ).first().shallow();

    expect(comp.length).toEqual(1);
    expect(onChange).toHaveBeenCalled();
});

test('Validator isRequired is working', () => {
    const
        onChange = jest.fn(),
        newProps = {...props, onChange, value: ['aaa'], validationRules: {isRequired: true}},
        comp = shallowWithIntl(
            <InputCollectionContainer {...newProps} />,
        );

    expect(onChange).toHaveBeenCalledWith({
        value: ['aaa'],
        error: undefined
    });

    comp.setProps({ value: [] });

    expect(onChange).toHaveBeenCalledWith({
        value: [],
        error: 'Field is required!'
    });
});

test('onChange is not triggered when value isnt changing', () => {
    const
        onChange = jest.fn(),
        newProps = {...props, onChange, value: ['aaa'], validationRules: {isRequired: true}},
        comp = shallowWithIntl(
            <InputCollectionContainer {...newProps} />,
        );

    comp.setProps({ value: ['aaa'] });

    expect(onChange).toHaveBeenCalledTimes(1);
});

test('touchHandler is changing state', () => {
    const
        onChange = jest.fn(),
        newProps = {...props, onChange},
        comp = shallowWithIntl(
            <InputCollectionContainer {...newProps} />,
        );

    comp.instance().touchHandler();
    comp.instance().touchHandler();

    expect(comp.state('isTouched')).toEqual(true);
});

test('changeHandler is changing state', () => {
    const comp = shallowWithIntl(
            <InputCollectionContainer {...props} />,
        );

    comp.instance().changeHandler('newValue');

    expect(comp.state('inputValue')).toEqual('newValue');
});

test('keyPressHandler with " " is triggering addHandler', () => {
    const
        addHandler = jest.fn(),
        newProps = {...props},
        comp = shallowWithIntl(
            <InputCollectionContainer {...newProps} />,
        );

    comp.instance().addHandler = addHandler;

    comp.instance().keyPressHandler({
        key: " "
    });

    expect(addHandler).toHaveBeenCalled();
});

test('keyPressHandler with "Enter" is triggering addHandler', () => {
    const
        addHandler = jest.fn(),
        newProps = {...props},
        comp = shallowWithIntl(
            <InputCollectionContainer {...newProps} />,
        );

    comp.instance().addHandler = addHandler;

    comp.instance().keyPressHandler({
        key: "Enter"
    });

    expect(addHandler).toHaveBeenCalled();
});

test('keyPressHandler with "y" isnt triggering addHandler', () => {
    const
        addHandler = jest.fn(),
        newProps = {...props},
        comp = shallowWithIntl(
            <InputCollectionContainer {...newProps} />,
        );

    comp.instance().addHandler = addHandler;

    comp.instance().keyPressHandler({
        key: "y"
    });

    expect(addHandler).not.toHaveBeenCalled();
});

test('removeHandler is invoking prop onChange with new value', () => {
    const
        onChange = jest.fn(),
        value = ['sdasd', 'adssad', '1adsasd'],
        newProps = {...props, onChange, value},
        comp = shallowWithIntl(
            <InputCollectionContainer {...newProps} />,
        );

    comp.instance().removeHandler('adssad');

    expect(onChange).not.toHaveBeenCalledWith(['sdasd', '1adsasd']);
});


test('addHandler is invoking prop onChange with new value when new value is proper email address', () => {
    const
        onChange = jest.fn(),
        value = [],
        newProps = {...props, onChange, value},
        comp = shallowWithIntl(
            <InputCollectionContainer {...newProps} />,
        );

    comp.instance().addHandler('adssad@dfsfsd.pl');

    expect(onChange).toHaveBeenLastCalledWith({"error": undefined, "value": ["adssad@dfsfsd.pl"]});
});


test('addHandler is not invoking prop onChange with new value when new value isnt proper email address', () => {
    const
        onChange = jest.fn(),
        value = [],
        newProps = {...props, onChange, value},
        comp = shallowWithIntl(
            <InputCollectionContainer {...newProps} />,
        );

    comp.instance().addHandler('adssad');

    expect(onChange).toHaveBeenCalledWith({"error": undefined, "value": []});
});