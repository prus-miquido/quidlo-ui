import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Toast from './Toast';

import style from './Toaster.style.scss';

const Toaster = ({toasts}) => {
    const toastsElement = toasts.map((t, i) => ((
        <CSSTransition
            key={t.id}
            classNames="anim"
            timeout={1000}
            mountOnEnter
            unmountOnExit
        >
            <Toast key={t.id} toast={t} position={50 * i} />
        </CSSTransition>
    )));

    return (
        <div className={cx(style.toaster, toasts.length && style.visible)}>
            <TransitionGroup>
                {toastsElement}
            </TransitionGroup>
        </div>
    );
};

Toaster.propTypes = {
    /** Array of toasts */
    toasts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        text: PropTypes.string,
        color: PropTypes.oneOf(['black', 'red']),
        action: PropTypes.func,
        actionName: PropTypes.string,
        onClose: PropTypes.func
    })).isRequired,
};

export default Toaster;