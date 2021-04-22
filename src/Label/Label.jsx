import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Icon } from '..';

import style from './Label.style.scss';

/** Label component for inputs  */
const Label = ({
    icon,
    text,
    size,
    disabled
}) => (
    <div className={cx(style.label, style[`size-${size}`], disabled && style.disabled)}>
        { icon &&
            <Icon icon={icon} size={size} color={((size === 'medium' && !disabled) ? 'grey-dark' : 'grey')} />
        }
        <span>{text}</span>
    </div>
);

Label.propTypes = {
    /** Label icon */
    icon: PropTypes.string.isRequired,
    /** Label text */
    text: PropTypes.string.isRequired,
    /** Label size */
    size: PropTypes.oneOf(['medium', 'small']),
    disabled: PropTypes.bool
};

Label.defaultProps = {
    size: 'medium',
    disabled: false
};

export default Label;
