class App extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: '',
            messageText: '',
            users: [],
            result: 1
        };
    }
  
    onChangeHandle(event) {
        this.setState({searchText: event.target.value});
    }

    onError(error) {
        this.setState({
            result: error.message
        })
        switch(this.state.result) {
            case '-1':
                this.setState({
                    messageText: `No matching users found.`,
                    users: []
                })
                break;
            default:
                this.setState({
                    messageText: `An error has occured. Server error status code: ${error.message}. Application status code: ${this.state.result}.`,
                    users: [],
                })
                console.error(`Error: ${error.message}`);
                break;
        }
    }

    onSubmit(event) {
        event.preventDefault();
        const {searchText} = this.state;
        const url = `https://api.github.com/search/users?q=${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if(responseJson.total_count === 0) {
                    throw Error('-1');
                }
                else
                    this.setState({
                        users: responseJson.items
                    })
            })
            .catch(error => this.onError(error));
    }
  
    render() {
        return (
            <div>
                <form onSubmit={event => this.onSubmit(event)}>
                    <label htmlFor="searchText">Search by user name</label>
                    <input
                        type="text"
                        id="searchText"
                        onChange={event => this.onChangeHandle(event)}
                        value={this.state.searchText}/>
                </form>
                <div className="message-box">
                    <p>{this.state.messageText}</p>
                </div>
                <UsersList users={this.state.users}/>
            </div>
        );
    }
}

class UsersList extends React.Component {
    get users() {
        return this.props.users.map(user => <User key={user.id} user={user}/>);
    }
  
    render() {
        return (
            <div className="user-list">
                {this.users}
            </div>
        );
    }
}

class User extends React.Component {
    render() {
        return (
            <div className="user">
                <img src={this.props.user.avatar_url} style={{maxWidth: '100px'}}/>
                <a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);