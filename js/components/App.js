var GIPHY_PUB_KEY = 'dc6zaTOxFJmzC';

App = React.createClass({

    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    getGif: function(searchingText) {
        const url = 'http://api.giphy.com//v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        return (
            fetch(url)
            .then(response => {
                if (response.ok === true) {
                    return response.json();
                } else
                    throw new Error(`${response.status}, ${response.statusText}`);
            })
            .then(response => {
                if (response.data.type === 'gif') {
                    var gif = {
                        url: response.data.fixed_width_downsampled_url,
                        sourceUrl: response.data.url
                    };
                    return(gif);
                }
                else {
                    throw new Error (`Unable to find gif with given description: "${searchingText}"`);
                }
            })
            .catch(error => {
                console.log(`Unable to get gif from ${url}. ${error}.`);
                var gif = {};
                return(gif);
            })
        )
    },

    handleSearch: function(searchingText) {
        this.setState({
            loading: true
        });
        this.getGif(searchingText)
            .then (gif => {
                this.setState({
                    loading: false,
                    gif: gif,
                    searchingText: searchingText
                });
            })
    },

    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
            <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search 
                    onSearch={this.handleSearch}
                />
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>
        );
    }
});