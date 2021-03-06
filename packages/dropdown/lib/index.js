'use strict';

exports.__esModule = true;

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dropdown = require('./dropdown.css');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = (_temp2 = _class = function (_Component) {
    _inherits(Dropdown, _Component);

    function Dropdown() {
        var _temp, _this, _ret;

        _classCallCheck(this, Dropdown);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
            active: false,
            up: false
        }, _this.getDocumentEvents = function () {
            return {
                click: _this.handleDocumentClick,
                touchend: _this.handleDocumentClick
            };
        }, _this.getSelectedItem = function () {
            for (var _iterator = _this.props.source, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var item = _ref;

                if (item[_this.props.valueKey] === _this.props.value) return item;
            }
        }, _this.handleDocumentClick = function (event) {
            if (_this.state.active && !_this.targetIsDescendant(event, _reactDom2.default.findDOMNode(_this).parentNode)) {
                _this.setState({ active: false });
            }
        }, _this.handleSelect = function (item, event) {
            if (_this.props.onBlur) _this.props.onBlur(event);
            if (!_this.props.disabled && _this.props.onChange) {
                if (_this.props.name) event.target.name = _this.props.name;
                _this.props.onChange(item, event);
                _this.close();
            }
        }, _this.handleFocus = function (event) {
            event.stopPropagation();
            if (!_this.props.disabled) _this.open(event);
            if (_this.props.onFocus) _this.props.onFocus(event);
        }, _this.handleBlur = function (event) {
            event.stopPropagation();
            if (_this.props.onBlur) _this.props.onBlur(event);
        }, _this.close = function () {
            if (_this.state.active) {
                _this.setState({ active: false });
            }
        }, _this.renderValue = function (item, id) {
            var valueKey = _this.props.valueKey;

            return _react2.default.createElement(
                'li',
                {
                    key: id,
                    onClick: _this.handleSelect.bind(_this, item[valueKey]),
                    styleName: 'item'
                },
                _react2.default.createElement(
                    'a',
                    { href: '#', styleName: 'link' },
                    ' ',
                    item.label,
                    ' '
                )
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    Dropdown.prototype.removeEventsFromDocument = function removeEventsFromDocument(eventMap) {
        Object.keys(eventMap).forEach(function (key) {
            document.removeEventListener(key, eventMap[key], false);
        });
    };

    Dropdown.prototype.addEventsToDocument = function addEventsToDocument(eventMap) {
        Object.keys(eventMap).forEach(function (key) {
            document.addEventListener(key, eventMap[key], false);
        });
    };

    Dropdown.prototype.targetIsDescendant = function targetIsDescendant(event, parent) {
        var node = event.target;
        while (node !== null) {
            if (node === parent) return true;
            node = node.parentNode;
        }
        return false;
    };

    Dropdown.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
        if (!this.state.active && nextState.active) {
            this.addEventsToDocument(this.getDocumentEvents());
        }
    };

    Dropdown.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        if (prevState.active && !this.state.active) {
            this.removeEventsFromDocument(this.getDocumentEvents());
        }
    };

    Dropdown.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.state.active) {
            this.removeEventsFromDocument(this.getDocumentEvents());
        }
    };

    Dropdown.prototype.onClick = function onClick(event) {
        this.open(event);
        event.preventDefault();
    };

    Dropdown.prototype.open = function open(event) {
        if (this.state.active) return;
        var client = event.target.getBoundingClientRect();
        var screenHeight = window.innerHeight || document.documentElement.offsetHeight;
        var up = this.props.auto ? client.top > screenHeight / 2 + client.height : false;
        this.setState({ active: true, up: up });
    };

    Dropdown.prototype.render = function render() {
        var _props = this.props,
            source = _props.source,
            labelKey = _props.labelKey,
            onChange = _props.onChange,
            onFocus = _props.onFocus,
            onBlur = _props.onBlur,
            props = _objectWithoutProperties(_props, ['source', 'labelKey', 'onChange', 'onFocus', 'onBlur']);

        var selected = this.getSelectedItem();
        var listClass = this.state.active ? 'list' : 'list-hide';

        return _react2.default.createElement(
            'div',
            { styleName: 'wrapper',
                onBlur: this.handleBlur,
                onFocus: this.handleFocus
            },
            _react2.default.createElement(
                'a',
                { href: '#', onClick: this.onClick.bind(this), styleName: 'switcher' },
                selected && selected[labelKey] ? selected[labelKey] : ''
            ),
            _react2.default.createElement(
                'ul',
                { styleName: listClass },
                source.map(this.renderValue)
            )
        );
    };

    return Dropdown;
}(_react.Component), _class.defaultProps = {
    className: '',
    disabled: false,
    labelKey: 'label',
    valueKey: 'value'
}, _temp2);
process.env.NODE_ENV !== "production" ? Dropdown.propTypes = {
    source: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])).isRequired,
    valueKey: _propTypes2.default.string,
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    onBlur: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onClick: _propTypes2.default.func
} : void 0;
exports.default = (0, _reactCssModules2.default)(Dropdown, _dropdown2.default);
module.exports = exports['default'];