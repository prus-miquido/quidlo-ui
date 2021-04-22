import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {Icon} from '..';

import style from './Header.style.scss';

const Header = ({
    icon,
    title,
    size,
    left,
    right,
    inline
}) => {
    let iconSize = size;

    if (iconSize === 'normal' || iconSize === 'large') {
        iconSize = 'medium';
    }

    return (
        <div className={cx(style.header, style[`size-${size}`], inline && style.inline)}>
            <div className={style.left}>
                {icon &&
                <div className={style.icon}>
                    <Icon icon={icon} color="grey-dark" size={iconSize} />
                </div>
                }
                <span className={style.title}>
                    {title}
                </span>
                {left}
            </div>
            <div className={style.right}>
                {right}
            </div>
        </div>
    );
};

Header.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    left: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    right: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    inline: PropTypes.bool
};

Header.defaultProps = {
    icon: '',
    title: undefined,
    size: 'normal',
    right: undefined,
    left: undefined,
    inline: false
};

export default Header;