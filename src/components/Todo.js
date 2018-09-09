import React from 'react';
import style from './Todo.css';

const Todo = props => 
        <li onClick={() => props.remove(props.id)} className={style.TodoListItem}>{props.text}</li>

export default Todo;
