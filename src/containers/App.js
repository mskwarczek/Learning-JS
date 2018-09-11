import React from 'react';
import uuid from 'uuid';
import style from './App.css';
import Title from '../components/Title.js'
import TodoList from '../components/TodoList.js'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [{
                    id: 1,
                    text: 'clean room'
                }, {
                    id: 2,
                    text: 'wash the dishes'
                }, {
                    id: 3,
                    text: 'feed my cat'
                }],
            filterText: '',
        };
        this.removeTodo = this.removeTodo.bind(this);
        this.filterTodoList = this.filterTodoList.bind(this);
    }
    addTodo(val){
        const todo = {
            id: uuid.v4(),
            text: val
        };
        const data = [...this.state.data, todo];
        this.setState({data});
    }
    filterTodoList(event) {
        event.persist();
        this.setState({filterText: event.target.value});
    }
    removeTodo(id) {
        const remainder = this.state.data.filter(todo => todo.id !== id);
        this.setState({data: remainder});
    }
    render() {
        let filteredData = [];
        this.state.filterText !== '' ?
                filteredData = this.state.data.filter(todo => todo.text.toLowerCase().includes(this.state.filterText.toLowerCase())) :
                filteredData = this.state.data;
        return (
            <div className={style.TodoApp}>
                <Title title='Webpack + React' data={this.state.data}/>
                <input type='text' value={this.state.filterText} onChange={this.filterTodoList}/>
                <TodoList data={filteredData} remove={this.removeTodo}/>
            </div>
        );
    }
}

export default App;
