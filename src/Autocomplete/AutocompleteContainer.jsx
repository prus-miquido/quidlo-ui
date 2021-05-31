import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import equal from 'deep-equal';

import db from '../utils/db';

import Autocomplete from './Autocomplete';

import messages from '../Autocomplete/AutocompleteContainer.i18n';

const sortOpts = opts => opts.sort((a, b) => {
    if (a.selected !== b.selected) {
        return b.selected - a.selected;
    }

    return a.labelText.localeCompare(b.labelText);
});

/* Autocomplete Component */
class AutocompleteContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            input: {
                value: '',
                focused: false,
            },
            options: [],
            activeOption: undefined,
            focused: false,
            touched: false,
            fetching: false,
            showAll: false,
        };

        this.focusHandler = this.focusHandler.bind(this);
        this.blurHandler = this.blurHandler.bind(this);
        this.keydownHandler = this.keydownHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.selectHandler = this.selectHandler.bind(this);
        this.selectAllHandler = this.selectAllHandler.bind(this);
        this.clickShowAll = this.clickShowAll.bind(this);

        this.getDropdownMenuRef = this.getDropdownMenuRef.bind(this);
        this.getOptionsContainerRef = this.getOptionsContainerRef.bind(this);
        this.getOptionRef = this.getOptionRef.bind(this);
    }


    componentDidMount() {
        const
            {
                fetch,
                persistent,
                multiselect,
                fieldId
            } = this.props,
            savedValue = db.LSget(fieldId),
            value = (persistent && savedValue) ? savedValue : this.props.value,
            error = this.validate(value);

        if (fetch) {
            fetch().then(options => {
                const newValue = multiselect ? value.filter(v => options.find(o => o.value === v)) : options.filter(o => o.value === value).map(o => o.value)[0];

                this.setState({
                    options: sortOpts(options.map(o => ({
                        ...o,
                        selected: multiselect ? !!value.find(v => v === o.value) : value === o.value
                    })))
                });

                this.changeHandler({
                    value: newValue,
                    error
                });
            });
        } else {
            this.setState({
                options: this.props.options
            });

            const newValue = multiselect ? value.filter(v => this.props.options.find(o => o.value === v)) : this.props.options.filter(o => o.value === value).map(o => o.value)[0];

            this.changeHandler({
                value: newValue,
                error
            });
        }
    }

    componentWillReceiveProps(newProps) {
        if (
            !equal(
                newProps.options.map(o => o.value),
                this.props.options.map(o => o.value)
            )
        ) {
            const
                { input } = this.state,
                { multiselect } = this.props,
                options = !input.value ? newProps.options : newProps.options.filter(opt => opt.labelText.toLowerCase().includes(input.value.toLowerCase()));

            this.setState(() => ({
                options: sortOpts(options.map(o => ({
                    ...o,
                    selected: multiselect ? !!newProps.value.find(v => v === o.value) : newProps.value === o.value
                })))
            }));

            if (multiselect) {
                const
                    newValue = newProps.options.filter(o => newProps.value.indexOf(o.value) > -1).map(o => o.value),
                    error = this.validate(newValue);

                this.changeHandler({
                    value: newValue,
                    error,
                });
            } else {
                const
                    newValue = newProps.options.filter(o => newProps.value === o.value).map(o => o.value)[0],
                    error = this.validate(newValue);

                this.changeHandler({
                    value: newValue,
                    error,
                });
            }
        } else if (!equal(newProps.value, this.props.value)) {
            this.setState(() => ({
                options: sortOpts(this.state.options.map(o => ({
                    ...o,
                    selected: this.props.multiselect ? !!newProps.value.find(v => v === o.value) : newProps.value === o.value
                })))
            }));

            const error = this.validate(newProps.value);

            this.changeHandler({
                value: newProps.value,
                error,
            });
        }

        this.setState({
            touched: newProps.errorHidden !== undefined ? !newProps.errorHidden : this.state.touched,
        });
    }

    getDropdownMenuRef(el) {
        this.dropdownMenu = el;
    }

    getOptionsContainerRef(el) {
        this.optionsContainer = el;
    }

    getOptionRef(el) {
        this.focusedOpt = el;
    }

    focusHandler() {
        if (this.props.onFocus) {
            this.props.onFocus();
        }

        this.inputHandler(this.state.input.value);
        this.setState({
            input: {
                ...this.state.input,
                focused: true,
            },
            activeOption: this.props.allselect ? 'all' : 0,
            focused: true,
            touched: true,
        }, () => {
            document.addEventListener('click', this.clickHandler);
            document.addEventListener('keydown', this.keydownHandler);
            if (this.props.fetch) {
                this.props.fetch().then(options => {
                    this.setState({
                        options: sortOpts(options.map(o => ({
                            ...o,
                            selected: this.props.multiselect ? !!this.props.value.find(v => v === o.value) : this.props.value === o.value
                        })))
                    });
                });
            }
        });
    }

    blurHandler() {
        const { value, error } = this.state;
        if (this.props.onBlur) {
            this.props.onBlur({
                value,
                error
            });
        }

        this.setState(state => ({
            input: {
                value: '',
                focused: false,
            },
            activeOption: undefined,
            options: sortOpts(state.options),
            focused: false
        }), () => {
            document.removeEventListener('click', this.clickHandler);
            document.removeEventListener('keydown', this.keydownHandler);
        });
    }

    inputHandler(value) {
        if (this.props.fetch) {
            this.setState(() => ({
                fetching: true,
                input: {
                    ...this.state.input,
                    value,
                }
            }), () => {
                this.props.fetch(value).then(options => {
                    this.setState({
                        activeOption: 0,
                        fetching: false,
                        options: sortOpts(options.map(o => ({
                            ...o,
                            selected: this.props.multiselect ? !!this.props.value.find(v => v === o.value) : this.props.value === o.value
                        })))
                    });
                });
            });
        } else {
            const options = this.props.options.filter(opt => opt.labelText.toLowerCase().includes(value.toLowerCase())).map(o => ({
                ...o,
                selected: this.props.multiselect ? !!this.props.value.find(v => v === o.value) : this.props.value === o.value
            }));

            this.setState({
                input: {
                    ...this.state.input,
                    value,
                },
                options: sortOpts(options),
                activeOption: 0
            });
        }
    }

    selectHandler(val) {
        const { multiselect, value } = this.props;
        let newVal = [];

        if (multiselect) {
            if (value.find(v => v === val)) {
                newVal = value.filter(v => v !== val);
            } else {
                newVal = [...value, val];
            }

            this.setState({
                input: {
                    value: '',
                    focused: false,
                }
            }, () => {
                this.inputHandler(this.state.input.value);
            });
        } else {
            newVal = val;
        }

        // eslint-disable-next-line
        const error = this.validate(newVal);

        this.setState({
            activeOption: this.state.options.map(opt => opt.value).indexOf(val)
        });

        this.changeHandler({
            value: newVal,
            error,
        });

        if (!multiselect) {
            this.blurHandler();
        }
    }

    selectAllHandler() {
        const
            isAllSelected = this.props.value.length === this.props.options.length,
            value = isAllSelected ? [] : this.props.options.map(opt => opt.value),
            error = this.validate(value);

        this.changeHandler({
            value,
            error,
        });

        this.setState({
            activeOption: 'all'
        });
    }

    keydownHandler(event) {
        if (event.keyCode === 40) {
            if (this.state.activeOption === 'all') {
                this.setState({
                    activeOption: 0
                });
            } else if (this.state.options.length > this.state.activeOption + 1) {
                this.setState({
                    activeOption: this.state.activeOption + 1
                });
            }
        }

        if (event.keyCode === 38 && this.state.activeOption >= 0) {
            if (this.state.activeOption === 0) {
                this.setState({
                    activeOption: 'all'
                });
            } else if (this.state.activeOption > 0) {
                this.setState({
                    activeOption: this.state.activeOption - 1
                });
            }
        }

        if (event.keyCode === 40 || event.keyCode === 38) {
            if (this.optionsContainer && this.focusedOpt && this.state.focused) {
                const
                    scrollMenuTop = this.optionsContainer.scrollTop,
                    scrollBottom = scrollMenuTop + this.optionsContainer.offsetHeight,
                    optionTop = this.focusedOpt.offsetTop,
                    optionBottom = optionTop + this.focusedOpt.offsetHeight;

                if (scrollMenuTop > optionTop || scrollBottom < optionBottom) {
                    this.optionsContainer.scrollTop = event.keyCode === 38 ? this.focusedOpt.offsetTop : this.optionsContainer.scrollTop + this.focusedOpt.offsetHeight;
                }
            }
        }

        if (event.keyCode === 13) {
            if (this.state.options.length > 0) {
                if (this.state.activeOption === 'all') {
                    this.selectAllHandler();
                } else {
                    this.selectHandler(this.state.options[this.state.activeOption].value);
                }
            } else if (this.props.onAdd) {
                this.props.onAdd(this.state.input.value);
                this.setState({
                    input: {
                        ...this.state.input,
                        value: ''
                    }
                });
            }
        }

        if (this.state.focused && event.type === 'keydown' && event.keyCode === 9) {
            this.blurHandler();
        }
    }

    clickHandler(event) {
        if (event.type === 'click' && this.dropdownMenu && !this.dropdownMenu.contains(event.target)) {
            this.blurHandler();
        }
    }

    changeHandler({ value, error }) {
        if (error !== this.props.error || value !== this.props.value) {
            if (this.props.persistent) {
                db.LSset(this.props.fieldId, value);
            }
            this.props.onChange({
                value,
                error
            });
        }
    }

    validate(val) {
        const {
            validators: {
                min,
                max,
                isRequired
            },
            customValidators,
            multiselect,
            intl
        } = this.props;

        if (customValidators.length) {
            return customValidators.map(validator => validator(val)).filter(result => result)[0];
        }

        if (isRequired && (multiselect ? !val.length : !val)) {
            return isRequired.error || intl.formatMessage(messages.isRequired);
        }

        if (min && val.length < min.value) {
            return intl.formatMessage(messages.min, {
                min: min.value
            });
        }

        if (max && val.length > max.value) {
            return intl.formatMessage(messages.max, {
                max: max.value
            });
        }

        return undefined;
    }

    selectedOptions() {
        if (this.props.multiselect) {
            if (this.props.fetch && !this.props.options.length) {
                return this.state.options.filter(o => this.props.value.includes(o.value));
            }
            return this.props.options.filter(o => this.props.value.includes(o.value));
        }
        if (!this.props.value) {
            return [];
        }
        if (this.props.fetch && !this.props.options.length) {
            return [this.state.options.find(o => this.props.value === o.value)];
        }
        return [this.props.options.find(o => this.props.value === o.value)];
    }

    clickShowAll() {
        setTimeout(() => {
            this.setState({ showAll: true });
        }, 100);
    }

    render() {
        const props = {
            fieldId: this.props.fieldId,
            label: this.props.label,
            error: this.props.error,
            placeholder: this.props.placeholder,
            inputValue: this.state.input.value,
            options: this.state.options,
            selectedOptions: this.selectedOptions(),
            activeOption: this.state.activeOption,
            errorVisibility: !this.props.errorHidden && this.state.touched && !this.state.focused,
            noOptionsText: this.props.noOptionsText || this.props.intl.formatMessage(messages.noOptions),
            isLoading: this.props.isLoading,
            showAll: this.state.showAll,
            optionsLength: this.props.optionsLength,

            focused: this.state.focused,
            focusedInput: this.state.input.focused,
            touched: this.state.touched,
            fetching: this.state.fetching,

            disabled: this.props.disabled,
            isMulti: this.props.multiselect,
            allSelected: this.props.multiselect ? this.props.value.length === this.props.options.length : false,

            onInput: this.inputHandler,
            onSelect: this.selectHandler,
            onSelectAll: ((this.props.allselect && this.props.multiselect) ? this.selectAllHandler : undefined),
            onFocus: this.focusHandler,
            clickShowAll: this.clickShowAll,

            getOptionRef: this.getOptionRef,
            getOptionsContainerRef: this.getOptionsContainerRef,
            getDropdownMenuRef: this.getDropdownMenuRef,

            intl: this.props.intl,
            errorStyle: this.props.errorStyle,

            selectedChips: this.props.selectedChips
        };

        return (
            <Autocomplete {...props} />
        );
    }
}

