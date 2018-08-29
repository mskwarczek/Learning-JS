class Stopwatch extends React.Component {

    constructor(props) {
        super();
        this.state = {
            running: false,
            display: null,
            results: null,
            resultsArray: []
        };
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    componentDidMount() {
        console.log("Inside componentDidMount");
        this.setState({
            display: document.querySelector('.display'),
            results: document.querySelector('.results')
        })

        let startButton = document.getElementById('start');
        startButton.addEventListener('click', () => this.start());

        let stopButton = document.getElementById('stop');
        stopButton.addEventListener('click', () => this.stop());

        let resetButton = document.getElementById('reset');
        resetButton.addEventListener('click', () => this.reset());

        let splitButton = document.getElementById('split');
        splitButton.addEventListener('click', () => this.split());

        let clearButton = document.getElementById('clear');
        clearButton.addEventListener('click', () => this.clear());
    }

    setTime0() {
        console.log("Inside setTime0");
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    print() {
        console.log("Inside print");
        ReactDOM.render(
            <p>{pad0(this.times.minutes)}:{pad0(this.times.seconds)}:{pad0(Math.floor(this.times.miliseconds))}</p>,
            this.state.display
        );
    }

    start() {
        console.log("Inside start");
        if (!this.state.running) {
            this.setState({running: true});
            this.watch = setInterval(() => this.step(), 10);
            this.state.display.classList.add('running');
        }
    }

    step() {
        console.log("Inside step");
        if (!this.state.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
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

    stop() {
        console.log("Inside stop");
        this.setState({
            running: false
        });
        clearInterval(this.watch);
        this.state.display.classList.remove('running');
    }

    reset() {
        console.log("Inside reset");
        if(this.state.running) this.stop();
        this.setTime0();
        this.print();
    }

    split() {
        console.log("Inside split");
        this.setState(function() {
            return this.state.resultsArray = this.state.resultsArray.push(`${pad0(this.times.minutes)}:${pad0(this.times.seconds)}:${pad0(Math.floor(this.times.miliseconds))}`)
        });
        let listResults = this.state.resultsArray.map((result, index) => 
            <li key={index}>{result}</li>);
        ReactDOM.render(
            <ol>
                {listResults}
            </ol>,
            this.state.results
        );
    }

    clear() {
        console.log("Inside clear");
        this.setState({
            resultsArray: []
        })
        ReactDOM.unmountComponentAtNode(this.state.results);
    }

    render() {
        console.log("Inside render");
        return (
            <div>
                <div className="controls">
                    <a href="#" className="button" id="start">Start</a>
                    <a href="#" className="button" id="stop">Stop</a>
                    <a href="#" className="button" id="reset">Reset</a>
                    <a href="#" className="button" id="split">Split</a>
                    <a href="#" className="button" id="clear">Clear</a>
                </div>
                <div className="display">
                    <p>{pad0(this.times.minutes)}:{pad0(this.times.seconds)}:{pad0(Math.floor(this.times.miliseconds))}</p>
                </div>
                <div className="results">
                </div>
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

ReactDOM.render(
    <Stopwatch />,
    document.querySelector('.app')
);


