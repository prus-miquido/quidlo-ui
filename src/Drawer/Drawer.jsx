import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import style from './Drawer.style.scss';

const Drawer = ({
    name,
    children,
    active,
    visible,
    toggleActive
}) => (
    <div className={cx(style.drawer, !visible && style.invisible, (active && visible) && style.active)}>
        <div className={style.content}>
            <div className={style.container}>
                {children}
            </div>
        </div>
        <div className={style.buttonContainer}>
            <a className={style.button} onClick={toggleActive} onKeyPress={toggleActive}>
                <span>
                    {name}
                </span>
                <svg width="10" height="10" viewBox="0 0 10 10">
                    <path d="M5 8.57L.002 1.43h9.996z" />
                </svg>
            </a>
        </div>
    </div>
);

Drawer.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    active: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    toggleActive: PropTypes.func.isRequired,
};

Drawer.defaultProps = {};

export default Drawer;