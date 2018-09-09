import React from 'react';
import uuid from 'uuid';
import {hot} from 'react-hot-loader';
import style from './App.css';
import Title from '../components/Title.js';
import TodoList from '../components/TodoList.js';
import TodoForm from '../components/TodoForm.js';

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
            filteredData: []
        };
        this.state.filteredData = this.state.data;
        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.filterTodoList = this.filterTodoList.bind(this);
    }
    addTodo(val) {
        const todo = {
            id: uuid.v4(),
            text: val
        };
        const data = [...this.state.data, todo];
        this.setState(function() {
            this.state.data = data;
        });
        this.showFilteredData();
    }
    filterTodoList(event) {
        event.persist();
        this.setState(function() {
            this.state.filterText = event.target.value;
        });
        this.showFilteredData();
    }
    removeTodo(id) {
        const remainder = this.state.data.filter(todo => todo.id !== id);
        this.setState(function() {
            this.state.data = remainder;
        });
        this.showFilteredData();
    }
    showFilteredData() {
        this.setState(function() {
            this.state.filterText !== '' ?
                this.state.filteredData = this.state.data.filter(todo => todo.text.toLowerCase().includes(this.state.filterText.toLowerCase())) :
                this.state.filteredData = this.state.data;
            return this.state;
        });
    }
    render() {
        return (
            <div className={style.TodoApp}>
                <Title title='Webpack + React' data={this.state.data}/>
                <TodoForm add={this.addTodo}/>
                <br/>
                Search list:
                <input type='text' value={this.state.filterText} onChange={this.filterTodoList}/>
                <TodoList data={this.state.filteredData} remove={this.removeTodo}/>
            </div>
        );
    }
}

export default hot(module)(App);