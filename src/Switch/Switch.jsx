import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import style from './Switch.style.scss';

const Switch = ({
    options,
    value,
    focused,
    onClick,
    onBlur,
    onFocus,
    fieldId,
    type,
    disabled
}) => (
    <div className={cx(style.switch, focused && style.focused, style[`type-${type}`], type === 'small' && !value && style.off, disabled && style.disabled)} onClick={onClick} onKeyPress={undefined} onBlur={onBlur} onFocus={onFocus} role="button" tabIndex="0" >
        <label htmlFor={fieldId} className={cx((value === options[0].value) ? style.left : style.right)} >
            {
                options.map(o => (
                    <div key={o.value} className={cx(style.option, o.value === value && style.active)}>
                        <span>
                            {type === 'large' && o.label}
                        </span>
                    </div>
                ))
            }
        </label>
    </div>
);


Switch.propTypes = {
    value: PropTypes.any.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.any
    })).isRequired,
    focused: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    fieldId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
};

Switch.defaultProps = {
    disabled: false,
};

export default Switch;