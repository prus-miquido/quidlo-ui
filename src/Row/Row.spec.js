import React from 'react';
import {shallow} from 'enzyme';

import Row from './Row';

test('Component is rendered', () => {
    const comp = shallow(
        <Row spaced stretched centered>Test</Row>,
    );

    expect(comp.length).toEqual(1);
});