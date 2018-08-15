var Counter = React.createClass( {

    getDefaultProps: function() {
        console.log("Tutaj można określić domyślne wartości propsów komponentu, jeśli nie zostały przekazane z zewnątrz.");
    },

    getInitialState: function() {
        console.log("Tutaj trzeba określić początkowy stan naszego komponentu. Funkcja powinna zwracać obiekt.");
        return {
            counter: 0
        };
    },

    componentWillMount: function() {
        console.log("Tutaj można np. ustawić stan komponentu, co jednak nie spowoduje jeszcze jego przerenderowania. W najnowszych wersjach nie używa się już tej funkcji.");
    },

    increment: function() {
        this.setState({
            counter: this.state.counter + 1
        });
    },

    decrement: function() {
        this.setState({
            counter: this.state.counter - 1
        });
    },

    render: function() {
        return React.createElement('div', {},
            React.createElement('button', {onClick: this.increment}, "Counter +1"),
            React.createElement('button', {onClick: this.decrement}, "Counter -1"),
            React.createElement('span', {}, 'Counter: ' + this.state.counter)
        );
    },

    componentDidMount: function() {
        console.log("W tym momencie komponent jest już zamontowany w drzewie DOM. Dopiero teraz można wykonywać inne operacje.");
    },

    componentWillReceiveProps: function() {
        console.log("Tutaj do komponentu mogą zostać przekazane propsy (nie stan). W najnowszych wersjach zastąpiona przez getDerivedStateFromProps");
    },

    shouldComponentUpdate: function() {
        console.log("Ta funkcja zwraca informację o tym, czy zachodzi potrzeba przerysowwania drzewa DOM i zwraca true/false. Można zastosować ją do optymalizacji aplikacji.");
        return true;
    },

    componentWillUpdate: function() {
        console.log("Wywoływana w celu przygotowania komponentu do nadchodzących zmian. Nie można tutaj ustawić stanu komponentu (setState). Zastąpiona przez getSnapshotBeforeUpdate");
    },

    componentDidUpdate: function() {
        console.log("Tutaj możemy wykonywać różne operacje, analogicznie jak przy componentDidMount");
    },

    componentWillUnmount: function() {
        console.log("Tutaj można usunąć wszystkie niepotrzebne elementy związane z usuwanym komponentem. Odpinać timery, eventListenery itp.");
    }

});

var counter1 = React.createElement(Counter);
var counter2 = React.createElement(Counter);
var counter3 = React.createElement(Counter);

ReactDOM.render(counter1, document.getElementById('counter1'));
ReactDOM.render(counter2, document.getElementById('counter2'));
ReactDOM.render(counter3, document.getElementById('counter3'));