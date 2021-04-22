import React from 'react';
import { shallowWithIntl } from '../../utils/intl-enzyme-test-helper.js';

import Spinner from './Spinner';

const props = {
    active: true
};

test('Active component is rendered', () => {
    const comp = shallowWithIntl(
        <Spinner {...props} />,
    );

    expect(comp.dive().find('.dataSpinner').length).toEqual(1);
});

test('Not active component is not rendered', () => {
    const
        newProps = {...props, active: false},
        comp = shallowWithIntl(
            <Spinner {...newProps} />,
        );

    expect(comp.dive().find('.notActive').length).toEqual(1);
});
