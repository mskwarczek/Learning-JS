"use strict";

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
        key: "pad0",
        value: function pad0(value) {
            var result = value.toString();
            if (result.length < 2) {
                result = '0' + result;
            }
            return result;
        }
    }, {
        key: "start",
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                this.setState({ running: true });
                this.watch = setInterval(function () {
                    return _this2.calculate();
                }, 10);
            }
        }
    }, {
        key: "calculate",
        value: function calculate() {
            if (!this.state.running) return;
            this.setState(function () {
                this.state.times.miliseconds += 1;
                if (this.state.times.miliseconds >= 100) {
                    this.state.times.seconds += 1;
                    this.state.times.miliseconds = 0;
                }
                if (this.state.times.seconds >= 60) {
                    this.state.times.minutes += 1;
                    this.state.times.seconds = 0;
                }
            });
        }
    }, {
        key: "stop",
        value: function stop() {
            this.setState({
                running: false
            });
            clearInterval(this.watch);
        }
    }, {
        key: "reset",
        value: function reset() {
            if (this.state.running) this.stop();
            this.setState({
                times: {
                    miliseconds: 0,
                    seconds: 0,
                    minutes: 0
                }
            });
        }
    }, {
        key: "split",
        value: function split() {
            this.setState(function () {
                this.state.resultsArray = this.state.resultsArray.push(this.pad0(this.state.times.minutes) + ":" + this.pad0(this.state.times.seconds) + ":" + this.pad0(Math.floor(this.state.times.miliseconds)));
            });
        }
    }, {
        key: "clear",
        value: function clear() {
            this.setState({
                resultsArray: []
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "controls" },
                    React.createElement(
                        "a",
                        { href: "#", className: "button", onClick: function onClick() {
                                return _this3.start();
                            }, id: "start-" + this.state.id },
                        "Start"
                    ),
                    React.createElement(
                        "a",
                        { href: "#", className: "button", onClick: function onClick() {
                                return _this3.stop();
                            }, id: "stop-" + this.state.id },
                        "Stop"
                    ),
                    React.createElement(
                        "a",
                        { href: "#", className: "button", onClick: function onClick() {
                                return _this3.reset();
                            }, id: "reset-" + this.state.id },
                        "Reset"
                    ),
                    React.createElement(
                        "a",
                        { href: "#", className: "button", onClick: function onClick() {
                                return _this3.split();
                            }, id: "split-" + this.state.id },
                        "Split"
                    ),
                    React.createElement(
                        "a",
                        { href: "#", className: "button", onClick: function onClick() {
                                return _this3.clear();
                            }, id: "clear-" + this.state.id },
                        "Clear"
                    )
                ),
                React.createElement(Display, {
                    stopwatchID: this.state.id,
                    time: this.pad0(this.state.times.minutes) + ":" + this.pad0(this.state.times.seconds) + ":" + this.pad0(Math.floor(this.state.times.miliseconds)),
                    running: this.state.running
                }),
                React.createElement(Results, {
                    stopwatchID: this.state.id,
                    resultsArray: this.state.resultsArray
                })
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

var Display = function Display(props) {
    return React.createElement(
        "div",
        { className: "display" + (props.running ? " running" : ""), id: "display-" + props.stopwatchID },
        React.createElement(
            "p",
            null,
            props.time
        )
    );
};

var Results = function Results(props) {
    return React.createElement(
        "div",
        { className: "results", id: "results-" + props.stopwatchID },
        React.createElement(
            "ol",
            null,
            props.resultsArray.map(function (result, index) {
                return React.createElement(
                    "li",
                    { key: index },
                    result
                );
            })
        )
    );
};

ReactDOM.render(React.createElement(Stopwatch, null), document.querySelector('.app'));
