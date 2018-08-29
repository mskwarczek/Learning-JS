'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

        _this.state = {
            running: false,
            display: null,
            results: null,
            resultsArray: []
        };
        _this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
        return _this;
    }

    _createClass(Stopwatch, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            console.log("Inside componentDidMount");
            this.setState({
                display: document.querySelector('.display'),
                results: document.querySelector('.results')
            });

            var startButton = document.getElementById('start');
            startButton.addEventListener('click', function () {
                return _this2.start();
            });

            var stopButton = document.getElementById('stop');
            stopButton.addEventListener('click', function () {
                return _this2.stop();
            });

            var resetButton = document.getElementById('reset');
            resetButton.addEventListener('click', function () {
                return _this2.reset();
            });

            var splitButton = document.getElementById('split');
            splitButton.addEventListener('click', function () {
                return _this2.split();
            });

            var clearButton = document.getElementById('clear');
            clearButton.addEventListener('click', function () {
                return _this2.clear();
            });
        }
    }, {
        key: 'setTime0',
        value: function setTime0() {
            console.log("Inside setTime0");
            this.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
        }
    }, {
        key: 'print',
        value: function print() {
            console.log("Inside print");
            ReactDOM.render(React.createElement(
                'p',
                null,
                pad0(this.times.minutes),
                ':',
                pad0(this.times.seconds),
                ':',
                pad0(Math.floor(this.times.miliseconds))
            ), this.state.display);
        }
    }, {
        key: 'start',
        value: function start() {
            var _this3 = this;

            console.log("Inside start");
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
            console.log("Inside step");
            if (!this.state.running) return;
            this.calculate();
            this.print();
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            console.log("Inside calculate");
            this.times.miliseconds += 1;
            if (this.times.miliseconds >= 100) {
                this.times.seconds += 1;
                this.times.miliseconds = 0;
            }
            if (this.times.seconds >= 60) {
                this.times.minutes += 1;
                this.times.seconds = 0;
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            console.log("Inside stop");
            this.setState({
                running: false
            });
            clearInterval(this.watch);
            this.state.display.classList.remove('running');
        }
    }, {
        key: 'reset',
        value: function reset() {
            console.log("Inside reset");
            if (this.state.running) this.stop();
            this.setTime0();
            this.print();
        }
    }, {
        key: 'split',
        value: function split() {
            console.log("Inside split");
            this.setState(function () {
                return this.state.resultsArray = this.state.resultsArray.push(pad0(this.times.minutes) + ':' + pad0(this.times.seconds) + ':' + pad0(Math.floor(this.times.miliseconds)));
            });
            var listResults = this.state.resultsArray.map(function (result, index) {
                return React.createElement(
                    'li',
                    { key: index },
                    result
                );
            });
            ReactDOM.render(React.createElement(
                'ol',
                null,
                listResults
            ), this.state.results);
        }
    }, {
        key: 'clear',
        value: function clear() {
            console.log("Inside clear");
            this.setState({
                resultsArray: []
            });
            ReactDOM.unmountComponentAtNode(this.state.results);
        }
    }, {
        key: 'render',
        value: function render() {
            console.log("Inside render");
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'controls' },
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'start' },
                        'Start'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'stop' },
                        'Stop'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'reset' },
                        'Reset'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'split' },
                        'Split'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'clear' },
                        'Clear'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'display' },
                    React.createElement(
                        'p',
                        null,
                        pad0(this.times.minutes),
                        ':',
                        pad0(this.times.seconds),
                        ':',
                        pad0(Math.floor(this.times.miliseconds))
                    )
                ),
                React.createElement('div', { className: 'results' })
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(React.createElement(Stopwatch, null), document.querySelector('.app'));
