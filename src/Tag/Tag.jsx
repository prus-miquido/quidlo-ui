import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import SVGRemove from './svg/remove.svg';
import Icon from '../Icon';

import styles from './Tag.style.scss';

/** Component of tag */
const Tag = ({
    size,
    text,
    avatar,
    onRemove,
    type,
    color,
    icon,
    style
}) => (
    <div
      className={cx(styles.tag, styles[`size-${(avatar ? 'large' : size)}`], styles[`type-${type}`])}
      style={{
          ...style,
          '--color': color
      }}
    >
        { avatar &&
            avatar
        }
        <span className={styles.text}>
            {text}
        </span>
        { onRemove &&
            <a className={styles.remove} onClick={onRemove} onKeyPress={onRemove}>
                <SVGRemove />
            </a>
        }
        {icon && (
            <div className={styles.icon}>
                <Icon icon={icon} color={color} size={size} />
            </div>
        )}
    </div>
);

Tag.propTypes = {
    /** Tag type */
    type: PropTypes.oneOf(['normal', 'highlighted', 'stroked', 'dashed']),
    /** Size variant of Tag */
    size: PropTypes.oneOf(['medium', 'large']),
    /** Text content */
    text: PropTypes.string.isRequired,
    /** Tag color */
    color: PropTypes.string,
    /** Avatar component to display on the left size of Tag */
    avatar: PropTypes.node,
    /** Icon in Pill */
    icon: PropTypes.string,
    /** Action to fire on 'cross' icon click */
    onRemove: PropTypes.func,
    /** Additional wrapper styles */
    style: PropTypes.shape({})
};

Tag.defaultProps = {
    type: 'normal',
    size: 'medium',
    color: undefined,
    avatar: undefined,
    icon: undefined,
    onRemove: undefined,
    style: null
};

export default Tag;