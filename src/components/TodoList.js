import React from 'react';
import style from './TodoList.css';

const TodoList = props => 
    <ol>
        {props.data.map((elem) => 
        <li key={elem.id} onClick={() => props.remove(elem.id)} className={style.TodoListItem}>{elem.text}</li>)}
    </ol>

export default TodoList;
