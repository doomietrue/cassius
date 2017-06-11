import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './dropdown.css';
import classnames from 'classnames';

class Dropdown extends Component {
    static propTypes = {
        source  : PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
        ])).isRequired,
        valueKey: PropTypes.string,
        value   : PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        onBlur  : PropTypes.func,
        onChange: PropTypes.func,
        onClick : PropTypes.func
    };

    static defaultProps = {
        className: '',
        disabled : false,
        labelKey : 'label',
        valueKey : 'value',
    };

    state = {
        active: false,
        up    : false,
    };

    removeEventsFromDocument(eventMap) {
        Object.keys(eventMap).forEach((key) => {
            document.removeEventListener(key, eventMap[key], false);
        });
    };

    addEventsToDocument(eventMap) {
        Object.keys(eventMap).forEach((key) => {
            document.addEventListener(key, eventMap[key], false);
        });
    }

    targetIsDescendant(event, parent) {
        let node = event.target;
        while (node !== null) {
            if (node === parent) return true;
            node = node.parentNode;
        }
        return false;
    }

    componentWillUpdate(nextProps, nextState) {
        if (!this.state.active && nextState.active) {
            this.addEventsToDocument(this.getDocumentEvents());
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.active && !this.state.active) {
            this.removeEventsFromDocument(this.getDocumentEvents());
        }
    }

    componentWillUnmount() {
        if (this.state.active) {
            this.removeEventsFromDocument(this.getDocumentEvents());
        }
    }

    getDocumentEvents = () => ({
        click   : this.handleDocumentClick,
        touchend: this.handleDocumentClick,
    });

    onClick(event) {
        this.open(event);
        event.preventDefault();
    }

    getSelectedItem = () => {
        for (const item of this.props.source) {
            if (item[this.props.valueKey] === this.props.value) return item;
        }
    };

    handleDocumentClick = (event) => {
        if (this.state.active && !this.targetIsDescendant(event, ReactDOM.findDOMNode(this).parentNode)) {
            this.setState({active: false});
        }
    };

    handleSelect = (item, event) => {
        if (this.props.onBlur) this.props.onBlur(event);
        if (!this.props.disabled && this.props.onChange) {
            if (this.props.name) event.target.name = this.props.name;
            this.props.onChange(item, event);
            this.close();
        }
    };

    handleFocus = (event) => {
        event.stopPropagation();
        if (!this.props.disabled) this.open(event);
        if (this.props.onFocus) this.props.onFocus(event);
    };

    handleBlur = (event) => {
        event.stopPropagation();
        if (this.props.onBlur) this.props.onBlur(event);
    };


    open(event) {
        if (this.state.active) return;
        const client = event.target.getBoundingClientRect();
        const screenHeight = window.innerHeight || document.documentElement.offsetHeight;
        const up = this.props.auto ? client.top > ((screenHeight / 2) + client.height) : false;
        this.setState({active: true, up});
    };

    close = () => {
        if (this.state.active) {
            this.setState({active: false});
        }
    };

    renderValue = (item, id) => {
        const {valueKey} = this.props;
        return (
            <li
                key={id}
                onClick={this.handleSelect.bind(this, item[valueKey])}
                styleName="item"
            >
                <a href="#" styleName="link"> {item.label} </a>
            </li>
        );
    };


    render() {
        const {source, labelKey, onChange, onFocus, onBlur, ...props} = this.props;
        const selected = this.getSelectedItem();
        const listClass = this.state.active ? 'list' : 'list-hide';

        return (
            <div styleName='wrapper'
                 onBlur={this.handleBlur}
                 onFocus={this.handleFocus}
            >
                <a href="#" onClick={this.onClick.bind(this)} styleName='switcher'>
                    {selected && selected[labelKey] ? selected[labelKey] : ''}
                </a>
                <ul styleName={listClass}>
                    {source.map(this.renderValue)}
                </ul>
            </div>
        )
    }
}

export default CSSModules(Dropdown, styles);