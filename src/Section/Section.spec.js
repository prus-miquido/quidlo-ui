import React from 'react';
import {shallow} from 'enzyme';

import Section from './Section';

test('Component is rendered', () => {
    const comp = shallow(
        <Section>Test</Section>,
    );

    expect(comp.length).toEqual(1);
});