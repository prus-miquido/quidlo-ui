import React from 'react';
import {shallow} from 'enzyme';

import Toast from './Toast';

const props = {
    text: 'Text',
    action: () => {},
    actionName: 'Text',
    onClose: () => {},
    position: 0
};

test('Component is rendered', () => {
    const comp = shallow(
        <Toast {...props} />,
    );

    expect(comp.length).toEqual(1);
});

test('Component is rendered', () => {
    const
        action = jest.fn(),
        onClose = jest.fn(),
        newProps = {
            ...props,
            action,
            onClose,
        },
        comp = shallow(
            <Toast {...newProps} />,
        );

    comp.find('.action').simulate('click');

    expect(action).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
});