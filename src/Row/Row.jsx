import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import style from './Row.style.scss';

/** Component for single row inside Section */
const Row = ({
    children,
    spaced,
    stretched,
    centered
}) => (
    <div className={cx(style.row, spaced && style.spaced, stretched && style.stretched, centered && style.centered)}>
        {children}
    </div>
);

Row.propTypes = {
    /** Children nodes */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    spaced: PropTypes.bool,
    stretched: PropTypes.bool,
    centered: PropTypes.bool
};

Row.defaultProps = {
    spaced: false,
    stretched: false,
    centered: false
};

export default Row;