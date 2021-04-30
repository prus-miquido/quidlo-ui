import React from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';

/* Component render after effects animations exported as json on React */
const Animation = ({
    animationData,
    height,
    width,
    className
}) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: {
            progressiveLoad: false,
            hideOnTransparent: true
        }
    };

    return (
        <div className={className}>
            <Lottie
                options={defaultOptions}
                height={height}
                width={width}
            />
        </div>
    );
};

Animation.propTypes = {
    /** Data for animation in JSON format */
    animationData: PropTypes.object.isRequired,
    /** Height of animation */
    height: PropTypes.number,
    /** Width of animation */
    width: PropTypes.number,
    className: PropTypes.string
};

Animation.defaultProps = {
    height: 50,
    width: 50,
    className: ''
};

export default Animation;