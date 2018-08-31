import React from 'react';

const Title = props => 
    <div>
        <h1>{props.title}</h1>
        <h2>Number of tasks: {props.data.length}.</h2>
    </div>

export default Title;