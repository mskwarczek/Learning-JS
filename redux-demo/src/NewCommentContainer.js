import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from './actions'

class NewCommentContainer extends Component {
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
        this.props.dispatch(addComment(this.state.value));
        event.preventDefault();
      }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Your comment: <br />
                    <textarea value={this.state.value} onChange={this.handleChange} className="newComment"/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

const mapStateToProps = state => ({
    comments: state.comments
});

export default connect(mapStateToProps)(NewCommentContainer);
