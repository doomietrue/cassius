import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './button.css';

class Button extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        loading : PropTypes.bool,
        type    : PropTypes.string,
    };

    static defaultProps = {
        disabled: false,
        loading : false,
        type    : 'button',
    };

    render() {
        let {children, disabled, loading, type, ...props} = this.props;
        if (loading) {
            disabled = true
        }

        return <button styleName='primaryButton' disabled={disabled} type={type} {...props}>
            {children}
        </button>
    }
}

export default CSSModules(Button, styles);