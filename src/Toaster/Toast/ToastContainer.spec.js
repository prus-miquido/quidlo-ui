import React from 'react';
import {shallow} from 'enzyme';

import ToastContainer from './ToastContainer';

const props = {
    toast: {
        text: 'Text',
        action: () => {},
        actionName: 'Text',
        close: () => {}
    },
    position: 0
};

jest.useFakeTimers();

test('Component is rendered', () => {
    const comp = shallow(
        <ToastContainer {...props} />,
    );

    expect(comp.length).toEqual(1);
});

test('CloseHandler is triggered after display time', () => {
    const
        closeHandler = jest.fn(),
        comp = shallow(
            <ToastContainer {...props} />
        );

    comp.instance().closeHandler = closeHandler;

    jest.runAllTimers();

    expect(closeHandler).toHaveBeenCalled();

});