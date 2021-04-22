import React from 'react';
import {shallow} from 'enzyme';

import Animation from './Animation';
import animationData from '../Spinner/json/data.json';

const props = {
    animationData
};

test('Component is rendered', () => {
    const comp = shallow(
        <Animation {...props} />,
    );

    expect(comp.length).toEqual(1);
});
