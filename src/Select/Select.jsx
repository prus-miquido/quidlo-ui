import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Checkbox, RadioButton } from '..';

import messages from './Select.i18n';
import style from './Select.style.scss';

const Select = ({
    options,
    active,
    onSelect,
    onSelectAll,
    multiselect,
    getOptionsContainerRef,
    optionsContHeight,
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
                <div className={style.optionsContainer} ref={getOptionsContainerRef} style={{maxHeight: optionsContHeight}}>
                    {options.length > 0 && onSelectAll && (
                        <Checkbox
                            label={intl.formatMessage(messages.all)}
                            onSelect={onSelectAll}
                            value="0"
                            fieldId="all"
                            key="all"
                            dropdownList="all"
                        />
                    )}
                    {(options.length > 0 && multiselect) ? (
                        options.map(o => (
                            <Checkbox
                                label={o.label}
                                onSelect={() => { onSelect(o.value); }}
                                value={o.selected}
                                fieldId={String(o.value)}
                                key={o.value}
                                dropdownList="options"
                            />
                        ))
                    ) : (
                        options.map(o => (
                            <RadioButton
                                label={o.label}
                                onSelect={() => { onSelect(o.value); }}
                                value={o.selected}
                                fieldId={String(o.value)}
                                key={o.value}
                                dropdownList
                            />
                        ))
                    )}
                    {options.length === 0 && (
                        <div className={style.noOptionsContainer}>
                            <span className={style.noOptions}>
                                {intl.formatMessage(messages.noOptions)}
                            </span>
                        </div>
                    )}
                </div>
            ) : (
                <div className={style.notActive} />
            )}
        </CSSTransition>
    </TransitionGroup>
);

Select.propTypes = {
    /** Function triggered while select value */
    onSelect: PropTypes.func.isRequired,
    /** Function triggered on click all option */
    onSelectAll: PropTypes.func,
    /** Options of field group */
    options: PropTypes.array.isRequired,
    /** Is dropdown is open */
    active: PropTypes.bool,
    /** Is field multiselectable */
    multiselect: PropTypes.bool,
    getOptionsContainerRef: PropTypes.func.isRequired,
    optionsContHeight: PropTypes.number.isRequired,
    intl: PropTypes.object.isRequired
};

Select.defaultProps = {
    active: false,
    onSelectAll: undefined,
    multiselect: undefined,
};

export default Select;