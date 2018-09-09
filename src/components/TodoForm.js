import React from 'react';

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        this.props.add(this.state.value);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Add new Todo:<br/>
                    <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                </label>
                <input type="submit" value="Submit"></input>
            </form>
        )
    }
}

export default TodoForm;