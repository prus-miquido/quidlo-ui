import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Tag } from '..';

import style from './InputCollection.style.scss';

/* Input Component */
const InputCollection = ({
    name,
    label,
    value,
    error,
    size,
    inputValue,
    errorVisibility,
    add,
    remove,
    onFocus,
    onBlur,
    onInputChange,
    onInputKeyPress,
}) => {
    const tags = value.map(v => {
        const props = {
            size: 'large',
            text: v,
            onRemove: () => remove(v)
        };
        return (
            <div className={style.tagWrapper} key={v} >
                <Tag {...props} />
            </div>
        );
    });
    return (
        <div className={cx(style.input, (value.length || inputValue) && style.filled, errorVisibility && style.error, style[`size-${size}`])}>
            <div className={style.content}>
                <div className={style.flex}>
                    {tags}
                    <input
                        type="text"
                        name={name}
                        value={inputValue || ''}
                        onChange={e => { onInputChange(e.target.value); }}
                        onKeyPress={onInputKeyPress}
                        onBlur={() => { add(); onBlur(); }}
                        onFocus={onFocus}
                    />
                </div>
                <span className={style.bar} />
                {label ? <label htmlFor={name}>{label}</label> : null}
                <span className={style.errormessage}>{error}</span>
            </div>
        </div>
    );
};


InputCollection.propTypes = {
    /** Function to trigger when add item to collection action is invoked */
    add: PropTypes.func.isRequired,
    /** Function to trigger when remove item from collection action is invoked */
    remove: PropTypes.func.isRequired,
    /** Function to trigger when input is touched */
    onBlur: PropTypes.func.isRequired,
    /** Function to trigger when input is touched */
    onFocus: PropTypes.func.isRequired,
    /** Function to trigger when input is changing */
    onInputChange: PropTypes.func.isRequired,
    /** Function to trigger when input is touched */
    onInputKeyPress: PropTypes.func.isRequired,
    /** Input field name */
    name: PropTypes.string,
    /** Input label */
    label: PropTypes.string,
    /** Value */
    value: PropTypes.array,
    /** New item input value */
    inputValue: PropTypes.string,
    /** Error text */
    error: PropTypes.node,
    /** Is element touched */
    errorVisibility: PropTypes.bool,
    /** Size of input */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
};

InputCollection.defaultProps = {
    name: 'textInput',
    label: '',
    value: '',
    inputValue: '',
    error: '',
    errorVisibility: false,
    size: 'medium'
};

export default InputCollection;
