import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import SVGRemove from './svg/remove.svg';

import style from './Toast.style.scss';

const Toaster = ({
    text,
    color,
    action,
    actionName,
    onClose,
    position
}) => (
    <div className={cx(style.toast, style[`color-${color}`])} style={{transform: `translateY(-${position}px)`}}>
        <div className={style.content}>
            <div>
                <span>
                    {text}
                </span>
                { action &&
                    <a className={style.action} onClick={() => { action(); onClose(); }} onKeyPress={undefined}>{actionName}</a>
                }
                <a className={style.remove} onClick={onClose} onKeyPress={undefined}>
                    <SVGRemove />
                </a>
            </div>
        </div>
        <div className={style.start} />
        <div className={style.end} />
    </div>
);

Toaster.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.oneOf(['black', 'red']),
    action: PropTypes.func,
    actionName: PropTypes.string,
    onClose: PropTypes.func,
    position: PropTypes.number
};

Toaster.defaultProps = {
    color: 'black',
    action: undefined,
    actionName: undefined,
    onClose: undefined,
    position: 0
};

export default Toaster;