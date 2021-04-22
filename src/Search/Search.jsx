import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from '../Icon';

import style from './Search.style.scss';

let timeout = null;
const timeoutDelay = 800;

/** Component of search */
class Search extends PureComponent {
    constructor() {
        super();

        this.state = {
            isActive: false,
            isFocused: false
        };

        this.toggleSearch = this.toggleSearch.bind(this);
        this.toggleFocus = this.toggleFocus.bind(this);
        this.search = this.search.bind(this);
    }

    toggleSearch() {
        this.setState({
            isActive: true
        });

        this.inputRef.focus();
    }

    toggleFocus(isFocused) {
        this.setState({isFocused});
    }

    search(event) {
        const {target: {value}} = event;

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            this.props.searchFunc(value);
        }, timeoutDelay);
    }

    render() {
        const { isActive, isFocused } = this.state;
        return (
            <div
                className={cx(style.search, isActive && style.active, isFocused && style.focused)}
                onClick={this.toggleSearch}
                onKeyPress={this.toggleSearch}
            >
                <div className={cx(style.leftPart)} />
                <div className={cx(style.centerPart)}>
                    <input
                        className={cx(style.input)}
                        onChange={this.search}
                        onFocus={() => { this.toggleFocus(true); }}
                        onBlur={() => { this.toggleFocus(false); }}
                        placeholder={this.props.placeholder}
                        ref={el => { this.inputRef = el; }}
                    />
                </div>
                <div className={cx(style.rightPart)} />
                <div className={style.icon}>
                    <Icon icon="search" color="grey" />
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    searchFunc: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

Search.defaultProps = {
    placeholder: ''
};

export default Search;