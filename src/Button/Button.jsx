import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import {Icon} from '..';

import style from './Button.style.scss';

const Button = ({
    text,
    type,
    shadow,
    color,
    size,
    disabled,
    href,
    onClick,
    icon,
    iconSize,
    customIconColor
}) => {
    let iconColor = 'none';

    if (disabled && color !== 'blue') {
        iconColor = 'ecru';
    } else if (customIconColor) {
        iconColor = customIconColor;
    }

    if (href) {
        return (
            <Link className={cx(style.button, style[`type-${type}`], style[`color-${color}`], style[`size-${size}`], (disabled && style.disabled), (shadow && style.shadow))} to={href}>
                {icon &&
                    <Icon icon={icon} size={iconSize} color={iconColor} />
                }
                <span>
                    {text}
                </span>
            </Link>
        );
    }
    return (
        <button className={cx(style.button, style[`type-${type}`], style[`color-${color}`], style[`size-${size}`], (disabled && style.disabled), (shadow && style.shadow), ((!text && icon) && style.iconOnly))} onClick={onClick} onKeyPress={undefined} >
            {icon &&
                <Icon icon={icon} size={iconSize} color={iconColor} />
            }
            <span>
                {text}
            </span>
        </button>
    );
};

Button.propTypes = {
    /** Type of button. Make sure you use */
    type: PropTypes.oneOf(['filled', 'bordered', 'plain']),
    /** Is button shadowed */
    shadow: PropTypes.bool,
    /** Background color of button. */
    color: PropTypes.string,
    /** Button size */
    size: PropTypes.oneOf(['small','normal', 'large']),
    /** Indicates whether button is disabled. */
    disabled: PropTypes.bool,
    /** Button content. */
    text: PropTypes.string,
    /** Link. */
    href: PropTypes.string,
    /** OnClick action. */
    onClick: PropTypes.func,
    /** Button icon */
    icon: PropTypes.string,
    /** Icon size*/
    iconSize: PropTypes.oneOf(['small', 'medium', 'semi-large', 'large']),
    /** Icon color */
    customIconColor: PropTypes.oneOf(['black', 'blue', 'white', 'grey', 'grey-dark', 'ecru', 'transparent'])
};

Button.defaultProps = {
    type: 'filled',
    shadow: false,
    color: 'blue',
    size: 'normal',
    disabled: false,
    text: '',
    href: undefined,
    onClick: undefined,
    icon: undefined,
    iconSize: 'medium',
    customIconColor: undefined
};

export default Button;