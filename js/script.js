class Stopwatch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: new Date().getUTCMilliseconds(),
            running: false,
            resultsArray: [],
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
    }

    pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }

    start() {
        if (!this.state.running) {
            this.setState({running: true});
            this.watch = setInterval(() => this.calculate(), 10);
        }
    }

    calculate() {
        if (!this.state.running) return;
        this.setState(function() {
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

    stop() {
        this.setState({
            running: false
        });
        clearInterval(this.watch);
    }

    reset() {
        if(this.state.running) this.stop();
        this.setState({
            times: {
                miliseconds: 0,
                seconds: 0,
                minutes: 0
            }
        });
    }

    split() {
        this.setState(function() {
            this.state.resultsArray = this.state.resultsArray.push(`${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`)
        });
    }

    clear() {
        this.setState({
            resultsArray: []
        })
    }

    render() {
        return (
            <div>
                <div className="controls">
                    <a href="#" className="button" onClick={() => this.start()} id={"start-" + this.state.id}>Start</a>
                    <a href="#" className="button" onClick={() => this.stop()} id={"stop-" + this.state.id}>Stop</a>
                    <a href="#" className="button" onClick={() => this.reset()} id={"reset-" + this.state.id}>Reset</a>
                    <a href="#" className="button" onClick={() => this.split()} id={"split-" + this.state.id}>Split</a>
                    <a href="#" className="button" onClick={() => this.clear()} id={"clear-" + this.state.id}>Clear</a>
                </div>
                <Display
                    stopwatchID={this.state.id}
                    time={`${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`}
                    running={this.state.running}
                />
                <Results
                    stopwatchID={this.state.id}
                    resultsArray={this.state.resultsArray}
                />
            </div>
        );
    }
}

const Display = props =>
    <div className={`display${props.running ? " running" : ""}`} id={"display-" + props.stopwatchID}>
        <p>{props.time}</p>
    </div>

const Results = props =>
    <div className="results" id={"results-" + props.stopwatchID}>
        <ol>
            {props.resultsArray.map((result, index) => 
            <li key={index}>{result}</li>)}
        </ol>
    </div>

ReactDOM.render(
    <Stopwatch />,
    document.querySelector('.app')
);