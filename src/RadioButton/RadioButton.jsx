import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import style from './RadioButton.style.scss';

const RadioButton = ({
    onSelect,
    label,
    value,
    fieldId,
    dropdownList
}) => (
    <div className={cx(style.radioButton, dropdownList && style.dropdown)}>
        <div className={cx(value && style.checked, style.radioLabel)} />
        <input
            onChange={onSelect}
            checked={value}
            id={fieldId}
            name={fieldId}
            type="radio"
            value={value}
        />
        <label htmlFor={fieldId}>
            {label}
        </label>
    </div>
);

RadioButton.propTypes = {
    /** Radiobutton label */
    label: PropTypes.string.isRequired,
    /** Is radiobutton checked */
    value: PropTypes.bool,
    /** Radiobutton handler function */
    onSelect: PropTypes.func.isRequired,
    /** Radiobutton element id */
    fieldId: PropTypes.string.isRequired,
    /** Is radiobutton is a part of dropdown list */
    dropdownList: PropTypes.bool,
};

RadioButton.defaultProps = {
    value: false,
    dropdownList: false
};

export default RadioButton;