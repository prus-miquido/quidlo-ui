import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import style from './Pill.style.scss';

const Pill = ({text, size, color}) => (
    <div className={cx(style.pill, style[`size-${size}`], style[`color-${color}`])}>
        <span>
            {text}
        </span>
    </div>
);

Pill.propTypes = {
    /** Text content of pill */
    text: PropTypes.string,
    /** Size of pill */
    color: PropTypes.oneOf(['grey', 'white']),
    /** Size of pill */
    size: PropTypes.oneOf(['small', 'normal', 'large']),
};

Pill.defaultProps = {
    text: '',
    color: 'grey',
    size: 'normal'
};

export default Pill;