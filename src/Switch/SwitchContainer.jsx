import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import db from '../utils/db';

import Switch from './Switch';

const keydownHandler = event => {
    if (event.key === ' ') {
        event.preventDefault();
    }
};

class SwitchContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            focused: false,
        };

        this.keyupHandler = this.keyupHandler.bind(this);
        this.toggle = this.toggle.bind(this);
        this.blurHandler = this.blurHandler.bind(this);
        this.focusHandler = this.focusHandler.bind(this);
    }

    componentDidMount() {
        if (this.props.persistent) {
            const val = db.LSget(this.props.fieldId);
            if (val) {
                this.props.onChange(val);
            } else {
                this.props.onChange(this.props.value);
            }
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.keyupHandler);
        document.removeEventListener('keydown', keydownHandler);
    }

    focusHandler() {
        document.addEventListener('keyup', this.keyupHandler);
        document.addEventListener('keydown', keydownHandler);
        this.setState({
            focused: true,
        });
    }

    blurHandler() {
        document.removeEventListener('keyup', this.keyupHandler);
        document.removeEventListener('keydown', keydownHandler);
        this.setState({
            focused: false,
        });
    }

    keyupHandler(event) {
        if (event.key === ' ') {
            this.toggle();
        }
    }

    toggle() {
        const value = (this.props.value === this.props.options[0].value) ? this.props.options[1].value : this.props.options[0].value;

        if (this.props.persistent) {
            db.LSset(this.props.fieldId, value);
        }

        this.props.onChange(value);
    }

    render() {
        const
            {value, options, fieldId} = this.props,
            {focused} = this.state,
            props = {
                value,
                options,
                fieldId,
                focused,
                onClick: this.toggle,
                onBlur: this.blurHandler,
                onFocus: this.focusHandler,
                type: this.props.type,
                disabled: this.props.disabled,
            };

        return <Switch {...props} />;
    }
}

SwitchContainer.propTypes = {
    /** Switch value */
    value: PropTypes.any,
    /** Switch options */
    options: PropTypes.arrayOf(PropTypes.shape({
        /** Option string label */
        label: PropTypes.string,
        /** Option value */
        value: PropTypes.any
    })),
    /** Switch handler function */
    onChange: PropTypes.func.isRequired,
    /** Should value of switch be recorded and restored from database */
    persistent: PropTypes.bool,
    /** Unique id */
    fieldId: PropTypes.string.isRequired,
    /** Switch type */
    type: PropTypes.oneOf(['small', 'large']),
    disabled: PropTypes.bool,
};

SwitchContainer.defaultProps = {
    value: true,
    options: [
        {
            val: true,
            label: 'On'
        },
        {
            val: false,
            label: 'Off'
        }
    ],
    persistent: false,
    type: 'large',
    disabled: false
};

export default SwitchContainer;