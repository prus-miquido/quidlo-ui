import React from 'react';
import PropTypes from 'prop-types';

import style from './Section.style.scss';

/** Component for single section inside Container */
const Section = ({children}) => (
    <div className={style.section}>
        {children}
    </div>
);

Section.propTypes = {
    /** Children nodes */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default Section;