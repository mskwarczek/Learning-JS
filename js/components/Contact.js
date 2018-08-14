var Contact = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
    },
  
    render: function() {
        return (
            React.createElement('div', {className: 'contactItem'},
                React.createElement('img', {
                    className: 'contactImage',
                    src: 'http://icons.veryicon.com/png/System/Qetto%202/contacts.png'
                }),
                React.createElement('p', {className: 'contactFirstName'}, 'Imię: ' + this.props.item.firstName),
                React.createElement('p', {className: 'contactLastName'}, 'Nazwisko: ' + this.props.item.lastName),
                React.createElement('a', {className: 'contactEmail', href: 'mailto:' + this.props.item.email},
                this.props.item.email)
            )
        )
    },
});