import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import equal from 'deep-equal';
import { injectIntl } from 'react-intl';

import { emailValidator } from '../utils/validators';

import messages from './InputCollectionContainer.i18n';

import InputCollection from './InputCollection';

/* InputCollection Component */
class InputCollectionContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            error: this.validate(props.value),
            inputValue: '',
            focused: false,
            touched: false
        };

        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.blurHandler = this.blurHandler.bind(this);
        this.focusHandler = this.focusHandler.bind(this);
        this.keyPressHandler = this.keyPressHandler.bind(this);
    }

    componentDidMount() {
        const {error, value} = this.state;
        if (error) {
            this.props.onChange({
                value,
                error
            });
        }
    }

    componentWillReceiveProps(newProps) {
        if (!equal(newProps.value, this.props.value)) {
            const error = this.validate(newProps.value);
            this.props.onChange({
                value: newProps.value,
                error
            });

            this.setState({
                value: newProps.value,
                error
            });
        }
    }

    validate(val) {
        let error;
        const {isRequired} = this.props.validators;

        if (isRequired && !val.length) {
            error = this.props.intl.formatMessage(messages.isRequired);
        }

        return error;
    }

    focusHandler() {
        this.setState({
            focused: true,
            touched: true
        });
    }

    blurHandler() {
        this.add(this.state.inputValue);

        this.setState({
            focused: false,
            touched: true
        });
    }

    changeHandler(value) {
        this.setState(state => ({
            ...state,
            inputValue: value
        }));
    }

    keyPressHandler(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.add(this.state.inputValue);
        }
    }

    add(val) {
        const newValue = [...this.props.value];

        if (emailValidator(val)) {
            newValue.push(val);

            this.props.onChange({
                value: newValue,
                error: this.validate(newValue)
            });
        }

        this.setState(state => ({
            ...state,
            inputValue: ''
        }));
    }

    remove(val) {
        const
            value = [...this.props.value],
            newValue = value.filter(v => v !== val);

        this.props.onChange({
            value: newValue,
            error: this.validate(newValue)
        });
    }

    render() {
        const props = {
            name: this.props.name,
            label: this.props.label,
            value: this.props.value,
            error: this.props.error,
            size: this.props.size,
            inputValue: this.state.inputValue,
            add: this.add,
            remove: this.remove,
            onBlur: this.blurHandler,
            onFocus: this.focusHandler,
            onInputChange: this.changeHandler,
            onInputKeyPress: this.keyPressHandler,
            errorVisibility: this.state.touched && !this.state.focused && this.state.initValue !== this.state.value,
        };
        return (
            <InputCollection {...props} />

        );
    }
}

InputCollectionContainer.propTypes = {
    /** Input field name */
    name: PropTypes.string,
    /** Input label */
    label: PropTypes.string,
    /** Input value */
    value: PropTypes.array,
    /** Error text */
    error: PropTypes.node,
    /** Input validation rules. You can use: min, max and is Required. For example {max: 26, min: 5, isRequired: true} */
    validators: PropTypes.object,
    /** Input validation custom functions rules. Should return error string or false/null */
    customValidators: PropTypes.arrayOf(PropTypes.func),
    /** Input handler function */
    onChange: PropTypes.func.isRequired,
    /** Size of input */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    intl: PropTypes.object.isRequired
};

InputCollectionContainer.defaultProps = {
    name: 'textInput',
    label: '',
    value: '',
    error: '',
    validators: {},
    customValidators: [],
    size: 'medium'
};

export default injectIntl(InputCollectionContainer);
