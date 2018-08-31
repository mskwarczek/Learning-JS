'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {
            searchText: '',
            messageText: '',
            users: [],
            result: 1
        };
        return _this;
    }

    _createClass(App, [{
        key: 'onChangeHandle',
        value: function onChangeHandle(event) {
            this.setState({ searchText: event.target.value });
        }
    }, {
        key: 'onError',
        value: function onError(error) {
            this.setState({
                result: error.message
            });
            switch (this.state.result) {
                case '-1':
                    this.setState({
                        messageText: 'No matching users found.',
                        users: []
                    });
                    break;
                default:
                    this.setState({
                        messageText: 'An error has occured. Server error status code: ' + error.message + '. Application status code: ' + this.state.result + '.',
                        users: []
                    });
                    console.error('Error: ' + error.message);
                    break;
            }
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(event) {
            var _this2 = this;

            event.preventDefault();
            var searchText = this.state.searchText;

            var url = 'https://api.github.com/search/users?q=' + searchText;
            fetch(url).then(function (response) {
                return response.json();
            }).then(function (responseJson) {
                if (responseJson.total_count === 0) {
                    throw Error('-1');
                } else _this2.setState({
                    users: responseJson.items
                });
            }).catch(function (error) {
                return _this2.onError(error);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { onSubmit: function onSubmit(event) {
                            return _this3.onSubmit(event);
                        } },
                    React.createElement(
                        'label',
                        { htmlFor: 'searchText' },
                        'Search by user name'
                    ),
                    React.createElement('input', {
                        type: 'text',
                        id: 'searchText',
                        onChange: function onChange(event) {
                            return _this3.onChangeHandle(event);
                        },
                        value: this.state.searchText })
                ),
                React.createElement(
                    'div',
                    { className: 'message-box' },
                    React.createElement(
                        'p',
                        null,
                        this.state.messageText
                    )
                ),
                React.createElement(UsersList, { users: this.state.users })
            );
        }
    }]);

    return App;
}(React.Component);

var UsersList = function (_React$Component2) {
    _inherits(UsersList, _React$Component2);

    function UsersList() {
        _classCallCheck(this, UsersList);

        return _possibleConstructorReturn(this, (UsersList.__proto__ || Object.getPrototypeOf(UsersList)).apply(this, arguments));
    }

    _createClass(UsersList, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'user-list' },
                this.users
            );
        }
    }, {
        key: 'users',
        get: function get() {
            return this.props.users.map(function (user) {
                return React.createElement(User, { key: user.id, user: user });
            });
        }
    }]);

    return UsersList;
}(React.Component);

var User = function (_React$Component3) {
    _inherits(User, _React$Component3);

    function User() {
        _classCallCheck(this, User);

        return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).apply(this, arguments));
    }

    _createClass(User, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'user' },
                React.createElement('img', { src: this.props.user.avatar_url, style: { maxWidth: '100px' } }),
                React.createElement(
                    'a',
                    { href: this.props.user.html_url, target: '_blank' },
                    this.props.user.login
                )
            );
        }
    }]);

    return User;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
