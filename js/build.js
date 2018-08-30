'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

        _this.state = {
            id: new Date().getUTCMilliseconds(),
            running: false,
            display: null,
            results: null,
            resultsArray: [],
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        return _this;
    }

    _createClass(Stopwatch, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.setState({
                display: document.getElementById('display-' + this.state.id),
                results: document.getElementById('results-' + this.state.id)
            });

            var startButton = document.getElementById('start-' + this.state.id);
            startButton.addEventListener('click', function () {
                return _this2.start();
            });

            var stopButton = document.getElementById('stop-' + this.state.id);
            stopButton.addEventListener('click', function () {
                return _this2.stop();
            });

            var resetButton = document.getElementById('reset-' + this.state.id);
            resetButton.addEventListener('click', function () {
                return _this2.reset();
            });

            var splitButton = document.getElementById('split-' + this.state.id);
            splitButton.addEventListener('click', function () {
                return _this2.split();
            });

            var clearButton = document.getElementById('clear-' + this.state.id);
            clearButton.addEventListener('click', function () {
                return _this2.clear();
            });
        }
    }, {
        key: 'setTime0',
        value: function setTime0() {
            this.state.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
        }
    }, {
        key: 'print',
        value: function print() {
            updateStateDisplay(this.state.times);
        }
    }, {
        key: 'start',
        value: function start() {
            var _this3 = this;

            if (!this.state.running) {
                this.setState({ running: true });
                this.watch = setInterval(function () {
                    return _this3.step();
                }, 10);
                this.state.display.classList.add('running');
            }
        }
    }, {
        key: 'step',
        value: function step() {
            if (!this.state.running) return;
            this.calculate();
            this.print();
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            this.state.times.miliseconds += 1;
            if (this.state.times.miliseconds >= 100) {
                this.state.times.seconds += 1;
                this.state.times.miliseconds = 0;
            }
            if (this.state.times.seconds >= 60) {
                this.state.times.minutes += 1;
                this.state.times.seconds = 0;
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.setState({
                running: false
            });
            clearInterval(this.watch);
            this.state.display.classList.remove('running');
        }
    }, {
        key: 'reset',
        value: function reset() {
            if (this.state.running) this.stop();
            this.setTime0();
            this.print();
        }
    }, {
        key: 'split',
        value: function split() {
            this.setState(function () {
                return this.state.resultsArray = this.state.resultsArray.push(pad0(this.state.times.minutes) + ':' + pad0(this.state.times.seconds) + ':' + pad0(Math.floor(this.state.times.miliseconds)));
            });
            updateStateResults(this.state.resultsArray);
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.setState({
                resultsArray: []
            });
            updateStateResults(this.state.resultsArray);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'controls' },
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: "start-" + this.state.id },
                        'Start'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: "stop-" + this.state.id },
                        'Stop'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: "reset-" + this.state.id },
                        'Reset'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: "split-" + this.state.id },
                        'Split'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: "clear-" + this.state.id },
                        'Clear'
                    )
                ),
                React.createElement(Display, { times: this.state.times, stopwatchID: this.state.id }),
                React.createElement(Results, { stopwatchID: this.state.id })
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

var Display = function (_React$Component2) {
    _inherits(Display, _React$Component2);

    function Display(props) {
        _classCallCheck(this, Display);

        var _this4 = _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).call(this, props));

        _this4.state = {
            stopwatchID: _this4.props.stopwatchID,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        updateStateDisplay = updateStateDisplay.bind(_this4);
        return _this4;
    }

    _createClass(Display, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'display', id: "display-" + this.state.stopwatchID },
                React.createElement(
                    'p',
                    null,
                    pad0(this.state.times.minutes),
                    ':',
                    pad0(this.state.times.seconds),
                    ':',
                    pad0(Math.floor(this.state.times.miliseconds))
                )
            );
        }
    }]);

    return Display;
}(React.Component);

var Results = function (_React$Component3) {
    _inherits(Results, _React$Component3);

    function Results(props) {
        _classCallCheck(this, Results);

        var _this5 = _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).call(this, props));

        _this5.state = {
            stopwatchID: _this5.props.stopwatchID,
            resultsArray: []
        };
        updateStateResults = updateStateResults.bind(_this5);
        return _this5;
    }

    _createClass(Results, [{
        key: 'render',
        value: function render() {
            var listResults = this.state.resultsArray.map(function (result, index) {
                return React.createElement(
                    'li',
                    { key: index },
                    result
                );
            });
            return React.createElement(
                'div',
                { className: 'results', id: "results-" + this.state.stopwatchID },
                React.createElement(
                    'ol',
                    null,
                    listResults
                )
            );
        }
    }]);

    return Results;
}(React.Component);

function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

function updateStateDisplay(times) {
    this.setState({ times: times });
}

function updateStateResults(resultsArray) {
    this.setState({ resultsArray: resultsArray });
}

ReactDOM.render(React.createElement(Stopwatch, null), document.querySelector('.app'));
