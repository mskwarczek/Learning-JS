class Stopwatch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
    }

    componentDidMount() {
        this.setState({
            display: document.getElementById(`display-${this.state.id}`),
            results: document.getElementById(`results-${this.state.id}`)
        })

        let startButton = document.getElementById(`start-${this.state.id}`);
        startButton.addEventListener('click', () => this.start());

        let stopButton = document.getElementById(`stop-${this.state.id}`);
        stopButton.addEventListener('click', () => this.stop());

        let resetButton = document.getElementById(`reset-${this.state.id}`);
        resetButton.addEventListener('click', () => this.reset());

        let splitButton = document.getElementById(`split-${this.state.id}`);
        splitButton.addEventListener('click', () => this.split());

        let clearButton = document.getElementById(`clear-${this.state.id}`);
        clearButton.addEventListener('click', () => this.clear());
    }

    setTime0() {
        this.state.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    print() {
        updateStateDisplay(this.state.times);
    }

    start() {
        if (!this.state.running) {
            this.setState({running: true});
            this.watch = setInterval(() => this.step(), 10);
            this.state.display.classList.add('running');
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
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

    stop() {
        this.setState({
            running: false
        });
        clearInterval(this.watch);
        this.state.display.classList.remove('running');
    }

    reset() {
        if(this.state.running) this.stop();
        this.setTime0();
        this.print();
    }

    split() {
        this.setState(function() {
            return this.state.resultsArray = this.state.resultsArray.push(`${pad0(this.state.times.minutes)}:${pad0(this.state.times.seconds)}:${pad0(Math.floor(this.state.times.miliseconds))}`)
        });
        updateStateResults(this.state.resultsArray);
    }

    clear() {
        this.setState({
            resultsArray: []
        })
        updateStateResults(this.state.resultsArray);
    }

    render() {
        return (
            <div>
                <div className="controls">
                    <a href="#" className="button" id={"start-" + this.state.id}>Start</a>
                    <a href="#" className="button" id={"stop-" + this.state.id}>Stop</a>
                    <a href="#" className="button" id={"reset-" + this.state.id}>Reset</a>
                    <a href="#" className="button" id={"split-" + this.state.id}>Split</a>
                    <a href="#" className="button" id={"clear-" + this.state.id}>Clear</a>
                </div>
                <Display times={this.state.times} stopwatchID={this.state.id}/>
                <Results stopwatchID={this.state.id}/>
            </div>
        );
    }
}

class Display extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stopwatchID: this.props.stopwatchID,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        }
        updateStateDisplay = updateStateDisplay.bind(this)
    }
    render() {
        return (
            <div className="display" id={"display-" + this.state.stopwatchID}>
                <p>{pad0(this.state.times.minutes)}:{pad0(this.state.times.seconds)}:{pad0(Math.floor(this.state.times.miliseconds))}</p>
            </div>
        );
    }
}

class Results extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stopwatchID: this.props.stopwatchID,
            resultsArray: []
        }
        updateStateResults = updateStateResults.bind(this)
    }

    render() {
        let listResults = this.state.resultsArray.map((result, index) => 
            <li key={index}>{result}</li>);
        return (
            <div className="results" id={"results-" + this.state.stopwatchID}>
            <ol>
                {listResults}
            </ol>
            </div>
        );
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

function updateStateDisplay(times){
    this.setState({times});
}

function updateStateResults(resultsArray){
    this.setState({resultsArray});
}

ReactDOM.render(
    <Stopwatch />,
    document.querySelector('.app')
);