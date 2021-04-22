import React from 'react';
import {shallow} from 'enzyme';

import Toaster from './Toaster';

const props = {
    toasts: [{
        id: 1,
        text: 'Text',
        action: () => {},
        actionName: 'Text',
        onClose: () => {}
    }]
};

test('Component is rendered', () => {
    const comp = shallow(
        <Toaster {...props} />,
    );

    expect(comp.length).toEqual(1);
});