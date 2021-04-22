import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import MenuItem from './MenuItem';

import LogoSVG from './svg/logo.svg';

import style from './Menu.style.scss';

/** Component of black bar containing menu pinned to the left side of screen. */
const Menu = ({hidden, items, version}) => {
    const list = items.map(i => (
        <MenuItem key={i.title} {...i} />
    ));
    return (
        <div className={cx(style.menu, (hidden && style.hidden))}>
            <div>
                <div className={style.logo}>
                    <LogoSVG />
                </div>
                {list}
            </div>
            <div className={style.version}>
                Timesheets
                {version}
            </div>

        </div>
    );
};

Menu.propTypes = {
    /** Is menu hidden. */
    hidden: PropTypes.bool,
    /** Array of available menu links */
    items: PropTypes.array.isRequired,
    /** Version number. */
    version: PropTypes.string
};

Menu.defaultProps = {
    hidden: false,
    version: ''
};

export default Menu;