import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import style from './Counter.style.scss';

const Counter = ({
    number,
    size
}) => (
    <div className={cx(style.counter, style[`size-${size}`])}>
        <span>
            {(number > 0 ? '+' : '-')}
            {number}
        </span>
    </div>
);

Counter.propTypes = {
    number: PropTypes.number.isRequired,
    size: PropTypes.string
};

Counter.defaultProps = {
    size: 'medium'
};

export default Counter;