import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {Animation} from '..';

import messages from './Spinner.i18n';
import style from './Spinner.style.scss';

import animationData from './json/data.json';

/** Spinner component which appears when data loading is in progress */
const Spinner = ({
    active,
    intl
}) => (
    <TransitionGroup>
        <CSSTransition
            key={active}
            classNames="anim"
            timeout={500}
            mountOnEnter
            unmountOnExit
        >
            {active ? (
                <div className={style.dataSpinner}>
                    <Animation animationData={animationData} />
                    <div className={style.text}>
                        {intl.formatMessage(messages.loading)}
                    </div>
                </div>
            ) : (
                <div className={style.notActive} />
            )}
        </CSSTransition>
    </TransitionGroup>
);

Spinner.propTypes = {
    /** Is Spinner active. */
    active: PropTypes.bool,
    /** Translation object */
    intl: PropTypes.object.isRequired
};

Spinner.defaultProps = {
    active: false,
};

export default injectIntl(Spinner);