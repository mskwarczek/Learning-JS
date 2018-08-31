var GIPHY_PUB_KEY = 'dc6zaTOxFJmzC';

function makeRequest(method, url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } 
            else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}
  
App = React.createClass({

    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    getGif: function(searchingText, callback) {
        const url = 'http://api.giphy.com//v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        makeRequest('GET', url)
            .then(response => {
                response = JSON.parse(response).data;
                return response;
            })
            .then(response => {
                if (response.type === 'gif') {
                    var gif = {
                        url: response.fixed_width_downsampled_url,
                        sourceUrl: response.url
                    };
                    callback(gif);
                }
                else {
                    console.log(`Unable to find gif with given description: ${searchingText}.`);
                    var gif = {};
                    callback(gif);
                }
            })
            .catch(error => {
                console.log(`Unable to get gif from ${url}. Status code: ${error.status} ${error.statusText}`);
                var gif = {};
                callback(gif);
            })
    },

    handleSearch: function(searchingText) {
        this.setState({
            loading: true
        });
        this.getGif(searchingText, function(gif) {
            this.setState({
                loading: false,
                gif: gif,
                searchingText: searchingText
            });
        }.bind(this));
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