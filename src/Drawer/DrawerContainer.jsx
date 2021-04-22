import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Drawer from './Drawer';

class DrawerContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            active: false
        };

        this.toggleActive = this.toggleActive.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this);
    }

    componentDidMount() {
        document.addEventListener('scroll', this.scrollHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.scrollHandler);
    }

    scrollHandler() {
        const
            {visible} = this.state,
            {visibilityPosition} = this.props;
        if (window.pageYOffset > visibilityPosition && !visible) {
            this.setState({
                visible: true
            });
        } else if (window.pageYOffset <= visibilityPosition && visible) {
            this.setState({
                visible: false,
                active: false
            });
        }
    }

    toggleActive() {
        this.setState(state => ({
            active: !state.active
        }), () => {
            if (this.props.onToggle) {
                this.props.onToggle(this.state.active);
            }
        });
    }

    render() {
        const props = {
            name: this.props.name,
            children: this.props.children,
            active: this.state.active,
            visible: this.state.visible,
            toggleActive: this.toggleActive
        };
        return (<Drawer {...props} />);
    }
}

DrawerContainer.propTypes = {
    name: PropTypes.string,
    visibilityPosition: PropTypes.number,
    onToggle: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

DrawerContainer.defaultProps = {
    name: 'Drawer',
    visibilityPosition: 100,
    onToggle: undefined
};

export default DrawerContainer;