AutocompleteContainer.propTypes = {
    /** Unique field key */
    fieldId: PropTypes.string,
    /** Autocomplete label */
    label: PropTypes.string,
    /** Placeholder text */
    placeholder: PropTypes.string,
    /** Autocomplete value */
    value: PropTypes.any,
    /** Error value */
    error: PropTypes.node,
    /** Array of options [{label, labelText, value}] */
    options: PropTypes.array,
    optionsLength: PropTypes.number,
    /** Function returning Promise with array of options {label, labelText, value} */
    fetch: PropTypes.func,
    /** Autocomplete validation rules. You can use: min, max, isRequired. For example {max: 26, min: 5, isRequired: true} */
    validators: PropTypes.object,
    /** Autocomplete validation. Array of custom functions (value) => errorString/false. */
    customValidators: PropTypes.array,
    /** Is field disabled */
    disabled: PropTypes.bool,
    /** Should force hide error */
    errorHidden: PropTypes.bool,
    /** Should field accept more than one value */
    multiselect: PropTypes.bool,
    /** Should field contain 'Select all' option */
    allselect: PropTypes.bool,
    /** Should store and restore value */
    persistent: PropTypes.bool,
    /** Should force hide error */
    noOptionsText: PropTypes.string,
    /** Autocomplete change handler function */
    onChange: PropTypes.func.isRequired,
    /** Autocomplete add handler function */
    onAdd: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    isLoading: PropTypes.bool,
    intl: PropTypes.object.isRequired,
    errorStyle: PropTypes.object,
    errorStyle: {},
    selectedChips: PropTypes.bool
};

AutocompleteContainer.defaultProps = {
    fieldId: 'new-password',
    label: undefined,
    placeholder: '',
    value: undefined,
    error: undefined,
    options: [],
    fetch: undefined,
    validators: {},
    customValidators: [],
    disabled: false,
    errorHidden: undefined,
    multiselect: false,
    allselect: false,
    persistent: false,
    noOptionsText: undefined,
    onAdd: undefined,
    onFocus: undefined,
    onBlur: undefined,
    isLoading: false,
    optionsLength: undefined,
    selectedChips: false
};

export default injectIntl(AutocompleteContainer);