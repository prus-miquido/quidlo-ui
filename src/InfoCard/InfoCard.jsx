import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './..';

import style from './InfoCard.scss';

import Ghost from './svg/no-project-yet-ill.svg';

const InfoCard = ({
    children,
    header,
    body,
    buttonProps,
}) => (
    <div className={style.infoCardContainer}>
        <div className={style.infoCard}>
            {
                children && (
                    <div className={style.imageContainer}>
                        {children}
                    </div>
                )
            }
            {header && <div className={style.header}>{header}</div>}
            {body}
            {buttonProps && (
                <div className={style.buttonContainer}>
                    <Button {...buttonProps} type="filled" color="blue" shadow />
                </div>
            )}
        </div>
    </div>
);

InfoCard.propTypes = {
    header: PropTypes.string,
    body: PropTypes.string,
    buttonProps: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])

};

InfoCard.defaultProps = {
    header: 'No results',
    body: 'Try using different set of filters above',
    buttonProps: undefined,
    children: <Ghost />
};

export default InfoCard;