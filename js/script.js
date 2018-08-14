var movies = [
    {
        id: 1,
        title: 'Harry Potter',
        desc: 'Film o czarodzieju',
        pic: 'https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_.jpg'
    },
    {
        id: 2,
        title: 'Król Lew',
        desc: 'Film o królu sawanny',
        pic: 'https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SY1000_CR0,0,673,1000_AL_.jpg'
    },
    {
        id: 3,
        title: 'Ojciec Chrzestny',
        desc: 'Film o włoskiej mafii w USA',
        pic: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,704,1000_AL_.jpg'
    },
    {
        id: 4,
        title: 'Incepcja',
        desc: 'Film o ingerencji w ludzkie sny',
        pic: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg'
    },
    {
        id: 5,
        title: 'Milczenie owiec',
        desc: 'Film o seryjnym mordercy i agentce FBI',
        pic: 'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,677,1000_AL_.jpg'
    }
];

var config = {
    moviePicHeight: '300px'
};

var MovieTitle = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired
    },
    render: function() {
        return React.createElement('h2', {}, this.props.title);
    }
});

var MovieDescription = React.createClass({
    propTypes: {
        desc: React.PropTypes.string.isRequired
    },
    render: function() {
        return React.createElement('p', {}, this.props.desc);
    }
});

var MovieImage = React.createClass({
    propTypes: {
        src: React.PropTypes.string.isRequired,
        height: React.PropTypes.string.isRequired
    },
    render: function() {
        return React.createElement('img', {src: this.props.src, height: this.props.height});
    }
});

var Movie = React.createClass({
    propTypes: {
        movie: React.PropTypes.object.isRequired,
    },
    render: function() {
        return (
            React.createElement('li', {},
                React.createElement(MovieTitle, {title: this.props.movie.title}),
                React.createElement(MovieDescription, {desc: this.props.movie.desc}),
                React.createElement(MovieImage, {src: this.props.movie.pic, height: config.moviePicHeight})
            )
        )
    }
});

var MoviesList = React.createClass({
    propTypes: {
        arr: React.PropTypes.array.isRequired
    },
    render: function() {
        return (
            React.createElement('div', {},
                React.createElement('h1', {}, 'Lista filmów'),
                React.createElement('ul', {}, 
                    this.props.arr.map(function(elem) {
                        return React.createElement(Movie, {movie: elem, key: elem.id});
                    })
                )
            )
        )
    }
});

var element = React.createElement(MoviesList, {arr: movies});
ReactDOM.render(element, document.getElementById('app'));
