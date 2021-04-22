import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Toast from './Toast';

const DEFAULT_DISPLAY_TIME = 5000;

class ToastContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: undefined
        };

        this.closeHandler = this.closeHandler.bind(this);
    }

    componentDidMount() {
        const timer = setTimeout(() => {
            this.closeHandler();
        }, this.props.toast.time || DEFAULT_DISPLAY_TIME);

        this.setState({
            timer
        });
    }

    closeHandler() {
        this.props.toast.close(this.props.toast.id);
        clearTimeout(this.state.timer);
    }

    render() {
        const props = {
            text: this.props.toast.text,
            color: this.props.toast.color,
            action: this.props.toast.action,
            actionName: this.props.toast.actionName,
            position: this.props.position,
            onClose: this.closeHandler
        };
        return (
            <Toast {...props} />
        );
    }
}

ToastContainer.propTypes = {
    /** Array of toasts */
    toast: PropTypes.object.isRequired,
    position: PropTypes.number.isRequired
};


export default ToastContainer;
