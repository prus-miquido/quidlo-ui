import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Icon } from '..';

import style from './Input.style.scss';

/* Input Component */
const Input = ({
    name,
    label,
    placeholder,
    icon,
    type,
    size,
    value,
    error,
    errorVisibility,
    passwordVisibility,
    disabled,
    onChange,
    onBlur,
    onKeyDown,
    onFocus,
    showPassword
}) => (
    <div className={cx(style.input, (error && errorVisibility) && style.error, disabled && style.disabled, style[`size-${size}`])}>
        <input
            type={((type === 'time' || passwordVisibility) ? 'text' : type)}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            className={cx(
                value && style.filled,
                icon && style.iconInput
            )}
        />
        <span className={style.bar} />
        {icon && (
            <div className={style.icon}>
                <Icon icon={icon} size="small" color="grey" />
            </div>
        )}
        {label ? <label htmlFor={name}>{label}</label> : null}
        {placeholder ? <span className={style.hint}>{placeholder}</span> : null}
        {errorVisibility && <span className={style.errormessage}>{error}</span>}
        {type === 'password' && (
            <a className={style.showPassword} onClick={showPassword}>
                <Icon icon="eye" size="small" color="grey" />
            </a>
        )}
    </div>
);


Input.propTypes = {
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    name: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.node,
    icon: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    disabled: PropTypes.bool,
    errorVisibility: PropTypes.bool,
    passwordVisibility: PropTypes.bool,
    showPassword: PropTypes.func.isRequired,
};

Input.defaultProps = {
    type: 'text',
    name: 'textInput',
    label: '',
    placeholder: '',
    value: '',
    error: '',
    size: 'medium',
    disabled: false,
    errorVisibility: false,
    passwordVisibility: false,
    icon: ''
};

export default Input;
