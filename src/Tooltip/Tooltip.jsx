import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Portal } from '..';

import style from './Tooltip.style.scss';

/** Tooltip on hovered elements */
class Tooltip extends PureComponent {
    constructor() {
        super();

        this.state = {
            open: false,
            coordinates: {},
            width: '200px'
        };

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    getTooltipRef(el) {
        this.instance = el;
    }

    handleMouseEnter() {
        const
            elInfo = this.instance.getBoundingClientRect(),
            left = this.props.asChildrenWidth ? `${elInfo.left}px` : `${(elInfo.left - 100) + (elInfo.width / 2)}px`,
            width = this.props.asChildrenWidth ? elInfo.width : '200px';

        this.setState({
            coordinates: {
                bottom: `${document.body.clientHeight - ((elInfo.top + window.pageYOffset) - 10)}px`,
                left
            },
            open: !!this.props.text,
            width
        });
    }

    handleMouseLeave() {
        this.setState({
            open: false
        });
    }

    render() {
        const
            {text, children, position} = this.props,
            {open, coordinates, width} = this.state;

        return (
            <div className={cx(style.wrapper)} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} ref={el => this.getTooltipRef(el)}>
                {
                    text && (
                        <Portal>
                            <TransitionGroup>
                                <CSSTransition
                                    key={open}
                                    classNames="anim"
                                    timeout={500}
                                    mountOnEnter
                                    unmountOnExit
                                >
                                    {open ? (
                                        <div
                                            className={cx(style.tooltip, style[`position-${position}`])}
                                            style={{
                                                bottom: coordinates.bottom,
                                                left: coordinates.left,
                                                width
                                            }}
                                        >
                                            <div className={style.content} style={{maxWidth: width}}>
                                                {text}
                                            </div>
                                        </div>
                                    ) : (
                                        <div />
                                    )}
                                </CSSTransition>
                            </TransitionGroup>
                        </Portal>
                    )}
                {children}
            </div>
        );
    }
}

Tooltip.propTypes = {
    /** Tooltip text */
    text: PropTypes.string,
    /** Tooltip relative position */
    position: PropTypes.oneOf(['top', 'bottom', 'right']),
    /** Children nodes */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    /** Width as children's width **/
    asChildrenWidth: PropTypes.bool
};

Tooltip.defaultProps = {
    text: '',
    position: 'top',
    asChildrenWidth: false
};

export default Tooltip;