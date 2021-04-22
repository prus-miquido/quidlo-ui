import React from 'react';
import { shallowWithIntl } from '../../utils/intl-enzyme-test-helper.js';

import SelectView from './SelectView';

const props = {
    values: [],
    isMulti: false,
    intl: {}
};

test('Component is rendered', () => {
    const
        comp = shallowWithIntl(
            <SelectView {...props} />,
        );

    expect(comp.length).toEqual(1);
});

test('Class error is added', () => {
    const
        newProps = {...props,
            error: 'true',
            isTouched: true
        },
        comp = shallowWithIntl(
            <SelectView {...newProps} />,
        );

    expect(comp.hasClass('error')).toEqual(true);
});

test('Class narrow is added', () => {
    const
        newProps = {...props,
            error: 'true',
            isNarrow: true
        },
        comp = shallowWithIntl(
            <SelectView {...newProps} />,
        );

    expect(comp.hasClass('narrow')).toEqual(true);
});

test('No text is rendered', () => {
    const
        newProps = {...props,
            isAll: true,
            isMulti: false,
            values: []
        },
        comp = shallowWithIntl(
            <SelectView {...newProps} />,
        );

    expect(comp.find('.content').text()).toEqual('None selected');
});

test('\'All selected text\' is rendered', () => {
    const
        newProps = {...props,
            isAll: true,
            isMulti: false,
            values: [{}],
        },
        comp = shallowWithIntl(
            <SelectView {...newProps} />,
        );

    expect(comp.find('.content').text()).toEqual('All selected');
});


test('No text is rendered', () => {
    const
        newProps = {...props,
            isAll: false,
            isMulti: false,
            values: []
        },
        comp = shallowWithIntl(
            <SelectView {...newProps} />,
        );

    expect(comp.find('.content').text()).toEqual('None selected');
});


test('Single element label is rendered', () => {
    const
        newProps = {...props,
            isAll: false,
            isMulti: false,
            values: [{label: 'label'}]
        },
        comp = shallowWithIntl(
            <SelectView {...newProps} />,
        );



    expect(comp.find('.content').text()).toEqual('label');
});


test('Amount of selected items is rendered', () => {
    const
        newProps = {...props,
            isAll: false,
            isMulti: true,
            values: [{}, {}]
        },
        comp = shallowWithIntl(
            <SelectView {...newProps} />,
        );

    expect(comp.find('.content').text()).toEqual('2 selected');
});

test('No text is rendered', () => {
    const
        newProps = {...props,
            isAll: false,
            isMulti: true,
            values: [{}]
        },
        comp = shallowWithIntl(
            <SelectView {...newProps} />,
        );

    expect(comp.find('.content').text()).toEqual('');
});

