import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import equal from 'deep-equal';
import cx from 'classnames';

import Select from './Select';
import SelectView from './SelectView';

import messages from './SelectContainer.i18n';
import style from './Select.style.scss';

/* Select Component */
class SelectContainer extends Component {
    static handleClick(e) {
        e.nativeEvent.stopImmediatePropagation();
    }

    constructor(props) {
        super(props);

        this.state = {
            touched: false,
            focused: false,
            optionsContHeight: 0
        };

        this.selectHandler = this.selectHandler.bind(this);
        this.selectAllHandler = this.selectAllHandler.bind(this);
        this.toggleOptions = this.toggleOptions.bind(this);
        this.getOptionsContainerRef = this.getOptionsContainerRef.bind(this);
    }

    componentDidMount() {
        const error = this.validate(this.props.value);

        if (error) {
            this.props.onChange({
                value: this.props.value,
                error
            });
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errorHidden) {
            this.setState({
                focused: false,
                touched: false
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (
            !equal(
                prevProps.options.map(o => o.value),
                this.props.options.map(o => o.value)
            ) || prevProps.value !== this.props.value
        ) {
            const error = this.validate(this.props.value);
            if (error) {
                this.props.onChange({
                    value: this.props.value,
                    error
                });
            }
        }
    }

    getOptionsContainerRef(el) {
        this.optionsContainer = el;
    }

    selectAllHandler() {
        const
            value = this.props.options.map(o => o.value),
            error = this.validate(value);

        if (error) {
            this.props.onChange({
                value,
                error
            });
        }
    }

    selectHandler(val) {
        let newVal;
        if (this.props.multiselect) {
            if (this.props.value.find(v => v === val)) {
                newVal = this.props.value.filter(v => v !== val);
            } else {
                newVal = [...this.props.value, val];
            }
        } else {
            newVal = val;
            this.toggleOptions();
        }

        const error = this.validate(newVal);

        if (error || newVal !== this.props.value) {
            this.props.onChange({
                value: newVal,
                error
            });
        }
    }

    toggleOptions() {
        if (this.state.focused) {
            document.removeEventListener('click', this.toggleOptions);
            if (this.props.onBlur) {
                this.props.onBlur({
                    value: this.props.value,
                    error: this.props.error
                });
            }
        } else {
            document.addEventListener('click', this.toggleOptions);
        }

        this.setState({
            touched: true,
            focused: !this.state.focused
        });

        setTimeout(() => {
            if (this.state.focused && this.selectField) {
                const
                    { bottom } = this.selectField.getBoundingClientRect(),
                    optionsContHeight = document.body.clientHeight - (bottom + window.scrollY) < 300 ? document.body.clientHeight - (bottom + window.scrollY) - 10 : 300;

                this.setState({
                    optionsContHeight
                });
            }
        }, 100);
    }

    validate(val) {
        let error;
        const {min, max, isRequired} = this.props.validators;

        if (isRequired && typeof val !== 'boolean' && (!val || !val.length)) {
            error = this.props.intl.formatMessage(messages.isRequired);
        }

        if (min && val.length < min.value) {
            error = this.props.intl.formatMessage(messages.min, {
                min: min.value
            });
        }

        if (max && val.length > max.value) {
            error = this.props.intl.formatMessage(messages.max, {
                max: max.value
            });
        }
        return error;
    }

    render() {
        const
            props = {
                options: this.props.options.map(o => ({
                    ...o,
                    selected: this.props.multiselect ? !!this.props.value.find(v => v === o.value) : this.props.value === o.value
                })),
                active: this.state.focused,
                onSelect: this.selectHandler,
                onSelectAll: ((this.props.allselect && this.props.multiselect) ? this.selectAllHandler : undefined),
                multiselect: this.props.multiselect,
                getOptionsContainerRef: this.getOptionsContainerRef,
                optionsContHeight: this.state.optionsContHeight,
                intl: this.props.intl,
            },
            propsSelectedView = {
                label: this.props.label,
                error: this.props.error,
                values: this.props.multiselect ? this.props.options.filter(o => this.props.value.includes(o.value)) : this.props.options.find(o => this.props.value === o.value),
                isAll: this.props.multiselect ? this.props.options.length === this.props.value.length : false,
                isMulti: this.props.multiselect,
                isNarrow: this.props.isNarrow,
                isTouched: this.state.touched,
                errorVisibility: this.state.touched && !this.props.errorHidden,
                intl: this.props.intl,
            };

        return (
            <div className={style.select}>
                <div className={cx(style.selectField, this.state.focused && style.active)} onClick={this.toggleOptions} onKeyPress={this.toggleOptions} ref={ref => { this.selectField = ref; }}>
                    <SelectView {...propsSelectedView} />
                </div>
                <div className={style.optionsList} onClick={SelectContainer.handleClick} onKeyPress={SelectContainer.handleClick}>
                    <Select {...props} />
                </div>
            </div>
        );
    }
}

SelectContainer.propTypes = {
    /** Unique field key */
    fieldId: PropTypes.string,
    /** Text for field label */
    label: PropTypes.string,
    /** Autocomplete value */
    value: PropTypes.any,
    /** Error value */
    error: PropTypes.node,
    /** Function triggered on select value */
    onChange: PropTypes.func,
    /** Options for field */
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.any.isRequired,
        labelText: PropTypes.any,
        value: PropTypes.any.isRequired
    })),
    /** Can multiple options be selected */
    multiselect: PropTypes.bool,
    /** Should 'All' option be included */
    allselect: PropTypes.bool,
    /** Input validation rules. You can use: min, max and is Required. For example {max: 26, min: 5, isRequired: true} */
    validators: PropTypes.object,
    /** Should store and restore value */
    persistent: PropTypes.bool,
    /** Is field narrow (lower height of field) */
    isNarrow: PropTypes.bool,
    /** Should force hide error */
    errorHidden: PropTypes.bool,
    onBlur: PropTypes.func,
    intl: PropTypes.object.isRequired
};

SelectContainer.defaultProps = {
    fieldId: 'autocomplete',
    label: '',
    value: undefined,
    error: undefined,
    options: [],
    multiselect: false,
    allselect: false,
    validators: {},
    isNarrow: false,
    errorHidden: false,
    onChange: undefined,
    onBlur: undefined,
    persistent: false
};

export default injectIntl(SelectContainer);
