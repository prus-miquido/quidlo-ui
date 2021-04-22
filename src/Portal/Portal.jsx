import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        document.getElementById('portal').appendChild(this.el);
    }

    componentWillUnmount() {
        document.getElementById('portal').removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        );
    }
}

Portal.propTypes = {
    /** DOM elements tp be rendered outside */
    children: PropTypes.object.isRequired
};

export default Portal;