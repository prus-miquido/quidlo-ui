import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { timeParser } from '../utils/time';
import { timeValidator, hourValidator } from '../utils/validators';
import db from '../utils/db';

import messages from './InputContainer.i18n';

import Input from './Input';

let timeout = null;
const timeoutDelay = 800;

/* Input Component */
class InputContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            error: this.validate(props.value),
            initValue: props.value,
            focused: false,
            touched: false,
            passwordVisibility: false
        };

        this.focusHandler = this.focusHandler.bind(this);
        this.blurHandler = this.blurHandler.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.showPassword = this.showPassword.bind(this);
    }

    componentDidMount() {
        const
            { persistent, fieldId } = this.props,
            { error, value } = this.state,
            savedValue = db.LSget(fieldId),
            newValue = (persistent && savedValue) ? savedValue : this.props.value;

        if (error || newValue !== this.props.value) {
            if (this.props.onChange) {
                this.props.onChange({
                    value,
                    error
                });
            } else if (this.props.onDelayedChange) {
                this.props.onDelayedChange({
                    value,
                    error
                });
            }
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.value !== this.state.value || JSON.stringify(newProps.validators) !== JSON.stringify(this.props.validators)) {
            const error = this.validate(newProps.value);

            if (error !== this.props.error) {
                if (this.props.onChange) {
                    this.props.onChange({
                        value: newProps.value,
                        error
                    });
                } else if (this.props.onDelayedChange) {
                    this.props.onDelayedChange({
                        value: newProps.value,
                        error
                    });
                }
            }

            this.setState({
                value: newProps.value,
                error
            });
        }

        this.setState({
            touched: newProps.errorHidden !== undefined ? !newProps.errorHidden : this.state.touched,
        });
    }

    focusHandler() {
        this.setState({
            focused: true,
            touched: true
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

        this.setState({
            focused: false,
            touched: true
        });
    }

    keyDownHandler(e) {
        if (this.props.blurOnEnter && e.keyCode === 13) {
            e.target.blur();
        }

        if (this.props.onKeyDown) {
            this.props.onKeyDown(e);
        }
    }

    validate(val) {
        const {
            type,
            validators: {
                min,
                max,
                isRequired,
                isPassword,
                isTime,
                isHour
            },
            intl
        } = this.props;

        if (this.props.customValidators.length) {
            return this.props.customValidators.map(validator => validator(val)).filter(result => result)[0];
        }

        switch (type) {
            case 'text':
                if (isRequired && !val.length) {
                    return isRequired.error || intl.formatMessage(messages.isRequired);
                }

                if (min && val.length < min.value) {
                    return min.error || intl.formatMessage(messages.min, {
                        min: min.value
                    });
                }

                if (max && val.length > max.value) {
                    return intl.formatMessage(messages.max, {
                        max: max.value
                    });
                }
                return '';
            case 'number':
                if (isRequired && !val) {
                    return isRequired.error || intl.formatMessage(messages.isRequired);
                }

                if (min && val < min.value) {
                    return min.error || intl.formatMessage(messages.min, {
                        min: min.value
                    });
                }

                if (max && val > max.value) {
                    return max.error || intl.formatMessage(messages.max, {
                        max: max.value
                    });
                }
                return '';
            case 'time':
                if (isRequired && !val.length) {
                    return isRequired.error || intl.formatMessage(messages.isRequired);
                }

                if (isTime && !timeValidator(val)) {
                    return isTime.error || intl.formatMessage(messages.timeFormatError);
                }

                if (min && timeParser(val) < timeParser(min.value)) {
                    return min.error || intl.formatMessage(messages.timeMinError, {
                        min: min.value
                    });
                }

                if (max && timeParser(val) > timeParser(max)) {
                    return max.error || intl.formatMessage(messages.timeMaxError, {
                        max: max.value
                    });
                }
                return '';
            case 'password':
                if (isRequired && !val.length) {
                    return isRequired.error || intl.formatMessage(messages.isRequired);
                }

                if (isPassword && val.length > 0) {
                    if (val.length < 8) {
                        return intl.formatMessage(messages.passwordMin);
                    }

                    if (!/\d/.test(val)) {
                        return intl.formatMessage(messages.passwordDigit);
                    }

                    if (!/[A-Z]/.test(val)) {
                        return intl.formatMessage(messages.passwordUppercase);
                    }
                }

                return '';
            case 'hour':
                if (isRequired && !val.length) {
                    return isRequired.error || intl.formatMessage(messages.isRequired);
                }

                if (isHour && !hourValidator(val)) {
                    return isHour.error || intl.formatMessage(messages.hourFormatError);
                }

                return '';
            default:
                return '';
        }
    }

    changeHandler(event) {
        const
            { target: { value } } = event,
            error = this.validate(value);

        if (this.props.onChange) {
            this.props.onChange({
                value,
                error
            });
        } else if (this.props.onDelayedChange) {
            clearTimeout(timeout);

            timeout = setTimeout(() => {
                this.props.onDelayedChange({
                    value,
                    error
                });
            }, timeoutDelay);
        }

        this.setState({
            value,
            error
        });
    }

    showPassword() {
        this.setState({
            passwordVisibility: !this.state.passwordVisibility
        });
    }

    render() {
        const props = {
            name: this.props.fieldId,
            label: this.props.label,
            placeholder: this.props.placeholder,
            icon: this.props.icon,
            type: this.props.type,
            size: this.props.size,
            value: this.state.value || '',
            error: this.state.error,
            errorVisibility: !this.props.errorHidden && this.state.touched && !this.state.focused && (this.state.initValue !== this.state.value || (!this.state.initValue && !this.state.value)),
            disabled: this.props.disabled,
            onChange: this.changeHandler,
            onFocus: this.focusHandler,
            onBlur: this.blurHandler,
            onKeyDown: this.keyDownHandler,
            passwordVisibility: this.state.passwordVisibility,
            showPassword: this.showPassword,
            errorStyle: this.props.errorStyle
        };

        return (
            <Input {...props} />
        );
    }
}

InputContainer.propTypes = {
    /** Unique field key */
    fieldId: PropTypes.string,
    /** Input label */
    label: PropTypes.string,
    /** Placeholder text */
    placeholder: PropTypes.string,
    /** Icon string input */
    icon: PropTypes.string,
    /** Input type */
    type: PropTypes.oneOf(['text', 'number', 'time', 'password', 'hour']),
    /** Size of input */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /** Input value */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Error text */
    error: PropTypes.string,
    /** Input validation rules. You can use: min, max, isRequired. For example {max: 26, min: 5, isRequired: true} */
    validators: PropTypes.object,
    /** Input validation. Array of custom functions (value) => errorString/false. */
    customValidators: PropTypes.arrayOf(PropTypes.func),
    /** Is field disabled */
    disabled: PropTypes.bool,
    /** Should force hide error */
    errorHidden: PropTypes.bool,
    /** Should store and restore value */
    persistent: PropTypes.bool,
    /** Input handler functions */
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    blurOnEnter: PropTypes.bool,
    /** Input handler function triggered with delay */
    onDelayedChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    intl: PropTypes.object.isRequired,
    errorStyle: PropTypes.object
};

InputContainer.defaultProps = {
    fieldId: 'input',
    label: '',
    placeholder: '',
    icon: undefined,
    type: 'text',
    size: 'medium',
    value: '',
    error: undefined,
    validators: {},
    customValidators: [],
    disabled: false,
    errorHidden: undefined,
    persistent: false,
    onChange: undefined,
    onBlur: undefined,
    blurOnEnter: false,
    onDelayedChange: undefined,
    onKeyDown: undefined,
    errorStyle: {}
};

export default injectIntl(InputContainer);
