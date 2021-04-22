import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {Link} from 'react-router-dom';
import Icon from '../../Icon';

import style from './MenuItem.style.scss';

/** Component of single menu link */
class MenuItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false
        };
    }

    hover(val) {
        this.setState({
            hovered: val
        });
    }

    render() {
        const
            {
                title,
                icon,
                link,
                active
            } = this.props,
            { hovered } = this.state;

        return (
            <Link to={link} className={cx(style.menuItem, (active && style.active))} onMouseEnter={() => { this.hover(true); }} onMouseLeave={() => { this.hover(false); }}>
                <div className={style.icon} >
                    <Icon icon={icon} size="medium" color={(active || hovered ? 'blue' : 'grey-dark')} />
                </div>
                <div className={style.title} >
                    {title}
                </div>
            </Link>
        );
    }
}

MenuItem.propTypes = {
    /** Title string of the element. */
    title: PropTypes.string.isRequired,
    /** Icon string of the element. */
    icon: PropTypes.string,
    /** Url for element. */
    link: PropTypes.string.isRequired,
    /** Is element choosen. */
    active: PropTypes.bool
};

MenuItem.defaultProps = {
    icon: 'default',
    active: false
};

export default MenuItem;