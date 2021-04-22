import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import TickIcon from './svg/tick.svg';

import style from './Checkbox.style.scss';

const Checkbox = ({
    onSelect,
    label,
    value,
    fieldId,
    dropdownList
}) => (
    <div className={cx(style.checkbox, value && style.checked, dropdownList === 'all' && style.dropdownAll, !dropdownList && style.notDropdown, dropdownList === 'options' && style.dropdown)}>
        <div className={style.check} onClick={onSelect} onKeyPress={undefined}>
            <TickIcon />
        </div>
        <input
            onChange={onSelect}
            checked={value}
            id={fieldId}
            name={fieldId}
            type="checkbox"
            value={value}
        />
        <label htmlFor={fieldId} className={style.labelElement}>
            {label}
        </label>
    </div>
);

Checkbox.propTypes = {
    /** Checkbox label */
    label: PropTypes.node.isRequired,
    /** Is checkbox checked */
    value: PropTypes.bool,
    /** Checkbox handler function */
    onSelect: PropTypes.func.isRequired,
    /** Checkbox element id */
    fieldId: PropTypes.string.isRequired,
    /** Is Checkbox is a part of dropdown list */
    dropdownList: PropTypes.string,
};

Checkbox.defaultProps = {
    value: false,
    dropdownList: ''
};

export default Checkbox;