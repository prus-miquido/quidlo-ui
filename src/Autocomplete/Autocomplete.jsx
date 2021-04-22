import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Tooltip, Button } from '..';

import messages from './Autocomplete.i18n';
import style from './Autocomplete.style.scss';

import TickIcon from './svg/tick.svg';

const
    DEFAULT_OPTIONLIST_SIZE = 20,
    Autocomplete = ({
        fieldId,
        label,
        placeholder,
        error,
        inputValue,
        options,
        optionsLength,
        selectedOptions,
        activeOption,
        errorVisibility,
        noOptionsText,
        onInput,
        onSelect,
        onSelectAll,
        onFocus,
        getOptionRef,
        getOptionsContainerRef,
        getDropdownMenuRef,
        disabled,
        focused,
        focusedInput,
        isMulti,
        allSelected,
        isLoading,
        showAll,
        clickShowAll,
        intl
    }) => {
        let text;

        if (isMulti) {
            if (allSelected) {
                if (selectedOptions.length === 0) {
                    text = '';
                } else {
                    text = intl.formatMessage(messages.all);
                }
            } else if (selectedOptions.length === 1) {
                text = selectedOptions[0].labelText;
            } else if (selectedOptions.length > 1) {
                text = intl.formatMessage(messages.selectedNumber, {number: selectedOptions.length});
            } else if (selectedOptions.length === 0) {
                text = '';
            }
        } else if (!isMulti) {
            if (selectedOptions[0]) {
                text = selectedOptions[0].labelText;
            } else {
                text = '';
            }
        }

        const optionsToRender = (options.length > DEFAULT_OPTIONLIST_SIZE && showAll ? options : options.slice(0, DEFAULT_OPTIONLIST_SIZE));

        return (
            <div className={cx(style.autocomplete, disabled && style.disabled)} ref={getDropdownMenuRef}>
                <div
                    className={cx(style.input, !!(selectedOptions.length || inputValue) && style.filled, (error && errorVisibility) && style.error, focusedInput && style.inputActive)}
                >
                    <input type="hidden" value="something"/>
                    <input
                        onFocus={onFocus}
                        type="text"
                        name={`${new Date().getTime()}${Math.random()}`}
                        value={inputValue}
                        onChange={e => { onInput(e.target.value); }}
                        autoComplete="new-password"
                    />
                    <div className={style.text}>
                        <Tooltip text={selectedOptions.length > 1 ? selectedOptions.map(opt => opt.labelText).join(', ') : ''} >
                            <div>{!isLoading && text}</div>
                        </Tooltip>
                    </div>
                    <span className={style.bar} />
                    {label ? <label htmlFor={fieldId}>{label}</label> : null}
                    {placeholder ? <span className={style.hint}>{placeholder}</span> : null}
                    {errorVisibility && <span className={style.errormessage}>{error}</span>}
                </div>
                <TransitionGroup>
                    <CSSTransition
                        key={focused}
                        classNames="anim"
                        timeout={500}
                        mountOnEnter
                        unmountOnExit
                    >
                        {focused ? (
                            <div className={style.optionsContainer} ref={getOptionsContainerRef} style={optionsLength ? {maxHeight: `${56 * optionsLength}px`} : {}}>
                                {options.length > 0 && onSelectAll && !inputValue &&
                                    <div
                                        className={cx(
                                            style.checkbox,
                                            allSelected && style.checked,
                                            style.dropdown,
                                            style.selectAll,
                                            activeOption === 'all' && style.active
                                        )}
                                        id="selectAll"
                                        onClick={() => { onSelectAll(); }}
                                        onKeyPress={() => {}}
                                        ref={ref => { if (activeOption === 'all') getOptionRef(ref); }}
                                    >
                                        <div className={style.check}>
                                            <TickIcon />
                                        </div>
                                        <label htmlFor="selectAll" className={style.labelElement}>
                                            All
                                        </label>
                                    </div>
                                }
                                {options.length > 0 && (
                                    <div>
                                        {optionsToRender.map((opt, index) => (
                                            <div
                                                key={typeof opt.value !== 'object' ? opt.value : JSON.stringify(opt.value)}
                                                className={cx(
                                                    style.checkbox,
                                                    opt.selected && style.checked,
                                                    style.dropdown,
                                                    index === activeOption && style.active
                                                )}
                                                id={opt.value}
                                                onClick={() => { onSelect(opt.value); }}
                                                onKeyPress={() => {}}
                                                ref={ref => { if (index === activeOption) getOptionRef(ref); }}
                                            >
                                                <div className={style.check}>
                                                    <TickIcon />
                                                </div>
                                                <label htmlFor={opt.value} className={style.labelElement}>
                                                    {opt.label}
                                                </label>
                                            </div>
                                        ))}
                                        {(!showAll && options.length > DEFAULT_OPTIONLIST_SIZE) && (
                                            <div className={style.showAll}>
                                                <Button type="plain" text={intl.formatMessage(messages.showAll, {length: options.length})} onClick={clickShowAll} />
                                            </div>
                                        )}
                                    </div>
                                )}
                                {options.length === 0 && (
                                    <div className={cx(style.dropdown, style.noOptionsContainer)}>
                                        <span className={style.noOptions}>
                                            {noOptionsText}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className={style.notActive} />
                        )}
                    </CSSTransition>
                </TransitionGroup>
            </div>
        );
    };

Autocomplete.propTypes = {
    fieldId: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    inputValue: PropTypes.string,
    options: PropTypes.array.isRequired,
    optionsLength: PropTypes.number,
    selectedOptions: PropTypes.array,
    activeOption: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onInput: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onSelectAll: PropTypes.func,
    onFocus: PropTypes.func.isRequired,
    getOptionRef: PropTypes.func.isRequired,
    getOptionsContainerRef: PropTypes.func.isRequired,
    getDropdownMenuRef: PropTypes.func.isRequired,
    errorVisibility: PropTypes.bool,
    noOptionsText: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    focused: PropTypes.bool,
    focusedInput: PropTypes.bool,
    isMulti: PropTypes.bool,
    allSelected: PropTypes.bool,
    isLoading: PropTypes.bool,
    showAll: PropTypes.bool.isRequired,
    clickShowAll: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired
};

Autocomplete.defaultProps = {
    fieldId: 'new-password',
    label: '',
    placeholder: '',
    error: '',
    inputValue: '',
    selectedOptions: [],
    activeOption: undefined,
    errorVisibility: false,
    onSelectAll: undefined,
    disabled: false,
    focused: false,
    focusedInput: false,
    isMulti: false,
    allSelected: false,
    isLoading: false,
    optionsLength: undefined
};

export default Autocomplete;