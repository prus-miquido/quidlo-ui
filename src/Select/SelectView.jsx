import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import SelectIcon from './svg/selectArrow.svg';

import messages from './SelectView.i18n';
import style from './Select.style.scss';

const SelectView = ({
    label,
    values,
    error,
    isNarrow,
    isAll,
    isMulti,
    isTouched,
    errorVisibility,
    intl
}) => {
    let text;

    if (isMulti) {
        if (isAll) {
            if (values.length === 0) {
                text = '';
            } else {
                text = intl.formatMessage(messages.all);
            }
        } else if (values.length === 1) {
            text = values[0].label;
        } else if (values.length > 1) {
            text = intl.formatMessage(messages.selectedNumber, {number: values.length});
        } else if (isTouched && values.length === 0) {
            text = intl.formatMessage(messages.none);
        } else if (!isTouched && values.length === 0) {
            text = '';
        }
    } else {
        text = values && values.label ? values.label : '';
    }

    return (
        <div className={cx(style.selectedView, (error && errorVisibility) && style.error, isNarrow && style.narrow)}>
            {label &&
                <div className={cx(style.label, text && style.hide)}>
                    {label}
                </div>
            }
            <div className={style.value}>
                <div className={style.content}>
                    {text}
                </div>
            </div>
            <SelectIcon />
            {errorVisibility &&
                <div className={style.errormessage}>
                    {error}
                </div>
            }
        </div>
    );
};

SelectView.propTypes = {
    /** Label of field */
    label: PropTypes.string,
    /** Error node */
    error: PropTypes.string,
    /** Selected values */
    values: PropTypes.any,
    /** Label text for option "select all" */
    isAll: PropTypes.bool,
    /** Is multiselect dropdown */
    isMulti: PropTypes.bool,
    /** Is field narrow  */
    isNarrow: PropTypes.bool,
    /** Is select touched */
    isTouched: PropTypes.bool,
    /** Is error visible */
    errorVisibility: PropTypes.bool,
    intl: PropTypes.object.isRequired
};

SelectView.defaultProps = {
    label: '',
    error: '',
    values: undefined,
    isAll: false,
    isMulti: false,
    isNarrow: false,
    isTouched: false,
    errorVisibility: false
};

export default SelectView;