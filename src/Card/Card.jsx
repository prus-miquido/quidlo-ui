import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import style from './Card.style.scss';

/** Component of List */
const
    Card = ({
        rightChildren,
        title,
        color,
        children,
        noPadding
    }) => (
        <div className={cx(style.card)}>
            { title &&
            <div className={cx(style.title)}>
                <div className={style.left} style={{color}} >
                    {title}
                </div>
                <div className={style.right}>
                    {rightChildren}
                </div>
                { color &&
                <div className={style.label} style={{backgroundColor: color}} />
                }
            </div>
            }
            <div className={cx(style.content, noPadding && style.noPadding)}>
                {children}
            </div>
        </div>
    );

Card.propTypes = {
    /** List title */
    title: PropTypes.string,
    /** Color of list title */
    color: PropTypes.string,
    /** Children nodes of list body */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    /** Children nodes of header right side */
    rightChildren: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    noPadding: PropTypes.bool
};

Card.defaultProps = {
    title: '',
    color: undefined,
    rightChildren: undefined,
    noPadding: false
};

export default Card;