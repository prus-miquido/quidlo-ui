import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import COLORS from '../const/colors';

import styles from './Avatar.style.scss';

const
    StringColor = string => {
        const reduce = [...string].reduce((acc = 0, val) => acc + parseInt(val.charCodeAt(0), 10), 0);
        return COLORS[reduce % COLORS.length];
    },
    /** Component of user avatar */
    Avatar = ({picture, firstName, lastName}) => {
        if (picture) {
            return (
                <div className={cx(styles.avatar, styles.picture)} style={{backgroundImage: `url(${picture})`}} >
                    <span />
                </div>
            );
        }

        const
            sig = ((firstName && lastName) ? `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}` : ''),
            color = StringColor(`${firstName} ${lastName}`);

        return (
            <div className={cx(styles.avatar, styles.signature)} style={{color, borderColor: color}}>
                <span>
                    {sig}
                </span>
            </div>
        );
    };

Avatar.propTypes = {
    /** User picture */
    picture: PropTypes.string,
    /** Firstname of user */
    firstName: PropTypes.string.isRequired,
    /** Lastname of user */
    lastName: PropTypes.string.isRequired
};

Avatar.defaultProps = {
    picture: undefined
};

export default Avatar;