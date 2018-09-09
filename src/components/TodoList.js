import React from 'react';
import Todo from '../components/Todo.js'

const TodoList = props => 
    <ol>
        {props.data.map((elem) => 
        <Todo key={elem.id} id={elem.id} remove={props.remove} text={elem.text}/>)}
    </ol>

export default TodoList;